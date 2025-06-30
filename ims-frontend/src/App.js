import './App.css';
import logo from './assets/Logo.jpg';
import Inventory from './Inventory';
import Supply from './Supply';
import OrderProcessing from './OrderProcessing';
import PointOfSale from './PointOfSale';
import ProductionCoordination from './ProductionCoordination';
import Login from './Login';
import Dashboard from './Dashboard';
import { useState } from 'react';


const MODULES = [
  { key: 'Dashboard', label: 'Dashboard', icon: '📊' },
  { key: 'pos', label: 'Point of Sale', icon: '💳' },
  { key: 'order', label: 'Order Processing', icon: '📝' },
  { key: 'production', label: 'Production', icon: '👨‍🍳' },
  { key: 'inventory', label: 'Inventory', icon: '🧺' },
  { key: 'supply', label: 'Supply', icon: '📦' },
  { key: 'logout', label: 'Log Out', icon: '🚪', isLogout: true }
];

function App() {
  const [activeModule, setActiveModule] = useState('inventory');
  const [user, setUser] = useState(null);

  function renderModule() {
    switch (activeModule) {
      case 'dashboard': 
        return <Dashboard />;
      case 'inventory':
        return <Inventory />;
      case 'supply':
        return <Supply />;
      case 'order':
        return <OrderProcessing />;
      case 'pos':
        return <PointOfSale />;
      case 'production':
        return <ProductionCoordination />;
      default:
        return <Dashboard />; 
    }
  }

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="App">
      {/* Show full-page inventory background only for Inventory module */}
      {/* Removed ims-inventory-bg for revert */}
      <header className="ims-header">
        <div className="ims-header-content">
          <img src={logo} alt="BJ’s Chicken Siopao Logo" className="ims-logo" />
          <div>
            <h1 className="ims-title">BJ’s Chicken Siopao</h1>
            <p className="ims-subtitle">Integrated Management System</p>
          </div>
        </div>
      </header>
      <main className="ims-main-layout">
        <aside className="ims-sidebar">
          {MODULES.map((mod) => (
  <button
    key={mod.key}
    className={`ims-nav-btn${mod.isLogout ? ' logout' : ''}${activeModule === mod.key ? ' active' : ''}`}
    onClick={() => {
      if (mod.isLogout) {
        setUser(null);
        setActiveModule('inventory');
      } else {
        setActiveModule(mod.key);
      }
    }}
  >
    <span style={{ marginRight: 8, fontSize: '1.2em' }}>{mod.icon}</span>
    {mod.label}
  </button>
))}


          
        </aside>
        <section className="ims-content">
          <div className="ims-content-header">
          </div>
          <div className="ims-content-main">
            {renderModule()}
            <div className="ims-content-footer"></div>
          </div>
        </section>
      </main>
      <footer className="ims-footer">
        <small>&copy; {new Date().getFullYear()} BJ’s Chicken Siopao IMS</small>
      </footer>
    </div>
  );
}

export default App;