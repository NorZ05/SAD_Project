import React, { useState } from 'react';



function Supply() {
  // --- Data State ---
  const supplyIcons = {
    'Chicken': '🐔',
    'eggs': '🥚',
    'Flour': '🌾',
    'Yeast': '🧫',
    'Wrapper': '🥟',
    'Sugar': '🍬',
    'Salt': '🧂',

  };
  const [supplies, setSupplies] = useState([
    { name: 'Chicken', unit: 'kg', stock: 10, min: 10 },
    { name: 'eggs', unit: 'pcs', stock: 100, min: 100 },
    { name: 'Flour', unit: 'kg', stock: 25, min: 8 },
    { name: 'Yeast', unit: 'g', stock: 40, min: 100 },
    { name: 'Wrapper', unit: 'pcs', stock: 200, min: 50 },
    { name: 'Sugar', unit: 'kg', stock: 8, min: 2 },
    { name: 'Salt', unit: 'kg', stock: 1, min: 1 },
  ]);
  const [deliveries, setDeliveries] = useState([
    { date: '2025-05-20', items: [{ name: 'Chicken', qty: 20, unit: 'kg' }, { name: 'Flour', qty: 10, unit: 'kg' }], receivedBy: 'Lilibeth Javier', supplier: 'ABC Poultry', receipt: 'INV-1001', notes: 'All items in good condition.' },
    { date: '2025-05-18', items: [{ name: 'Yeast', qty: 200, unit: 'g' }], receivedBy: 'Lilibeth Javier', supplier: 'Baking Supplies Co.', receipt: 'INV-0999', notes: '' },
  ]);
  // --- Form State ---
  const [form, setForm] = useState({
    date: '',
    items: [{ name: '', qty: '', unit: '' }],
    receivedBy: '',
    supplier: '',
    receipt: '',
    notes: '',
  });
  // --- Table Cell Style ---
  const cellStyle = {
    padding: '12px 16px',
    height: '60px',
    fontSize: '14px',
    lineHeight: '1.4',
    color: '#2d3e50',
    background: '#fff',
    borderBottom: '1px solid #e0e0e0',
    textAlign: 'left' // Change default alignment
  };
  const headerCellStyle = {
    ...cellStyle,
    fontWeight: 700,
    fontSize: '16px',
    background: '#f7f7fa',
    borderBottom: '2px solid #e0e0e0'
  };

  // --- Handlers ---
  const handleFormChange = (e, idx, field) => {
    if (typeof idx === 'number') {
      // Item row change
      const items = [...form.items];
      items[idx][field] = e.target.value;
      setForm({ ...form, items });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };
  const addItemRow = () => setForm({ ...form, items: [...form.items, { name: '', qty: '', unit: '' }] });
  const removeItemRow = (idx) => setForm({ ...form, items: form.items.filter((_, i) => i !== idx) });
  const handleDeliverySubmit = (e) => {
    e.preventDefault();
    // Add delivery to log
    setDeliveries([
      {
        date: form.date || new Date().toISOString().slice(0, 10),
        items: form.items.map(i => ({ ...i })),
        receivedBy: form.receivedBy,
        supplier: form.supplier,
        receipt: form.receipt,
        notes: form.notes,
      },
      ...deliveries,
    ]);
    // Update supply stocks
    setSupplies(prev => {
      let updated = [...prev];
      form.items.forEach(({ name, qty }) => {
        const idx = updated.findIndex(s => s.name === name);
        if (idx !== -1 && !isNaN(Number(qty))) {
          updated[idx] = { ...updated[idx], stock: updated[idx].stock + Number(qty) };
        }
      });
      return updated;
    });
    // Reset form
    setForm({ date: '', items: [{ name: '', qty: '', unit: '' }], receivedBy: '', supplier: '', receipt: '', notes: '' });
  };

  // --- Stock Alert Helper ---
  function getStockAlert(supply) {
    if (supply.stock < supply.min) {
      return <span style={{ 
        color: '#d32f2f', 
        fontWeight: 600,
        background: '#ffebee',
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '14px'
      }}>Low</span>;
    }
    if (supply.stock < supply.min * 2) {
      return <span style={{ 
        color: '#f57c00', 
        fontWeight: 600,
        background: '#fff3e0',
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '14px'
      }}>Medium</span>;
    }
    return <span style={{ 
      color: '#388e3c', 
      fontWeight: 600,
      background: '#e8f5e9',
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '14px'
    }}>Good</span>;
  }

  // Form input styles
  const inputStyle = {
  width: '100%',
  padding: '10px 16px',
  borderRadius: 8,
  border: '1px solid #b0c4d8',
  fontSize: 16,
  boxSizing: 'border-box'
};


  // Button styles
  const buttonStyle = {
    padding: '10px 16px',
    background: '#4a90e2',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 16,
    fontWeight: 600
  };

  // Card styles
  const cardStyle = {
    background: '#fff',
    borderRadius: 18,
    padding: '32px 36px', // Increased padding
    boxShadow: '0 4px 24px rgba(44,62,80,0.10)',
    marginBottom: 24 // Added bottom margin
  };

  // Add tableContainerStyle for better table spacing
  const tableContainerStyle = {
    borderRadius: 12,
    overflow: 'hidden', // Keep border radius on table
    border: '1px solid #e0e0e0'
  };

  // Update form section styles
  const formSectionStyle = {
    marginBottom: 24,
    padding: '16px 20px',
    background: '#f7f7fa',
    borderRadius: 12,
    border: '1px solid #e0e0e0'
  };

  // Update label style
  const labelStyle = {
    color: '#2d3e50',
    fontWeight: 500,
    marginBottom: 8,
    fontSize: 14
  };

  // Update input/select containers
  const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 200,
    flex: 1
  };

  // Update the table styles
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid #e0e0e0',
    borderRadius: 12
  };

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
        <span role="img" aria-label="supply" style={{ fontSize: 38 }}>📦</span>
        Supply
      </h2>

      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 24, 
        justifyContent: 'center', 
        alignItems: 'flex-start' 
      }}>
        {/* Current Supply Card */}
        <div style={{ flex: '1 1 400px' }}>
          <div style={{...cardStyle}}>
            <h3 style={{ 
              color: '#2d3e50',
              fontWeight: 700,
              fontSize: 22,
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <span role="img" aria-label="inventory">📋</span>
              Current Supply
            </h3>

            <div style={tableContainerStyle}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={{
                      ...headerCellStyle,
                      width: '40%',
                      textAlign: 'left'
                    }}>Item</th>
                    <th style={{
                      ...headerCellStyle,
                      width: '20%',
                      textAlign: 'center'
                    }}>Stock</th>
                    <th style={{
                      ...headerCellStyle,
                      width: '20%',
                      textAlign: 'center'
                    }}>Unit</th>
                    <th style={{
                      ...headerCellStyle,
                      width: '20%',
                      textAlign: 'center'
                    }}>Stock Alert</th>
                  </tr>
                </thead>
                <tbody>
                  {supplies.map((s, idx) => (
                    <tr key={s.name} 
                      style={{ 
                        background: idx % 2 === 0 ? '#f9fafb' : '#fff'
                      }}
                    >
                      <td style={{
                        ...cellStyle,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        fontWeight: 600,
                        fontSize: '15px'
                      }}>
                        <span style={{ fontSize: 22 }}>{supplyIcons[s.name] || '📦'}</span>
                        {s.name}
                      </td>
                      <td style={{
                        ...cellStyle,
                        textAlign: 'center',
                        fontWeight: 600
                      }}>{s.stock}</td>
                      <td style={{
                        ...cellStyle,
                        textAlign: 'center'
                      }}>{s.unit}</td>
                      <td style={{
                        ...cellStyle,
                        textAlign: 'center'
                      }}>{getStockAlert(s)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* New Delivery Form Card */}
        <div style={{ flex: '1 1 400px' }}>
          <div style={{...cardStyle}}>
            <h3 style={{ 
              color: '#2d3e50',
              fontWeight: 700,
              fontSize: 22,
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <span role="img" aria-label="delivery">🚚</span>
              Log New Delivery
            </h3>

            <form onSubmit={handleDeliverySubmit}>
              <div style={formSectionStyle}>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 20,
                  marginBottom: 16
                }}>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Date</label>
                    <input 
                      type="date" 
                      name="date" 
                      value={form.date} 
                      onChange={handleFormChange}
                      style={inputStyle}
                    />
                  </div>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Received By</label>
                    <input 
                      type="text" 
                      name="receivedBy" 
                      value={form.receivedBy} 
                      onChange={handleFormChange}
                      style={inputStyle}
                      required 
                    />
                  </div>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Supplier</label>
                    <input 
                      type="text" 
                      name="supplier" 
                      value={form.supplier} 
                      onChange={handleFormChange}
                      style={inputStyle}
                    />
                  </div>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Receipt/Invoice #</label>
                    <input 
                      type="text" 
                      name="receipt" 
                      value={form.receipt} 
                      onChange={handleFormChange}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>

              <div style={{ ...formSectionStyle, marginTop: 16 }}>
                <label style={{ ...labelStyle, display: 'block', marginBottom: 12 }}>
                  Delivered Items
                </label>
                {form.items.map((item, idx) => (
                  <div key={idx} style={{ 
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr auto',
                    gap: 12,
                    marginBottom: 8,
                    alignItems: 'center'
                  }}>
                    <select 
                      value={item.name} 
                      onChange={e => handleFormChange(e, idx, 'name')}
                      style={inputStyle}
                      required
                    >
                      <option value="">Select Item</option>
                      {supplies.map(s => 
                        <option key={s.name} value={s.name}>{supplyIcons[s.name]} {s.name}</option>
                      )}
                    </select>
                    <input 
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={e => handleFormChange(e, idx, 'qty')}
                      placeholder="Qty"
                      style={inputStyle}
                      required
                    />
                    <select 
                      value={item.unit}
                      onChange={e => handleFormChange(e, idx, 'unit')}
                      style={inputStyle}
                      required
                    >
                      <option value="">Unit</option>
                      {item.name && supplies.find(s => s.name === item.name)?.unit}
                    </select>
                    <button 
                      type="button"
                      onClick={() => removeItemRow(idx)}
                      style={{
                        background: '#fee2e2',
                        border: 'none',
                        borderRadius: 8,
                        padding: '8px 12px',
                        color: '#dc2626',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={addItemRow}
                  style={{
                    ...buttonStyle,
                    background: '#e0e7ff',
                    color: '#4f46e5',
                    padding: '8px 16px',
                    marginTop: 8
                  }}
                >
                  + Add Item
                </button>
              </div>

              <div style={{ ...formSectionStyle, marginTop: 16 }}>
                <label style={labelStyle}>Notes</label>
                <textarea 
                  name="notes"
                  value={form.notes}
                  onChange={handleFormChange}
                  style={{
                    ...inputStyle,
                    minWidth: 60,
                    minHeight: 60,
                    resize: 'vertical'
                  }}
                  placeholder="Add any notes about the delivery..."
                />
              </div>

              <div style={{ textAlign: 'center', marginTop: 24 }}>
                <button 
                  type="submit"
                  style={{
                    ...buttonStyle,
                    padding: '12px 32px',
                    fontSize: 16
                  }}
                >
                  Log Delivery
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* --- Delivery Log Card --- */}
      <div style={{ marginTop: 24 }}>
        <div style={{...cardStyle}}>
          <h3 style={{ 
            color: '#2d3e50',
            fontWeight: 700,
            fontSize: 22,
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <span role="img" aria-label="history">📜</span>
            Delivery History
          </h3>

          <div style={tableContainerStyle}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={headerCellStyle}>Date</th>
                  <th style={headerCellStyle}>Supplier</th>
                  <th style={headerCellStyle}>Receipt #</th>
                  <th style={headerCellStyle}>Received By</th>
                  <th style={headerCellStyle}>Items</th>
                  <th style={headerCellStyle}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {deliveries.map((d, idx) => (
                  <tr key={d.date + d.receipt + idx} style={{ background: idx % 2 === 0 ? '#f9fafb' : '#fff', transition: 'background 0.2s', cursor: 'pointer', width: '30%'}}>
                    <td style={cellStyle}>{d.date}</td>
                    <td style={cellStyle}>{d.supplier}</td>
                    <td style={cellStyle}>{d.receipt}</td>
                    <td style={cellStyle}>{d.receivedBy}</td>
                    <td style={{ ...cellStyle, fontSize: 14, textAlign: 'center', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={d.items.map(i => `${i.name}: ${i.qty} ${i.unit}`).join(', ')}>
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none', textAlign: 'center' }}>
                        {d.items.map((i, iidx) => (
                          <li key={i.name + iidx} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{supplyIcons[i.name] || '📦'} {i.name}: <b>{i.qty} {i.unit}</b></li>
                        ))}
                      </ul>
                    </td>
                    <td style={{ ...cellStyle, fontSize: 14, textAlign: 'center', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={d.notes}>{d.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Supply;
