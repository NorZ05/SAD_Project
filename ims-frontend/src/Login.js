import './App.css';
import logo from './assets/Logo.jpg';
import { useState } from 'react';



function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // Simple hardcoded authentication for prototype
    if ((username === 'admin' && password === 'admin123') || (username === 'cashier' && password === 'cashier123')) {
      setError('');
      onLogin(username);
    } else {
      setError('Invalid username or password');
    }
  }

  return (
    <div className="ims-login-wrapper">
      <form className="ims-login-form" onSubmit={handleSubmit}>
        <img src={logo} alt="BJ’s Chicken Siopao Logo" className="ims-login-logo" style={{ height: "250px", width: "250px", borderRadius: "50px", background: "#fff", objectFit: "cover" }} />
        <h2>Login</h2>
        <div className="ims-login-field">
          <label>Username</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} autoFocus />
        </div>
        <div className="ims-login-field">
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        {error && <div className="ims-login-error">{error}</div>}
        <button type="submit" className="ims-login-btn">Log In</button>
      </form>
    </div>
  );
}

export default Login;
