import React, { ChangeEvent, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { useTheme } from "styled-components";
import { RootState } from "../../store";
import { setShouldShowVolumeRange, setVolume } from "../../store/playerMoeSlice";
import { IconContainer } from "../common";
import { getVolumeIcon } from "./constants";
import { Filler, SliderContainer, StyledInputRange, VolumeControlContainer } from "./styles";

const FILLER_WIDTH = { nonClickeable: 50, clickeable: 90 };
const VOLUME_MAX = 100;
interface VolumeControlProps {
  clickeable?: boolean;
}

export const VolumeControl = ({ clickeable = false }: VolumeControlProps) => {
  const theme = useTheme();
  const isFirstRender = React.useRef<boolean | null>(false);
  const { volume, shouldShowVolumeRange } = useSelector((state: RootState) => state.player);
  const [showVolumeRangeFromTap, setShowVolumeRangeFromTap] = React.useState<boolean>(false);
  const [tempVolume, setTempVolume] = React.useState<number>(volume);
  const [shouldExpandContainer, setShouldExpandContainer] = React.useState<boolean>(false);
  const icon = useMemo(() => getVolumeIcon(volume), [volume]);
  const dispatch = useDispatch();

  const onWindowResize = React.useCallback(() => {
    showVolumeRangeFromTap && setShowVolumeRangeFromTap(false);
  }, [showVolumeRangeFromTap]);

  const onIconClick = () => {
    if (!clickeable) {
      if (volume !== 0) return dispatch(setVolume(0));
      return dispatch(setVolume(tempVolume));
    }
    setShowVolumeRangeFromTap(!showVolumeRangeFromTap);
  };

  const onVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setVolume(Number(event.target.value)));
    setTempVolume(Number(event.target.value));
  };

  const onIconFocus = () => {
    if (clickeable) {
      setShowVolumeRangeFromTap(!isFirstRender.current ? false : true);
      return;
    }
    dispatch(setShouldShowVolumeRange(true));
    setShouldExpandContainer(true);
  };

  const onIconBlur = () => {
    if (clickeable) {
      setShowVolumeRangeFromTap(false);
      return;
    }
    dispatch(setShouldShowVolumeRange(false));
    setShouldExpandContainer(false);
  };

  const onHoverStart = () => {
    if (clickeable) return;
    dispatch(setShouldShowVolumeRange(true));
  };

  React.useEffect(() => {
    if (!isFirstRender.current && showVolumeRangeFromTap) isFirstRender.current = true;
    return;
  }, [showVolumeRangeFromTap]);

  React.useEffect(() => {
    window.addEventListener("resize", onWindowResize);
    return () => window.removeEventListener("resize", onWindowResize);
  }, [onWindowResize]);

  return (
    <>
      <VolumeControlContainer
        onHoverStart={onHoverStart}
        onHoverEnd={(!clickeable && onIconBlur) || undefined}
        animate={{ ...(shouldExpandContainer && { width: 100 }) }}
        whileHover={{ transformOrigin: "0% 0%", ...(!clickeable && { width: 100 }) }}
      >
        <IconContainer
          tabIndex={0}
          onClick={onIconClick}
          onFocus={onIconFocus}
          m="0px 10px 0px 0px"
          cursor="pointer"
          size={22}
          whileHover={{ scale: 1.01 }}
          color={theme.light}
        >
          {icon}
        </IconContainer>
        <SliderContainer>
          {shouldShowVolumeRange && (
            <>
              <StyledInputRange
                tabIndex={0}
                type="range"
                step={1}
                max={VOLUME_MAX}
                value={volume}
                min={0}
                onChange={onVolumeChange}
              />
              <Filler animate={{ width: (volume * FILLER_WIDTH["nonClickeable"]) / 100 }} />
            </>
          )}
        </SliderContainer>
        {showVolumeRangeFromTap && (
          <Absolute>
            <StyledInputRange
              tabIndex={0}
              type="range"
              step={1}
              max={VOLUME_MAX}
              value={volume}
              min={0}
              onChange={onVolumeChange}
            />
            <Filler animate={{ width: (volume * FILLER_WIDTH["clickeable"]) / 100 }} />
          </Absolute>
        )}
      </VolumeControlContainer>
    </>
  );
};

export const Absolute = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -10%;
  left: 50%;
  transform-origin: 0% 0%;
  transform: rotate(-90deg) translate(0%, -50%);
  width: 100px;
`;
