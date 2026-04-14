const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Store connected users and messages
const users = new Map();
const messages = [];

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user joining
  socket.on('join', (userData) => {
    users.set(socket.id, {
      id: socket.id,
      username: userData.username,
      color: userData.color
    });
    
    // Send existing messages to new user
    socket.emit('messageHistory', messages);
    
    // Notify others about new user
    socket.broadcast.emit('userJoined', {
      id: socket.id,
      username: userData.username,
      color: userData.color
    });
    
    // Send updated user list
    io.emit('userList', Array.from(users.values()));
  });

  // Handle new message
  socket.on('sendMessage', (messageData) => {
    const user = users.get(socket.id);
    if (user) {
      const message = {
        id: Date.now().toString(),
        text: messageData.text,
        username: user.username,
        color: user.color,
        timestamp: new Date().toISOString(),
        userId: socket.id
      };
      
      messages.push(message);
      
      // Keep only last 100 messages
      if (messages.length > 100) {
        messages.shift();
      }
      
      // Broadcast message to all users
      io.emit('newMessage', message);
    }
  });

  // Handle typing indicator
  socket.on('typing', (isTyping) => {
    const user = users.get(socket.id);
    if (user) {
      socket.broadcast.emit('userTyping', {
        username: user.username,
        isTyping
      });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      users.delete(socket.id);
      
      // Notify others about user leaving
      socket.broadcast.emit('userLeft', {
        id: socket.id,
        username: user.username
      });
      
      // Send updated user list
      io.emit('userList', Array.from(users.values()));
    }
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
