import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const MessagesContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f8f9fa;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

const Message = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isOwn ? 'flex-end' : 'flex-start'};
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  background: ${props => props.isOwn ? props.color : 'white'};
  color: ${props => props.isOwn ? 'white' : '#333'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  
  ${props => !props.isOwn && `
    border: 1px solid #e1e5e9;
  `}
`;

const MessageText = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.4;
  word-wrap: break-word;
`;

const MessageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  font-size: 0.8rem;
  color: ${props => props.isOwn ? 'rgba(255, 255, 255, 0.8)' : '#666'};
`;

const Username = styled.span`
  font-weight: 600;
  color: ${props => props.color};
`;

const Timestamp = styled.span`
  opacity: 0.8;
`;

const TypingIndicator = styled.div`
  padding: 10px 20px;
  color: #666;
  font-style: italic;
  font-size: 0.9rem;
`;

const WelcomeMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #666;
`;

const WelcomeTitle = styled.h2`
  color: #333;
  margin-bottom: 10px;
`;

const WelcomeText = styled.p`
  margin: 0;
  line-height: 1.6;
`;

const ChatMessages = ({ messages, currentUser, typingUsers }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isOwnMessage = (message) => {
    return message.userId === currentUser?.id;
  };

  if (messages.length === 0) {
    return (
      <MessagesContainer>
        <WelcomeMessage>
          <WelcomeTitle>Welcome to the chat! 🎉</WelcomeTitle>
          <WelcomeText>
            Start the conversation by sending your first message below.
          </WelcomeText>
        </WelcomeMessage>
      </MessagesContainer>
    );
  }

  return (
    <MessagesContainer>
      {messages.map((message) => (
        <Message key={message.id} isOwn={isOwnMessage(message)}>
          <MessageBubble 
            isOwn={isOwnMessage(message)}
            color={message.color}
          >
            <MessageText>{message.text}</MessageText>
            <MessageInfo isOwn={isOwnMessage(message)}>
              <Username color={message.color}>
                {message.username}
              </Username>
              <Timestamp>
                {formatTime(message.timestamp)}
              </Timestamp>
            </MessageInfo>
          </MessageBubble>
        </Message>
      ))}
      
      {typingUsers.length > 0 && (
        <TypingIndicator>
          {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
        </TypingIndicator>
      )}
      
      <div ref={messagesEndRef} />
    </MessagesContainer>
  );
};

export default ChatMessages;
