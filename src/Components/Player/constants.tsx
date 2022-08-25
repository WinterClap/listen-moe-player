import React from "react";
import IonIcon from "@reacticons/ionicons";

export const getControls = (isRadio: boolean, primaryColor: string) => {
  if (isRadio) {
    return {
      play: {
        icon: <IonIcon name="play" color={primaryColor} />,
      },
      stop: {
        icon: <IonIcon name="square" color={primaryColor} />,
      },
    };
  }
  return {
    pause: { icon: <IonIcon key={"pause"} name="pause" color={primaryColor} /> },
    play: { icon: <IonIcon key={"play"} name="play" color={primaryColor} /> },
    stop: { icon: <IonIcon key={"stop"} name="square" color={primaryColor} /> },
    prev: { icon: <IonIcon key={"prev"} name="play-skip-back" color={primaryColor} /> },
    skip: { icon: <IonIcon key={"skip"} name="play-skip-forward" color={primaryColor} /> },
  };
};

export const getVolumeIcon = (volume: number) => {
  if (volume === 0) return <IonIcon key={"volumeMute"} name="volume-mute" />;
  if (volume < 30) return <IonIcon key={"volumeLow"} name="volume-low" />;
  if (volume < 80) return <IonIcon key={"volumeMedium"} name="volume-medium" />;
  if (volume >= 80) return <IonIcon key={"volumeHigh"} name="volume-high" />;
};
