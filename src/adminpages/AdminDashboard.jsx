import React, { useState } from 'react';
import { FiCoffee, FiPieChart, FiShoppingBag, FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

const AdminDashboard = () => {
  // Mock food data with enhanced status options
  const [orders, setOrders] = useState([
    { 
      id: '#1001', 
      items: '2 Chicken Burgers + 1 Fries', 
      amount: '₹480', 
      orderStatus: 'Preparing',
      paymentStatus: 'Paid (UPI)',
      time: 'Today, 12:45 PM' 
    },
    { 
      id: '#1002', 
      items: '1 Margherita Pizza', 
      amount: '₹299', 
      orderStatus: 'Ready for Delivery',
      paymentStatus: 'Cash on Delivery',
      time: 'Today, 1:30 PM' 
    },
    { 
      id: '#1003', 
      items: '3 Oreo Milkshakes', 
      amount: '₹330', 
      orderStatus: 'Delivered',
      paymentStatus: 'Paid (Card)',
      time: 'Today, 2:15 PM' 
    }
  ]);

  const [menu, setMenu] = useState([
    { 
      id: 'F001', 
      name: 'Chicken Burger', 
      price: '₹190', 
      stockStatus: 'In Stock',
      category: 'Burgers',
      lastUpdated: '2 hours ago'
    },
    { 
      id: 'F002', 
      name: 'Veg Pizza', 
      price: '₹299', 
      stockStatus: 'Low Stock (3 left)',
      category: 'Pizzas',
      lastUpdated: '1 hour ago'
    },
    { 
      id: 'F003', 
      name: 'Steam Momo (6pc)', 
      price: '₹120', 
      stockStatus: 'Out of Stock',
      category: 'Snacks',
      lastUpdated: '30 mins ago'
    }
  ]);

  // Status options
  const orderStatusOptions = [
    'Received', 'Preparing', 'Ready for Delivery', 'Out for Delivery', 'Delivered', 'Cancelled'
  ];
  
  const paymentStatusOptions = [
    'Pending', 'Paid (Cash)', 'Paid (Card)', 'Paid (UPI)', 'Failed', 'Refunded'
  ];
  
  const stockStatusOptions = [
    'In Stock', 'Low Stock (1-5 left)', 'Out of Stock', 'Discontinued'
  ];

  // Edit states
  const [editingOrder, setEditingOrder] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  // Styles
  const styles = {
    wrapper: {
      backgroundColor: '#121212',
      minHeight: '100vh',
      color: 'white',
      padding: '20px',
      fontFamily: "'Poppins', sans-serif"
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      borderBottom: '1px solid rgba(255, 215, 0, 0.3)',
      paddingBottom: '15px'
    },
    title: {
      color: '#FFD700',
      fontSize: '28px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    card: {
      backgroundColor: 'rgba(30, 30, 30, 0.8)',
      borderRadius: '10px',
      padding: '20px',
      marginBottom: '30px',
      border: '1px solid rgba(255, 215, 0, 0.2)'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '15px'
    },
    th: {
      padding: '12px',
      textAlign: 'left',
      borderBottom: '2px solid #FFD700',
      color: '#FFD700'
    },
    td: {
      padding: '12px',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    },
    statusBadge: {
      padding: '5px 10px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '500',
      display: 'inline-block',
      minWidth: '120px',
      textAlign: 'center'
    },
    editBtn: {
      color: '#FFD700',
      cursor: 'pointer',
      marginRight: '10px'
    },
    deleteBtn: {
      color: '#ff6b6b',
      cursor: 'pointer'
    },
    selectInput: {
      backgroundColor: '#333',
      color: 'white',
      border: '1px solid #FFD700',
      borderRadius: '4px',
      padding: '8px',
      width: '100%'
    },
    actionButtons: {
      display: 'flex',
      gap: '10px'
    },
    saveBtn: {
      color: '#4CAF50',
      cursor: 'pointer'
    },
    cancelBtn: {
      color: '#F44336',
      cursor: 'pointer'
    }
  };

  // Status colors
  const getStatusColor = (status) => {
    if (status.includes('Paid')) return { background: 'rgba(76, 175, 80, 0.2)', color: '#4CAF50' };
    if (status.includes('Out of Stock') || status.includes('Cancelled')) return { background: 'rgba(244, 67, 54, 0.2)', color: '#F44336' };
    if (status.includes('Low Stock')) return { background: 'rgba(255, 193, 7, 0.2)', color: '#FFC107' };
    if (status.includes('Delivered')) return { background: 'rgba(76, 175, 80, 0.2)', color: '#4CAF50' };
    if (status.includes('Preparing') || status.includes('Pending')) return { background: 'rgba(255, 152, 0, 0.2)', color: '#FF9800' };
    return { background: 'rgba(158, 158, 158, 0.2)', color: '#9E9E9E' };
  };

  // Handlers
  const handleOrderStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, orderStatus: newStatus } : order
    ));
    setEditingOrder(null);
  };

  const handlePaymentStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, paymentStatus: newStatus } : order
    ));
    setEditingOrder(null);
  };

  const handleStockStatusChange = (itemId, newStatus) => {
    setMenu(menu.map(item => 
      item.id === itemId ? { ...item, stockStatus: newStatus, lastUpdated: 'Just now' } : item
    ));
    setEditingItem(null);
  };

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}><FiCoffee /> Snack SprintAdmin Dashboard</h1>
        <div style={{ color: '#FFD700' }}>Last updated: Today, 3:45 PM</div>
      </div>

      {/* Current Orders */}
      <div style={styles.card}>
        <h2 style={{ color: '#FFD700', marginBottom: '15px' }}><FiShoppingBag /> Current Orders</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Order ID</th>
              <th style={styles.th}>Items</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Order Status</th>
              <th style={styles.th}>Payment Status</th>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td style={styles.td}>{order.id}</td>
                <td style={styles.td}>{order.items}</td>
                <td style={styles.td}>{order.amount}</td>
                
                {/* Order Status */}
                <td style={styles.td}>
                  {editingOrder === `${order.id}-order` ? (
                    <select 
                      defaultValue={order.orderStatus}
                      style={styles.selectInput}
                      onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}
                    >
                      {orderStatusOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <span style={{...styles.statusBadge, ...getStatusColor(order.orderStatus)}}>
                      {order.orderStatus}
                    </span>
                  )}
                </td>
                
                {/* Payment Status */}
                <td style={styles.td}>
                  {editingOrder === `${order.id}-payment` ? (
                    <select 
                      defaultValue={order.paymentStatus}
                      style={styles.selectInput}
                      onChange={(e) => handlePaymentStatusChange(order.id, e.target.value)}
                    >
                      {paymentStatusOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <span style={{...styles.statusBadge, ...getStatusColor(order.paymentStatus)}}>
                      {order.paymentStatus}
                    </span>
                  )}
                </td>
                
                <td style={styles.td}>{order.time}</td>
                <td style={styles.td}>
                  {editingOrder ? (
                    <div style={styles.actionButtons}>
                      <FiCheck 
                        style={styles.saveBtn} 
                        onClick={() => setEditingOrder(null)} 
                      />
                      <FiX 
                        style={styles.cancelBtn} 
                        onClick={() => setEditingOrder(null)} 
                      />
                    </div>
                  ) : (
                    <div style={styles.actionButtons}>
                      <FiEdit2 
                        style={styles.editBtn} 
                        onClick={() => setEditingOrder(`${order.id}-order`)} 
                        title="Edit Order Status"
                      />
                      <FiEdit2 
                        style={styles.editBtn} 
                        onClick={() => setEditingOrder(`${order.id}-payment`)} 
                        title="Edit Payment Status"
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Menu Management */}
      <div style={styles.card}>
        <h2 style={{ color: '#FFD700', marginBottom: '15px' }}><FiPieChart /> Menu Inventory</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Item</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Stock Status</th>
              <th style={styles.th}>Last Updated</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {menu.map(item => (
              <tr key={item.id}>
                <td style={styles.td}>{item.id}</td>
                <td style={styles.td}>{item.name}</td>
                <td style={styles.td}>{item.category}</td>
                <td style={styles.td}>{item.price}</td>
                
                {/* Stock Status */}
                <td style={styles.td}>
                  {editingItem === item.id ? (
                    <select 
                      defaultValue={item.stockStatus}
                      style={styles.selectInput}
                      onChange={(e) => handleStockStatusChange(item.id, e.target.value)}
                    >
                      {stockStatusOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <span style={{...styles.statusBadge, ...getStatusColor(item.stockStatus)}}>
                      {item.stockStatus}
                    </span>
                  )}
                </td>
                
                <td style={styles.td}>{item.lastUpdated}</td>
                <td style={styles.td}>
                  {editingItem === item.id ? (
                    <div style={styles.actionButtons}>
                      <FiCheck 
                        style={styles.saveBtn} 
                        onClick={() => setEditingItem(null)} 
                      />
                      <FiX 
                        style={styles.cancelBtn} 
                        onClick={() => setEditingItem(null)} 
                      />
                    </div>
                  ) : (
                    <FiEdit2 
                      style={styles.editBtn} 
                      onClick={() => setEditingItem(item.id)} 
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;