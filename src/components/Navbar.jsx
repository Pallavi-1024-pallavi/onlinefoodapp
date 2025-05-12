import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart } from 'react-icons/fi';
import { RiFlashlightFill } from 'react-icons/ri';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  const navBarStyle = {
    width: '100%',
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '1000',
    fontFamily: '"Poppins", sans-serif',
    backgroundColor: '#000',
    boxShadow: '0 2px 15px rgba(255, 235, 59, 0.2)',
  };

  const navBarLinksStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 40px',
    maxWidth: '1400px',
    margin: '0 auto',
  };

  const brandTextStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: '#FFEB3B',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
  };

  const navLinksStyle = {
    display: 'flex',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    gap: '15px',
    alignItems: 'center',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '10px 15px',
    fontWeight: '500',
    fontSize: '16px',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    position: 'relative',
  };

  const activeLinkStyle = {
    ...linkStyle,
    color: '#FFEB3B',
    fontWeight: '600',
  };

  const mobileMenuStyle = {
    position: 'fixed',
    top: '70px',
    left: 0,
    right: 0,
    backgroundColor: '#111',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
    transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-150%)',
    transition: 'transform 0.3s ease-out',
    zIndex: 999,
  };

  const iconStyle = {
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  return (
    <div style={navBarStyle}>
      <div style={navBarLinksStyle}>
        <Link to="/" style={brandTextStyle}>
          <RiFlashlightFill style={{ fontSize: '28px' }} />
          Snack Sprint
        </Link>

        <nav style={{ display: { xs: 'none', md: 'block' } }}>
          <ul style={navLinksStyle}>
            {['Home', 'About Us', 'Contact'].map((item) => {
              const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`;
              return (
                <li key={item}>
                  <Link
                    to={path}
                    style={activeLink === item ? activeLinkStyle : linkStyle}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#FFEB3B';
                      e.target.style.textShadow = '0 0 8px rgba(255, 235, 59, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = activeLink === item ? '#FFEB3B' : 'white';
                      e.target.style.textShadow = 'none';
                    }}
                    onClick={() => setActiveLink(item)}
                  >
                    {item}
                  </Link>
                </li>
              );
            })}

            {/* Cart Icon Only */}
            <li style={{ display: 'flex', gap: '20px', marginLeft: '15px' }}>
              <Link to="/cart" style={iconStyle}>
                <FiShoppingCart />
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div
          style={{
            ...iconStyle,
            display: 'none',
            '@media (max-width: 768px)': {
              display: 'block',
            },
          }}
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <div style={mobileMenuStyle}>
        {['Home', 'About Us', 'Contact', 'Login', 'Sign Up'].map((item) => {
          const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`;
          return (
            <Link
              key={item}
              to={path}
              style={{
                ...linkStyle,
                color: activeLink === item ? '#FFEB3B' : 'white',
                padding: '12px 20px',
                borderBottom: '1px solid rgba(255, 235, 59, 0.1)',
              }}
              onClick={() => {
                setActiveLink(item);
                setMobileMenuOpen(false);
              }}
            >
              {item}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
