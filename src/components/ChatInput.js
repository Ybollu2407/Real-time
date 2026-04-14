import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  padding: 20px;
  background: white;
  border-top: 1px solid #e1e5e9;
`;

const InputForm = styled.form`
  display: flex;
  gap: 12px;
  align-items: flex-end;
`;

const InputWrapper = styled.div`
  flex: 1;
  position: relative;
`;

const Input = styled.textarea`
  width: 100%;
  min-height: 50px;
  max-height: 120px;
  padding: 15px 20px;
  border: 2px solid #e1e5e9;
  border-radius: 25px;
  font-size: 1rem;
  font-family: inherit;
  resize: none;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`;

const SendButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 20px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  min-width: 80px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const CharacterCount = styled.div`
  position: absolute;
  bottom: -20px;
  right: 0;
  font-size: 0.8rem;
  color: #666;
`;

const ChatInput = ({ onSendMessage, onTyping }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const newMessage = e.target.value;
    setMessage(newMessage);
    
    // Handle typing indicator
    if (!isTyping) {
      setIsTyping(true);
      onTyping(true);
    }
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      onTyping(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      
      // Stop typing indicator
      setIsTyping(false);
      onTyping(false);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const isMessageValid = message.trim().length > 0 && message.trim().length <= 500;

  return (
    <InputContainer>
      <InputForm onSubmit={handleSubmit}>
        <InputWrapper>
          <Input
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            maxLength={500}
            rows={1}
          />
          <CharacterCount>
            {message.length}/500
          </CharacterCount>
        </InputWrapper>
        
        <SendButton 
          type="submit" 
          disabled={!isMessageValid}
        >
          Send
        </SendButton>
      </InputForm>
    </InputContainer>
  );
};

export default ChatInput;
