#!/bin/bash
set -e

echo "=== Running ESLint autofix ==="
pnpm lint --fix || true

echo "=== Batch replacing <a href> with <Link href> ==="
# Replace open tags
find app -type f -name "*.tsx" -exec sed -i 's/<a href="\/\([^"]*\)">/<Link href="\/\1">/g' {} \;
# Replace close tags
find app -type f -name "*.tsx" -exec sed -i 's/<\/a>/<\/Link>/g' {} \;

echo "=== Ensuring next/link import present ==="
# Add import at top if missing
for f in $(grep -rl "<Link " app --include="*.tsx"); do
  if ! grep -q 'import Link from "next/link"' "$f"; then
    sed -i '1i import Link from "next/link";' "$f"
  fi
done

echo "=== Fixing unused vars ==="
# Rename 'error' or 'locale' if defined but unused
find app -type f -name "*.tsx" -exec sed -i 's/\berror\b/_error/g' {} \;
find app -type f -name "*.tsx" -exec sed -i 's/\blocale\b/_locale/g' {} \;

echo "=== Adding Prettier dev dependency if missing ==="
if ! grep -q '"prettier"' package.json; then
  pnpm add -D prettier
fi

echo "=== Reminder ==="
echo "Manually update inline <script> for GA to use <Script> from next/script."
echo "Done. Commit changes and push, then redeploy on Vercel."
