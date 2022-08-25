import React from "react";
import { Container } from "./styles";
import { PlayerPanel } from "./PlayerPanel";
import { Controls } from "./Controls";
import { LivePanel } from "./LivePanel";
import { Row } from "../common";
import { UtilityPanel } from "./UtilityPanel";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { FullScreenPlayer } from "./FullScreenPlayer";
import { AnimatePresence } from "framer-motion";

interface PlayerProps {
  album: string | null;
  artist: string | null;
  coverURL?: string | null;
  title: string;
  duration: number;
  withIteractions?: boolean;
  isRadio?: boolean;
  proggressHandable?: boolean;
  isLoading?: boolean;
}

const Player: React.FC<PlayerProps> = ({
  withIteractions = false,
  isRadio = false,
  artist,
  album,
  coverURL,
  title,
  duration,
  isLoading,
}) => {
  const [progress, setProgress] = React.useState<number>();
  const shouldShowFullScreenPlayer = useSelector((state: RootState) => state.player.shouldShowFullScreenPlayer);

  if (isRadio) {
    return (
      <>
        <AnimatePresence exitBeforeEnter>
          {shouldShowFullScreenPlayer ? (
            <FullScreenPlayer
              isRadio={isRadio}
              key={"FullScreenPlayer"}
              album={album}
              artist={artist}
              title={title}
              duration={duration}
              coverURL={coverURL}
            />
          ) : (
            <Container initial={{ y: "100%" }} animate={{ y: 0 }} $w="100%">
              <PlayerPanel artist={artist} album={album} title={title} coverURL={coverURL} />
              <Row w="100%">
                <Controls isRadio />
                <LivePanel duration={duration} />
              </Row>
              <UtilityPanel />
            </Container>
          )}
        </AnimatePresence>
      </>
    );
  }

  return <Container></Container>;
};

export default Player;
