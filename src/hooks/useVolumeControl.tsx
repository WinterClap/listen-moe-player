import React from "react";
import { DEVICE_SIZES } from "../constants";

const useVolumeControl = () => {
  const [shouldBeClickeable, setShouldBeClickeable] = React.useState<boolean>(false);
  React.useEffect(() => {
    const checkWidth = () => {
      console.log("Resize detected");
      if (window.innerWidth <= Number(DEVICE_SIZES.tablet.replace("px", ""))) {
        !shouldBeClickeable && setShouldBeClickeable(true);
      } else {
        shouldBeClickeable && setShouldBeClickeable(false);
      }
    };
    checkWidth();

    const onWindowResize = () => {
      checkWidth();
    };

    window.addEventListener("resize", onWindowResize);

    return () => window.removeEventListener("resize", onWindowResize);
  }, [shouldBeClickeable]);

  return [shouldBeClickeable];
};

export default useVolumeControl;
