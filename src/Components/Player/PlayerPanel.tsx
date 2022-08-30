import React from "react";
import {
  ImageContainer,
  MediaInformationContainer,
  PlayerPanelContainer,
  SongDisplayerContainer,
  StyledImage,
  Text,
  Title,
  Waiter,
  WaiterRow,
} from "./styles";
import IonIcon from "@reacticons/ionicons";
import { useTheme } from "styled-components";
import { Col, IconContainer, Row } from "../common";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { setShouldShowFullScreenPlayer } from "../../store/playerMoeSlice";
import { AnimatePresence } from "framer-motion";
import coverFallback from "../../../public/blank-dark-cover.png";

interface PlayerPanelProps {
  artist: string | null;
  album: string | null;
  coverURL?: string | null;
  title: string;
}

export const PlayerPanel: React.FC<PlayerPanelProps> = ({ artist, album, coverURL, title }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [shouldAnimate, setShouldAnimate] = React.useState<boolean>(false);
  const isPlaying = useSelector((state: RootState) => state.player.isPlaying);
  const titleTextWrapperWidth = (300 / 45) * title.length;

  const onImageCoverClick = () => {
    dispatch(setShouldShowFullScreenPlayer(true));
  };

  React.useEffect(() => {
    title.length > 40 ? setShouldAnimate(true) : setShouldAnimate(false);
  }, [title]);

  return (
    <PlayerPanelContainer>
      <ImageContainer onClick={onImageCoverClick} $h="50px" $w="50px" withAnimation={isPlaying}>
        <StyledImage
          $bRadius="50%"
          src={coverURL || coverFallback}
          objectFit="cover"
          layout="fill"
          alt="cover-album-image"
        />
      </ImageContainer>
      <SongDisplayerContainer $spaced={!artist || !title}>
        {title && shouldAnimate ? (
          <MediaInformationContainer>
            <Title w={titleTextWrapperWidth} withAnimation>
              {title}
            </Title>
            {/* <Title w={titleTextWrapperWidth} withAnimation delay={(title.length * 20) / 45 + 5}>
              {title}
            </Title> */}
          </MediaInformationContainer>
        ) : (
          (title && (
            <MediaInformationContainer>
              <Title withAnimation={false}>{title}</Title>
            </MediaInformationContainer>
          )) || (
            <WaiterRow exit={{ opacity: 0, scale: 0 }} key="title-song-fake-row">
              <Waiter w="33%" $bgColor={theme.primary} />
              <Waiter $round $bgColor={theme.primary} />
              <Waiter w="21%" $bgColor={theme.primary} />
              <Waiter w="10%" $bgColor={theme.primary} />
            </WaiterRow>
          )
        )}
        {artist ? (
          <Text>{artist}</Text>
        ) : (
          <WaiterRow exit={{ opacity: 0, scale: 0 }} key="artist-fake-row">
            <Waiter w="20%" $bgColor="gray" />
            <Waiter $round $bgColor="gray" />
            <Waiter w="8%" $bgColor="gray" />
          </WaiterRow>
        )}
      </SongDisplayerContainer>
      <IconContainer
        $mobileM="margin: 0 0 0 10px"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        color={theme.light}
        size={24}
        m="0 10px"
        cursor="pointer"
      >
        <IonIcon aria-label="Add song to favorites" name="heart-outline" />
      </IconContainer>
    </PlayerPanelContainer>
  );
};
