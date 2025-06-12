import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/Navbar';
import Main from './Components/Main';
import UnifiedAuth from './Components/UnifiedAuth'; // Import the UnifiedAuth component
import './Components/MainStyle1.css';
import './Components/Popup.css'; // Import the Popup styles
import { AppContext } from './Context/AppContext';
function App() {
  const {mode} = useContext(AppContext);
  const [showPopup, setShowPopup] = useState(false);
  localStorage.setItem('usrname', 'x');
  useEffect(() => {
    // Check if the user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 2000); // Show popup after 2 seconds
      return () => clearTimeout(timer);
    }
  }, []);


  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <Router>
      <div className={`App-${mode}`}>
        <NavBar mode={mode} />
        <Routes>
          <Route path="/" element={<Main mode={mode} />} />
          {/* Keep the UnifiedAuth route for direct access */}
          <Route path="/auth" element={<UnifiedAuth handleClose={handleClosePopup} />} />
        </Routes>
        {showPopup && (
          <div className="popup-overlay">
            <UnifiedAuth handleClose={handleClosePopup} />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
