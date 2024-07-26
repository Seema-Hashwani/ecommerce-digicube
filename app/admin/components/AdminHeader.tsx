import Link from 'next/link';

const AdminHeader = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <h1 className="text-2xl">Admin Dashboard</h1>
        <div>
          <Link href="/admin/products" className="mr-4">Products</Link>
          <Link href="/admin/orders">Orders</Link>
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;
