// app/components/ProductCard.tsx
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <Image
        src={image}
        alt={name}
        width={500}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-xl font-bold">${price.toFixed(2)}</p>
        <Link
          href={`/product/${id}`}
          className="mt-4 block text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
