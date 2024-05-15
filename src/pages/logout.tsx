// Logout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 这里可以执行任何清理操作，例如清除 localStorage
    // 或者发送登出请求到服务器
    localStorage.removeItem('user'); // 举例

    // 设置一个定时器，在一段时间后重定向到登录页面
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000); // 3秒后重定向

    return () => clearTimeout(timer); // 清理定时器
  }, [navigate]);

  return (
    <div>
      <h1>You have been logged out.</h1>
      <p>Redirecting to login page...</p>
    </div>
  );
};

export default LogoutPage;
