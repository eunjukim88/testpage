import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const ContentWrapper = styled.div`
  width: 360px;
  height: 740px;
  background-color: white;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border-radius: 12px;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 360px) {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
`;

const Header = styled.header`
  background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
  color: white;
  padding: 1rem;
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  
  h1 {
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: -0.025em;
  }
`;

const MobileContainer = ({ children }) => {
  return (
    <Container>
      <ContentWrapper>
        <Header>
          <h1>접수앱</h1>
        </Header>
        {children}
      </ContentWrapper>
    </Container>
  );
};

export default MobileContainer;
