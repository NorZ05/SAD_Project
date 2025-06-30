import React from 'react';

function QuickStatCard({ icon, label, value, trend, isWarning }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 16,
      padding: '24px',
      boxShadow: '0 4px 24px rgba(44,62,80,0.10)',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 24 }}>{icon}</span>
        <span style={{
          padding: '4px 12px',
          borderRadius: 12,
          fontSize: 14,
          fontWeight: 500,
          background: isWarning ? '#fff3e0' : '#e8f5e9',
          color: isWarning ? '#f57c00' : '#2e7d32'
        }}>{trend}</span>
      </div>
      <div>
        <h3 style={{ 
          fontSize: 28, 
          margin: 0, 
          color: '#2d3e50',
          fontWeight: 700
        }}>{value}</h3>
        <p style={{ 
          margin: '4px 0 0 0',
          color: '#64748b',
          fontSize: 14
        }}>{label}</p>
      </div>
    </div>
  );
}

export default QuickStatCard;