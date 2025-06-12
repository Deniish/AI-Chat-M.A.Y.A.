import React, { useState, useEffect, useRef } from 'react';
import user from '../ImgUser/user.png';
import edit from '../ImgUser/edit.png';
import inbox from '../ImgUser/envelope.png';
import settings from '../ImgUser/settings.png';
import help from '../ImgUser/question.png';
import logout from '../ImgUser/log-out.png';
import './Dropdown.css'; // Ensure this is linked

function UserLogo() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Function to toggle dropdown
  const toggleDropdown = () => {
    console.log("Dropdown toggled. Current state:", open);  // Debugging log
    setOpen(!open);
  };

  // Close the dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="menu-container" ref={menuRef}>
      {/* Trigger to open/close the dropdown */}
      <div className="menu-trigger" onClick={toggleDropdown}>
        <img src={user} alt="User Logo" />
      </div>

      {/* Dropdown menu */}
      <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
        <h3>The Denish<br /><span>Website Designer</span></h3>
        <ul>
          <DropdownItem img={user} text={"My Profile"} />
          <DropdownItem img={edit} text={"Edit Profile"} />
          <DropdownItem img={inbox} text={"Inbox"} />
          <DropdownItem img={settings} text={"Settings"} />
          <DropdownItem img={help} text={"Helps"} />
          <DropdownItem img={logout} text={"Logout"} />
        </ul>
      </div>
    </div>
  );
}

function DropdownItem(props) {
  return (
    <li className="dropdownItem">
      <img src={props.img} alt={props.text} />
      <a href="#">{props.text}</a> {/* Add href for clickable behavior */}
    </li>
  );
}

export default UserLogo;
