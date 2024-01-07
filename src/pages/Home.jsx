import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import hero from "../assets/hero.webp";
import { Text } from "../common/Headings";
import { LayoutBlock } from "../common/styles";
import PageLayout from "../components/PageLayout";

const HeroImage = styled.img`
  width: 80%;
  height: auto;
  aspect-ratio: 1;
`;

const IntroTextBlock = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 0 0 10%;
  gap: 1.5rem;
`;

const StartCTA = styled.button`
  width: fit-content;
  background-color: white;
  border: 2px solid black;
  padding: 1rem 2rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: 700;
  transition: 0.2s;
  &:hover {
    -webkit-box-shadow: -6px 6px 0px 0px rgba(0, 0, 0, 1);
    -moz-box-shadow: -6px 6px 0px 1px rgba(0, 0, 0, 1);
    box-shadow: -6px 6px 0px 1px rgba(0, 0, 0, 1);
  }
`;

const Homepage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/draw");
  };

  return (
    <PageLayout>
      <LayoutBlock width="50%">
        <IntroTextBlock>
          <Text fontSize="4rem" bold>
            P
            <Text fontSize="4rem" bold color="red">
              i
            </Text>
            xel Art Made Simple
          </Text>
          <Text fontSize="1.5rem" color="#61677A">
            So easy, even your grandma could use it
          </Text>
          <StartCTA onClick={handleStart}>Get Pixelated</StartCTA>
        </IntroTextBlock>
      </LayoutBlock>
      <LayoutBlock width="40%">
        <HeroImage src={hero} alt="hero-img" />
      </LayoutBlock>
    </PageLayout>
  );
};

export default Homepage;
