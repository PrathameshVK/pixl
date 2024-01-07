import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 0.25rem;
  width: ${({ width }) => width || "40vw"};
  height: ${({ height }) => height || "80vh"};
  overflow: auto;
  animation: fade-in 0.3s ease-in-out;
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-1.5rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Modal = ({ children, height, width }) => {
  return (
    <Container>
      <Content height={height} width={width}>
        {children}
      </Content>
    </Container>
  );
};

export default Modal;
