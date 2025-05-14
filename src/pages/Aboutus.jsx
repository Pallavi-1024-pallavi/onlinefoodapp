import React, { useEffect } from 'react';

const AboutUs = () => {
  useEffect(() => {
    // Animate blocks on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-block');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.story-block').forEach(block => {
      observer.observe(block);
    });

    return () => observer.disconnect();
  }, []);

  const containerStyle = {
    backgroundColor: '#0a0a0a',
    minHeight: '100vh',
    padding: '80px 20px',
    fontFamily: '"Poppins", sans-serif',
    position: 'relative',
    overflow: 'hidden',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '60px',
    position: 'relative',
    zIndex: '2',
  };

  const titleStyle = {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: '800',
    background: 'linear-gradient(45deg, #FFEB3B, #FF9800)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    marginBottom: '20px',
    letterSpacing: '1px',
  };

  const storyContainer = {
    maxWidth: '1000px',
    margin: '0 auto',
    position: 'relative',
    padding: '0 20px',
  };

  const timelineStyle = {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '4px',
    height: '100%',
    background: 'linear-gradient(to bottom, #FFEB3B, #FF9800)',
    zIndex: '1',
  };

  return (
    <div style={containerStyle}>
      {/* Decorative elements */}
      <div style={{
        position: 'absolute',
        top: '0',
        right: '0',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(255,235,59,0.15) 0%, rgba(0,0,0,0) 70%)',
        zIndex: '0',
      }}></div>
      
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(255,152,0,0.1) 0%, rgba(0,0,0,0) 70%)',
        zIndex: '0',
      }}></div>

      <header style={headerStyle}>
        <h1 style={titleStyle}>Our Flavorful Journey</h1>
        <p style={{
          color: '#fff',
          fontSize: '1.1rem',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: '1.6',
        }}>
          How Snack Sprint became your fastest food delivery partner
        </p>
      </header>

      <div style={storyContainer}>
        <div style={timelineStyle}></div>
        
        {/* Story Block 1 */}
        <div className="story-block" style={{
          position: 'relative',
          marginBottom: '60px',
          zIndex: '2',
          opacity: '0',
          transform: 'translateX(-50px)',
        }}>
          <div style={{
            width: '45%',
            padding: '30px',
            background: 'rgba(20, 20, 20, 0.8)',
            borderRadius: '15px',
            boxShadow: '0 10px 25px rgba(255, 235, 59, 0.1)',
            borderLeft: '4px solid #FFEB3B',
            position: 'relative',
            left: '0',
          }}>
            <div style={{
              position: 'absolute',
              left: '-10px',
              top: '30px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: '#FFEB3B',
              border: '4px solid #0a0a0a',
            }}></div>
            <h3 style={{
              color: '#FFEB3B',
              fontSize: '1.5rem',
              marginBottom: '15px',
            }}>2018 - The Beginning</h3>
            <p style={{
              color: '#fff',
              lineHeight: '1.7',
              marginBottom: '15px',
            }}>
              It all started with two college friends who missed their late-night snack runs. 
              We wondered - why can't good food come to us faster?
            </p>
            <div style={{
              display: 'inline-block',
              padding: '5px 15px',
              background: 'rgba(255, 235, 59, 0.2)',
              color: '#FFEB3B',
              borderRadius: '20px',
              fontSize: '0.9rem',
            }}>2 Founders</div>
          </div>
        </div>

        {/* Story Block 2 */}
        <div className="story-block" style={{
          position: 'relative',
          marginBottom: '60px',
          zIndex: '2',
          opacity: '0',
          transform: 'translateX(50px)',
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <div style={{
            width: '45%',
            padding: '30px',
            background: 'rgba(20, 20, 20, 0.8)',
            borderRadius: '15px',
            boxShadow: '0 10px 25px rgba(255, 152, 0, 0.1)',
            borderRight: '4px solid #FF9800',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              right: '-10px',
              top: '30px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: '#FF9800',
              border: '4px solid #0a0a0a',
            }}></div>
            <h3 style={{
              color: '#FF9800',
              fontSize: '1.5rem',
              marginBottom: '15px',
            }}>2020 - First 1000 Orders</h3>
            <p style={{
              color: '#fff',
              lineHeight: '1.7',
              marginBottom: '15px',
            }}>
              Our unique delivery system proved successful! We delivered our first 1000 orders with 
              an average delivery time of just 18 minutes.
            </p>
            <div style={{
              display: 'inline-block',
              padding: '5px 15px',
              background: 'rgba(255, 152, 0, 0.2)',
              color: '#FF9800',
              borderRadius: '20px',
              fontSize: '0.9rem',
            }}>12 Team Members</div>
          </div>
        </div>

        {/* Story Block 3 */}
        <div className="story-block" style={{
          position: 'relative',
          marginBottom: '60px',
          zIndex: '2',
          opacity: '0',
          transform: 'translateX(-50px)',
        }}>
          <div style={{
            width: '45%',
            padding: '30px',
            background: 'rgba(20, 20, 20, 0.8)',
            borderRadius: '15px',
            boxShadow: '0 10px 25px rgba(255, 235, 59, 0.1)',
            borderLeft: '4px solid #FFEB3B',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              left: '-10px',
              top: '30px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: '#FFEB3B',
              border: '4px solid #0a0a0a',
            }}></div>
            <h3 style={{
              color: '#FFEB3B',
              fontSize: '1.5rem',
              marginBottom: '15px',
            }}>2022 - City Expansion</h3>
            <p style={{
              color: '#fff',
              lineHeight: '1.7',
              marginBottom: '15px',
            }}>
              We expanded to 3 new cities and partnered with 50+ local restaurants. Our delivery 
              network now covers 200+ square miles.
            </p>
            <div style={{
              display: 'inline-block',
              padding: '5px 15px',
              background: 'rgba(255, 235, 59, 0.2)',
              color: '#FFEB3B',
              borderRadius: '20px',
              fontSize: '0.9rem',
            }}>4 Cities</div>
          </div>
        </div>

        {/* Story Block 4 */}
        <div className="story-block" style={{
          position: 'relative',
          zIndex: '2',
          opacity: '0',
          transform: 'translateX(50px)',
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <div style={{
            width: '45%',
            padding: '30px',
            background: 'rgba(20, 20, 20, 0.8)',
            borderRadius: '15px',
            boxShadow: '0 10px 25px rgba(255, 152, 0, 0.1)',
            borderRight: '4px solid #FF9800',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              right: '-10px',
              top: '30px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: '#FF9800',
              border: '4px solid #0a0a0a',
            }}></div>
            <h3 style={{
              color: '#FF9800',
              fontSize: '1.5rem',
              marginBottom: '15px',
            }}>Today - Your Favorite Delivery</h3>
            <p style={{
              color: '#fff',
              lineHeight: '1.7',
              marginBottom: '15px',
            }}>
              Now serving 10,000+ happy customers daily with our record-breaking 15-minute average 
              delivery time. Your satisfaction is our recipe!
            </p>
            <div style={{
              display: 'inline-block',
              padding: '5px 15px',
              background: 'rgba(255, 152, 0, 0.2)',
              color: '#FF9800',
              borderRadius: '20px',
              fontSize: '0.9rem',
            }}>200+ Team Members</div>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div style={{
        maxWidth: '800px',
        margin: '80px auto 0',
        padding: '40px',
        background: 'linear-gradient(135deg, rgba(255,235,59,0.1) 0%, rgba(255,152,0,0.1) 100%)',
        borderRadius: '20px',
        border: '1px solid rgba(255,235,59,0.2)',
        textAlign: 'center',
        position: 'relative',
        zIndex: '2',
        transform: 'scale(0.95)',
        opacity: '0',
      }} className="story-block">
        <h2 style={{
          color: '#FFEB3B',
          fontSize: '2rem',
          marginBottom: '20px',
        }}>Our Mission</h2>
        <p style={{
          color: '#fff',
          fontSize: '1.1rem',
          lineHeight: '1.8',
        }}>
          To revolutionize food delivery by combining cutting-edge logistics with passionate service, 
          ensuring no one has to wait long for delicious meals. We bridge the gap between your 
          cravings and local culinary talent with speed and care.
        </p>
      </div>

      {/* CSS for animations */}
      <style>
        {`
          @keyframes blockEnter {
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes scaleIn {
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          .animate-block {
            animation: blockEnter 0.8s forwards cubic-bezier(0.175, 0.885, 0.32, 1.1);
          }
          
          .story-block:nth-child(odd).animate-block {
            animation-name: blockEnter;
          }
          
          .story-block:last-child.animate-block {
            animation: scaleIn 0.8s forwards 0.3s;
          }
          
          .story-block:hover {
            transform: translateX(0) !important;
          }
          
          .story-block:hover div {
            box-shadow: 0 15px 30px rgba(255, 235, 59, 0.2);
            transform: translateY(-5px);
            transition: all 0.3s ease;
          }
        `}
      </style>
    </div>
  );
};

export default AboutUs;