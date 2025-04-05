import React, { useState } from 'react';
import { 
  ChatContainer, 
  ChatHeader, 
  ChatTitle, 
  ChatMessages, 
  Message, 
  MessageContent, 
  MessageTime, 
  ChatInput, 
  InputField, 
  SendButton,
  NurseInfo,
  NurseAvatar,
  NurseDetails,
  NurseName,
  NurseStatus
} from './styles';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I assist you today?",
      sender: "nurse",
      time: "10:00 AM"
    },
    {
      id: 2,
      text: "I'm feeling a bit dizzy today.",
      sender: "patient",
      time: "10:05 AM"
    },
    {
      id: 3,
      text: "I'm sorry to hear that. Have you taken your medication this morning?",
      sender: "nurse",
      time: "10:06 AM"
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        text: newMessage,
        sender: 'patient',
        time: timeString
      }
    ]);
    
    setNewMessage('');
    
    // Simulate nurse response after 1 second
    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          text: "Thank you for letting me know. I'll check on you in a few minutes.",
          sender: 'nurse',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1000);
  };
  
  return (
    <ChatContainer>
      <ChatHeader>
        <ChatTitle>Chat with Nurse</ChatTitle>
        <NurseInfo>
          <NurseAvatar>👩‍⚕️</NurseAvatar>
          <NurseDetails>
            <NurseName>Dr. Smith</NurseName>
            <NurseStatus>Online</NurseStatus>
          </NurseDetails>
        </NurseInfo>
      </ChatHeader>
      
      <ChatMessages>
        {messages.map(message => (
          <Message key={message.id} className={message.sender}>
            <MessageContent>{message.text}</MessageContent>
            <MessageTime>{message.time}</MessageTime>
          </Message>
        ))}
      </ChatMessages>
      
      <ChatInput onSubmit={handleSendMessage}>
        <InputField
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <SendButton type="submit">Send</SendButton>
      </ChatInput>
    </ChatContainer>
  );
};

export default ChatPage; 