import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Submissions from the contact form and from the tracker download form.
 *
 * Hardened when the second public form was added. Previously this route
 * interpolated submitted values straight into the notification email's HTML,
 * had no length caps, no bot trap and no rate limit. One public form made that
 * survivable; two makes it worth fixing, and the fix protects both.
 */

/** Distinct enough subjects that leads and enquiries sort themselves. */
const SOURCES = {
  contact: { label: 'Formulaire de contact', subject: 'Nouveau message' },
  'vgp-tracker': {
    label: 'Téléchargement du tableau de suivi VGP',
    subject: 'Nouveau téléchargement du tableau VGP',
  },
} as const;

type SourceKey = keyof typeof SOURCES;

const MAX = { name: 120, email: 200, company: 160, message: 5000 } as const;

/**
 * The submitted values land in an HTML email. Without escaping, anything
 * typed into the form is markup in the inbox that receives it.
 */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function clean(value: unknown, max: number) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

/** Deliberately loose: rejecting valid addresses costs more than a bad one. */
function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

/**
 * Per-IP rate limit, in memory.
 *
 * Serverless instances are not shared, so this bounds a burst from one client
 * against one instance rather than enforcing a global quota. That is the
 * cheap 90%: it stops a script hammering the form without adding Redis to a
 * marketing site. Replace it with a shared store if the form is ever abused
 * at a level this does not catch.
 */
const WINDOW_MS = 10 * 60 * 1000;
// Rejected submissions count too, so that probing the validation is also
// bounded. Set high enough that someone mistyping their email a few times
// before succeeding is never turned away.
const MAX_PER_WINDOW = 10;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Bound the map so a spray of unique IPs cannot grow it without limit.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

function clientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot: a field positioned off screen and hidden from assistive
    // technology, so a person never fills it and a naive bot fills everything.
    // Answer 200 so the bot has nothing to tune against.
    if (clean(body.website, 200)) {
      return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    }

    if (rateLimited(clientIp(request))) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429, headers: { 'Retry-After': '600' } },
      );
    }

    const source: SourceKey = body.source in SOURCES ? body.source : 'contact';
    const name = clean(body.name, MAX.name);
    const email = clean(body.email, MAX.email);
    const company = clean(body.company, MAX.company);
    const message = clean(body.message, MAX.message);

    // The tracker form asks for an email and a company, not a message.
    const requiresMessage = source === 'contact';

    if (!name || !email || (requiresMessage && !message)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!looksLikeEmail(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const { label, subject } = SOURCES[source];

    const { data, error } = await resend.emails.send({
      from: 'contact@travixosystems.com',
      to: 'info@travixosystems.com',
      replyTo: email,
      subject: `${subject} - ${name}`,
      html: `
        <h2>${escapeHtml(label)}</h2>
        <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
        <p><strong>Email :</strong> ${escapeHtml(email)}</p>
        <p><strong>Société :</strong> ${escapeHtml(company) || 'Non renseignée'}</p>
        ${
          message
            ? `<p><strong>Message :</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`
            : ''
        }
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Email sent successfully', id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
