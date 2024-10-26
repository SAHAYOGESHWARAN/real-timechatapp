import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import Chat from './components/Chat';

const socket = io('http://localhost:5000'); // Server URL

function App() {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get('http://localhost:5000/api/messages');
      setMessages(response.data);
    };
    fetchMessages();

    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  return (
    <div className="App">
      <Chat messages={messages} socket={socket} />
    </div>
  );
}

export default App;
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Chat from './components/Chat';
import Login from './pages/Login';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      {user ? <Chat /> : <Login />}
    </div>
  );
}

export default App;
