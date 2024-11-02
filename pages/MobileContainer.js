import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MobileWrapper = styled.div`
  width: 540px;
  height: 960px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const MobileContainer = ({ children }) => {
  return (
    <Container>
      <MobileWrapper>
        {children}
      </MobileWrapper>
    </Container>
  );
};

export default MobileContainer;