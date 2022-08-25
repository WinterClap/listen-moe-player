import React, { useRef } from "react";
import { MovableDot, ProgressBarContainer, ProgressBarFiller } from "./styles";

interface ProgressBarProps {
  duration: number | undefined;
  shouldPersist?: boolean;
}

export const ProgressBar = ({ duration, shouldPersist }: ProgressBarProps) => {
  const isMounted = useRef<boolean>(false);
  const PROGRESS_BAR_WIDTH = "150px";
  const [secondsPassed, setSecondsPassed] = React.useState<number>(0);
  const [offsetX, setOffsetX] = React.useState<number>(0);

  // console.log("secondsPassed: ", secondsPassed);

  React.useEffect(() => {
    let interval: NodeJS.Timer;
    const handleTime = () => {
      interval = setInterval(() => {
        setSecondsPassed((prev) => prev + 1);
      }, 1000);
    };
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    handleTime();
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    setOffsetX(0);
    setSecondsPassed(0);
  }, [duration]);

  React.useEffect(() => {
    duration && setOffsetX((prev) => prev + (Number(PROGRESS_BAR_WIDTH.replace("px", "")) - 5) / duration);
  }, [duration, secondsPassed]);

  return (
    <ProgressBarContainer $shouldPersist={shouldPersist} w={PROGRESS_BAR_WIDTH}>
      <ProgressBarFiller offsetX={offsetX} />
      <MovableDot offsetX={offsetX} />
    </ProgressBarContainer>
  );
};
