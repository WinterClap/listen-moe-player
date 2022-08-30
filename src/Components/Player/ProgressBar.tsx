import React, { useRef } from "react";
import { MovableDot, ProgressBarContainer, ProgressBarFiller } from "./styles";

interface ProgressBarProps {
  duration: number | undefined;
  shouldPersist?: boolean;
  startTime?: string;
}

export const ProgressBar = ({ duration, shouldPersist, startTime }: ProgressBarProps) => {
  const isMounted = useRef<boolean>(false);
  const PROGRESS_BAR_WIDTH = "150px";
  const tempDuration = useRef<number | null>(null);
  const [secondsPassed, setSecondsPassed] = React.useState<number>(
    startTime ? Math.round((new Date().valueOf() - new Date(startTime).valueOf()) / 1000) : 0
  );
  const [offsetX, setOffsetX] = React.useState<number>(
    duration ? (secondsPassed * Number(PROGRESS_BAR_WIDTH.replace("px", "")) - 5) / duration : 0
  );

  console.log(secondsPassed);
  console.log(offsetX);

  // console.log("secondsPassed: ", secondsPassed);

  React.useEffect(() => {
    let interval: NodeJS.Timer;
    const handleTime = () => {
      interval = setInterval(() => {
        setSecondsPassed((prev) => prev + 1);
      }, 1000);
    };
    // if (!isMounted.current) {
    //   isMounted.current = true;
    //   return;
    // }
    handleTime();
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    if (secondsPassed === tempDuration.current) {
      setOffsetX(0);
      setSecondsPassed(0);
    }
  }, [secondsPassed]);

  // React.useEffect(() => {
  //   duration && setOffsetX((prev) => prev + (Number(PROGRESS_BAR_WIDTH.replace("px", "")) - 5) / duration);
  // }, [duration, secondsPassed]);

  React.useEffect(() => {
    if (tempDuration.current === null) tempDuration.current = duration!;
  }, [duration]);

  React.useEffect(() => {
    setOffsetX(duration ? (secondsPassed * Number(PROGRESS_BAR_WIDTH.replace("px", "")) - 5) / duration : 0);
  }, [duration, secondsPassed]);

  React.useEffect(() => {
    setSecondsPassed(startTime ? Math.round((new Date().valueOf() - new Date(startTime).valueOf()) / 1000) : 0);
  }, [startTime]);

  return (
    <ProgressBarContainer $shouldPersist={shouldPersist} w={PROGRESS_BAR_WIDTH}>
      <ProgressBarFiller offsetX={offsetX} />
      <MovableDot offsetX={offsetX} />
    </ProgressBarContainer>
  );
};
