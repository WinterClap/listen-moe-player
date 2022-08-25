import { AnimatePresence } from "framer-motion";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LISTEN_MOE_STREAM_URL } from "../../../hooks/constants";
import { RootState } from "../../../store";
import { setCurrentSource, setMusicType } from "../../../store/playerMoeSlice";
import { SwitchWrapper, SwitchText, SwitchContainer, Handle } from "./styles";

interface SwitchProps {
  isSideBarCollapsed: boolean;
}

export const Switch = ({ isSideBarCollapsed }: SwitchProps) => {
  const musicType = useSelector((state: RootState) => state.player.musicType);
  const dispatch = useDispatch();

  const onSwitchMusicTypeClick = () => {
    if (musicType === "jpop") {
      dispatch(setMusicType("kpop"));
      dispatch(setCurrentSource(LISTEN_MOE_STREAM_URL["kpop"]));
      return;
    }
    dispatch(setMusicType("jpop"));
    dispatch(setCurrentSource(LISTEN_MOE_STREAM_URL["jpop"]));
  };

  return (
    <AnimatePresence>
      {!isSideBarCollapsed && (
        <SwitchWrapper
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0, width: 0 }}
          key="sidebar-switch"
        >
          <SwitchText $isSelected={musicType === "jpop"}>J-pop</SwitchText>
          <SwitchContainer
            title="Switch music type"
            onClick={onSwitchMusicTypeClick}
            tabIndex={0}
            role="switch"
            $isJpop={musicType === "jpop"}
          >
            <Handle layout />
          </SwitchContainer>
          <SwitchText $isSelected={musicType === "kpop"}>K-pop</SwitchText>
        </SwitchWrapper>
      )}
    </AnimatePresence>
  );
};
