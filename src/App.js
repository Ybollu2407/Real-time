import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import ChatHeader from './components/ChatHeader';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';
import UserList from './components/UserList';
import LoginModal from './components/LoginModal';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  margin: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const MainChat = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Sidebar = styled.div`
  width: 250px;
  background: rgba(255, 255, 255, 0.9);
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-y: auto;
`;

const SOCKET_SERVER = 'http://localhost:5001';

function App() {
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (user) {
      const newSocket = io(SOCKET_SERVER);
      
      newSocket.on('connect', () => {
        console.log('Connected to server');
        newSocket.emit('join', {
          username: user.username,
          color: user.color
        });
      });

      newSocket.on('messageHistory', (history) => {
        setMessages(history);
      });

      newSocket.on('newMessage', (message) => {
        setMessages(prev => [...prev, message]);
      });

      newSocket.on('userList', (userList) => {
        setUsers(userList);
      });

      newSocket.on('userJoined', (newUser) => {
        setUsers(prev => [...prev, newUser]);
      });

      newSocket.on('userLeft', (leftUser) => {
        setUsers(prev => prev.filter(u => u.id !== leftUser.id));
      });

      newSocket.on('userTyping', ({ username, isTyping }) => {
        setTypingUsers(prev => {
          const newSet = new Set(prev);
          if (isTyping) {
            newSet.add(username);
          } else {
            newSet.delete(username);
          }
          return newSet;
        });
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [user]);

  const handleLogin = (username) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    setUser({
      username,
      color: randomColor
    });
    setShowLogin(false);
  };

  const sendMessage = (text) => {
    if (socket && text.trim()) {
      socket.emit('sendMessage', { text: text.trim() });
    }
  };

  const handleTyping = (isTyping) => {
    if (socket) {
      socket.emit('typing', isTyping);
    }
  };

  if (showLogin) {
    return <LoginModal onLogin={handleLogin} />;
  }

  return (
    <AppContainer>
      <ChatContainer>
        <MainChat>
          <ChatHeader userCount={users.length} />
          <ChatMessages 
            messages={messages} 
            currentUser={user}
            typingUsers={Array.from(typingUsers)}
          />
          <ChatInput 
            onSendMessage={sendMessage}
            onTyping={handleTyping}
          />
        </MainChat>
      </ChatContainer>
      <Sidebar>
        <UserList users={users} currentUser={user} />
      </Sidebar>
    </AppContainer>
  );
}

export default App;
