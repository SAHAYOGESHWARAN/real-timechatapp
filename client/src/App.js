import React, { useEffect, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import Chat from './components/Chat';
import Login from './pages/Login';
import { AuthContext } from './context/AuthContext';

const socket = io('http://localhost:5000'); // Replace with your server URL

function App() {
  const { user } = useContext(AuthContext); // Get the user from AuthContext
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (user) {
        const response = await axios.get('http://localhost:5000/api/messages', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setMessages(response.data);
      }
    };
    fetchMessages();

    if (user) {
      socket.on('receiveMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    return () => {
      socket.off('receiveMessage');
    };
  }, [user]);

  return (
    <div className="App">
      {user ? (
        <Chat messages={messages} socket={socket} />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
