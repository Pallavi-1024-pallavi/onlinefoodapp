import React from 'react';

const BurgerButtons = ({ addToCart }) => {
  const burgers = [
    {
      name: 'Chicken Burger',
      price: 120,
      image:
        'https://img.freepik.com/premium-photo/tasty-grilled-chicken-burger-with-fresh-vegetables-generative-ai_97167-1874.jpg',
    },
    {
      name: 'Veg Burger',
      price: 100,
      image:
        'https://img.freepik.com/free-photo/front-view-veggie-burgers-with-fresh-vegetables-dark-background-meal-fast-food-burger-snack_140725-108339.jpg',
    },
    {
      name: 'Cheese Burger',
      price: 150,
      image:
        'https://img.freepik.com/premium-photo/cheeseburger-with-salad-tomatoes-generative-ai_58409-27247.jpg',
    },
  ];

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
  };

  const cardStyle = {
    width: '220px',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
    padding: '15px',
  };

  const imgStyle = {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    borderRadius: '10px',
  };

  return (
    <div style={containerStyle}>
      {burgers.map((burger, index) => (
        <div key={index} style={cardStyle}>
          <img src={burger.image} alt={burger.name} style={imgStyle} />
          <h3>{burger.name}</h3>
          <p>₹{burger.price}</p>
          <button onClick={() => addToCart(burger)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default BurgerButtons;
