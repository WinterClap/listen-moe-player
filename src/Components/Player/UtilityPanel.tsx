import IonIcon from "@reacticons/ionicons";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { theme } from "../../../theme";
import useVolumeControl from "../../hooks/useVolumeControl";
import { RootState } from "../../store";
import { setShouldShowFullScreenPlayer } from "../../store/playerMoeSlice";
import { IconContainer } from "../common";
import { UtilityPanelContainer } from "./styles";
import { VolumeControl } from "./VolumeControl";

interface UtilityPanelProps {}

export const UtilityPanel = ({}: UtilityPanelProps) => {
  const dispatch = useDispatch();
  const [shouldBeClickeable] = useVolumeControl();
  const shouldShowFullScreenPlayer = useSelector((state: RootState) => state.player.shouldShowFullScreenPlayer);

  const onListIconPressed = () => {
    dispatch(setShouldShowFullScreenPlayer(!shouldShowFullScreenPlayer));
  };

  return (
    <UtilityPanelContainer>
      <VolumeControl clickeable={shouldBeClickeable} />
      <IconContainer
        $mobileM="display: none;"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onListIconPressed}
        cursor="pointer"
        size={26}
        tabIndex={0}
        color={theme.light}
      >
        <IonIcon name="list" />
      </IconContainer>
    </UtilityPanelContainer>
  );
};
