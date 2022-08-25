import IonIcon from "@reacticons/ionicons";
import { NotificationState } from "../../store/notificationSlice";

export const notificationIcon: Record<
  Exclude<NotificationState["notifications"][number]["type"], undefined>,
  JSX.Element
> = {
  danger: <IonIcon name="alert-circle-outline" />,
  info: <IonIcon name="alert-outline" />,
  success: <IonIcon name="checkmark-circle-outline" />,
  warning: <IonIcon name="warning-outline" />,
};
