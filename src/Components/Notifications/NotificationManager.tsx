import { AnimatePresence, LayoutGroup } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Notification } from "./Notification";
import { NotificationManagerContainer } from "./styles";

interface NotificationProps {}

const NotificationManager = ({}: NotificationProps) => {
  const isFullScreenPlayerVisible = useSelector((state: RootState) => state.player.shouldShowFullScreenPlayer);
  const notifications = useSelector((state: RootState) => state.notification.notifications);

  return (
    <NotificationManagerContainer animate={{ y: isFullScreenPlayerVisible ? 72 : 0 }}>
      <LayoutGroup>
        <AnimatePresence initial={false}>
          {notifications.map(({ text, duration, id, type }, index) => (
            <Notification
              duration={duration!}
              id={(id && id) || index.toString()}
              text={text}
              type={type!}
              key={(id && id) || index.toString()}
            />
          ))}
        </AnimatePresence>
      </LayoutGroup>
    </NotificationManagerContainer>
  );
};

export default NotificationManager;
