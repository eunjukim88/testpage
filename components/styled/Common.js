import styled from 'styled-components';

export const SearchBar = styled.div`
  padding: 1rem;
  background: white;
  border-bottom: 1px solid #eee;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const ApplicationList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

export const ApplicationCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  }

  h3 {
    font-size: 1.125rem;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }
`;

export const StatusBadge = styled.span`
  background: ${props => props.status === '접수완료' ? '#22c55e' : '#eab308'};
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: -0.025em;
`;

export const ProgressStatus = styled.div`
  margin-top: 0.5rem;
  color: #666;
`;

export const Notes = styled.div`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #666;
`;

export const StatusSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-left: 0.5rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: #0ea5e9;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #0284c7;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
  }
`;

export const LogoutButton = styled(Button)`
  background: #ef4444;
  border-radius: 0;
  margin-top: auto;
  font-weight: 600;

  &:hover {
    background: #dc2626;
  }
`;

export const PageTitle = styled.h2`
  padding: 1rem;
  margin: 0;
  background: white;
  border-bottom: 1px solid #eee;
`;

export const AddButton = styled.button`
  position: fixed;
  bottom: 5rem;
  right: 1rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: #2ecc71;
  color: white;
  border: none;
  font-size: 2rem;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;

  &:hover {
    background: #27ae60;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #0ea5e9;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    min-height: 100px;
    resize: vertical;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin: 0;
  background: white;
  border-bottom: 1px solid #eee;
`;

export const AddButtonInline = styled.button`
  padding: 0.5rem 1rem;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background: #27ae60;
  }
`;