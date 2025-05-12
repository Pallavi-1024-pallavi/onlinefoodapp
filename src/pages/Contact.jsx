import React from 'react';

const Contact = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#000', // Black background
    padding: '60px',
    color: '#fff',
    minHeight: '100vh',
    width: '100vw', // Ensures full width
    margin: 0, // Remove default margin
  };

  const cardsContainerStyle = {
    display: 'flex',
    justifyContent: 'center', // or 'space-around'
    marginBottom: '30px', // less space below
    flexWrap: 'wrap',
    gap: '5px', // optional for cleaner spacing
  };
  
  const cardStyle = {
    flex: '1',
    minWidth: '200px',
    margin: '15px',
    padding: '25px',
    backgroundColor: '#FFD700', // Yellow background
    color: '#000', // Black text
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
    textAlign: 'center',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '40px',
  };

  const formSectionStyle = {
    flex: '1',
    marginRight: '20px',
    minWidth: '280px',
    maxWidth: '400px',
  };

  const rightSectionStyle = {
    flex: '1',
    minWidth: '280px',
    position: 'relative',
  };

  const labelStyle = {
    fontSize: '14px',
    color: '#FFD700',
    marginBottom: '5px',
    display: 'block',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    border: 'none',
    borderBottom: '2px solid #FFD700',
    background: 'transparent',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s',
  };

  const buttonStyle = {
    padding: '14px 20px',
    backgroundColor: '#FFD700',
    color: '#000',
    border: 'none',
    fontWeight: 'bold',
    borderRadius: '30px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '20px',
    width: '100%',
    transition: 'all 0.3s',
  };

  const getInTouchStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: '#FFD700',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'right',
    padding: '10px',
    borderRadius: '10px',
    marginRight:'100px'
  };

  const socialStyle = {
    display: 'flex',
    gap: '20px',
    marginTop: '100px',
    fontSize: '24px',
    color: '#FFD700',
  };

  return (
    <div style={containerStyle}>
      <div style={cardsContainerStyle}>
        <div style={cardStyle}>
          <h4>OUR MAIN OFFICE</h4>
          <p>Snack Sprint Adayar Chennai 600001</p>
        </div>
        <div style={cardStyle}>
          <h4>PHONE NUMBER</h4>
          <p>9003155789<br />04344-231231</p>
        </div>
        <div style={cardStyle}>
          <h4>FAX</h4>
          <p>123-456-7890</p>
        </div>
        <div style={cardStyle}>
          <h4>EMAIL</h4>
          <p>usename@gmail.com</p>
        </div>
      </div>

      <div style={formStyle}>
        <div style={formSectionStyle}>
          <label style={labelStyle}>Email</label>
          <input
            style={inputStyle}
            type="email"
            placeholder="Enter your email"
            onFocus={(e) => e.target.style.borderBottom = '2px solid white'}
            onBlur={(e) => e.target.style.borderBottom = '2px solid #FFD700'}
          />

          <label style={labelStyle}>Name</label>
          <input style={inputStyle} type="text" placeholder="Enter your name" />

          <label style={labelStyle}>Message</label>
          <input style={inputStyle} type="text" placeholder="Enter your message" />

          <button style={buttonStyle}>SUBMIT</button>
        </div>

        <div style={rightSectionStyle}>
          <div style={getInTouchStyle}>
            <h2>Get in touch</h2>
            <p>We ensure visibility for your firm with safety and comfort in mind.</p>
          </div>
          <div style={socialStyle}>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
