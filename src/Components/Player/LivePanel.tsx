import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Row } from "../common";
import { ProgressBar } from "./ProgressBar";
import { LivePanelContainer, LivePanelText, Dot } from "./styles";

interface LivePanelProps {
  duration: number | undefined;
  shouldPersist?: boolean;
  startTime?: string;
}

export const LivePanel = ({ duration, shouldPersist, startTime }: LivePanelProps) => {
  const isPlaying = useSelector((state: RootState) => state.player.isPlaying);

  return (
    <LivePanelContainer>
      <Row h="100%">
        <Dot $isPlaying={isPlaying} />
        <LivePanelText>live</LivePanelText>
        <ProgressBar shouldPersist={shouldPersist} duration={duration} startTime={startTime} />
      </Row>
    </LivePanelContainer>
  );
};
