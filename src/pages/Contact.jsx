import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhone,
  FaFax,
  FaEnvelope
} from 'react-icons/fa';

const Contact = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: '#0a0a0a',
    padding: '40px 5%',
    color: '#fff',
    minHeight: '100vh',
    width: '100vw',
    margin: 0,
    overflowX: 'hidden',
    position: 'relative',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '50px',
    position: 'relative',
  };

  const titleStyle = {
    fontSize: '3.5rem',
    fontWeight: '700',
    background: 'linear-gradient(45deg, #FFD700, #FFA500)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '20px',
    letterSpacing: '2px',
  };

  const subtitleStyle = {
    fontSize: '1.2rem',
    color: '#aaa',
    maxWidth: '700px',
    margin: '0 auto',
    lineHeight: '1.6',
  };

  const cardsContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '60px',
    flexWrap: 'wrap',
    gap: '25px',
  };

  const cardStyle = {
    flex: '1',
    minWidth: '220px',
    maxWidth: '260px',
    padding: '30px',
    background: 'linear-gradient(145deg, #1a1a1a, #222)',
    color: '#fff',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(255, 215, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
    position: 'relative',
    overflow: 'hidden',
    zIndex: '1',
  };

  const iconStyle = {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#FFD700',
  };

  const cardTitleStyle = {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#FFD700',
  };

  const cardTextStyle = {
    fontSize: '1rem',
    color: '#ddd',
    lineHeight: '1.6',
  };

  const formContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
  };

  const formSectionStyle = {
    flex: '1',
    minWidth: '300px',
    padding: '40px',
    background: 'rgba(26, 26, 26, 0.8)',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 215, 0, 0.1)',
  };

  const rightSectionStyle = {
    flex: '1',
    minWidth: '300px',
    position: 'relative',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const labelStyle = {
    fontSize: '0.9rem',
    color: '#FFD700',
    marginBottom: '8px',
    display: 'block',
    fontWeight: '500',
    letterSpacing: '0.5px',
  };

  const inputStyle = {
    width: '100%',
    padding: '15px',
    marginBottom: '25px',
    border: 'none',
    borderBottom: '2px solid rgba(255, 215, 0, 0.3)',
    background: 'transparent',
    color: '#fff',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s',
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '120px',
    resize: 'vertical',
  };

  const buttonStyle = {
    padding: '16px 30px',
    background: 'linear-gradient(45deg, #FFD700, #FFA500)',
    color: '#000',
    border: 'none',
    fontWeight: '600',
    borderRadius: '50px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '10px',
    width: '100%',
    transition: 'all 0.3s',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  };

  const buttonHoverStyle = {
    transform: 'translateY(-3px)',
    boxShadow: '0 10px 20px rgba(255, 215, 0, 0.3)',
  };

  const getInTouchStyle = {
    marginBottom: '40px',
  };

  const headingStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    background: 'linear-gradient(45deg, #FFD700, #FFA500)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '20px',
    lineHeight: '1.2',
  };

  const descriptionStyle = {
    fontSize: '1.1rem',
    color: '#aaa',
    lineHeight: '1.8',
    marginBottom: '30px',
  };

  const socialStyle = {
    display: 'flex',
    gap: '20px',
    marginTop: '40px',
  };

  const socialIconStyle = {
    fontSize: '1.5rem',
    color: '#FFD700',
    background: 'rgba(255, 215, 0, 0.1)',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s',
    cursor: 'pointer',
  };

  const socialIconHoverStyle = {
    background: '#FFD700',
    color: '#000',
    transform: 'translateY(-5px)',
  };

  const floatingOrbs = {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(60px)',
    opacity: '0.3',
    zIndex: '0',
  };

  return (
    <div style={containerStyle}>
      <div style={{ ...floatingOrbs, width: '400px', height: '400px', background: '#FFD700', top: '-100px', left: '-100px' }} />
      <div style={{ ...floatingOrbs, width: '300px', height: '300px', background: '#FFA500', bottom: '-50px', right: '-50px' }} />

      <div style={headerStyle}>
        <h1 style={titleStyle}>Let's Connect</h1>
        <p style={subtitleStyle}>
          Have questions or want to discuss a project? Reach out to us through any of these channels or fill out the form below.
        </p>
      </div>

      <div style={cardsContainerStyle}>
        {[{
          icon: <FaMapMarkerAlt />, title: 'OUR MAIN OFFICE', text: 'Snack Sprint Adayar\nChennai 600001'
        }, {
          icon: <FaPhone />, title: 'PHONE NUMBER', text: '9003155789\n04344-231231'
        }, {
          icon: <FaFax />, title: 'FAX', text: '123-456-7890'
        }, {
          icon: <FaEnvelope />, title: 'EMAIL', text: 'usename@gmail.com'
        }].map((card, idx) => (
          <div
            key={idx}
            style={cardStyle}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={iconStyle}>{card.icon}</div>
            <h3 style={cardTitleStyle}>{card.title}</h3>
            <p style={cardTextStyle}>{card.text}</p>
          </div>
        ))}
      </div>

      <div style={formContainerStyle}>
        <div style={formSectionStyle}>
          <label style={labelStyle}>Your Name</label>
          <input
            style={inputStyle}
            type="text"
            placeholder="Enter your name"
            onFocus={e => {
              e.target.style.borderBottom = '2px solid #FFD700';
              e.target.style.boxShadow = '0 5px 15px rgba(255, 215, 0, 0.1)';
            }}
            onBlur={e => {
              e.target.style.borderBottom = '2px solid rgba(255, 215, 0, 0.3)';
              e.target.style.boxShadow = 'none';
            }}
          />

          <label style={labelStyle}>Email Address</label>
          <input
            style={inputStyle}
            type="email"
            placeholder="Enter your email"
            onFocus={e => {
              e.target.style.borderBottom = '2px solid #FFD700';
              e.target.style.boxShadow = '0 5px 15px rgba(255, 215, 0, 0.1)';
            }}
            onBlur={e => {
              e.target.style.borderBottom = '2px solid rgba(255, 215, 0, 0.3)';
              e.target.style.boxShadow = 'none';
            }}
          />

          <label style={labelStyle}>Your Message</label>
          <textarea
            style={textareaStyle}
            placeholder="What would you like to discuss?"
            onFocus={e => {
              e.target.style.borderBottom = '2px solid #FFD700';
              e.target.style.boxShadow = '0 5px 15px rgba(255, 215, 0, 0.1)';
            }}
            onBlur={e => {
              e.target.style.borderBottom = '2px solid rgba(255, 215, 0, 0.3)';
              e.target.style.boxShadow = 'none';
            }}
          ></textarea>

          <button
            style={buttonStyle}
            onMouseEnter={e => e.currentTarget.style = { ...buttonStyle, ...buttonHoverStyle }}
            onMouseLeave={e => e.currentTarget.style = buttonStyle}
          >
            Send Message
          </button>
        </div>

        <div style={rightSectionStyle}>
          <div style={getInTouchStyle}>
            <h2 style={headingStyle}>Get in touch</h2>
            <p style={descriptionStyle}>
              We're here to help and answer any questions you might have. Whether you're looking to start a new project or just want to say hello, we'd love to hear from you.
            </p>
          </div>

          <div style={socialStyle}>
            {[<FaFacebookF />, <FaInstagram />, <FaTwitter />].map((icon, idx) => (
              <a
                key={idx}
                href="#"
                style={socialIconStyle}
                onMouseEnter={e => e.currentTarget.style = { ...socialIconStyle, ...socialIconHoverStyle }}
                onMouseLeave={e => e.currentTarget.style = socialIconStyle}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
