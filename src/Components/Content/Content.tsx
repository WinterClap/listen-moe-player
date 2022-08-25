import React from "react";
import { useDispatch } from "react-redux";
import { NotificationManager } from "../Notifications";
import { Section } from "./Section";
import { Sidebar } from "./Sidebar";
import { ContentContainer } from "./styles";

const Content = () => {
  const dispatch = useDispatch();

  return (
    <ContentContainer>
      <Sidebar />
      <Section />
      <NotificationManager />
    </ContentContainer>
  );
};

export default Content;
