import styled from "styled-components";

export const LayoutBlock = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height || "100%"};
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
