import IonIcon from "@reacticons/ionicons";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "styled-components";
import { hideNotification, NotificationState } from "../../store/notificationSlice";
import { IconContainer, Row } from "../common";
import { notificationIcon } from "./constants";
import { NotificationContainer } from "./styles";

export const Notification = ({ text, duration, id, type }: Required<NotificationState["notifications"][number]>) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onCloseClick = (id: string) => {
    dispatch(hideNotification(id));
  };

  React.useEffect(() => {
    if (duration === 0) return;
    timeout.current = setTimeout(() => {
      console.log("hiding");
      dispatch(hideNotification(id));
    }, duration);

    return () => clearTimeout(timeout.current as unknown as number);
  }, [dispatch, duration, id]);

  const getNotificationColor = React.useCallback(
    (type: NotificationState["notifications"][number]["type"]) => {
      switch (type) {
        case "danger":
          return {
            mainColor: theme.danger,
            dimmedColor: theme.softDanger,
          };
        case "info":
          return {
            mainColor: theme.info,
            dimmedColor: theme.softInfo,
          };
        case "warning":
          return {
            mainColor: theme.warning,
            dimmedColor: theme.softWarning,
          };
        default:
          return {
            mainColor: theme.success,
            dimmedColor: theme.softSuccess,
          };
      }
    },
    [theme]
  );

  return (
    <NotificationContainer
      layout
      initial={{ opacity: 0, y: 20, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.15 } }}
      $colors={getNotificationColor(type)}
    >
      <Row h="100%" w="100%" $alignItems="flex-start" $justifyContent="space-between">
        <Row $justifyContent="flex-start" h="100%" w="100%">
          <IconContainer h="100" $justifyContent="flex-start" m="0px 10px 0px 0px" size={24} color={theme.light}>
            {notificationIcon[type]}
          </IconContainer>
          <p>{text}</p>
        </Row>
        <IconContainer
          onClick={() => onCloseClick(id)}
          size={24}
          cursor="pointer"
          color={theme.light}
          tabIndex={10}
          role="button"
        >
          <IonIcon name="close-circle-outline" />
        </IconContainer>
      </Row>
    </NotificationContainer>
  );
};
