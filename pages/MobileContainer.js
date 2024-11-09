import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background-color: #f5f8f5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
`;

const ContentWrapper = styled.div`
  width: 360px;
  height: 740px;
  background-color: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  position: relative;
  display: flex;
  flex-direction: column;

  @media (max-width: 360px) {
    width: 100vw;
    height: 100vh;
  }
`;

const Header = styled.header`
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  color: white;
  padding: 0.5rem 0.5rem;
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 100;
  
  h1 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }
  
  p {
    opacity: 0.9;
    font-size: 0.9rem;
    line-height: 1.4;
  }
`;

const MobileContainer = ({ children }) => {
  return (
    <Container>
      <ContentWrapper>
        <Header>
          <h1>검사 항목 및 수수료 안내</h1>
        </Header>
        {children}
      </ContentWrapper>
    </Container>
  );
};

export default MobileContainer;
