// app/components/Footer.tsx
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto flex flex-col items-center">
        <nav className="mb-4">
          <ul className="flex space-x-4">
            <li>
              <Link href="/about" className="hover:text-gray-400">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-400">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-gray-400">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-gray-400">
                Terms of Service
              </Link>
            </li>
          </ul>
        </nav>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} My E-commerce Site. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
