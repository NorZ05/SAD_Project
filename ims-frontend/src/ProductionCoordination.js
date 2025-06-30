import React, { useState } from 'react';

function ProductionCoordination() {
  // Production status types
  const PRODUCTION_STATUS = {
    PENDING: 'Pending',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed'
  };

  // Staff list
  const STAFF = {
    HEAD_BAKERS: ['Maria Santos', 'Juan Dela Cruz'],
    KITCHEN_STAFF: ['Ana Garcia', 'Pedro Reyes', 'Carmen Torres', 'Miguel Cruz']
  };

  // States
  const [productionSchedule, setProductionSchedule] = useState([
    {
      id: 'ORD-001',
      startTime: '09:00',
      estimatedCompletion: '09:45',
      headBaker: 'Maria Santos',
      kitchenStaff: ['Ana Garcia', 'Pedro Reyes'],
      type: 'Regular',
      quantity: 50,
      status: PRODUCTION_STATUS.IN_PROGRESS,
      notes: 'Morning batch'
    },
    {
      id: 'ORD-002',
      startTime: '10:00',
      estimatedCompletion: '10:30',
      headBaker: 'Juan Dela Cruz',
      kitchenStaff: ['Carmen Torres'],
      type: 'Special',
      quantity: 30,
      status: PRODUCTION_STATUS.PENDING,
      notes: 'Priority order'
    }
  ]);

  const [showNewScheduleForm, setShowNewScheduleForm] = useState(false);

  // New schedule form state
  const [newSchedule, setNewSchedule] = useState({
    type: 'Regular',
    quantity: '',
    startTime: '',
    estimatedCompletion: '',
    headBaker: '',
    kitchenStaff: [],
    notes: ''
  });

  // Status badge styles
  const getStatusStyle = (status) => ({
    padding: '4px 12px',
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 600,
    ...(status === PRODUCTION_STATUS.PENDING && {
      background: '#fff3e0',
      color: '#e65100'
    }),
    ...(status === PRODUCTION_STATUS.IN_PROGRESS && {
      background: '#e3f2fd',
      color: '#1976d2'
    }),
    ...(status === PRODUCTION_STATUS.COMPLETED && {
      background: '#e8f5e9',
      color: '#2e7d32'
    })
  });

  // Update the cellStyle constant with better text handling
  const cellStyle = {
    border: '1px solid #e0e0e0',
    padding: '12px 16px',
    height: '60px',
    verticalAlign: 'middle',
    fontSize: '14px',
    lineHeight: '1.4',
    color: '#2d3e50',
    // Update text overflow handling
    whiteSpace: 'normal',
    maxWidth: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    // Add hover effect to show full content
    position: 'relative',
    '&:hover': {
      overflow: 'visible',
      whiteSpace: 'normal',
      height: 'auto',
      minHeight: '60px'
    }
  };

  // Add specific column widths for different types of content
  const columnStyles = {
    id: { ...cellStyle, width: '120px', minWidth: '120px' },
    type: { ...cellStyle, width: '100px', minWidth: '100px' },
    quantity: { ...cellStyle, width: '80px', minWidth: '80px' },
    time: { ...cellStyle, width: '100px', minWidth: '100px' },
    status: { ...cellStyle, width: '120px', minWidth: '120px' },
    staff: { ...cellStyle, width: '180px', minWidth: '180px' },
    actions: { ...cellStyle, width: '100px', minWidth: '100px' }
  };

  // Add handlers for status updates
  const handleStatusUpdate = (id, newStatus) => {
    setProductionSchedule(schedules => 
      schedules.map(schedule => 
        schedule.id === id 
          ? { ...schedule, status: newStatus }
          : schedule
      )
    );
  };

  // Add handler for new schedule
  const handleAddSchedule = () => {
    const schedule = {
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
      ...newSchedule,
      status: PRODUCTION_STATUS.PENDING
    };

    setProductionSchedule([...productionSchedule, schedule]);
    setNewSchedule({
      type: 'Regular',
      quantity: '',
      startTime: '',
      estimatedCompletion: '',
      headBaker: '',
      kitchenStaff: [],
      notes: ''
    });
    setShowNewScheduleForm(false);
  };

  // Add search and filter states
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    type: 'all',
    date: ''
  });

  // Add the New Schedule Form component
  const NewScheduleForm = () => (
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
        maxWidth: 600,
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <h3 style={{ marginBottom: 24, color: '#2d3e50', fontWeight: 700 }}>
          New Production Schedule
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 8, color: '#2d3e50', fontWeight: 600 }}>
              Type
            </label>
            <select
              value={newSchedule.type}
              onChange={e => setNewSchedule({ ...newSchedule, type: e.target.value })}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid #e0e0e0'
              }}
            >
              <option value="Regular">Regular Siopao</option>
              <option value="Special">Special Siopao</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, color: '#2d3e50', fontWeight: 600 }}>
              Quantity
            </label>
            <input
              type="number"
              value={newSchedule.quantity}
              onChange={e => setNewSchedule({ ...newSchedule, quantity: e.target.value })}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid #e0e0e0'
              }}
              placeholder="Enter quantity"
            />
          </div>

          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: 8, color: '#2d3e50', fontWeight: 600 }}>
                Start Time
              </label>
              <input
                type="time"
                value={newSchedule.startTime}
                onChange={e => setNewSchedule({ ...newSchedule, startTime: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: 8,
                  border: '1px solid #e0e0e0'
                }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: 8, color: '#2d3e50', fontWeight: 600 }}>
                Estimated Completion
              </label>
              <input
                type="time"
                value={newSchedule.estimatedCompletion}
                onChange={e => setNewSchedule({ ...newSchedule, estimatedCompletion: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: 8,
                  border: '1px solid #e0e0e0'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, color: '#2d3e50', fontWeight: 600 }}>
              Head Baker
            </label>
            <select
              value={newSchedule.headBaker}
              onChange={e => setNewSchedule({ ...newSchedule, headBaker: e.target.value })}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid #e0e0e0'
              }}
            >
              <option value="">Select Head Baker</option>
              {STAFF.HEAD_BAKERS.map(baker => (
                <option key={baker} value={baker}>{baker}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, color: '#2d3e50', fontWeight: 600 }}>
              Kitchen Staff
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {STAFF.KITCHEN_STAFF.map(staff => (
                <label key={staff} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '4px 8px',
                  background: '#f7f7fa',
                  borderRadius: 4
                }}>
                  <input
                    type="checkbox"
                    checked={newSchedule.kitchenStaff.includes(staff)}
                    onChange={e => {
                      const staffList = e.target.checked
                        ? [...newSchedule.kitchenStaff, staff]
                        : newSchedule.kitchenStaff.filter(s => s !== staff);
                      setNewSchedule({ ...newSchedule, kitchenStaff: staffList });
                    }}
                  />
                  {staff}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, color: '#2d3e50', fontWeight: 600 }}>
              Notes
            </label>
            <textarea
              value={newSchedule.notes}
              onChange={e => setNewSchedule({ ...newSchedule, notes: e.target.value })}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid #e0e0e0',
                minHeight: 80,
                resize: 'vertical'
              }}
              placeholder="Add any additional notes"
            />
          </div>

          <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
            <button
              onClick={() => setShowNewScheduleForm(false)}
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
              onClick={handleAddSchedule}
              disabled={!newSchedule.type || !newSchedule.quantity || !newSchedule.headBaker}
              style={{
                flex: 1,
                padding: '12px',
                border: 'none',
                borderRadius: 8,
                background: '#4a90e2',
                color: '#fff',
                cursor: 'pointer',
                opacity: (!newSchedule.type || !newSchedule.quantity || !newSchedule.headBaker) ? 0.5 : 1
              }}
            >
              Add Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Add this function before the return statement
  const getFilteredSchedule = () => {
    return productionSchedule.filter(schedule => {
      // Filter by search text
      const searchMatch = 
        schedule.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        schedule.headBaker.toLowerCase().includes(filters.search.toLowerCase()) ||
        schedule.notes.toLowerCase().includes(filters.search.toLowerCase()) ||
        schedule.kitchenStaff.some(staff => 
          staff.toLowerCase().includes(filters.search.toLowerCase())
        );

      // Filter by status
      const statusMatch = 
        filters.status === 'all' || schedule.status === filters.status;

      // Filter by type
      const typeMatch = 
        filters.type === 'all' || schedule.type === filters.type;

      // Filter by date (assuming we format the date from schedule time)
      const scheduleDate = schedule.startTime.split('T')[0];
      const dateMatch = 
        !filters.date || scheduleDate === filters.date;

      return searchMatch && statusMatch && typeMatch && dateMatch;
    });
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
        <span role="img" aria-label="production" style={{ fontSize: 38 }}>👨‍🍳</span>
        Production
      </h2>

      {/* Production Stats */}
      <div style={{ 
        display: 'flex', 
        gap: 24, 
        marginBottom: 32,
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {Object.values(PRODUCTION_STATUS).map(status => (
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
            maxWidth: 300
          }}>
            <div style={getStatusStyle(status)}>{status}</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#2d3e50' }}>
              {getFilteredSchedule().filter(schedule => schedule.status === status).length}
            </div>
            <div style={{ color: '#888', fontSize: 14 }}>Orders</div>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div style={{
        background: '#fff',
        borderRadius: 18,
        padding: 24,
        marginBottom: 24,
        boxShadow: '0 4px 24px rgba(44,62,80,0.10)'
      }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 2, minWidth: 200 }}>
            <input
              type="text"
              placeholder="Search schedules..."
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
              {Object.values(PRODUCTION_STATUS).map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div style={{ flex: 1, minWidth: 150 }}>
            <select
              value={filters.type}
              onChange={e => setFilters({ ...filters, type: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 16px',
                borderRadius: 8,
                border: '1px solid #b0c4d8',
                fontSize: 16
              }}
            >
              <option value="all">All Types</option>
              <option value="Regular">Regular</option>
              <option value="Special">Special</option>
            </select>
          </div>

          <div style={{ flex: 1, minWidth: 100 }}>
            <input
              type="date"
              value={filters.date}
              onChange={e => setFilters({ ...filters, date: e.target.value })}
              style={{
                width: '40%',
                padding: '10px 16px',
                borderRadius: 8,
                border: '1px solid #b0c4d8',
                fontSize: 16
              }}
            />
          </div>
        </div>

        {/* Add this after the filter inputs */}
        <div style={{ marginLeft: 'auto', paddingTop: 8 }}>
          <button
            onClick={() => setFilters({
              search: '',
              status: 'all',
              type: 'all',
              date: ''
            })}
            style={{
              padding: '8px 16px',
              background: '#f0f0f0',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              color: '#666',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <span>🔄</span>
            Clear Filters
          </button>
        </div>
      </div>

      {/* Schedule Table */}
      <div style={{ 
        background: '#fff',
        borderRadius: 18,
        padding: 28,
        boxShadow: '0 4px 24px rgba(44,62,80,0.10)',
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
            margin: 0
          }}>Production Schedule</h3>
          
          <button
            onClick={() => setShowNewScheduleForm(true)}
            style={{
              padding: '8px 16px',
              background: '#4a90e2',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <span>➕</span>
            Produce
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f7f7fa' }}>
                <th style={columnStyles.id}>Order ID</th>
                <th style={columnStyles.type}>Type</th>
                <th style={columnStyles.quantity}>Quantity</th>
                <th style={columnStyles.time}>Start Time</th>
                <th style={columnStyles.time}>Est. Completion</th>
                <th style={columnStyles.status}>Status</th>
                <th style={columnStyles.staff}>Head Baker</th>
                <th style={columnStyles.staff}>Kitchen Staff</th>
                <th style={columnStyles.actions}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredSchedule().length === 0 ? (
                <tr>
                  <td 
                    colSpan="9" 
                    style={{
                      textAlign: 'center',
                      padding: '32px',
                      color: '#666'
                    }}
                  >
                    <div style={{ fontSize: 24, marginBottom: 8 }}>🔍</div>
                    No schedules match your filters
                  </td>
                </tr>
              ) : (
                getFilteredSchedule().map(schedule => (
                  <tr key={schedule.id}>
                    <td style={columnStyles.id}>{schedule.id}</td>
                    <td style={columnStyles.type}>{schedule.type}</td>
                    <td style={columnStyles.quantity}>{schedule.quantity}</td>
                    <td style={columnStyles.time}>{schedule.startTime}</td>
                    <td style={columnStyles.time}>{schedule.estimatedCompletion}</td>
                    <td style={columnStyles.status}>
                      <div style={getStatusStyle(schedule.status)}>
                        {schedule.status}
                      </div>
                    </td>
                    <td style={columnStyles.staff}>{schedule.headBaker}</td>
                    <td style={columnStyles.staff}>
                      <div style={{ 
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {schedule.kitchenStaff.join(', ')}
                      </div>
                    </td>
                    <td style={columnStyles.actions}>
                      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                        {schedule.status === PRODUCTION_STATUS.PENDING && (
                          <button
                            onClick={() => handleStatusUpdate(schedule.id, PRODUCTION_STATUS.IN_PROGRESS)}
                            style={{
                              padding: '4px 8px',
                              background: '#4a90e2',
                              color: '#fff',
                              border: 'none',
                              borderRadius: 4,
                              cursor: 'pointer'
                            }}
                          >
                            Start
                          </button>
                        )}
                        {schedule.status === PRODUCTION_STATUS.IN_PROGRESS && (
                          <button
                            onClick={() => handleStatusUpdate(schedule.id, PRODUCTION_STATUS.COMPLETED)}
                            style={{
                              padding: '4px 8px',
                              background: '#4caf50',
                              color: '#fff',
                              border: 'none',
                              borderRadius: 4,
                              cursor: 'pointer'
                            }}
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showNewScheduleForm && <NewScheduleForm />}
    </div>
  );
}

export default ProductionCoordination;
