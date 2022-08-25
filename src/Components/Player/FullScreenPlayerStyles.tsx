import styled from "styled-components";
import { motion } from "framer-motion";
import { DEVICE_SIZES } from "../../constants";

export const FullScreenPlayerContainer = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  position: absolute;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  @media (max-width: ${DEVICE_SIZES.mobileS}) {
    justify-content: center;
  }
`;

export const BackdropImageContainer = styled.div`
  top: -20px;
  width: 110%;
  height: 110%;
  filter: blur(15px) brightness(0.5);
  background-color: transparent;
  position: absolute;
`;

export const CoverImageContainer = styled.div`
  width: 350px;
  margin-top: 20px;
  height: 350px;
  position: relative;
  @media (max-width: ${DEVICE_SIZES.tablet}) {
    width: 300px;
    height: 300px;
  }
  @media (max-width: ${DEVICE_SIZES.mobileS}) {
    width: 200px;
    height: 200px;
    flex-grow: 1;
  }
`;

export const Title = styled.h3`
  font-weight: 600;
  max-width: 1000px;
  font-size: 2.125rem;
  margin: 0;
  color: ${(props) => props.theme.light};
  text-align: center;
  padding: 20px 40px;
  position: relative;
  z-index: 1;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    font-size: 2rem;
  }
  @media (max-width: ${DEVICE_SIZES.mobileL}) {
    font-size: 1.6rem;
  }
  @media (max-width: ${DEVICE_SIZES.mobileM}) {
    font-size: 1.2rem;
  }
`;

export const ArtistText = styled.h4`
  font-weight: 500;
  text-align: justify;
  font-size: 1.125rem;
  color: ${(props) => props.theme.light};
  margin: 10px 0px 0px 0px;
  max-width: 350px;
  min-width: 0px;
  overflow-wrap: anywhere;
  @media (max-width: ${DEVICE_SIZES.mobileS}) {
    width: 200px;
    font-size: 1rem;
  }
`;

export const AlbumText = styled.h5`
  margin: 0;
  text-align: justify;
  font-weight: 300;
  font-size: 0.9375rem;
  color: ${(props) => props.theme.light};
  max-width: 350px;
  @media (max-width: ${DEVICE_SIZES.mobileS}) {
    width: 200px;
    font-size: 0.8rem;
  }
`;
