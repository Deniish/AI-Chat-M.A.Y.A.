import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../Context/AppContext';
import './Navbar.css';

export default function Navbar() {
    const { username, mode, toggleMode } = useContext(AppContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Function to toggle dropdown
    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev); // Toggle between true/false
    };

    const updateProfile = () => {
        setDropdownOpen(false);
    };

    const deleteUser = async () => {
        window.confirm("Are you sure you want to delete your account?");
        try {
            await fetch('http://localhost:58000/api/user/deleteUser', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });
        } catch (error) {
            console.error("Error deleting user:", error);
        }
        setDropdownOpen(false);
    };

    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        setDropdownOpen(false);
        window.location.reload();
    };

    const profile = username.charAt(0).toUpperCase();

    // Detect clicks outside the dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);  // Close dropdown when clicked outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
            <nav className={`navbar navbar-${mode}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                <div className={`title-${mode}`}>Chat &nbsp;<span className="text-span">M.A.Y.A.</span></div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label onClick={toggleMode} htmlFor="Toggle_Theme" className={`toggle-mode-${mode}`} style={{ marginRight: '50px', cursor: 'pointer' }}>
                        {mode === 'light-mode'
                            ? <i className="bi bi-moon-stars-fill fs-3"></i>
                            : <i className="bi bi-brightness-high-fill fs-3"></i>}
                    </label>

                    <div style={{ position: 'relative' }} ref={dropdownRef}>
                        <div className="dropdown-container" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
                            {profile}
                        </div>
                        {dropdownOpen && (
                            <div style={{
                                position: 'absolute', top: '50px', right: 0, backgroundColor: mode === 'light-mode' ? 'white' : 'grey', border: '1px solid #ddd', borderRadius: '5px', width: '250px', height: '100px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)',  
                                zIndex: 1100,transition: 'all 0.3s ease-in-out', 
                                opacity: dropdownOpen ? 1 : 0, 
                            }}>
                            
                                <ul style={{ listStyle: 'none', padding: '10px', margin: 0 }}>
                                    <li style={{ cursor: 'pointer' }} onClick={updateProfile}>
                                        <i className="bi bi-person-circle"></i> Profile
                                    </li>
                                    <li style={{ cursor: 'pointer' }} onClick={handleLogout}>
                                        <i className="bi bi-box-arrow-right"></i> Logout
                                    </li>
                                    <li style={{ cursor: 'pointer' }} onClick={deleteUser}>
                                        <i className="bi bi-trash"></i> Delete
                                    </li>
                                </ul>


                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
 