# Real-Time Chat Application

A modern, responsive real-time chat application built with React.js and WebSockets using Socket.IO.

## Features

- 🚀 **Real-time messaging** using WebSockets
- 👥 **Live user list** showing online users
- 💬 **Message history** with persistent storage
- ⌨️ **Typing indicators** to show when users are typing
- 🎨 **Beautiful UI** with modern design and animations
- 📱 **Responsive design** that works on all devices
- 🌈 **User colors** for easy identification
- ⚡ **Fast and efficient** with optimized performance

## Tech Stack

- **Frontend**: React.js, Styled Components
- **Backend**: Node.js, Express
- **Real-time**: Socket.IO
- **Styling**: CSS3 with modern animations

## Project Structure

```
realtime-chat-app/
├── src/
│   ├── components/
│   │   ├── ChatHeader.js
│   │   ├── ChatInput.js
│   │   ├── ChatMessages.js
│   │   ├── LoginModal.js
│   │   └── UserList.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── server/
│   ├── server.js
│   └── package.json
├── public/
│   └── index.html
├── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install frontend dependencies**
   ```bash
   npm install
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

### Running the Application

1. **Start the WebSocket server**
   ```bash
   cd server
   npm start
   ```
   The server will run on `http://localhost:5000`

2. **Start the React frontend** (in a new terminal)
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`

3. **Open your browser** and navigate to `http://localhost:3000`

### Alternative: Run Both Simultaneously

You can run both the server and client simultaneously using:

```bash
npm run dev
```

This will start both the server and client in parallel.

## Usage

1. **Enter your username** in the login modal
2. **Start chatting** with other users in real-time
3. **See who's online** in the right sidebar
4. **View typing indicators** when others are typing
5. **Access message history** - all messages are stored during the session

## Features in Detail

### Real-time Messaging
- Instant message delivery using WebSockets
- No page refresh required
- Efficient real-time communication

### User Management
- Dynamic user list updates
- User join/leave notifications
- Unique color assignment for each user

### Message System
- Persistent message storage (last 100 messages)
- Timestamp display for each message
- Message ownership indication

### Typing Indicators
- Shows when users are typing
- Debounced to prevent spam
- Real-time updates

### Responsive Design
- Works on desktop, tablet, and mobile
- Modern UI with smooth animations
- Accessible design patterns

## API Endpoints

The WebSocket server provides the following events:

- `join` - User joins the chat
- `sendMessage` - Send a new message
- `typing` - Typing indicator
- `disconnect` - User leaves

## Customization

### Changing Colors
Modify the color palette in `src/App.js`:

```javascript
const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
```

### Styling
All styles are in styled-components, making it easy to customize:
- Modify `src/components/*.js` files
- Update color schemes and layouts
- Add new animations and effects

## Deployment

### Frontend
```bash
npm run build
```
Deploy the `build` folder to your hosting service.

### Backend
Deploy the `server` folder to your Node.js hosting service (Heroku, Vercel, etc.).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Built with ❤️ using React and WebSockets
