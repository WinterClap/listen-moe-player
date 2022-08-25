import { motion } from "framer-motion";
import styled from "styled-components";

export const SidebarContainer = styled(motion.aside)`
  height: 100vh;
  width: 200px;
  background-color: #444444;
  padding: 10px;
  flex-shrink: 0;
`;

export const SwitchWrapper = styled(motion.div)`
  overflow: hidden;
  flex-wrap: nowrap;
  border-radius: 15px;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
`;

export const Handle = styled(motion.span)`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.theme.light};
`;

export const SwitchContainer = styled(motion.div)<{ $isJpop: boolean }>`
  background-color: ${(props) => props.theme.primary};
  background-color: rgba(255, 255, 255, 0.15);
  position: relative;
  border-radius: 15px;
  padding: 5px 5px;
  display: flex;
  width: 50px;
  cursor: pointer;
  justify-content: ${(props) => (props.$isJpop ? "flex-start" : "flex-end")};
`;

export const SwitchText = styled.p<{ $isSelected: boolean }>`
  font-weight: 800;
  font-size: 1rem;
  transition: color 0.2s ease-in-out;
  color: ${(props) => (props.$isSelected ? props.theme.light : "rgba(255,255,255,0.5)")};
`;

export const Button = styled.button<{ $isSelected: boolean }>`
  position: relative;
  background-color: transparent;
  border: none;
  appearance: none;
  display: inline-block;
  color: ${(props) => props.theme.light};
  -webkit-appearance: none;
  -moz-appearance: none;
  text-decoration: none;
  cursor: pointer;
  margin: 0;
  padding: 0.5rem 1rem;
  outline-offset: -10px;
  font-weight: 600;
  font-size: 1rem;
  color: ${(props) => (props.$isSelected ? props.theme.black : props.theme.light)};
`;

export const HeaderContainer = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 0px 20px 0px;
  /* flex-wrap: wrap; */
`;

export const BrandContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const BrandText = styled(motion.h1)`
  font-size: 1.8rem;
  margin: 0;
  display: inline;
`;
