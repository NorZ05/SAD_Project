import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend} from 'recharts';
import QuickStatCard from './components/QuickStatCard';
import ProductionTimeline from './components/ProductionTimeline';



function Dashboard() {
  // Add sample data
  const salesData = [
    { date: '05/15', sales: 8400 },
    { date: '05/16', sales: 9200 },
    { date: '05/17', sales: 8900 },
    { date: '05/18', sales: 11200 },
    { date: '05/19', sales: 12000 },
    { date: '05/20', sales: 10800 },
    { date: '05/21', sales: 12450 },
  ];

  const supplyData = [
    { name: 'Chicken', current: 9, min: 10 },
    { name: 'Flour', current: 25, min: 50 },
    { name: 'Yeast', current: 100, min: 100 },
    { name: 'Wrapper', current: 200, min: 50 },
  ];

  const cardStyle = {
    background: '#fff',
    borderRadius: 18,
    padding: 28,
    boxShadow: '0 4px 24px rgba(44,62,80,0.10)'
  };

  
const transactions = [
  { type: 'Regular', quantity: 80 },
  { type: 'Special', quantity: 40 },
  { type: 'Bottled Water ', quantity: 30 },
  { type: 'Coca-Cola', quantity: 7 },
  { type: 'Royal', quantity: 4 },
  { type: 'Sprite', quantity: 4 }
];


const productMix = Object.values(
  transactions.reduce((acc, txn) => {
    if (!acc[txn.type]) {
      acc[txn.type] = { name: txn.type, value: 0 };
    }
    acc[txn.type].value += txn.quantity;
    return acc;
  }, {})
);

const COLORS = ['#4a90e2', '#50e3c2', '#f5a623', '#d0021b', '#7b61ff'];



  return (
    <div style={{ 
      minHeight: '80vh', 
      padding: '32px', 
      background: 'linear-gradient(120deg, #f7f7fa 0%, #e3eafc 100%)'
    }}>
      {/* Header */}
      <h2 style={{ 
        textAlign: 'center', 
        color: '#4a90e2', 
        marginBottom: 24, 
        letterSpacing: 1,
        fontWeight: 700,
        fontSize: 36,
        textShadow: '0 2px 8px rgba(44,62,80,0.10)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12
      }}>
        <span role="img" aria-label="dashboard" style={{ fontSize: 38 }}>📊</span>
        Dashboard
      </h2>

      {/* Quick Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginBottom: 24 }}>
        <QuickStatCard icon="💰" label="Today's Sales" value="₱12,450" trend="+8.2%" />
        <QuickStatCard icon="🛒" label="Products Sold Today" value="165 pcs" trend="+12%" />
        <QuickStatCard icon="📦" label="Low Stock Items" value="2" trend="Action needed" isWarning />
        <QuickStatCard icon="📅" label="Pending Orders" value="8" trend="2 urgent" isWarning />
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 24 }}>
        {/* Sales Trend */}
        <div style={cardStyle}>
          <h3 style={{ marginBottom: 20, color: '#2d3e50' }}>
            <span role="img" aria-label="sales">📈</span> Sales Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#4a90e2" 
                strokeWidth={2}
                dot={{ fill: '#4a90e2' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Product Mix */}
       <div style={{ background: '#fff', padding: 24, borderRadius: 16, boxShadow: '0 4px 24px rgba(44,62,80,0.10)' }}>
  <h3 style={{ color: '#2d3e50', fontWeight: 700, fontSize: 22, marginBottom: 16 }}>
    🧾 Sales Breakdown
  </h3>
  <ResponsiveContainer width="100%" height={260}>
    <PieChart>
      <Pie
        data={productMix}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={100}
        dataKey="value"
        label={({ name, percent }) =>
          `${name} (${(percent * 100).toFixed(0)}%)`
        }
      >
        {productMix.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend verticalAlign="bottom" height={36} />
    </PieChart>
  </ResponsiveContainer>
</div>


        {/* Inventory Status */}
        <div style={cardStyle}>
          <h3 style={{ marginBottom: 20, color: '#2d3e50' }}>
            <span role="img" aria-label="inventory">📦</span> Supply Levels
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={supplyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="current">
                {supplyData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={entry.current < entry.min 
                      ? '#ef5350' 
                      :entry.current == entry.min 
                      ? '#fbc02d' 
                      : '#4caf50'
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Production Schedule */}
        <div style={cardStyle}>
          <h3 style={{ marginBottom: 20, color: '#2d3e50' }}>
            <span role="img" aria-label="schedule">📅</span> Today's Production
          </h3>
          <ProductionTimeline />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;