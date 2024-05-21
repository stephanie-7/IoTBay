// WelcomePage.js
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <h1>Welcome to IoTBay</h1>
      <Link to="/" className="enter-home-button">Enter Home</Link>
    </div>
  );
};

export default WelcomePage;
