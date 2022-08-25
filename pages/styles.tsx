import styled from "styled-components";

export const Main = styled.main`
  height: 100vh;
  position: relative;
  overflow: hidden;
  color: ${(props) => props.theme.light};
  background-color: ${(props) => props.theme.black};
`;
