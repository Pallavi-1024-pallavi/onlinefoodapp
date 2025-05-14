import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiAlertCircle, FiLogIn } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

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
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // simulate delay

      if (email === 'admin@example.com' && password === 'admin123') {
        navigate('/admin-dashboard');
      } else if (email === 'user@gmail.com' && password === 'user123') {
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

  const styles = {
    wrapper: {
      position: 'relative',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#000',
    },
    canvas: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 0,
    },
    container: {
      zIndex: 1,
      backgroundColor: 'rgba(255,255,255,0.1)',
      padding: '40px',
      borderRadius: '12px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
      backdropFilter: 'blur(15px)',
      width: '90%',
      maxWidth: '400px',
    },
    title: {
      textAlign: 'center',
      marginBottom: '24px',
      color: '#FFD700',
      fontSize: '28px',
      fontWeight: 'bold',
    },
    inputGroup: {
      marginBottom: '20px',
    },
    label: {
      color: '#fff',
      fontSize: '14px',
      marginBottom: '8px',
      display: 'block',
    },
    inputContainer: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#222',
      borderRadius: '8px',
      padding: '10px',
      border: '1px solid #444',
    },
    icon: {
      color: '#FFD700',
      marginRight: '10px',
    },
    input: {
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: '#fff',
      flex: 1,
      fontSize: '14px',
    },
    inputFocus: {
      border: '1px solid #FFD700',
    },
    button: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: '#FFD700',
      color: '#000',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      transition: 'background 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#e6c200',
    },
    error: {
      color: 'red',
      marginBottom: '15px',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    },
  };

  return (
    <div style={styles.wrapper}>
      <canvas ref={canvasRef} style={styles.canvas} />
      <div style={styles.container}>
        <h2 style={styles.title}>Welcome Back</h2>

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
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            {isLoading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
