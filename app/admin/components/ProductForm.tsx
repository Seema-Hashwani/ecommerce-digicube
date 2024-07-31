//app/admin/components/ProductForm.tsx
import { useState } from 'react';

interface ProductFormProps {
  product?: { id?: string; name: string; price: number; image: string; };
  onSubmit: (product: { id?: string; name: string; price: number; image: string; }) => void;
}

const ProductForm = ({ product, onSubmit }: ProductFormProps) => {
  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price || 0);
  const [image, setImage] = useState(product?.image || '');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ id: product?.id, name, price, image });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2" htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2" htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2" htmlFor="image">Image URL</label>
        <input
          type="text"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
