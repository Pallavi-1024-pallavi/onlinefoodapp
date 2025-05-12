import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const handleOrderClick = () => {
    setShowOptions(true);
  };

  const handleChoice = (path) => {
    navigate(path);
  };

  return (
    <div style={{
      backgroundColor: '#000',
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      {/* Left Section - Text */}
      <div style={{
        flex: 1,
        minWidth: '300px',
        maxWidth: '600px',
        color: 'white',
        padding: '20px'
      }}>
        <p style={{ color: '#FFD700', fontWeight: 'bold' }}>
          WELCOME TO SNACK SPRINT
        </p>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', lineHeight: '1.2' }}>
          Fuel <span style={{ color: '#FFD700' }}>Your Day</span> With <br />
          A <span style={{ color: '#FFD700' }}>Snack</span> And <br />
          Enjoy <span style={{ color: '#FFD700' }}>!!</span>
        </h1>
        <p style={{ fontSize: '18px', marginTop: '20px' }}>Snack fast, snack fresh!</p>
        <button
          onClick={handleOrderClick}
          style={{
            marginTop: '30px',
            backgroundColor: '#FFD700',
            color: '#000',
            padding: '12px 28px',
            border: 'none',
            borderRadius: '25px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Order Now
        </button>

        {/* Choice buttons appear here */}
        {showOptions && (
          <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
            <button
              onClick={() => handleChoice('/login')}
              style={{
                backgroundColor: '#FFD700',
                color: 'black',
                padding: '10px 20px',
                borderRadius: '20px',
                border: '1px solid #FFD700',
                cursor: 'pointer'
              }}
            >
              Login
            </button>
            <button
              onClick={() => handleChoice('/signup')}
              style={{
                backgroundColor: '#FFD700',
                color: '#000',
                padding: '10px 20px',
                borderRadius: '20px',
                border: '1px solid #FFD700',
                cursor: 'pointer'
              }}
            >
              Signup
            </button>
          </div>
        )}
      </div>

      {/* Right Section - Image */}
      <div style={{
        flex: 1,
        minWidth: '300px',
        maxWidth: '600px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: '#000',
          padding: '10px',
          borderRadius: '20px',
          boxShadow: '0 0 30px #111',
          width: '100%',
          maxWidth: '500px'
        }}>
          <img
            src="https://img.freepik.com/free-vector/background-with-different-meals_23-2147871165.jpg?semt=ais_hybrid&w=740"
            alt="Snack Visual"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '15px',
              display: 'block',
              backgroundColor: '#000'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
