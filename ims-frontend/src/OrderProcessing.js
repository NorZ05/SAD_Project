import React, { useState } from 'react';

const styles = {
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  }
};

function OrderProcessing() {
  // Update Order status types
  const ORDER_STATUS = {
    PENDING: 'Pending',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled'
  };

  // Separate states for different order lists
  const [pendingOrders, setPendingOrders] = useState([
    {
      id: 'ORD-001',
      customerName: 'Juan Dela Cruz',
      items: [
        { type: 'Regular', quantity: 5, price: 25 },
        { type: 'Special', quantity: 3, price: 35 }
      ],
      total: 230,
      status: ORDER_STATUS.PENDING,
      orderType: 'Pickup',
      dateOrdered: '2025-05-22T10:30:00',
      notes: 'Please call when ready',
    },
    {
      id: 'ORD-002',
      customerName: 'Maria Santos',
      items: [
        { type: 'Special', quantity: 10, price: 35 }
      ],
      total: 350,
      status: ORDER_STATUS.PENDING,
      orderType: 'Delivery',
      dateOrdered: '2025-05-22T10:45:00',
      notes: 'Address: 123 Main St, Manila',
    },
    {
      id: 'ORD-003',
      customerName: 'Pedro Reyes',
      items: [
        { type: 'Regular', quantity: 15, price: 25 }
      ],
      total: 375,
      status: ORDER_STATUS.PENDING,
      orderType: 'Dine-in',
      dateOrdered: '2025-05-22T11:00:00',
      notes: 'Table #5',
    },
    {
      id: 'ORD-004',
      customerName: 'Ana Garcia',
      items: [
        { type: 'Regular', quantity: 8, price: 25 },
        { type: 'Special', quantity: 7, price: 35 }
      ],
      total: 445,
      status: ORDER_STATUS.PENDING,
      orderType: 'Pickup',
      dateOrdered: '2025-05-22T11:15:00',
      notes: 'Will pick up at 12:30 PM',
    },
    {
      id: 'ORD-005',
      customerName: 'Roberto Lim',
      items: [
        { type: 'Special', quantity: 20, price: 35 }
      ],
      total: 700,
      status: ORDER_STATUS.PENDING,
      orderType: 'Delivery',
      dateOrdered: '2025-05-22T11:30:00',
      notes: 'Corporate order - ABC Company',
    },
    {
      id: 'ORD-006',
      customerName: 'Carmen Torres',
      items: [
        { type: 'Regular', quantity: 12, price: 25 },
        { type: 'Special', quantity: 8, price: 35 }
      ],
      total: 580,
      status: ORDER_STATUS.PENDING,
      orderType: 'Dine-in',
      dateOrdered: '2025-05-22T11:45:00',
      notes: 'Table #3 - Birthday celebration',
    },
    {
      id: 'ORD-007',
      customerName: 'Miguel Cruz',
      items: [
        { type: 'Regular', quantity: 30, price: 25 }
      ],
      total: 750,
      status: ORDER_STATUS.PENDING,
      orderType: 'Pickup',
      dateOrdered: '2025-05-22T12:00:00',
      notes: 'School event order',
    }
  ]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);

  // Add filter states
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    orderType: 'all',
    dateRange: {
      start: '',
      end: ''
    }
  });

  // Updated handle status change
  const handleStatusUpdate = (orderId, newStatus) => {
    // Find the order in pending list
    const orderToMove = pendingOrders.find(order => order.id === orderId);
    
    if (orderToMove) {
      // Remove from pending
      setPendingOrders(pendingOrders.filter(order => order.id !== orderId));
      
      // Add to appropriate list with timestamp
      const updatedOrder = {
        ...orderToMove,
        status: newStatus,
        statusUpdatedAt: new Date().toISOString()
      };

      if (newStatus === ORDER_STATUS.COMPLETED) {
        setCompletedOrders([updatedOrder, ...completedOrders]);
      } else if (newStatus === ORDER_STATUS.CANCELLED) {
        setCancelledOrders([updatedOrder, ...cancelledOrders]);
      }
    }
  };

  // Filter orders based on current filters
  const filteredOrders = pendingOrders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(filters.search.toLowerCase()) ||
      order.customerName.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = 
      filters.status === 'all' || order.status === filters.status;
    
    const matchesType = 
      filters.orderType === 'all' || order.orderType === filters.orderType;

    const matchesDate = 
      (!filters.dateRange.start || new Date(order.dateOrdered) >= new Date(filters.dateRange.start)) &&
      (!filters.dateRange.end || new Date(order.dateOrdered) <= new Date(filters.dateRange.end));

    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  // Style constants
  const statusStyles = {
    [ORDER_STATUS.PENDING]: { color: '#f57c00', background: '#fff3e0' },
    [ORDER_STATUS.COMPLETED]: { color: '#388e3c', background: '#e8f5e9' },
    [ORDER_STATUS.CANCELLED]: { color: '#d32f2f', background: '#ffebee' }
  };

  const headerStyle = {
    padding: '8px 12px', // Reduced padding
    textAlign: 'left', 
    borderBottom: '2px solid #e0e0e0',
    color: '#2d3e50',
    fontWeight: 600,
    fontSize: '14px' // Smaller font
  };

  const cellStyle = {
    padding: '8px 12px', // Reduced padding
    borderBottom: '1px solid #e0e0e0',
    fontSize: '14px', // Smaller font
    whiteSpace: 'nowrap',
    maxWidth: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  const OrderList = ({ title, orders, showStatusUpdate = false, onDeleteOne, onDeleteAll }) => (
    <div style={{
      background: '#fff',
      borderRadius: 18,
      padding: 28,
      boxShadow: '0 4px 24px rgba(44,62,80,0.10)',
      overflowX: 'auto',
      marginBottom: 24
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24
      }}>
        <h3 style={{ 
          color: '#2d3e50',
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: 0.5,
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          {title}
          {title === "Pending Orders" && (
            <span role="img" aria-label="pending" style={{ 
              fontSize: 24,
              animation: 'spin 2s linear infinite',
              display: 'inline-block'
            }}>⏳</span>
          )}
        </h3>
        
        {/* Show Clear All button for completed/cancelled lists */}
        {onDeleteAll && (
          <button
            onClick={onDeleteAll}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              border: 'none',
              background: '#ffebee',
              color: '#d32f2f',
              cursor: 'pointer'
            }}
          >
            Clear All
          </button>
        )}
      </div>
      
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
        <thead>
          <tr>
            <th style={headerStyle}>Order ID</th>
            {showStatusUpdate && (
              <>
                <th style={headerStyle}>Customer</th>
                <th style={headerStyle}>Type</th>
                <th style={headerStyle}>Date Ordered</th>
                <th style={headerStyle}>Notes</th>
              </>
            )}
            <th style={headerStyle}>Items</th>
            <th style={{ ...headerStyle, textAlign: 'right' }}>Total</th>
            {showStatusUpdate ? (
              <th style={{ ...headerStyle, textAlign: 'center' }}>Action</th>
            ) : (
              <th style={{ ...headerStyle, textAlign: 'center' }}>Delete</th>
            )}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} style={{ 
              background: '#fff',
              transition: 'background 0.2s',
              '&:hover': { background: '#f5f5f5' }
            }}>
              <td style={cellStyle}>{order.id}</td>
              {showStatusUpdate && (
                <>
                  <td style={cellStyle}>{order.customerName}</td>
                  <td style={cellStyle}>{order.orderType}</td>
                  <td style={cellStyle}>
                    {new Date(order.dateOrdered).toLocaleString()}
                  </td>
                  <td style={cellStyle}>{order.notes}</td>
                </>
              )}
              <td style={cellStyle}>
                {order.items.map(item => (
                  `${item.quantity}x ${item.type}`
                )).join(', ')}
              </td>
              <td style={{ ...cellStyle, textAlign: 'right' }}>
                ₱{order.total.toFixed(2)}
              </td>
              {showStatusUpdate ? (
                <td style={{ ...cellStyle, textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                    <button
                      onClick={() => handleStatusUpdate(order.id, ORDER_STATUS.COMPLETED)}
                      style={{
                        padding: '4px 12px',
                        borderRadius: 12,
                        fontSize: 14,
                        fontWeight: 600,
                        border: 'none',
                        background: '#e8f5e9',
                        color: '#388e3c',
                        cursor: 'pointer'
                      }}
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(order.id, ORDER_STATUS.CANCELLED)}
                      style={{
                        padding: '4px 12px',
                        borderRadius: 12,
                        fontSize: 14,
                        fontWeight: 600,
                        border: 'none',
                        background: '#ffebee',
                        color: '#d32f2f',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              ) : (
                <td style={{ ...cellStyle, textAlign: 'center' }}>
                  <button
                    onClick={() => onDeleteOne(order.id)}
                    style={{
                      padding: '4px 12px',
                      borderRadius: 12,
                      fontSize: 14,
                      fontWeight: 600,
                      border: 'none',
                      background: '#ffebee',
                      color: '#d32f2f',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const handleDeleteCompleted = (orderId) => {
    setCompletedOrders(completedOrders.filter(order => order.id !== orderId));
  };

  const handleDeleteCancelled = (orderId) => {
    setCancelledOrders(cancelledOrders.filter(order => order.id !== orderId));
  };

  const handleClearCompleted = () => {
    setCompletedOrders([]);
  };

  const handleClearCancelled = () => {
    setCancelledOrders([]);
  };

  // Update the statistics count logic
  const getOrderCount = (status) => {
    switch (status) {
      case ORDER_STATUS.PENDING:
        return pendingOrders.length;
      case ORDER_STATUS.COMPLETED:
        return completedOrders.length;
      case ORDER_STATUS.CANCELLED:
        return cancelledOrders.length;
      default:
        return 0;
    }
  };

  return (
    <div style={{ minHeight: '80vh', padding: '32px', background: 'linear-gradient(120deg, #f7f7fa 0%, #e3eafc 100%)' }}>
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
        <span role="img" aria-label="Orders" style={{ fontSize: 38 }}>📋</span>
        Order Processing
      </h2>

      {/* Order Statistics Cards */}
      <div style={{ 
        display: 'flex', 
        gap: 24, 
        marginBottom: 32,
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {Object.values(ORDER_STATUS).map(status => (
          <div key={status} style={{
            background: '#fff',
            borderRadius: 16,
            padding: '20px 32px',
            minWidth: 200,
            boxShadow: '0 4px 24px rgba(44,62,80,0.08)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            flex: 1,
            maxWidth: 300,
            border: `1px solid ${statusStyles[status].background}`
          }}>
            <div style={{
              ...statusStyles[status],
              padding: '4px 12px',
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 600
            }}>{status}</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#2d3e50' }}>
              {getOrderCount(status)}
            </div>
            <div style={{ color: '#888', fontSize: 14 }}>Orders</div>
          </div>
        ))}
      </div>

      {/* New layout container */}
      <div style={{ 
        display: 'flex', 
        gap: 24,
        flexWrap: 'wrap'
      }}>
        {/* Left side - Pending Orders */}
        <div style={{ flex: '2 1 600px' }}>
          {/* Filter controls for pending orders */}
          {filters.status === 'all' && (
            <div style={{ marginBottom: 24 }}>
              {/* Add Filter Controls */}
              <div style={{
                background: '#fff',
                borderRadius: 18,
                padding: 24,
                marginBottom: 24,
                boxShadow: '0 4px 24px rgba(44,62,80,0.10)',
              }}>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                  {/* Search Input */}
                  <div style={{ flex: 2, minWidth: 200 }}>
                    <input
                      type="text"
                      placeholder="Search orders..."
                      value={filters.search}
                      onChange={e => setFilters({ ...filters, search: e.target.value })}
                      style={{
                        width: '80%',
                        padding: '10px 16px',
                        borderRadius: 8,
                        border: '1px solid #b0c4d8',
                        fontSize: 16
                      }}
                    />
                  </div>
                  
                  {/* Status Filter */}
                  <div style={{ flex: 1, minWidth: 150 }}>
                    <select
                      value={filters.status}
                      onChange={e => setFilters({ ...filters, status: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 16px',
                        borderRadius: 8,
                        border: '1px solid #b0c4d8',
                        fontSize: 16
                      }}
                    >
                      <option value="all">All Status</option>
                      {Object.values(ORDER_STATUS).map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>

                  {/* Order Type Filter */}
                  <div style={{ flex: 1, minWidth: 150 }}>
                    <select
                      value={filters.orderType}
                      onChange={e => setFilters({ ...filters, orderType: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 16px',
                        borderRadius: 8,
                        border: '1px solid #b0c4d8',
                        fontSize: 16
                      }}
                    >
                      <option value="all">All Types</option>
                      <option value="Pickup">Pickup</option>
                      <option value="Delivery">Delivery</option>
                      <option value="Dine-in">Dine-in</option>
                    </select>
                  </div>

                  {/* Date Range Filters */}
                  <div style={{ display: 'flex', gap: 8, flex: 2, minWidth: 300 }}>
                    
                    <input
                      type="date"
                      value={filters.dateRange.end}
                      onChange={e => setFilters({
                        ...filters,
                        dateRange: { ...filters.dateRange, end: e.target.value }
                      })}
                      style={{
                        flex: 1,
                        width: '50%',
                        padding: '10px 16px',
                        borderRadius: 8,
                        border: '1px solid #b0c4d8',
                        fontSize: 16
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pending Orders */}
          <OrderList 
            title="Pending Orders" 
            orders={pendingOrders} 
            showStatusUpdate={true} 
          />
        </div>

        {/* Right side - Completed and Cancelled Orders */}
        <div style={{ 
          flex: '1 1 400px',
          display: 'flex',
          flexDirection: 'column',
          gap: 24
        }}>
          {/* Completed Orders */}
          <OrderList 
            title="Completed Orders" 
            orders={completedOrders}
            onDeleteOne={handleDeleteCompleted}
            onDeleteAll={handleClearCompleted}
          />

          {/* Cancelled Orders */}
          <OrderList 
            title="Cancelled Orders" 
            orders={cancelledOrders}
            onDeleteOne={handleDeleteCancelled}
            onDeleteAll={handleClearCancelled}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderProcessing;
