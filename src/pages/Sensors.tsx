// SensorPage.tsx

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Counter } from '../components/Counter';
import { addToCart, increaseOrderCount } from '../features/cartSlice';
import { Product } from '../models/products';
import { RootState } from '../store/store';
import './ProductsPage.scss';

const SensorPage = () => {
  const sensorProducts = useSelector((state: RootState) => state.products.productsByCategory.Sensors);
  const backendUrl = 'http://localhost:5000';
  const dispatch = useDispatch();

  const [quantities, setQuantities] = useState<{ [productId: string]: number }>({});
  
  useEffect(() => {
    console.log(quantities);  
  }, [quantities]);

  const handleAddToCart = (product: Product) => {
    debugger
    const quantity = quantities[product.id] || 0;
    if (quantity > 0) {
      const cartItem = {
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: `${backendUrl}/${product.image_url}`, 
        total: product.price * quantity,
      };
      dispatch(addToCart(cartItem));
      dispatch(increaseOrderCount()); // 增加订单数量
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [product.id]: 0 // 这里会更新状态，但是有可能不会立即反映
      }));
    } else {
      console.log('Please select at least one item.');
    }
  };

  return (
    <div className="product-list">
      {sensorProducts.map((product, index) => (
        <div key={product.id} className={`product-item ${index % 2 === 0 ? 'even' : 'odd'}`}>
          <div className="product-image">
            <img src={`${backendUrl}${product.image_url}`} alt={product.name} />
          </div>
          <div className="product-details">
            <h2>{product.name}</h2>
            <p>Size: {product.size}</p>
            <p>Weight: {product.weight}</p>
            <p>{product.description}</p>
            <p>Brand: {product.brand}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Stock: {product.stock}</p>
          </div>
          <div className="counter-and-button">
            <Counter
              stock={product.stock}
              initialQuantity={quantities[product.id] || 0} 
              onQuantityChange={(product, quantity) => setQuantities({ ...quantities, [product.id]: quantity })}
              product={product}
            />
            <button
              className="add-to-cart-button"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SensorPage;
