import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiHeart, FiUpload } from 'react-icons/fi';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    favoriteFood: '',
    avatar: '',
  });

  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      setProfile({ ...profile, avatar: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect this to your backend API
    console.log('Profile saved:', profile);
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <div style={styles.imageWrapper}>
          <label htmlFor="avatarInput" style={styles.avatarLabel}>
            <img
              src={avatarPreview || 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'}
              alt="Avatar"
              style={styles.avatar}
            />
            <div style={styles.uploadIcon}><FiUpload /></div>
          </label>
          <input
            type="file"
            id="avatarInput"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>

        {renderInput('name', 'Name', <FiUser />, profile.name, handleChange)}
        {renderInput('email', 'Email', <FiMail />, profile.email, handleChange)}
        {renderInput('phone', 'Phone', <FiPhone />, profile.phone, handleChange)}
        {renderInput('address', 'Address', <FiMapPin />, profile.address, handleChange)}
        {renderInput('favoriteFood', 'Favorite Food', <FiHeart />, profile.favoriteFood, handleChange)}

        <button type="submit" style={styles.button}>Update Profile</button>
      </form>
    </div>
  );
};

const renderInput = (name, placeholder, icon, value, onChange) => (
  <div style={styles.inputGroup}>
    <span style={styles.icon}>{icon}</span>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={styles.input}
      required
    />
  </div>
);

const styles = {
  wrapper: {
    minHeight: '100vh',
    backgroundColor: '#121212',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins, sans-serif',
    padding: '40px',
  },
  card: {
    backgroundColor: '#1c1c1c',
    borderRadius: '16px',
    padding: '30px',
    width: '100%',
    maxWidth: '450px',
    boxShadow: '0 0 10px #FFD70055',
    color: '#fff',
  },
  imageWrapper: {
    textAlign: 'center',
    marginBottom: '20px',
    position: 'relative',
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    border: '3px solid #FFD700',
    objectFit: 'cover',
    cursor: 'pointer',
  },
  uploadIcon: {
    position: 'absolute',
    bottom: '0',
    right: 'calc(50% - 50px)',
    backgroundColor: '#FFD700',
    borderRadius: '50%',
    padding: '4px',
    color: '#1c1c1c',
    fontSize: '14px',
  },
  avatarLabel: {
    cursor: 'pointer',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#2c2c2c',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  icon: {
    color: '#FFD700',
    marginRight: '10px',
    fontSize: '18px',
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#fff',
    fontSize: '15px',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#FFD700',
    color: '#1c1c1c',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background 0.3s',
  },
};

export default Profile;
