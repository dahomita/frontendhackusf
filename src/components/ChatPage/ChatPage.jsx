import React, { useState, useEffect, useRef } from 'react';
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
  NurseStatus,
  TypingIndicator,
  GeneratedImage,
  ActionButtons,
  ActionButton,
  ImageContainer
} from './styles';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your FallGuardian AI assistant. How can I help you today?",
      sender: "assistant",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState('text'); // 'text' or 'image'
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const generateAIResponse = async (userMessage) => {
    try {
      setIsLoading(true);
      
      const response = await fetch(`${process.env.API_BASE_URL}/ai/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          prompt: userMessage,
          temperature: 0.7,
          maxTokens: 500
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }
      
      const data = await response.json();
      
      if (data.success && data.response) {
        return data.response;
      } else {
        throw new Error('Invalid response from AI service');
      }
    } catch (error) {
      console.error('Error generating AI response:', error);
      return "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later.";
    } finally {
      setIsLoading(false);
    }
  };
  
  const generateAIImage = async (prompt) => {
    try {
      setIsLoading(true);
      
      const response = await fetch(`${process.env.API_BASE_URL}/ai/image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          prompt: prompt,
          width: 512,
          height: 512
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate image');
      }
      
      const data = await response.json();
      
      if (data.success && data.url) {
        return {
          url: data.url,
          prompt: data.prompt
        };
      } else {
        throw new Error('Invalid response from image generation service');
      }
    } catch (error) {
      console.error('Error generating AI image:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message to chat
    const userMessageObj = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      time: timeString
    };
    
    setMessages(prevMessages => [...prevMessages, userMessageObj]);
    
    const userPrompt = newMessage;
    setNewMessage('');
    
    // Show typing indicator by adding a temporary loading message
    setIsLoading(true);
    
    if (mode === 'text') {
      // Generate AI text response
      const aiResponse = await generateAIResponse(userPrompt);
      
      // Add AI response to chat
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          text: aiResponse,
          sender: 'assistant',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } else if (mode === 'image') {
      // Generate AI image
      const imageResult = await generateAIImage(userPrompt);
      
      if (imageResult) {
        // Add AI image response to chat
        setMessages(prevMessages => [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
            text: `Generated image for: "${imageResult.prompt}"`,
            sender: 'assistant',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            imageUrl: imageResult.url
          }
        ]);
      } else {
        // Add error message if image generation failed
        setMessages(prevMessages => [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
            text: "I'm sorry, I couldn't generate an image for that prompt. Please try a different description.",
            sender: 'assistant',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    }
    
    setIsLoading(false);
  };
  
  const toggleMode = () => {
    setMode(mode === 'text' ? 'image' : 'text');
  };
  
  return (
    <ChatContainer>
      <ChatHeader>
        <ChatTitle>AI Health Assistant</ChatTitle>
        <NurseInfo>
          <NurseAvatar>🤖</NurseAvatar>
          <NurseDetails>
            <NurseName>FallGuardian AI</NurseName>
            <NurseStatus>Online</NurseStatus>
          </NurseDetails>
        </NurseInfo>
      </ChatHeader>
      
      <ChatMessages>
        {messages.map(message => (
          <Message key={message.id} className={message.sender}>
            <MessageContent>
              {message.text}
              {message.imageUrl && (
                <ImageContainer>
                  <GeneratedImage src={message.imageUrl} alt="AI generated image" />
                </ImageContainer>
              )}
            </MessageContent>
            <MessageTime>{message.time}</MessageTime>
          </Message>
        ))}
        
        {isLoading && (
          <Message className="assistant">
            <TypingIndicator>
              <span></span>
              <span></span>
              <span></span>
            </TypingIndicator>
          </Message>
        )}
        
        <div ref={messagesEndRef} />
      </ChatMessages>
      
      <ActionButtons>
        <ActionButton 
          onClick={toggleMode}
          className={mode === 'image' ? 'active' : ''}
          title={mode === 'text' ? 'Switch to image generation' : 'Switch to text chat'}
        >
          {mode === 'text' ? '🖼️' : '💬'}
        </ActionButton>
      </ActionButtons>
      
      <ChatInput onSubmit={handleSendMessage}>
        <InputField
          type="text"
          placeholder={mode === 'text' 
            ? "Type your health question..." 
            : "Describe the medical image you want to generate..."}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={isLoading}
        />
        <SendButton 
          type="submit" 
          disabled={isLoading || newMessage.trim() === ''}
        >
          Send
        </SendButton>
      </ChatInput>
    </ChatContainer>
  );
};

export default ChatPage; 