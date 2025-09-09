import React from "react";
import PixelGrid from "./PixelGrid";

export default function ZigZag5(props) {
  const matrix = [
    [0,1,0,1,0,1],
    [1,0,1,0,1,0],
  ];
  return (
    <PixelGrid
      matrix={matrix}
      size={props.size ?? 14}
      gap={props.gap ?? 6}
      color={props.color ?? "bg-primary"}
      className={props.className}
      ariaLabel={props.ariaLabel}
    />
  );
}
