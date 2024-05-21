import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Counter } from '../components/Counter';
import { addToCart } from '../features/cartSlice';
import { Product } from '../models/products';
import { RootState } from '../store/store';
import './ProductsPage.scss';

const GatewaysPage = () => {
  const gatewaysProducts = useSelector((state: RootState) => state.products.productsByCategory.Gateways);
  const backendUrl = 'http://localhost:5000';
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (product: Product, quantity: number) => {
    if (quantity > 0) {
      const cartItem = {
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image_url,
        total: product.price * quantity,
      };
      dispatch(addToCart(cartItem));
    } else {
      console.log('Please select at least one item.');
    }
  };

  return (
    <div className="product-list">
      {gatewaysProducts.map((product, index) => (
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
          <Counter
            stock={product.stock}
            initialQuantity={0}
            onQuantityChange={(product, quantity) => handleAddToCart(product, quantity)}
            product={product}
          />
        </div>
      ))}
    </div>
  );
};

export default GatewaysPage;
