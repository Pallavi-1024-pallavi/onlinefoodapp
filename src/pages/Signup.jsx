import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiAlertCircle, FiUser, FiLogIn } from 'react-icons/fi';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // Particle Background Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 60;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
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

    // Create particles
    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Connect particles
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
    setIsLoading(true);
    
    if (email !== confirmEmail) {
      setError('Emails do not match.');
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }
    if (!email || !password) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Signup successful!');
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Styles (identical to login)
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
    footer: {
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '14px',
      color: 'rgba(255,255,255,0.7)',
    },
    footerLink: {
      color: '#FFD700',
      textDecoration: 'none',
      fontWeight: '500',
    },
  };

  return (
    <div style={styles.wrapper}>
      {/* Particle Background Canvas */}
      <canvas 
        ref={canvasRef} 
        style={styles.canvas}
      />

      <div style={styles.container}>
        <h2 style={styles.title}>Create Account</h2>
        
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
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, styles.input)}
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Email</label>
            <div style={styles.inputContainer}>
              <FiMail style={styles.icon} />
              <input
                style={styles.input}
                type="email"
                placeholder="confirm@email.com"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, styles.input)}
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <div style={styles.inputContainer}>
              <FiLock style={styles.icon} />
              <input
                style={styles.input}
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            <FiUser size={18} />
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div style={styles.footer}>
          Already have an account?{' '}
          <a href="/login" style={styles.footerLink}>
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;