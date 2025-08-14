import React from "react";
import styles from "./Separator.module.css";

export default function Separator() {
  const items = ["Inspiration", "Technology", "Innovation", "Design", "Solution"];

  // powielamy listę wiele razy, żeby uniknąć przerw
  const repeatedItems = Array(4).fill(items).flat();

  return (
    <div className="bg-bg-1 overflow-hidden py-4">
      <div className={styles.marquee}>
        {repeatedItems.map((text, idx) => (
          <div key={idx} className="flex items-center mr-8">
            <span className="text-gray-300 text-lg font-medium">{text}</span>
            <span className="w-2 h-2 bg-primary inline-block ml-8"></span>
          </div>
        ))}
      </div>
    </div>
  );
}
