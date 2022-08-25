import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { LISTEN_MOE_STREAM_URL } from "../../hooks/constants";
import { RootState } from "../../store";
import { setCurrentSource, setIsLoading, setIsPlaying } from "../../store/playerMoeSlice";

interface AudioProps {}

const AudioComponent = ({}: AudioProps) => {
  const audio = React.useRef<HTMLAudioElement>(null);
  const { currentSource, volume, musicType, isPlaying } = useSelector((state: RootState) => state.player);
  const dispatch = useDispatch();

  const onPlay = () => {
    dispatch(setIsPlaying(true));
  };

  const onPause = () => {
    dispatch(setIsPlaying(false));
  };

  const onLoadedData = () => {
    dispatch(setIsLoading(false));
  };

  React.useEffect(() => {
    if (currentSource === undefined) {
      dispatch(setIsPlaying(false));
      return audio.current?.pause();
    }
    dispatch(setIsLoading(true));
    audio.current?.play();
  }, [currentSource, dispatch, audio]);

  React.useEffect(() => {
    audio.current!.volume = volume / 100;
  }, [volume, audio]);

  return (
    <audio
      ref={audio}
      onLoadedData={onLoadedData}
      onPause={onPause}
      onPlay={onPlay}
      id="main-stream"
      preload="auto"
      src={currentSource}
    />
  );
};

export default AudioComponent;
