import React, { useState, useEffect } from 'react';
import { Emoji } from 'react-emoji-render';

const Chat = ({ messages, socket }) => {
  const [messageList, setMessageList] = useState(messages);

  useEffect(() => {
    // Check if notifications are supported and request permission
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    // Listen for new messages and show notification
    socket.on('receiveMessage', (message) => {
      setMessageList((prevMessages) => [...prevMessages, message]);
      if (Notification.permission === "granted") {
        new Notification(`${message.sender} sent a message`, {
          body: message.content,
        });
      }
    });

    return () => socket.off('receiveMessage');
  }, [socket]);

  return (
    <div>
      {messageList.map((msg, index) => (
        <div key={index}>
          <strong>{msg.sender}</strong>: <Emoji text={msg.content} />
          <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
        </div>
      ))}
    </div>
  );
};

// Import the correct component from react-emoji-render
import { Emojione } from 'react-emoji-render';

function Chat() {
  // Inside your component, use Emojione instead of Emoji
  return (
    <div>
      <Emojione text="Hello! 😄" />
      {/* Additional chat-related code */}
    </div>
  );
}

export default Chat;



