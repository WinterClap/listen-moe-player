import IonIcon from "@reacticons/ionicons";
import { AnimatePresence, useSpring } from "framer-motion";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { LISTEN_MOE_STREAM_URL } from "../../../hooks/constants";
import { RootState } from "../../../store";
import { setCurrentSource, setMusicType } from "../../../store/playerMoeSlice";
import { IconContainer } from "../../common";
import {
  BrandContainer,
  BrandText,
  Button,
  Handle,
  HeaderContainer,
  SidebarContainer,
  SwitchContainer,
  SwitchText,
  SwitchWrapper,
} from "./styles";
import { Switch } from "./Switch";

export const Sidebar = () => {
  const { musicType } = useSelector((state: RootState) => state.player);
  const [isSidebarCollapsed, setIsSideBarCollapsed] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const sizeSpring = useSpring(50);

  const toggleSidebar = () => {
    sizeSpring.set(25);
    setIsSideBarCollapsed((prevState) => !prevState);
  };

  return (
    <SidebarContainer animate={{ width: isSidebarCollapsed ? "60px" : "200px" }}>
      <HeaderContainer style={{ flexWrap: isSidebarCollapsed ? "wrap" : "nowrap" }}>
        <BrandContainer>
          <AnimatePresence>
            <IconContainer animate={{ fontSize: isSidebarCollapsed ? "40px" : "50px" }} color="#fff">
              <IonIcon name="musical-note" />
            </IconContainer>
            {!isSidebarCollapsed && (
              <BrandText
                key="sidebar-brandtext"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, width: 0 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                Radio
              </BrandText>
            )}
          </AnimatePresence>
        </BrandContainer>
        <IconContainer
          layout
          cursor="pointer"
          onClick={toggleSidebar}
          color="#fff"
          animate={{
            rotate: isSidebarCollapsed ? "180deg" : "0deg",
            margin: isSidebarCollapsed ? "10px auto 0px auto" : "unset",
            fontSize: isSidebarCollapsed ? "30px" : "35px",
          }}
        >
          <IonIcon name="chevron-back-circle" />
        </IconContainer>
      </HeaderContainer>

      <Switch isSideBarCollapsed={isSidebarCollapsed} />
    </SidebarContainer>
  );
};
