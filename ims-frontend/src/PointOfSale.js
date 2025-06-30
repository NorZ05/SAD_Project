import React, { useState } from 'react';
import regularSiopao from './assets/regular.jpg';
import specialSiopao from './assets/special.jpg';
import frozen from './assets/FrozenSio.jpg';
import frozenreg from './assets/FrzSioSpe.jpg';
import Water from './assets/Water.jpg';
import Coke from './assets/Coke2.jpg';
import Royal from './assets/Royal.jpg';
import Sprite from './assets/Sprite1.jpg';
import ST from './assets/Chocolate.jpg';
import CH from './assets/Strawberry.jpg';




function PointOfSale() {
  
  const MENU = {
    REGULAR: { 
      name: 'Regular Siopao', 
      price: 25, 
      icon: '🥟',
      image: regularSiopao
    },
    SPECIAL: { 
      name: 'Special Siopao', 
      price: 35, 
      icon: '✨🥟',
      image: specialSiopao
    },

    STRBY: { 
      name: 'Strawberry Steam buns', 
      price: 20, 
      icon: '🍓🥟',
      image: ST
    },

    CHCO: { 
      name: 'Chocolate Steam buns', 
      price: 20, 
      icon: '🍫🥟',
      image: CH
    },

    FROZENREG: { 
      name: 'Frozen Regular Siopao', 
      price: 300, 
      icon: '❄️🥟',
      image: frozenreg
    },

    FROZENSPEC: { 
      name: 'Frozen Special Siopao', 
      price: 420, 
      icon: '❄️🌟🥟',
      image: frozen
    },

    WATER: { 
      name: 'Water Bottle', 
      price: 20, 
      icon: '💧🧴',
      image: Water
    },

    COKE: { 
      name: 'Coca-Cola Can', 
      price: 20, 
      icon: '🥤🟥',
      image: Coke
    },

    SPRITE: { 
      name: 'Sprite Can', 
      price: 20, 
      icon: '🥤🟢',
      image: Sprite
    },

    ROYAL: { 
      name: 'Royal Can', 
      price: 20, 
      icon: '🥤🟠',
      image: Royal
    },
  };

  // States
  const [transactions, setTransactions] = useState([
    {
      id: 'TXN-1001',
      date: '2025-05-22',
      cashier: 'Lilibeth Javier',
      type: 'Regular',
      quantity: 10,
      total: 200
    },
    {
      id: 'TXN-1002',
      date: '2025-05-22',
      cashier: 'Lilibeth Javier',
      type: 'Special',
      quantity: 5,
      total: 150
    }
  ]);

  const [currentOrder, setCurrentOrder] = useState({
    id: `ORD-${Math.floor(Math.random() * 10000)}`,
    items: [],
    customerName: '',
    orderType: 'Dine-in', // Dine-in, Takeout, Delivery
    notes: '',
    total: 0,
    cashReceived: 0,
    deliveryAddress: '',
    contactNumber: '',
    tableNumber: '',
    status: 'PENDING'
  });

  const [paymentDetails, setPaymentDetails] = useState({
    amount: 0,
    change: 0,
    method: 'Cash' // Cash, GCash, etc.
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Existing cell style
  const cellStyle = {
    border: '1px solid #ccc',
    padding: '8px',
    minWidth: 120,
    maxWidth: 180,
    height: 56,
    verticalAlign: 'middle',
    boxSizing: 'border-box',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textAlign: 'center',
  };

  // Add item to current order
  const addToOrder = (type) => {
    const newItems = [...currentOrder.items];
    const existingItem = newItems.find(item => item.type === type);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      newItems.push({
        type,
        name: MENU[type].name,
        price: MENU[type].price,
        quantity: 1
      });
    }

    setCurrentOrder({
      ...currentOrder,
      items: newItems,
      total: calculateTotal(newItems)
    });
  };

  // Calculate total
  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const updateItemQuantity = (type, action) => {
    const newItems = [...currentOrder.items];
    const itemIndex = newItems.findIndex(item => item.type === type);
    
    if (itemIndex > -1) {
      if (action === 'add') {
        newItems[itemIndex].quantity += 1;
      } else if (action === 'subtract' && newItems[itemIndex].quantity > 1) {
        newItems[itemIndex].quantity -= 1;
      } else if (action === 'subtract' && newItems[itemIndex].quantity === 1) {
        newItems.splice(itemIndex, 1);
      }
    } else if (action === 'add') {
      newItems.push({
        type,
        name: MENU[type].name,
        price: MENU[type].price,
        quantity: 1,
        icon: MENU[type].icon
      });
    }

    setCurrentOrder({
      ...currentOrder,
      items: newItems,
      total: calculateTotal(newItems)
    });
  };

  // Add new function to handle direct quantity input
  const handleQuantityInput = (type, value) => {
    const newItems = [...currentOrder.items];
    const itemIndex = newItems.findIndex(item => item.type === type);
    const numValue = parseInt(value);
    
    if (isNaN(numValue) || numValue < 0) return;

    if (itemIndex > -1) {
      if (numValue === 0) {
        newItems.splice(itemIndex, 1);
      } else {
        newItems[itemIndex].quantity = numValue;
      }
    } else if (numValue > 0) {
      newItems.push({
        type,
        name: MENU[type].name,
        price: MENU[type].price,
        quantity: numValue,
        icon: MENU[type].icon
      });
    }

    setCurrentOrder({
      ...currentOrder,
      items: newItems,
      total: calculateTotal(newItems)
    });
  };

  // Add this component inside the right side current order section, before the items list
  const OrderDetails = () => (
    <div style={{ marginBottom: 24, background: '#f7f7fa', padding: 16, borderRadius: 12 }}>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 8, color: '#2d3e50', fontWeight: 600 }}>
          Order Type
        </label>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Dine-in', 'Takeout', 'Delivery'].map(type => (
            <button
              key={type}
              onClick={() => setCurrentOrder({ ...currentOrder, orderType: type })}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: 'none',
                background: currentOrder.orderType === type ? '#4a90e2' : '#fff',
                color: currentOrder.orderType === type ? '#fff' : '#2d3e50',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 8, color: '#2d3e50', fontWeight: 600 }}>
          Customer Name
        </label>
        <input
          type="text"
          value={currentOrder.customerName}
          onChange={e => setCurrentOrder({ ...currentOrder, customerName: e.target.value })}
          style={{
            width: '100%',
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid #e0e0e0'
          }}
          placeholder="Enter customer name"
        />
      </div>

      {currentOrder.orderType === 'Dine-in' && (
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8, color: '#2d3e50', fontWeight: 600 }}>
            Table Number
          </label>
          <input
            type="text"
            value={currentOrder.tableNumber}
            onChange={e => setCurrentOrder({ ...currentOrder, tableNumber: e.target.value })}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid #e0e0e0'
            }}
            placeholder="Enter table number"
          />
        </div>
      )}

      {currentOrder.orderType === 'Delivery' && (
        <>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#2d3e50', fontWeight: 600 }}>
              Delivery Address
            </label>
            <textarea
              value={currentOrder.deliveryAddress}
              onChange={e => setCurrentOrder({ ...currentOrder, deliveryAddress: e.target.value })}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid #e0e0e0',
                minHeight: 80
              }}
              placeholder="Enter delivery address"
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#2d3e50', fontWeight: 600 }}>
              Contact Number
            </label>
            <input
              type="tel"
              value={currentOrder.contactNumber}
              onChange={e => setCurrentOrder({ ...currentOrder, contactNumber: e.target.value })}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid #e0e0e0'
              }}
              placeholder="Enter contact number"
            />
          </div>
        </>
      )}
    </div>
  );

  const PaymentModal = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 18,
        padding: 28,
        width: '90%',
        maxWidth: 400,
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <h3 style={{ marginBottom: 24, color: '#2d3e50', fontWeight: 700 }}>Process Payment</h3>
        
        <div style={{ marginBottom: 24 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#2d3e50', fontWeight: 600 }}>
              Total Amount
            </label>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#4a90e2' }}>
              ₱{currentOrder.total.toFixed(2)}
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#2d3e50', fontWeight: 600 }}>
              Cash Received
            </label>
            <input
              type="number"
              value={paymentDetails.amount}
              onChange={e => {
                const amount = parseFloat(e.target.value) || 0;
                setPaymentDetails({
                  ...paymentDetails,
                  amount,
                  change: amount - currentOrder.total
                });
              }}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid #e0e0e0',
                fontSize: 20
              }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#2d3e50', fontWeight: 600 }}>
              Change
            </label>
            <div style={{ 
              fontSize: 24, 
              fontWeight: 700,
              color: paymentDetails.change >= 0 ? '#388e3c' : '#d32f2f'
            }}>
              ₱{paymentDetails.change.toFixed(2)}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16 }}>
            <button
              onClick={() => setShowPaymentModal(false)}
              style={{
                flex: 1,
                padding: '12px',
                border: '1px solid #4a90e2',
                borderRadius: 8,
                background: '#fff',
                color: '#4a90e2',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              onClick={processPayment}
              disabled={paymentDetails.change < 0}
              style={{
                flex: 1,
                padding: '12px',
                border: 'none',
                borderRadius: 8,
                background: paymentDetails.change >= 0 ? '#4a90e2' : '#f0f0f0',
                color: '#fff',
                cursor: paymentDetails.change >= 0 ? 'pointer' : 'not-allowed'
              }}
            >
              Complete Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const processPayment = async () => {
    if (paymentDetails.change < 0) return;

    // Create transaction record
    const transaction = {
      id: `TXN-${Math.floor(Math.random() * 10000)}`,
      date: new Date().toISOString(),
      cashier: 'Lilibeth Javier', // This should come from auth context
      items: currentOrder.items,
      total: currentOrder.total,
      amountReceived: paymentDetails.amount,
      change: paymentDetails.change,
      paymentMethod: paymentDetails.method
    };

    // Create order for order processing
    const order = {
      ...currentOrder,
      status: 'PENDING',
      dateOrdered: new Date().toISOString()
    };

    try {
      // Update transactions
      setTransactions([transaction, ...transactions]);

      // Send to order processing
      // This should be an API call in production
      // await axios.post('/api/orders', order);

      // Reset current order and payment details
      setCurrentOrder({
        id: `ORD-${Math.floor(Math.random() * 10000)}`,
        items: [],
        customerName: '',
        orderType: 'Dine-in',
        notes: '',
        total: 0,
        cashReceived: 0,
        deliveryAddress: '',
        contactNumber: '',
        tableNumber: '',
        status: 'PENDING'
      });

      setPaymentDetails({
        amount: 0,
        change: 0,
        method: 'Cash'
      });

      setShowPaymentModal(false);

      // Show success message
      alert('Payment processed successfully!');
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Error processing payment. Please try again.');
    }
  };

  return (
    <div style={{ minHeight: '80vh', padding: '32px', background: 'linear-gradient(120deg, #f7f7fa 0%, #e3eafc 100%)' }}>
      <h2 style={{ 
        textAlign: 'left', 
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
        <span role="img" aria-label="POS" style={{ fontSize: 38 }}>🥟</span>
        Bj's Chicken Siopao
      </h2>

      {/* Main POS Layout */}
      <div style={{ 
        display: 'flex', 
        gap: 24, 
        flexWrap: 'wrap',
        marginBottom: 32
      }}>
        {/* Left side - Menu */}
        <div style={{ flex: '2 1 500px' }}>
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
              <span role="img" aria-label="menu">🍽️</span>
              Menu Items
            </h3>
            
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {Object.entries(MENU).map(([type, item]) => (
                <div
                  key={type}
                  style={{
                    flex: '1 1 220px',
                    background: '#fff',
                    border: '1px solid #e0e0e0',
                    borderRadius: 16,
                    overflow: 'hidden',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 8px rgba(44,62,80,0.06)'
                  }}
                >
                  <div style={{
                    background: '#f7f7fa',
                    padding: '0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '160px',
                    overflow: 'hidden'
                  }}>
                    <img 
                      src={item.image} 
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <div style={{ padding: 16 }}>
                    <h4 style={{ 
                      margin: 0,
                      fontSize: 18,
                      fontWeight: 600,
                      color: '#2d3e50'
                    }}>{item.name}</h4>
                    <p style={{ 
                      margin: '8px 0',
                      color: '#4a90e2',
                      fontSize: 20,
                      fontWeight: 700
                    }}>₱{item.price.toFixed(2)}</p>
                    <div style={{ 
                      display: 'flex',
                      gap: 8,
                      marginTop: 12,
                      alignItems: 'center'
                    }}>
                      <button
                        onClick={() => updateItemQuantity(type, 'subtract')}
                        style={{
                          padding: '8px 12px',
                          border: 'none',
                          borderRadius: 8,
                          background: '#E4080A',
                          color: '#fff',
                          cursor: 'pointer',
                          fontSize: 16
                        }}
                      >-</button>
                      <input
                        type="number"
                        min="0"
                        value={currentOrder.items.find(item => item.type === type)?.quantity || 0}
                        onChange={(e) => handleQuantityInput(type, e.target.value)}
                        style={{
                          width: '60px',
                          padding: '8px',
                          borderRadius: 8,
                          border: '1px solid #e0e0e0',
                          textAlign: 'center',
                          fontSize: 16
                        }}
                      />
                      <button
                        onClick={() => updateItemQuantity(type, 'add')}
                        style={{
                          padding: '8px 12px',
                          border: 'none',
                          borderRadius: 8,
                          background: '#4a90e2',
                          color: '#fff',
                          cursor: 'pointer',
                          fontSize: 16
                        }}
                      >+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Current Order */}
        <div style={{ flex: '1 1 400px' }}>
          <div style={{
            background: '#fff',
            borderRadius: 18,
            padding: 28,
            boxShadow: '0 4px 24px rgba(44,62,80,0.10)',
            position: 'sticky',
            top: 32
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
              <span role="img" aria-label="cart">🛒</span>
              Current Order
            </h3>
            
            {currentOrder.items.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '32px 16px',
                color: '#888',
                background: '#f7f7fa',
                borderRadius: 12
              }}>
                <span role="img" aria-label="empty" style={{ fontSize: 48, marginBottom: 16, display: 'block' }}>🛍️</span>
                <p style={{ margin: 0 }}>Your order is empty</p>
              </div>
            ) : (
              <>
                <OrderDetails />

                <div style={{ marginBottom: 24 }}>
                  {currentOrder.items.map((item, index) => (
                    <div key={item.type} style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 0',
                      borderBottom: index < currentOrder.items.length - 1 ? '1px solid #e0e0e0' : 'none'
                    }}>
                      <span style={{ fontSize: 24, marginRight: 12 }}>{MENU[item.type].icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600 }}>{item.name}</div>
                        <div style={{ color: '#4a90e2' }}>₱{item.price.toFixed(2)} × {item.quantity}</div>
                      </div>
                      <div style={{ fontWeight: 700 }}>
                        ₱{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  borderTop: '2px solid #e0e0e0',
                  paddingTop: 16,
                  marginTop: 16
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 8
                  }}>
                    <span>Subtotal</span>
                    <span style={{ fontWeight: 600 }}>₱{currentOrder.total.toFixed(2)}</span>
                  </div>
                  
                  <button
                    onClick={() => setShowPaymentModal(true)}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: '#4a90e2',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 12,
                      fontSize: 16,
                      fontWeight: 600,
                      cursor: 'pointer',
                      marginTop: 16
                    }}
                  >
                    Process Payment
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div style={{ 
        maxHeight: 350, 
        overflowY: 'auto', 
        borderRadius: 18,
        boxShadow: '0 4px 24px rgba(44,62,80,0.10)',
        background: '#fff',
        padding: 28
      }}>
        <h3 style={{ 
          color: '#2d3e50',
          fontWeight: 700,
          fontSize: 22,
          marginBottom: 24
        }}>Recent Transactions</h3>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
          <thead>
            <tr style={{ background: '#f0f0f0' }}>
              <th style={{ ...cellStyle, textAlign: 'center' }}>Transaction #</th>
              <th style={{ ...cellStyle, textAlign: 'center' }}>Date</th>
              <th style={{ ...cellStyle, textAlign: 'left' }}>Cashier</th>
              <th style={cellStyle}>Type</th>
              <th style={cellStyle}>Qty</th>
              <th style={cellStyle}>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={cellStyle}>TXN-1001</td>
              <td style={cellStyle}>2025-05-22</td>
              <td style={{ ...cellStyle, textAlign: 'left' }}>Lilibeth Javier</td>
              <td style={cellStyle}>Regular</td>
              <td style={cellStyle}>10</td>
              <td style={cellStyle}>₱200</td>
            </tr>
            <tr>
              <td style={cellStyle}>TXN-1002</td>
              <td style={cellStyle}>2025-05-22</td>
              <td style={{ ...cellStyle, textAlign: 'left' }}>Lilibeth Javier</td>
              <td style={cellStyle}>Special</td>
              <td style={cellStyle}>5</td>
              <td style={cellStyle}>₱150</td>
            </tr>
          </tbody>
        </table>
      </div>

      {showPaymentModal && <PaymentModal />}
    </div>
  );
}

export default PointOfSale;
