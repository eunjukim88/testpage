import styled from 'styled-components';

export const Form = styled.form`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;

  &:disabled {
    background: #ccc;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 0.9rem;
`; 