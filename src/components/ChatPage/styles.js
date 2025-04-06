import styled, { keyframes } from 'styled-components';

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 200px);
  max-width: 900px;
  margin: 2rem auto;
  background-color: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  transition: var(--transition-normal);
`;

export const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.75rem;
  background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
  color: white;
`;

export const ChatTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.5px;
`;

export const NurseInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const NurseAvatar = styled.div`
  width: 44px;
  height: 44px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.4);
`;

export const NurseDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NurseName = styled.span`
  font-weight: 600;
  font-size: 1rem;
`;

export const NurseStatus = styled.span`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  gap: 4px;
  
  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #4ade80;
    border-radius: 50%;
  }
`;

export const ChatMessages = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  background-color: var(--neutral-100);
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--neutral-100);
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--neutral-300);
    border-radius: var(--radius-full);
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: var(--neutral-400);
  }
`;

export const Message = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 75%;
  animation: messageAnimation 0.3s ease forwards;
  
  @keyframes messageAnimation {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  &.nurse, &.assistant {
    align-self: flex-start;
  }
  
  &.patient, &.user {
    align-self: flex-end;
  }
`;

export const MessageContent = styled.div`
  padding: 1rem 1.25rem;
  border-radius: 16px;
  margin-bottom: 0.3rem;
  box-shadow: var(--shadow-sm);
  line-height: 1.5;
  
  ${Message}.nurse &, ${Message}.assistant & {
    background-color: white;
    border-bottom-left-radius: 4px;
    color: var(--neutral-800);
  }
  
  ${Message}.patient &, ${Message}.user & {
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    color: white;
    border-bottom-right-radius: 4px;
  }
`;

export const MessageTime = styled.span`
  font-size: 0.7rem;
  color: var(--neutral-500);
  align-self: flex-end;
  margin-top: 0.2rem;
`;

export const ChatInput = styled.form`
  display: flex;
  padding: 1.25rem;
  background-color: white;
  border-top: 1px solid var(--neutral-200);
`;

export const InputField = styled.input`
  flex: 1;
  padding: 0.9rem 1.25rem;
  border: 1px solid var(--neutral-300);
  border-radius: var(--radius-full);
  outline: none;
  font-size: 1rem;
  transition: var(--transition-normal);
  
  &:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 2px var(--primary-light);
  }
  
  &:disabled {
    background-color: var(--neutral-100);
    cursor: not-allowed;
  }
`;

export const SendButton = styled.button`
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  border: none;
  border-radius: var(--radius-full);
  padding: 0 1.5rem;
  margin-left: 0.75rem;
  cursor: pointer;
  font-weight: 600;
  transition: var(--transition-normal);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    background: var(--neutral-400);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

// Animation for the typing indicator
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

export const TypingIndicator = styled.div`
  display: flex;
  padding: 0.9rem 1.2rem;
  background-color: white;
  border-radius: 16px;
  border-bottom-left-radius: 4px;
  width: fit-content;
  box-shadow: var(--shadow-sm);
  
  span {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: var(--primary-light);
    border-radius: 50%;
    margin: 0 3px;
    animation: ${bounce} 1.2s infinite;
    
    &:nth-child(1) {
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
`;

export const ImageContainer = styled.div`
  margin-top: 1rem;
  max-width: 100%;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  background-color: var(--neutral-100);
  position: relative;
  
  &::before {
    content: '';
    display: block;
    padding-top: 75%; /* Maintain aspect ratio */
  }
`;

export const GeneratedImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.03);
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.75rem;
  background-color: white;
  border-top: 1px solid var(--neutral-200);
`;

export const ActionButton = styled.button`
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background-color: var(--neutral-200);
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-normal);
  margin: 0 0.5rem;
  box-shadow: var(--shadow-sm);
  
  &:hover {
    background-color: var(--neutral-300);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  
  &.active {
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    color: white;
  }
`; 