import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-color.png" alt="TraviXO" width={40} height={40} />
            <span className="font-bold text-xl">TraviXO</span>
          </Link>

          {/* Menu Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/features"
              className="text-gray-600 hover:text-gray-900"
            >
              Features
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors inline-block"
          >
            Start Free Pilot
          </Link>
        </div>
      </div>
    </nav>
  );
}
