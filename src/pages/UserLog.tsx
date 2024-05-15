import { useSelector } from 'react-redux';
import type { RootState } from '../store/store'; // 路径根据你的项目结构调整

const UserLog = () => {
  const logs = useSelector((state: RootState) => state.user.logs);

  return (
    <div>
      <h1>User Access Logs</h1>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Login Time</th>
            <th>Logout Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.userId}</td>
              <td>{log.loginTime}</td>
              <td>{log.logoutTime || 'Logged in'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserLog;
