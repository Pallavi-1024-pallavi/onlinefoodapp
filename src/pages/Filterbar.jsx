import React, { useState } from 'react';

const FilterBar = () => {
  const [filter, setFilter] = useState('');

  const handleSelect = (e) => {
    setFilter(e.target.value);
    console.log('Selected filter:', e.target.value);
  };

  const handleClick = (type) => {
    console.log(`${type} clicked`);
  };

  return (
    <div style={styles.container}>
      <select style={styles.dropdown} value={filter} onChange={handleSelect}>
        <option value="">🔽 Filter</option>
        <option value="rating">⭐ Rating</option>
        <option value="price_low_high">💰 Price: Low to High</option>
        <option value="price_high_low">💸 Price: High to Low</option>
      </select>

      <button style={styles.button} onClick={() => handleClick('Offers')}>💥 Offers</button>
      <button style={styles.button} onClick={() => handleClick('Veg')}>🟢 Veg</button>
      <button style={styles.button} onClick={() => handleClick('NonVeg')}>🔴 Non-Veg</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '30px',
  },
  dropdown: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid yellow',
    backgroundColor: '#000',
    color: 'yellow',
    fontSize: '16px',
  },
  button: {
    padding: '10px 16px',
    borderRadius: '5px',
    border: '1px solid yellow',
    backgroundColor: '#000',
    color: 'yellow',
    fontSize: '16px',
    cursor: 'pointer',
  }
};

export default FilterBar;
