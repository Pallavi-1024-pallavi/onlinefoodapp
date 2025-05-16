import React, { useState, useEffect } from 'react';
import { 
  FiCoffee, FiPieChart, FiShoppingBag, FiEdit2, FiTrash2, 
  FiCheck, FiX, FiDollarSign, FiAlertTriangle, FiTrendingUp,
  FiUsers, FiClock, FiPackage, FiPlus
} from 'react-icons/fi';

const AdminDashboard = () => {
  // Mock data with enhanced status options
  const [orders, setOrders] = useState([
    { 
      id: '#1001', 
      customer: 'Rahul Sharma',
      items: '2 Chicken Burgers + 1 Fries', 
      amount: '₹480', 
      orderStatus: 'Preparing',
      paymentStatus: 'Paid (UPI)',
      time: 'Today, 12:45 PM',
      deliveryAddress: '123, Main Street, Bangalore'
    },
    { 
      id: '#1002', 
      customer: 'Priya Patel',
      items: '1 Margherita Pizza', 
      amount: '₹299', 
      orderStatus: 'Ready for Delivery',
      paymentStatus: 'Cash on Delivery',
      time: 'Today, 1:30 PM',
      deliveryAddress: '456, Park Avenue, Mumbai'
    },
    { 
      id: '#1003', 
      customer: 'Amit Singh',
      items: '3 Oreo Milkshakes', 
      amount: '₹330', 
      orderStatus: 'Delivered',
      paymentStatus: 'Paid (Card)',
      time: 'Today, 2:15 PM',
      deliveryAddress: '789, Oak Lane, Delhi'
    },
    { 
      id: '#1004', 
      customer: 'Neha Gupta',
      items: '1 Veg Burger + 1 Coke', 
      amount: '₹220', 
      orderStatus: 'Out for Delivery',
      paymentStatus: 'Paid (UPI)',
      time: 'Today, 3:00 PM',
      deliveryAddress: '321, Pine Road, Hyderabad'
    }
  ]);

  const [menu, setMenu] = useState([
    { 
      id: 'F001', 
      name: 'Chicken Burger', 
      price: '₹190', 
      cost: '₹80',
      stockStatus: 'In Stock',
      stockCount: 15,
      category: 'Burgers',
      popularity: 'High',
      lastUpdated: '2 hours ago'
    },
    { 
      id: 'F002', 
      name: 'Veg Pizza', 
      price: '₹299', 
      cost: '₹120',
      stockStatus: 'Low Stock (3 left)',
      stockCount: 3,
      category: 'Pizzas',
      popularity: 'High',
      lastUpdated: '1 hour ago'
    },
    { 
      id: 'F003', 
      name: 'Steam Momo (6pc)', 
      price: '₹120', 
      cost: '₹40',
      stockStatus: 'Out of Stock',
      stockCount: 0,
      category: 'Snacks',
      popularity: 'Medium',
      lastUpdated: '30 mins ago'
    },
    { 
      id: 'F004', 
      name: 'Oreo Milkshake', 
      price: '₹110', 
      cost: '₹35',
      stockStatus: 'In Stock',
      stockCount: 8,
      category: 'Beverages',
      popularity: 'High',
      lastUpdated: '45 mins ago'
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

  // Analytics data
  const [analytics, setAnalytics] = useState({
    todayRevenue: '₹5,420',
    weekRevenue: '₹38,760',
    monthRevenue: '₹1,52,890',
    activeOrders: 4,
    completedToday: 12,
    lowStockItems: 2,
    outOfStockItems: 1
  });

  // Edit states
  const [editingOrder, setEditingOrder] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    cost: '',
    category: '',
    stockCount: 0
  });
  const [showAddItem, setShowAddItem] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedTab, setSelectedTab] = useState('dashboard');

  // Styles
  const styles = {
    wrapper: {
      backgroundColor: '#121212',
      minHeight: '100vh',
      color: 'white',
      fontFamily: "'Poppins', sans-serif",
      display: 'flex'
    },
    sidebar: {
      width: '250px',
      backgroundColor: 'rgba(30, 30, 30, 0.9)',
      padding: '20px 0',
      borderRight: '1px solid rgba(255, 215, 0, 0.2)'
    },
    sidebarItem: {
      padding: '15px 25px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      transition: 'all 0.3s',
      borderLeft: '3px solid transparent'
    },
    sidebarItemActive: {
      backgroundColor: 'rgba(255, 215, 0, 0.1)',
      borderLeft: '3px solid #FFD700',
      color: '#FFD700'
    },
    mainContent: {
      flex: 1,
      padding: '20px'
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
    cardTitle: {
      color: '#FFD700',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
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
    textInput: {
      backgroundColor: '#333',
      color: 'white',
      border: '1px solid #FFD700',
      borderRadius: '4px',
      padding: '8px',
      width: '100%',
      marginBottom: '10px'
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
    },
    analyticsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    },
    analyticCard: {
      backgroundColor: 'rgba(30, 30, 30, 0.8)',
      borderRadius: '10px',
      padding: '20px',
      border: '1px solid rgba(255, 215, 0, 0.2)',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    },
    analyticValue: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#FFD700'
    },
    analyticLabel: {
      fontSize: '14px',
      color: 'rgba(255,255,255,0.7)',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    orderDetail: {
      backgroundColor: 'rgba(30, 30, 30, 0.8)',
      borderRadius: '10px',
      padding: '20px',
      marginBottom: '20px',
      border: '1px solid rgba(255, 215, 0, 0.2)'
    },
    detailRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
      paddingBottom: '10px',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    },
    detailLabel: {
      color: 'rgba(255,255,255,0.7)',
      fontWeight: '500'
    },
    detailValue: {
      color: 'white',
      fontWeight: '500'
    },
    alertBadge: {
      position: 'absolute',
      top: '-5px',
      right: '-5px',
      backgroundColor: '#F44336',
      color: 'white',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px'
    },
    addItemForm: {
      backgroundColor: 'rgba(30, 30, 30, 0.9)',
      borderRadius: '10px',
      padding: '20px',
      marginBottom: '20px',
      border: '1px dashed rgba(255, 215, 0, 0.5)'
    },
    formTitle: {
      color: '#FFD700',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    formActions: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px',
      marginTop: '15px'
    },
    primaryButton: {
      backgroundColor: '#FFD700',
      color: '#121212',
      border: 'none',
      borderRadius: '4px',
      padding: '10px 15px',
      cursor: 'pointer',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      color: '#FFD700',
      border: '1px solid #FFD700',
      borderRadius: '4px',
      padding: '10px 15px',
      cursor: 'pointer',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  };

  // Status colors
  const getStatusColor = (status) => {
    if (status.includes('Paid')) return { background: 'rgba(76, 175, 80, 0.2)', color: '#4CAF50' };
    if (status.includes('Out of Stock') || status.includes('Cancelled') || status.includes('Failed')) 
      return { background: 'rgba(244, 67, 54, 0.2)', color: '#F44336' };
    if (status.includes('Low Stock')) return { background: 'rgba(255, 193, 7, 0.2)', color: '#FFC107' };
    if (status.includes('Delivered')) return { background: 'rgba(76, 175, 80, 0.2)', color: '#4CAF50' };
    if (status.includes('Preparing') || status.includes('Pending')) 
      return { background: 'rgba(255, 152, 0, 0.2)', color: '#FF9800' };
    if (status.includes('Ready') || status.includes('Received')) 
      return { background: 'rgba(33, 150, 243, 0.2)', color: '#2196F3' };
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
    let stockCount = 0;
    if (newStatus === 'In Stock') stockCount = 10;
    if (newStatus === 'Low Stock (1-5 left)') stockCount = 3;
    
    setMenu(menu.map(item => 
      item.id === itemId ? { 
        ...item, 
        stockStatus: newStatus, 
        stockCount,
        lastUpdated: 'Just now' 
      } : item
    ));
    setEditingItem(null);
  };

  const handleDeleteItem = (itemId) => {
    setMenu(menu.filter(item => item.id !== itemId));
  };

  const handleAddItem = () => {
    const newId = `F${Math.floor(1000 + Math.random() * 9000)}`;
    let stockStatus = 'In Stock';
    if (newItem.stockCount <= 0) stockStatus = 'Out of Stock';
    else if (newItem.stockCount <= 5) stockStatus = 'Low Stock (1-5 left)';
    
    setMenu([...menu, {
      id: newId,
      name: newItem.name,
      price: `₹${newItem.price}`,
      cost: `₹${newItem.cost}`,
      stockStatus,
      stockCount: newItem.stockCount,
      category: newItem.category,
      popularity: 'New',
      lastUpdated: 'Just now'
    }]);
    
    setNewItem({
      name: '',
      price: '',
      cost: '',
      category: '',
      stockCount: 0
    });
    setShowAddItem(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Effect to update analytics based on data changes
  useEffect(() => {
    const lowStockCount = menu.filter(item => item.stockStatus.includes('Low Stock')).length;
    const outOfStockCount = menu.filter(item => item.stockStatus.includes('Out of Stock')).length;
    const activeOrdersCount = orders.filter(order => 
      !['Delivered', 'Cancelled'].includes(order.orderStatus)
    ).length;
    
    setAnalytics(prev => ({
      ...prev,
      lowStockItems: lowStockCount,
      outOfStockItems: outOfStockCount,
      activeOrders: activeOrdersCount
    }));
  }, [menu, orders]);

  // Render current tab
  const renderTab = () => {
    switch(selectedTab) {
      case 'dashboard':
        return (
          <>
            {/* Analytics Overview */}
            <div style={styles.analyticsGrid}>
              <div style={styles.analyticCard}>
                <div style={styles.analyticLabel}><FiDollarSign /> Today's Revenue</div>
                <div style={styles.analyticValue}>{analytics.todayRevenue}</div>
                <div style={{ fontSize: '12px', color: '#4CAF50' }}>+12% from yesterday</div>
              </div>
              <div style={styles.analyticCard}>
                <div style={styles.analyticLabel}><FiTrendingUp /> Weekly Revenue</div>
                <div style={styles.analyticValue}>{analytics.weekRevenue}</div>
                <div style={{ fontSize: '12px', color: '#4CAF50' }}>+8% from last week</div>
              </div>
              <div style={styles.analyticCard}>
                <div style={styles.analyticLabel}><FiUsers /> Active Orders</div>
                <div style={styles.analyticValue}>{analytics.activeOrders}</div>
                <div style={{ fontSize: '12px', color: '#FF9800' }}>In progress</div>
              </div>
              <div style={styles.analyticCard}>
                <div style={styles.analyticLabel}><FiAlertTriangle /> Stock Alerts</div>
                <div style={styles.analyticValue}>
                  {analytics.lowStockItems + analytics.outOfStockItems}
                  <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginLeft: '5px' }}>
                    ({analytics.outOfStockItems} out of stock)
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#F44336' }}>Attention needed</div>
              </div>
            </div>

            {/* Current Orders */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}><FiShoppingBag /> Current Orders</h2>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Order ID</th>
                    <th style={styles.th}>Customer</th>
                    <th style={styles.th}>Amount</th>
                    <th style={styles.th}>Order Status</th>
                    <th style={styles.th}>Payment</th>
                    <th style={styles.th}>Time</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} onClick={() => setSelectedOrder(order)} style={{ cursor: 'pointer' }}>
                      <td style={styles.td}>{order.id}</td>
                      <td style={styles.td}>{order.customer}</td>
                      <td style={styles.td}>{order.amount}</td>
                      <td style={styles.td}>
                        <span style={{...styles.statusBadge, ...getStatusColor(order.orderStatus)}}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <span style={{...styles.statusBadge, ...getStatusColor(order.paymentStatus)}}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td style={styles.td}>{order.time}</td>
                      <td style={styles.td}>
                        <div style={styles.actionButtons}>
                          <FiEdit2 
                            style={styles.editBtn} 
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingOrder(`${order.id}-order`);
                            }} 
                            title="Edit Order"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Low Stock Items */}
            {analytics.lowStockItems > 0 && (
              <div style={styles.card}>
                <h2 style={styles.cardTitle}><FiAlertTriangle /> Low Stock Alerts</h2>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Item</th>
                      <th style={styles.th}>Category</th>
                      <th style={styles.th}>Price</th>
                      <th style={styles.th}>Stock Status</th>
                      <th style={styles.th}>Last Updated</th>
                      <th style={styles.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menu.filter(item => item.stockStatus.includes('Low Stock') || item.stockStatus.includes('Out of Stock')).map(item => (
                      <tr key={item.id}>
                        <td style={styles.td}>{item.name}</td>
                        <td style={styles.td}>{item.category}</td>
                        <td style={styles.td}>{item.price}</td>
                        <td style={styles.td}>
                          <span style={{...styles.statusBadge, ...getStatusColor(item.stockStatus)}}>
                            {item.stockStatus}
                          </span>
                        </td>
                        <td style={styles.td}>{item.lastUpdated}</td>
                        <td style={styles.td}>
                          <FiEdit2 
                            style={styles.editBtn} 
                            onClick={() => setEditingItem(item.id)} 
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        );
      case 'orders':
        return (
          <>
            <div style={styles.card}>
              <h2 style={styles.cardTitle}><FiShoppingBag /> All Orders</h2>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Order ID</th>
                    <th style={styles.th}>Customer</th>
                    <th style={styles.th}>Items</th>
                    <th style={styles.th}>Amount</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Payment</th>
                    <th style={styles.th}>Time</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td style={styles.td}>{order.id}</td>
                      <td style={styles.td}>{order.customer}</td>
                      <td style={styles.td}>{order.items}</td>
                      <td style={styles.td}>{order.amount}</td>
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
          </>
        );
      case 'menu':
        return (
          <>
            <div style={styles.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={styles.cardTitle}><FiPieChart /> Menu Inventory</h2>
                <button 
                  style={styles.primaryButton}
                  onClick={() => setShowAddItem(!showAddItem)}
                >
                  <FiPlus /> Add New Item
                </button>
              </div>

              {showAddItem && (
                <div style={styles.addItemForm}>
                  <h3 style={styles.formTitle}>Add New Menu Item</h3>
                  <input
                    type="text"
                    name="name"
                    placeholder="Item Name"
                    value={newItem.name}
                    onChange={handleInputChange}
                    style={styles.textInput}
                  />
                  <input
                    type="text"
                    name="price"
                    placeholder="Selling Price (₹)"
                    value={newItem.price}
                    onChange={handleInputChange}
                    style={styles.textInput}
                  />
                  <input
                    type="text"
                    name="cost"
                    placeholder="Cost Price (₹)"
                    value={newItem.cost}
                    onChange={handleInputChange}
                    style={styles.textInput}
                  />
                  <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={newItem.category}
                    onChange={handleInputChange}
                    style={styles.textInput}
                  />
                  <input
                    type="number"
                    name="stockCount"
                    placeholder="Initial Stock Count"
                    value={newItem.stockCount}
                    onChange={handleInputChange}
                    style={styles.textInput}
                  />
                  <div style={styles.formActions}>
                    <button 
                      style={styles.secondaryButton}
                      onClick={() => setShowAddItem(false)}
                    >
                      <FiX /> Cancel
                    </button>
                    <button 
                      style={styles.primaryButton}
                      onClick={handleAddItem}
                      disabled={!newItem.name || !newItem.price || !newItem.category}
                    >
                      <FiCheck /> Add Item
                    </button>
                  </div>
                </div>
              )}

              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Item</th>
                    <th style={styles.th}>Category</th>
                    <th style={styles.th}>Price</th>
                    <th style={styles.th}>Cost</th>
                    <th style={styles.th}>Profit</th>
                    <th style={styles.th}>Stock</th>
                    <th style={styles.th}>Popularity</th>
                    <th style={styles.th}>Updated</th>
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
                      <td style={styles.td}>{item.cost}</td>
                      <td style={styles.td}>
                        {parseInt(item.price.replace('₹', '')) - parseInt(item.cost.replace('₹', ''))}
                      </td>
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
                      <td style={styles.td}>
                        <span style={{
                          ...styles.statusBadge,
                          ...(item.popularity === 'High' ? 
                            { background: 'rgba(76, 175, 80, 0.2)', color: '#4CAF50' } :
                            item.popularity === 'Medium' ? 
                            { background: 'rgba(255, 193, 7, 0.2)', color: '#FFC107' } :
                            { background: 'rgba(158, 158, 158, 0.2)', color: '#9E9E9E' })
                        }}>
                          {item.popularity}
                        </span>
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
                          <>
                            <FiEdit2 
                              style={styles.editBtn} 
                              onClick={() => setEditingItem(item.id)} 
                            />
                            <FiTrash2 
                              style={styles.deleteBtn} 
                              onClick={() => handleDeleteItem(item.id)} 
                            />
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div 
          style={{
            ...styles.sidebarItem,
            ...(selectedTab === 'dashboard' ? styles.sidebarItemActive : {})
          }}
          onClick={() => setSelectedTab('dashboard')}
        >
          <FiPieChart /> Dashboard
        </div>
        <div 
          style={{
            ...styles.sidebarItem,
            ...(selectedTab === 'orders' ? styles.sidebarItemActive : {})
          }}
          onClick={() => setSelectedTab('orders')}
        >
          <FiShoppingBag /> Orders
          {analytics.activeOrders > 0 && (
            <span style={styles.alertBadge}>{analytics.activeOrders}</span>
          )}
        </div>
        <div 
          style={{
            ...styles.sidebarItem,
            ...(selectedTab === 'menu' ? styles.sidebarItemActive : {})
          }}
          onClick={() => setSelectedTab('menu')}
        >
          <FiCoffee /> Menu
          {(analytics.lowStockItems + analytics.outOfStockItems) > 0 && (
            <span style={styles.alertBadge}>{analytics.lowStockItems + analytics.outOfStockItems}</span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>
            {selectedTab === 'dashboard' && <><FiPieChart /> Dashboard Overview</>}
            {selectedTab === 'orders' && <><FiShoppingBag /> Order Management</>}
            {selectedTab === 'menu' && <><FiCoffee /> Menu Management</>}
          </h1>
          <div style={{ color: '#FFD700' }}>Last updated: Today, {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
        </div>

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div style={styles.orderDetail}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ color: '#FFD700' }}>Order Details: {selectedOrder.id}</h3>
              <FiX 
                style={{ cursor: 'pointer', color: '#F44336' }} 
                onClick={() => setSelectedOrder(null)} 
              />
            </div>
            
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Customer:</span>
              <span style={styles.detailValue}>{selectedOrder.customer}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Items:</span>
              <span style={styles.detailValue}>{selectedOrder.items}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Order Amount:</span>
              <span style={styles.detailValue}>{selectedOrder.amount}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Order Status:</span>
              <span style={{...styles.detailValue, ...getStatusColor(selectedOrder.orderStatus)}}>
                {selectedOrder.orderStatus}
              </span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Payment Status:</span>
              <span style={{...styles.detailValue, ...getStatusColor(selectedOrder.paymentStatus)}}>
                {selectedOrder.paymentStatus}
              </span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Delivery Address:</span>
              <span style={styles.detailValue}>{selectedOrder.deliveryAddress}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Order Time:</span>
              <span style={styles.detailValue}>{selectedOrder.time}</span>
            </div>
          </div>
        )}

        {/* Render current tab content */}
        {renderTab()}
      </div>
    </div>
  );
};

export default AdminDashboard;