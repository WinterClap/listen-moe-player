import styled from "styled-components";

/** Layout Components */
interface FlexComponentInterface {
  m?: string;
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  alignItems?: "stretch" | "flex-start" | "flex-end" | "center" | "baseline";
  p?: string;
  flexWrap?: "wrap" | "nowrap";
  w?: string;
  h?: string;
  pos?: "absolute" | "relative";
}

export const Row = styled.div<FlexComponentInterface>`
  flex-direction: row;
  margin: ${(props) => props.m || "0px"};
  justify-content: ${(props) => props.justifyContent || "center"};
  align-items: ${(props) => props.alignItems || "center"};
  padding: ${(props) => props.p || "0px"};
  flex-wrap: ${(props) => props.flexWrap || "nowrap"};
  width: ${(props) => props.w || "auto"};
  height: ${(props) => props.h || "auto"};
  position: ${(props) => props.pos || "relative"};
`;
export const Col = styled.div<FlexComponentInterface>`
  margin: ${(props) => props.m || "0px"};
  justify-content: ${(props) => props.justifyContent || "center"};
  align-items: ${(props) => props.alignItems || "center"};
  padding: ${(props) => props.p || "0px"};
  flex-wrap: ${(props) => props.flexWrap || "nowrap"};
  width: ${(props) => props.w || "auto"};
  height: ${(props) => props.h || "auto"};
  position: ${(props) => props.pos || "relative"};
`;
