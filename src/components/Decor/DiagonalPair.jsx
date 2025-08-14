import React from "react";
import PixelGrid from "./PixelGrid";

export default function DiagonalPair(props) {
  const matrix = [
    [1,0],
    [0,1],
  ];
  return (
    <PixelGrid
      matrix={matrix}
      size={props.size ?? 16}
      gap={props.gap ?? 6}
      color={props.color ?? "bg-primary"}
      className={props.className}
      ariaLabel={props.ariaLabel}
    />
  );
}
