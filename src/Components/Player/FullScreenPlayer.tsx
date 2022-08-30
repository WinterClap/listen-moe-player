import IonIcon from "@reacticons/ionicons";
import React from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "styled-components";
import useVolumeControl from "../../hooks/useVolumeControl";
import { setShouldShowFullScreenPlayer } from "../../store/playerMoeSlice";
import { Col, IconContainer, Row } from "../common";
import { Controls } from "./Controls";
import {
  AlbumText,
  Title,
  BackdropImageContainer,
  CoverImageContainer,
  FullScreenPlayerContainer,
  ArtistText,
} from "./FullScreenPlayerStyles";
import { LivePanel } from "./LivePanel";
import { StyledImage } from "./styles";
import { VolumeControl } from "./VolumeControl";
import coverFallback from "../../../public/blank-dark-cover.png";

interface FullScreenPlayerProps {
  title: string | undefined;
  album: string | null;
  artist: string | null;
  coverURL?: string | null;
  isRadio: boolean | undefined;
  duration: number | undefined;
  startTime?: string;
}

export const FullScreenPlayer = ({
  title,
  album,
  artist,
  coverURL,
  isRadio,
  duration,
  startTime,
}: FullScreenPlayerProps) => {
  const theme = useTheme();
  const [shouldBeClickable] = useVolumeControl();
  const dispatch = useDispatch();

  const onHideIconClick = () => {
    dispatch(setShouldShowFullScreenPlayer(false));
  };

  const onKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key == "Escape") {
        dispatch(setShouldShowFullScreenPlayer(false));
      }
    },
    [dispatch]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <FullScreenPlayerContainer
      layout
      initial={{ y: "100%" }}
      exit={{ y: "100%", transition: { ease: "easeOut", duration: 0.5 } }}
      animate={{ y: 0, transition: { ease: "easeOut", duration: 0.5 } }}
    >
      <Title>{title}</Title>
      <BackdropImageContainer>
        <StyledImage objectFit="cover" src={coverURL || coverFallback} layout="fill" alt="Cover Backdrop image" />
      </BackdropImageContainer>
      <CoverImageContainer>
        <StyledImage objectFit="cover" src={coverURL || coverFallback} layout="fill" alt="Cover Backdrop image" />
      </CoverImageContainer>
      <Col $mobileL="justify-content: flex-end; flex-grow: 1; padding-bottom: 30px;">
        <ArtistText>{artist}</ArtistText>
        {album && <AlbumText>{album}</AlbumText>}
        <Row m="10px 0px 0px 0px" $justifyContent="space-between">
          <Row>
            <Controls isRadio={isRadio} />
            <LivePanel duration={duration} shouldPersist startTime={startTime} />
          </Row>
          <VolumeControl clickeable={shouldBeClickable} />
          <IconContainer
            onClick={onHideIconClick}
            whileTap={{ scale: 1.05 }}
            initial={{ rotate: "-45deg" }}
            whileHover={{ scale: 0.95 }}
            display="flex"
            transform="rotate(-45deg);"
            cursor="pointer"
            size={22}
            color={theme.light}
          >
            <IonIcon name="caret-down-outline" style={{ position: "relative", bottom: -4 }} />
          </IconContainer>
        </Row>
      </Col>
    </FullScreenPlayerContainer>
  );
};
