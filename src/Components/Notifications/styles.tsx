import { motion } from "framer-motion";
import styled from "styled-components";
import { DEVICE_SIZES } from "../../constants";

export const NotificationManagerContainer = styled(motion.div)`
  display: flex;
  padding-right: 5px;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  right: 0;
  bottom: 0;
  margin-bottom: 75px;
  z-index: 2;
  flex-direction: column;
`;

export const NotificationContainer = styled(motion.div)<{ $colors: { mainColor: string; dimmedColor: string } }>`
  min-width: 200px;
  width: 300px;
  padding: 10px;
  border-radius: 12px;
  background-color: ${(props) => props.$colors.mainColor};
  border: 2px solid ${(props) => props.$colors.dimmedColor};
  font-size: 0.9rem;

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  p {
    margin: 0;
    font-weight: 800;
    color: #ffffff;
    max-height: 60px;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media (max-width: ${DEVICE_SIZES.mobileL}) {
    font-size: 0.8rem;
    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }

  @media (max-width: ${DEVICE_SIZES.mobileS}) {
    width: 150px;
  }
`;
