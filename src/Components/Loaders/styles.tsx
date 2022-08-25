import { motion } from "framer-motion";
import styled, { keyframes, css } from "styled-components";

const rotate = keyframes`
    0% {transform: rotate(0deg) scale(0.95)}
    90% {transform: rotate(360deg) scale(1)}
    100% {transform: rotate(360deg) scale(0.95)}
`;
const rotateAnimation = css`
  animation: ${rotate} 0.8s cubic-bezier(0.31, 0.33, 0.2, 0.5) infinite;
`;

export const CircularLoaderContainer = styled(motion.div)<{
  size: number | string;
  color?: string;
  $borderSize: number;
}>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  border-top: ${(props) => `${props.$borderSize}px solid ${props.color || props.theme.black}`};
  ${rotateAnimation};
`;
