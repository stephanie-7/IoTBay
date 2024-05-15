import { Link } from 'react-router-dom';
import actuators from '../assets/images/actuators.webp';
import background from '../assets/images/background.webp';
import gateways from '../assets/images/gateways.webp';
import sensors from '../assets/images/sensors.webp';
import './HomeTable.scss';

const HomeTable = () => {
  return (
    <>

      <div className="full-width-image" style={{ backgroundImage: `url(${background})` }}></div>
      

      <div className="static-product-section">
        <div className="static-product-card">
          <h2>Sensors</h2>
          <img src={sensors} alt="Sensors" className="static-product-image" />
          <Link to="/sensors">Learn more</Link>
        </div>
        <div className="static-product-card">
          <h2>Gateways</h2>
          <img src={gateways} alt="Gateways" className="static-product-image" />
          <Link to="/gateways">Learn more</Link>
        </div>
        <div className="static-product-card">
          <h2>Actuators</h2>
          <img src={actuators} alt="Actuators" className="static-product-image" />
          <Link to="/actuators">Learn more</Link>
        </div>
      </div>
    </>
  );
};

export default HomeTable;
