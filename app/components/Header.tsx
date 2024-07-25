// app/components/Header.tsx
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/" className="hover:text-gray-400">
            My E-commerce Site
          </Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-gray-400">
                Products
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-gray-400">
                Cart
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-400">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
