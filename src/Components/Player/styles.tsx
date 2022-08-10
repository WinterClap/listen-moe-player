import styled from "styled-components";

export const Container = styled.div<{ $w?: string; h?: string }>`
  width: ${(props) => props.$w || "auto"};
  height: ${(props) => props.h || "auto"};
  position: relative;
  border: 1px solid black;
  padding: 20px 40px;
`;
