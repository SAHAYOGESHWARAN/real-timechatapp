import React, { useState } from 'react';

const Chat = ({ messages, socket }) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message) {
      const msg = { sender: "User", content: message };
      socket.emit('sendMessage', msg);
      setMessage('');
    }
  };

  return (
    <div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}: </strong>{msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
