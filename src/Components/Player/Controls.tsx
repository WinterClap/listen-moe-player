import { AnimatePresence } from "framer-motion";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useTheme } from "styled-components";
import { LISTEN_MOE_STREAM_URL } from "../../hooks/constants";
import { RootState } from "../../store";
import { setCurrentSource, setIsLoading } from "../../store/playerMoeSlice";
import { IconContainer, Row } from "../common";
import { CircularLoader } from "../Loaders";
import { getControls } from "./constants";
import { ButtonContainer, ControlsContainer } from "./styles";

interface ControlsProps {
  isRadio?: boolean;
}

export const Controls: React.FC<ControlsProps> = ({ isRadio }) => {
  const theme = useTheme();
  const isFirstRender = React.useRef<boolean>(true);
  const dispatch = useDispatch();
  const { isPlaying, isLoading, musicType } = useSelector((state: RootState) => state.player);
  const controlsIcons = React.useCallback(() => getControls(!!isRadio, theme.dark), [isRadio, theme.dark])();

  const onPlayStop = React.useCallback(() => {
    if (isLoading) return;
    if (isPlaying) {
      return dispatch(setCurrentSource(undefined));
    }
    dispatch(setIsLoading(true));
    dispatch(setCurrentSource(LISTEN_MOE_STREAM_URL[musicType]));
  }, [dispatch, isPlaying, musicType, isLoading]);

  const onPlayStopFromKeyboard = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.repeat) return;
      if (event.key === " ") {
        onPlayStop();
      }
    },
    [onPlayStop]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", onPlayStopFromKeyboard);

    return () => document.removeEventListener("keydown", onPlayStopFromKeyboard);
  }, [onPlayStopFromKeyboard]);

  if (isRadio) {
    return (
      <ControlsContainer>
        <Row m="0px 0px 0px 5px" align-items="center">
          <ButtonContainer
            tabIndex={0}
            role="button"
            whileHover={{ ...(!isLoading && { scale: 1.05 }) }}
            whileTap={{ ...(!isLoading && { scale: 0.95 }) }}
            $main
            onClick={onPlayStop}
          >
            <AnimatePresence exitBeforeEnter>
              {isLoading ? (
                <CircularLoader size={"30px"} $borderSize={2} />
              ) : (
                <>
                  {isPlaying ? (
                    <IconContainer
                      cursor="pointer"
                      key="stop"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1, transition: { duration: 0.1 } }}
                      exit={{ opacity: 0, scale: 0, transition: { duration: 0.1 } }}
                      color={theme.dark}
                    >
                      {controlsIcons.stop.icon}
                    </IconContainer>
                  ) : (
                    <IconContainer
                      cursor="pointer"
                      key="play"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1, transition: { duration: 0.1 } }}
                      exit={{ opacity: 0, scale: 0, transition: { duration: 0.1 } }}
                      color={theme.dark}
                    >
                      {controlsIcons.play.icon}
                    </IconContainer>
                  )}
                </>
              )}
            </AnimatePresence>
          </ButtonContainer>
        </Row>
      </ControlsContainer>
    );
  }

  return <ControlsContainer></ControlsContainer>;
};
