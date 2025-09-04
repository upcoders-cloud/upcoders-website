import React from "react";
import styles from "./Separator.module.css";

const ITEMS = ["Inspiration", "Technology", "Innovation", "Design", "Solution"];

export default function Separator() {
  return (
    <div className="bg-bg-1 overflow-hidden py-4">
      <div className={styles.marquee}>
        {Array(4).fill(ITEMS).flat().map((text, idx) => (
          <div key={idx} className="flex items-center mr-8">
            <span className="text-gray-300 text-3xl font-medium">{text}</span>
            <span className="w-2 h-2 bg-primary inline-block ml-8"></span>
          </div>
        ))}
      </div>
    </div>
  );
}
