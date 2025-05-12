import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiAlertCircle, FiLogIn, FiUser, FiShield } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState('user'); // 'user' or 'admin'
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // Particle Background Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 60;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(255, 215, 0, ${Math.random() * 0.4 + 0.1})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(255, 215, 0, ${0.2 - distance / 500})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        particles[i].update();
        particles[i].draw();
      }
      requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Admin Credential Check
      if (loginType === 'admin' && email === 'admin@example.com' && password === 'admin123') {
        navigate('/admin-dashboard');
      } 
      // User Login (default)
      else if (loginType === 'user') {
        navigate('/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Styles
  const styles = {
    wrapper: {
      height: '100vh',
      width: '100vw',
      backgroundColor: '#121212',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    },
    canvas: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
    },
    container: {
      maxWidth: '420px',
      width: '90%',
      padding: '40px',
      backgroundColor: 'rgba(30, 30, 30, 0.9)',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
      fontFamily: "'Poppins', sans-serif",
      color: 'white',
      zIndex: 2,
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 215, 0, 0.2)',
    },
    title: {
      textAlign: 'center',
      marginBottom: '30px',
      fontSize: '28px',
      fontWeight: '600',
      color: '#FFD700',
    },
    loginTypeToggle: {
      display: 'flex',
      gap: '10px',
      marginBottom: '24px',
    },
    toggleButton: {
      flex: 1,
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid rgba(255, 215, 0, 0.3)',
      background: 'rgba(0, 0, 0, 0.5)',
      color: 'white',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'all 0.3s',
    },
    toggleButtonActive: {
      background: 'rgba(255, 215, 0, 0.2)',
      borderColor: '#FFD700',
    },
    inputGroup: {
      marginBottom: '24px',
      position: 'relative',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#FFD700',
    },
    inputContainer: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      height: '48px',
    },
    input: {
      width: '100%',
      height: '48px',
      padding: '0 14px 0 42px',
      border: '1px solid rgba(255, 215, 0, 0.3)',
      borderRadius: '10px',
      fontSize: '15px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      color: 'white',
      transition: 'border-color 0.3s, box-shadow 0.3s',
      outline: 'none',
      boxSizing: 'border-box',
    },
    inputFocus: {
      borderColor: '#FFD700',
      boxShadow: '0 0 0 2px rgba(255, 215, 0, 0.2)',
    },
    icon: {
      position: 'absolute',
      left: '14px',
      color: '#FFD700',
      fontSize: '18px',
      pointerEvents: 'none',
    },
    button: {
      width: '100%',
      height: '48px',
      padding: '0',
      background: 'linear-gradient(135deg, #FFD700 0%, #FFC000 100%)',
      color: 'black',
      fontWeight: '600',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'all 0.3s',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
    },
    buttonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 5px 15px rgba(255, 215, 0, 0.4)',
    },
    error: {
      color: '#FF4D4F',
      marginBottom: '16px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px',
      backgroundColor: 'rgba(255, 77, 79, 0.1)',
      borderRadius: '8px',
      borderLeft: '3px solid #FF4D4F',
    },
  };

  return (
    <div style={styles.wrapper}>
      <canvas ref={canvasRef} style={styles.canvas} />

      <div style={styles.container}>
        <h2 style={styles.title}>Welcome Back</h2>
        
        <div style={styles.loginTypeToggle}>
          <button
            type="button"
            style={{
              ...styles.toggleButton,
              ...(loginType === 'user' ? styles.toggleButtonActive : {}),
            }}
            onClick={() => setLoginType('user')}
          >
            <FiUser /> User Login
          </button>
          <button
            type="button"
            style={{
              ...styles.toggleButton,
              ...(loginType === 'admin' ? styles.toggleButtonActive : {}),
            }}
            onClick={() => setLoginType('admin')}
          >
            <FiShield /> Admin Login
          </button>
        </div>

        {error && (
          <div style={styles.error}>
            <FiAlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <div style={styles.inputContainer}>
              <FiMail style={styles.icon} />
              <input
                style={styles.input}
                type="email"
                placeholder={loginType === 'admin' ? 'admin@example.com' : 'your@email.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, styles.input)}
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputContainer}>
              <FiLock style={styles.icon} />
              <input
                style={styles.input}
                type="password"
                placeholder={loginType === 'admin' ? 'admin123' : '••••••••'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, styles.input)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(isLoading ? { opacity: 0.7, cursor: 'not-allowed' } : {}),
            }}
            disabled={isLoading}
            onMouseEnter={(e) => !isLoading && Object.assign(e.target.style, styles.buttonHover)}
            onMouseLeave={(e) => !isLoading && Object.assign(e.target.style, styles.button)}
          >
            <FiLogIn size={18} />
            {isLoading ? 'Authenticating...' : `Login as ${loginType}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;