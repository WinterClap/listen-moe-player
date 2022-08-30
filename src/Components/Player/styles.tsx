import { motion } from "framer-motion";
import Image from "next/image";
import styled, { keyframes, css } from "styled-components";
import { DEVICE_SIZES } from "../../constants";

export const Container = styled(motion.div)<{ $w?: string; h?: string }>`
  width: ${(props) => props.$w || "auto"};
  height: ${(props) => props.h || "auto"};
  position: absolute;
  padding: 10px 40px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  bottom: 0;
  border-radius: 20px 20px 0px 0px;
  left: 0;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);

  @media (max-width: ${DEVICE_SIZES.mobileM}) {
    padding: 10px 20px;
  }
`;

export const PlayerPanelContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SongDisplayerContainer = styled.div<{ $spaced?: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.$spaced ? "space-around" : "center")};
  align-items: flex-start;
  cursor: pointer;
  margin-left: 20px;
  width: 300px;
  height: 100%;
  flex-direction: column;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    display: none;
  }
`;

export const Waiter = styled(motion.div)<{ $round?: boolean; $bgColor?: string; w?: string }>`
  width: ${(props) => (props.$round ? "16px" : props.w)};
  height: 16px;
  border-radius: ${(props) => (props.$round ? "50%" : "15px")};
  background-color: ${(props) => props.$bgColor};

  &:not(:last-of-type) {
    margin-right: 10px;
  }
`;

export const WaiterRow = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  align-items: center;
`;

const rotationAnimation = keyframes`
  from { transform: rotate(0deg) }
  to { transform: rotate(360deg) }
`;

const animationCss = css`
  animation: ${rotationAnimation} 20s linear infinite;
`;

export const MediaInformationContainer = styled.div`
  cursor: pointer;
  width: 100%;
  height: 20px;
  overflow: hidden;
  position: relative;
`;

const marquee = keyframes`
 0% { transform: translateX(-100%); }
 100% { transform: translateX(100%); };
`;

const marquee2 = keyframes`
 0% { transform: translateX(-100%); }
 100% { transform: translateX(100%); };
`;

const marqueeAnimationCss = css`
  animation: ${marquee} 20s linear infinite;
`;

const marqueeAnimationCss2 = css`
  animation: ${marquee2} 20s linear infinite;
`;

export const ImageContainer = styled.div<{ $color?: string; $w: string; $h: string; withAnimation?: boolean }>`
  width: ${(props) => props.$w};
  position: relative;
  cursor: pointer;
  height: ${(props) => props.$h};
  color: ${(props) => props.$color || "inherit"};
  ${(props) => props.withAnimation && animationCss};
`;

export const StyledImage = styled(Image)<{ $bRadius?: string }>`
  user-select: none;
  ${(props) => props.$bRadius && `border-radius: ${props.$bRadius}`}
`;

export const Title = styled.h3<{ w?: number; delay?: number; withAnimation?: boolean }>`
  width: ${(props) => props.w + "px" || "auto"};
  font-weight: 600;
  font-size: 0.9375rem;
  margin: 0;
  user-select: none;
  position: absolute;
  white-space: nowrap;

  transform: translateX(
    ${(props) => (props.withAnimation ? (props.delay ? -props.w! + "px" : props.w + "px") : "none")}
  );
  ${(props) => (props.withAnimation ? (props.delay ? marqueeAnimationCss2 : marqueeAnimationCss) : "")};
  animation-delay: ${(props) => props.delay || 0}s;
`;

export const Text = styled.p`
  font-weight: 300;
  font-size: 0.8125rem;
  margin: 0;
  user-select: none;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

//  # Controls Components

export const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonContainer = styled(motion.span)<{ $main?: boolean }>`
  display: flex;
  font-size: 1.875rem;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 18px;
  color: ${(props) => (props.$main ? props.theme.black : props.theme.light)};
  background-color: ${(props) => (props.$main ? props.theme.light : "transparent")};
  cursor: pointer;
`;

//  # LivePanel Components

export const LivePanelContainer = styled.div`
  max-width: 300px;
  margin: 0 20px;

  @media (max-width: ${DEVICE_SIZES.mobileM}) {
    margin: 0 10px;
  }
`;

export const LivePanelText = styled.p`
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.75rem;
  font-weight: 600;
`;

export const Dot = styled.div<{ $isPlaying: boolean }>`
  border-radius: 50%;
  width: 8px;
  margin-right: 5px;
  height: 8px;
  background-color: ${(props) => (props.$isPlaying ? props.theme.primary : props.theme.light)};
`;

//  # ProgressBar Component

export const ProgressBarContainer = styled.div<{ w?: string; $shouldPersist?: boolean }>`
  width: ${(props) => props.w || "150px"};
  height: 5px;
  display: flex;
  align-items: center;
  margin-left: 15px;
  position: relative;
  padding: 0px;
  border-radius: 10px;
  background-color: gray;
  overflow-x: hidden;

  @media (max-width: 540px) {
    display: ${(props) => !props.$shouldPersist && "none"};
  }

  @media (max-width: ${DEVICE_SIZES.mobileM}) {
    width: 75px;
  }

  @media (max-width: ${DEVICE_SIZES.mobileS}) {
    display: none;
  }
`;

export const MovableDot = styled.span.attrs<{ offsetX: number }>((props) => ({
  style: { left: `${props.offsetX}px`, backgroundColor: props.theme.light },
}))<{ offsetX: number }>`
  border-radius: 50%;
  height: 5px;
  width: 5px;
  position: absolute;
  cursor: not-allowed;
`;

export const ProgressBarFiller = styled.div.attrs<{ offsetX: number }>((props) => ({
  style: {
    width: `${props.offsetX}px`,
  },
}))<{ offsetX: number }>`
  height: 100%;
  border-radius: 10px;
  background-color: ${(props) => props.theme.primary};
`;

//  UtilityPanel Component

export const UtilityPanelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 230px;
  @media (max-width: ${DEVICE_SIZES.tablet}) {
    font-size: 2rem;
  }
  @media (max-width: ${DEVICE_SIZES.mobileL}) {
    justify-content: flex-end;
  }
`;

export const VolumeControlContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 24px;
  height: 24px;
  position: relative;
  margin-right: 10px;
`;

export const SliderContainer = styled(motion.div)`
  border-radius: 10px;
  display: flex;
  width: 100px;
  height: 2px;
  position: relative;
  align-items: center;
`;

export const Filler = styled(motion.div)`
  position: absolute;
  display: inline-block;
  pointer-events: none;
  height: 5px;
  z-index: 0;
  left: 2px;
  border-radius: 2px;
  background-color: ${(props) => props.theme.primary};
`;

export const StyledInputRange = styled.input`
  width: 100%;
  background-color: transparent;
  appearance: none;
  --webkit-appearance: none;
  position: relative;
  cursor: pointer;
  border-color: transparent;
  color: transparent;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    position: relative;
    z-index: 1;
    margin-top: -5px;
    cursor: pointer;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.light};
  }
  &::-moz-range-thumb {
    -moz-appearance: none;
    margin-top: 0;
    cursor: pointer;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: ${(props) => props.theme.light};
  }
  &::-ms-thumb {
    --ms-progress-appearance: none;
    margin-top: 0;
    cursor: pointer;
    background: ${(props) => props.theme.light};
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    background: gray;
    height: 5px;
    border-radius: 2px;
  }
  &::-moz-range-track {
    width: 100%;
    background: gray;
    height: 8px;
    border-radius: 2px;
  }

  &:before {
    background-color: pink;
  }
`;
