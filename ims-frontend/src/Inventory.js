import React, { useState } from 'react';
import dumpling from './assets/dumpling.png';
import dumplingS from './assets/dumplingS.png';
import dumplingStrawberry from './assets/strawberryD.png';
import dumplingChocolate from './assets/chocolateD.png';
import dumplingFrozen from './assets/frozen-regular.png';
import dumplingFrozenSpecial from './assets/frozen-special.png';
import waterBottle from './assets/Water Bottle.png';
import cocaCola from './assets/coca-colaSply.png';
import sprite from './assets/spriteSply.png';
import royal from './assets/royalSply.png';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';


const itemImages = {
  'Regular': dumpling,
  'Special': dumplingS,
  'Strawberry': dumplingStrawberry,
  'Chocolate': dumplingChocolate,
  'Frozen Regular': dumplingFrozen,
  'Frozen Special': dumplingFrozenSpecial,
  'Water Bottle': waterBottle,
  'Coca-Cola Can': cocaCola,
  'Sprite Can': sprite,
  'Royal Can': royal
};


function Inventory() {
  const [items, setItems] = useState([
    { type: 'Regular', quantity: 13, stock: 12 },
    { type: 'Special', quantity: 18, stock: 18 },
    { type: 'Strawberry', quantity: 26, stock: 26 },
    { type: 'Chocolate', quantity: 20, stock: 20 },
    { type: 'Frozen Regular', quantity: 50, stock: 50 },
    { type: 'Frozen Special', quantity: 22, stock: 22 },
    { type: 'Water Bottle', quantity: 9, stock: 9 },
    { type: 'Coca-Cola Can', quantity: 10, stock: 10},
    { type: 'Sprite Can', quantity: 27, stock: 27 },
    { type: 'Royal Can', quantity: 17, stock: 17 },

  ]);
  const [itemType, setItemType] = useState('Regular');
  const [qty, setQty] = useState('');

  // Basic table cell style
  const cellStyle = {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'center'
  };

  // Stock level thresholds
  const LOW_STOCK = 15;
  const MEDIUM_STOCK = 30;

  function getAlert(stock) {
    if (stock < LOW_STOCK) {
      return '🔴 Low ';
    } else if (stock < MEDIUM_STOCK) {
      return '⚠️ Medium ';
    }
    return '✅ Good ';
  }

  function handleAdd(e) {
    e.preventDefault();
    if (!itemType || isNaN(Number(qty)) || Number(qty) <= 0) return;
    setItems(prev => {
      const idx = prev.findIndex(i => i.type === itemType);
      if (idx !== -1) {
        return prev.map((item, i) => i === idx ? 
          { ...item, quantity: item.quantity + Number(qty), stock: item.stock + Number(qty) } : item);
      } else {
        return [...prev, { type: itemType, quantity: Number(qty), stock: Number(qty) }];
      }
    });
    setQty('');
  }

  function handleRemove(e) {
    e.preventDefault();
    if (!itemType || isNaN(Number(qty)) || Number(qty) <= 0) return;
    setItems(prev => {
      const idx = prev.findIndex(i => i.type === itemType);
      if (idx !== -1) {
        return prev
          .map((item, i) => i === idx ? 
            { ...item, quantity: Math.max(0, item.quantity - Number(qty)), 
              stock: Math.max(0, item.stock - Number(qty)) } : item)
          .filter(item => item.quantity > 0 && item.stock > 0);
      }
      return prev;
    });
    setQty('');
  }

  return (
    <div style={{ 
      minHeight: '80vh', 
      padding: '32px', 
      background: 'linear-gradient(120deg, #f7f7fa 0%, #e3eafc 100%)'
    }}>
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
        <span role="img" aria-label="inventory" style={{ fontSize: 38 }}>🧺</span>
        Inventory
      </h2>

      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 24, 
        justifyContent: 'center', 
        alignItems: 'flex-start', 
        marginBottom: 24 
      }}>
        {/* Inventory Update Card */}
        <div style={{ flex: '1 1 400px' }}>
          <div style={{
            background: '#fff',
            borderRadius: 18,
            padding: 28,
            boxShadow: '0 4px 24px rgba(44,62,80,0.10)'
          }}>
            <h3 style={{ 
              color: '#2d3e50',
              fontWeight: 700,
              fontSize: 22,
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <span role="img" aria-label="update">🔄</span>
              Update Inventory
            </h3>

            <form style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1.2fr 1fr 1fr',
              gap: 14,
              marginBottom: 24
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ fontWeight: 500, color: '#2d3e50', marginBottom: 2 }}>Type</label>
                <select 
                  value={itemType} 
                  onChange={e => setItemType(e.target.value)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: 8,
                    border: '1px solid #b0c4d8',
                    fontSize: 16
                  }}
                >
                  <option value="Regular">Regular</option>
                  <option value="Special">Special</option>
                </select>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ fontWeight: 500, color: '#2d3e50', marginBottom: 2 }}>Amount</label>
                <input 
                  type="number" 
                  value={qty} 
                  onChange={e => setQty(e.target.value)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: 8,
                    border: '1px solid #b0c4d8',
                    fontSize: 16
                  }}
                />
              </div>

              <button
                onClick={handleAdd}
                style={{
                  padding: '10px 16px',
                  background: '#4a90e2',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontSize: 16,
                  fontWeight: 600
                }}
              >Add</button>

              <button
                onClick={handleRemove}
                style={{
                  padding: '10px 16px',
                  background: '#d32f2f',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontSize: 16,
                  fontWeight: 600
                }}
              >Remove</button>
            </form>

            {/* Inventory Table */}
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
              <thead>
                <tr style={{ background: '#f7f7fa' }}>
                  <th style={{ ...cellStyle, borderTopLeftRadius: 8, borderTopRightRadius: 8, textAlign: 'left', padding: '12px 16px' }}>Item Type</th>
                  <th style={{ ...cellStyle, padding: '12px 16px' }}>Stock</th>
                  <th style={{ ...cellStyle, padding: '12px 16px' }}>Stock Alert</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx} style={{ background: idx % 2 === 0 ? '#f9fafb' : '#fff' }}>
                    <td style={{ ...cellStyle, display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px' }}>
                      <img
  src={itemImages[item.type]}
  alt={item.type}
  style={{
    width: 32,
    height: 32,
    objectFit: 'cover',
    borderRadius: 8
  }}
/>

                      {item.type}
                    </td>
                    <td style={{ ...cellStyle, padding: '12px 16px' }}>{item.stock}</td>
                    <td style={{ ...cellStyle, padding: '12px 16px' }}>{getAlert(item.stock)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stock Overview Chart */}
        <div style={{ flex: '1 1 200px' }}>
          <div style={{
            background: '#fff',
            borderRadius: 18,
            padding: 28,
            boxShadow: '0 4px 24px rgba(44,62,80,0.10)',
            height: '100%'
          }}>
            <h3 style={{ 
              color: '#2d3e50',
              fontWeight: 700,
              fontSize: 22,
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <span role="img" aria-label="chart">📊</span>
              Stock Overview
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={items}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                barSize={40} // Reduced from 60 to 40 for better proportions
              >
                <XAxis 
                  dataKey="type" 
                  axisLine={false}
                  tickLine={false}
                  style={{ 
                    fontSize: 14, 
                    fill: '#2d3e50',
                    fontWeight: 500 
                  }}
                  dy={10} // Add some spacing below labels
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  style={{ 
                    fontSize: 14, 
                    fill: '#2d3e50' 
                  }}
                  dx={-10} // Move labels closer to chart
                  tickFormatter={(value) => `${value} pcs`} // Add units
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                  contentStyle={{
                    background: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    boxShadow: '0 4px 24px rgba(44,62,80,0.10)',
                    padding: '8px 12px'
                  }}
                  formatter={(value) => [`${value} pcs`, 'Stock']} // Format tooltip
                />
                <Bar 
                  dataKey="stock" 
                  radius={[4, 4, 0, 0]} // Slightly reduced corner radius
                  maxBarSize={80} // Prevent bars from getting too wide
                >
                  {items.map((entry, idx) => {
                    let fill = '#7DDA58';
                    if (entry.stock < LOW_STOCK) {
                      fill = '#ef5350'; // Softer red
                    } else if (entry.stock < MEDIUM_STOCK) {
                      fill = '#ffb74d'; // Softer orange
                    }
                    return (
                      <Cell 
                        key={`cell-${idx}`} 
                        fill={fill}
                        style={{ 
                          filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.1))',
                          opacity: 0.9
                        }}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
