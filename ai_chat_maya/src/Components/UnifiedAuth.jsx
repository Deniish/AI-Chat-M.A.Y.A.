import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignInSignUp.css'; // Use your existing styles
import { AppContext } from '../Context/AppContext';
const UnifiedAuth = ({ handleClose }) => {
  const {  setUserName, setMessages} = useContext(AppContext);
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [name, setName] = useState(''); // For signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (mode === 'signup') {
      if (!name) {
        setErrorMessage("Name is required.");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }
      try {
        const response = await fetch('http://localhost:58000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        if (response.ok) {
          alert("Signup successful!");
          setMode('login'); // Switch to login mode
        } else {
          const errorData = await response.text();
          setErrorMessage(errorData || 'Registration failed');
        }
      } catch (error) {
        setErrorMessage('An error occurred. Please try again.');
      }
    } else {
      try {
        const response = await fetch('http://localhost:58000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        setUserName(data.name);
        setMessages(data.history);
        if (response.ok) {
          alert("Login successful!");
          localStorage.setItem('isLoggedIn', 'true');
          // localStorage.setItem('usrname',data.name);
          setUserName(data.name);
          handleClose(); // Close the popup first
          navigate('/'); // Redirect to main page after closing the popup
        } else {
          setErrorMessage(data.message || 'Login failed');
        }
      } catch (error) {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  // Handle "Stay Logged Out" functionality
  const handleStayLoggedOut = () => {
    localStorage.setItem('isLoggedIn', 'false');// Set logged-out status in localStorage
    handleClose(); // Close the popup
    navigate('/'); // Redirect to main page
  };

  return (
    <div className="auth-container">
      {/* <button className="close-btn" onClick={handleClose}>×</button> Close button */}
      
      {/* Dynamic Title above the form */}
      <h2>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
      
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
      <form onSubmit={handleSubmit}>
        {/* Render name input for signup mode */}
        {mode === 'signup' && (
          <>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </>
        )}

        {/* Render email and password inputs for login mode */}
        {mode === 'login' && (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </>
        )}

        <button className="submit" type="submit">
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </form>

      {/* Stay Logged Out button - only in login mode */}
      {mode === 'login' && (
        <button
          className="stay-logged-out-btn"
          onClick={handleStayLoggedOut}
          style={{ backgroundColor: "white", width: "70%", padding: "10px", borderRadius: "5px" }}
        >
          <span className="style-stay-logged-out">Stay Logged Out?</span>
        </button>
      )}
      
      <p>
        {mode === 'login'
          ? "Don't have an account? "
          : "Already have an account? "}
        <Link to="#" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
          {mode === 'login' ? 'Sign Up' : 'Log In'}
        </Link>
      </p>
    </div>
  );
};

export default UnifiedAuth;
