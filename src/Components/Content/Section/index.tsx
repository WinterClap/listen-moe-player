import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setNotification } from "../../../store/notificationSlice";
import { setIsLoading } from "../../../store/playerMoeSlice";
import { SectionContainer } from "./styles";

export const Section = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.player.isLoading);
  const notifications = useSelector((state: RootState) => state.notification.notifications);

  const shouffle = () => {
    dispatch(setIsLoading(!isLoading));
  };

  const addNotification = () => {
    dispatch(setNotification({ text: "Test", id: Date.now().toString() }));
  };

  const addInfiniteNotification = () => {
    dispatch(
      setNotification([
        { type: "warning", text: "Infinite", id: `${Date.now()}-1`, duration: 0 },
        { type: "danger", text: "Infinite", id: `${Date.now()}-2`, duration: 0 },
        { text: "Infinite", id: `${Date.now()}-3`, duration: 0 },
        { type: "info", text: "Infinite", id: `${Date.now()}-4`, duration: 0 },
      ])
    );
  };

  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/hello");
        const data = await response.json();
        console.log("api test: ", data); 
      } catch (error) {
        console.error("Error API: ", error)
      }
    })();
  }, []);

  return (
    <SectionContainer>
      <button onClick={addNotification}>add Notification</button>
      <button onClick={addInfiniteNotification}>infinite notification</button>
      {/* <button onClick={shouffle}>Shouffle</button> */}
      <div>Section</div>
    </SectionContainer>
  );
};
