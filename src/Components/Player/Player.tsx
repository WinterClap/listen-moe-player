import { Container } from "./styles";
import React from "react";

interface PlayerProps {
  album: string;
  coverURL?: string;
  title: string;
  duration: number;
  withIteractions?: boolean;
  isRadio?: boolean;
  proggressHandable?: boolean;
}

const Player: React.FC<PlayerProps> = ({ withIteractions = false, isRadio = false }) => {
  const [progress, setProgress] = React.useState<number>();

  return <Container></Container>;
};

export default Player;
