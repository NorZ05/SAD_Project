import React from 'react';

function ProductionTimeline() {
  const productionSchedule = [
    { time: '08:00', task: 'Morning Batch', quantity: '100 pcs', status: 'completed' },
    { time: '11:00', task: 'Pre-Lunch Batch', quantity: '150 pcs', status: 'in-progress' },
    { time: '14:00', task: 'Afternoon Batch', quantity: '100 pcs', status: 'pending' },
    { time: '16:00', task: 'Evening Batch', quantity: '100 pcs', status: 'pending' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {productionSchedule.map((item, idx) => (
        <div key={item.time} style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 16px',
          background: idx % 2 === 0 ? '#f8fafc' : '#fff',
          borderRadius: 8,
          gap: 16
        }}>
          <div style={{ 
            width: 8, 
            height: 8, 
            borderRadius: '50%',
            background: item.status === 'completed' ? '#4caf50' 
              : item.status === 'in-progress' ? '#2196f3' 
              : '#9e9e9e'
          }} />
          <div style={{ width: 80 }}>{item.time}</div>
          <div style={{ flex: 1 }}>{item.task}</div>
          <div style={{ color: '#64748b' }}>{item.quantity}</div>
        </div>
      ))}
    </div>
  );
}

export default ProductionTimeline;