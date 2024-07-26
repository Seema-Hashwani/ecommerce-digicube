import Image from 'next/image';
import { useState } from 'react'; // Import useState for managing button effect
import { useCart } from '../../hooks/CartContext'; // Adjust the path if necessary

interface ProductCardProps {
  id: number; // Ensure this matches the Product type
  name: string;
  price: number;
  image: string;
}

const ProductCard = ({ id, name, price, image }: ProductCardProps) => {
  const { addItem } = useCart();
  const [isClicked, setIsClicked] = useState(false);

  const handleAddToCart = () => {
    addItem({ id, name, price, quantity: 1, image });
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200); // Reset the effect after 200ms
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <Image src={image} alt={name} width={500} height={500} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-xl font-bold">${price.toFixed(2)}</p>
        <button
          onClick={handleAddToCart}
          className={`mt-4 block text-center bg-blue-500 text-white py-2 px-4 rounded transition-transform transform ${isClicked ? 'scale-105 bg-blue-600' : ''}`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
