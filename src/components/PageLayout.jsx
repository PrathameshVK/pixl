import React, { useState } from "react";
import { FaGithub, FaLinkedinIn, FaQuestion } from "react-icons/fa6";
import { FiX } from "react-icons/fi";
import { SiGmail } from "react-icons/si";
import styled from "styled-components";
import { isMobile } from "react-device-detect";

import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";
import oops from "../assets/oops.webp";
import { Text } from "../common/Headings";
import Modal from "./Modal";

const Container = styled.div`
  height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  width: 100%;
  padding: 1.5rem;
`;

const Logo = styled.img`
  width: 8rem;
  height: auto;
  cursor: pointer;
`;

const Content = styled.div`
  display: ${(props) => (props.isMobile ? "none" : "flex")};
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const AboutMe = styled.div`
  padding: 0.5rem;
  border-radius: 50%;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid black;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  a {
    text-decoration: none;
    color: black;
  }
`;

const NewFileInfo = styled.div`
  display: flex;
  width: 20rem;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const Oops = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
    text-align: center;
  }
`;

const PageLayout = ({ children }) => {
  const [showAboutModal, setShowAboutModal] = useState(false);

  const toggleAboutModal = () => {
    setShowAboutModal(!showAboutModal);
  };

  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (window.location.pathname === "/draw") {
      navigate("/");
    }
  };

  return (
    <Container>
      {showAboutModal && (
        <Modal height="fit-content" width="fit-content">
          <ModalHeader>
            <Text fontSize="1.25rem" bold>
              About
            </Text>
            <FiX size="1.25rem" onClick={toggleAboutModal} cursor="pointer" />
          </ModalHeader>
          <NewFileInfo>
            <Text>Made with ❤️ by Prathamesh Kulkarni</Text>
            <SocialIcons>
              <a
                href="https://github.com/PrathameshVK"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub size="1.5rem" cursor="pointer" />
              </a>
              <a
                href="https://www.linkedin.com/in/prathamesh-kulkarni-42985317a/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedinIn size="1.5rem" cursor="pointer" />
              </a>
              <a
                href="mailto:prathameshvk50@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                <SiGmail size="1.5rem" cursor="pointer" />
              </a>
            </SocialIcons>
          </NewFileInfo>
        </Modal>
      )}
      <Header>
        <Logo src={logo} alt="logo" onClick={handleLogoClick} />
      </Header>
      <Oops>
        <img src={oops} alt="oops-cat" width="60%" />
        <Text fontSize="3rem" bold>
          OOPS!
        </Text>
        <Text>
          We currently don't have mobile version of our app! Our developer was
          too lazy to build one.
        </Text>
        <Text>Please use your PC to use this app.</Text>
      </Oops>
      <Content isMobile={isMobile}>{children}</Content>
      <AboutMe onClick={toggleAboutModal}>
        <FaQuestion size="1.5rem" color="white" />
      </AboutMe>
    </Container>
  );
};

export default PageLayout;
