import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../store/store';
import './ProductsPage.scss'; // 使用与产品页面相同的样式

const SearchResults = () => {
  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get('keyword')?.toLowerCase() || '';
  const products = useSelector((state: RootState) => Object.values(state.products.productsByCategory).flat());
  const searchResults = products.filter((product) => product.name.toLowerCase().includes(searchTerm));

  return (
    <div className="product-list">
      {searchResults.map((product) => (
        <div key={product.id} className="product-item">
          <div className="product-image">
            <img src={product.image_url} alt={product.name} />
          </div>
          <div className="product-details">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Stock: {product.stock}</p>
            {/* Add any additional buttons or links for product details */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
