import React, { useState } from 'react';
import { AppContext } from './AppContext';

const AppProvider = ({ children }) => {
  const [mode, setMode] = useState('light-mode');
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUserName] = useState('');
  const [registered, setRegistered] = useState(true);
  const [messages, setMessages] = useState([]);
  
  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'light-mode' ? 'dark-mode' : 'light-mode'));
  };

  const contextValue = {
    mode,
    toggleMode, 
    authenticated,
    setAuthenticated,
    username,
    setUserName,
    registered,
    setRegistered,
    messages,
    setMessages
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };
