import React from "react";
import { CircularLoaderContainer } from "./styles";

interface CircularLoaderProps {
  size: number | string;
  $borderSize: number;
  color?: string;
}

const CircularLoader: React.FC<CircularLoaderProps> = (props) => {
  return <CircularLoaderContainer initial={false} exit={{ scale: 0 }} {...props} />;
};

export default CircularLoader;
