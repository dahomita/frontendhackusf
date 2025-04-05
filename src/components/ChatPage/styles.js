import styled from 'styled-components';

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 200px);
  max-width: 800px;
  margin: 2rem auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: #1A2238;
  color: white;
`;

export const ChatTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

export const NurseInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const NurseAvatar = styled.div`
  width: 40px;
  height: 40px;
  background-color: #4CAF50;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

export const NurseDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NurseName = styled.span`
  font-weight: bold;
`;

export const NurseStatus = styled.span`
  font-size: 0.8rem;
  color: #4CAF50;
`;

export const ChatMessages = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #f5f5f5;
`;

export const Message = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 70%;
  
  &.nurse {
    align-self: flex-start;
  }
  
  &.patient {
    align-self: flex-end;
  }
`;

export const MessageContent = styled.div`
  padding: 0.8rem 1rem;
  border-radius: 18px;
  margin-bottom: 0.3rem;
  
  ${Message}.nurse & {
    background-color: white;
    border-bottom-left-radius: 4px;
  }
  
  ${Message}.patient & {
    background-color: #4CAF50;
    color: white;
    border-bottom-right-radius: 4px;
  }
`;

export const MessageTime = styled.span`
  font-size: 0.7rem;
  color: #888;
  align-self: flex-end;
`;

export const ChatInput = styled.form`
  display: flex;
  padding: 1rem;
  background-color: white;
  border-top: 1px solid #eee;
`;

export const InputField = styled.input`
  flex: 1;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
  font-size: 1rem;
  
  &:focus {
    border-color: #4CAF50;
  }
`;

export const SendButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0 1.5rem;
  margin-left: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #388E3C;
  }
`; 