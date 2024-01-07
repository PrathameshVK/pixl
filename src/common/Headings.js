import styled from "styled-components";

export const Text = styled.span`
  font-size: ${({ fontSize }) => fontSize || 500};
  font-weight: ${({ bold }) => (bold ? 700 : 500)};
  color: ${({ color }) => color || "black"};
`;
