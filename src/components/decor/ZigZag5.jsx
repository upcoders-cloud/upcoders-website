import React from "react";
import PixelGrid from "./PixelGrid";

/** 5 kwadratów w „ząbek”, jak w Twoim projekcie */
export default function ZigZag5(props) {
  // Dwie rzędy, naprzemienny wzór 10101 / 01010
  const matrix = [
    [0,1,0,1,0],
    [1,0,1,0,1],
  ];
  return (
    <PixelGrid
      matrix={matrix}
      size={props.size ?? 14}    // trochę większe „piksele”
      gap={props.gap ?? 6}
      color={props.color ?? "bg-primary"}
      className={props.className}
      ariaLabel={props.ariaLabel}
    />
  );
}
