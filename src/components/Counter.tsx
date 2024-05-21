// Counter.tsx
import React, { useEffect, useState } from 'react';
import { Product } from '../models/products';
import './Counter.scss';

interface CounterProps {
  stock: number;
  initialQuantity?: number;
  onQuantityChange: (product: Product, quantity: number) => void;
  product: Product;
}

export const Counter: React.FC<CounterProps> = ({
  stock,
  initialQuantity = 0,
  onQuantityChange,
  product
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
   
    setQuantity(initialQuantity);
  }, [initialQuantity]);


  const handleIncrement = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
      onQuantityChange(product, quantity + 1);
    } 
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      onQuantityChange(product, quantity - 1);
    }
  };

  return (
    <div className="counter">
      <button onClick={handleDecrement} disabled={quantity <= 0}>-</button>
      <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
      <button onClick={handleIncrement} disabled={quantity >= stock}>+</button>
    </div>
  );
};
