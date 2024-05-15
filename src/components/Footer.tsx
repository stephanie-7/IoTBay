import './Footer.scss'; // 确保创建相应的样式文件

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <span>&copy; {new Date().getFullYear()} IOTBAY. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
