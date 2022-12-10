import React from "react";

export default function SlideDots({ slides, index, setIndex }) {
  return (
    <div className="dots">
      {slides.map((_, idx) => (
        <div
          key={idx}
          className={`dot${index === idx ? " active" : ""}`}
          onClick={() => {
            setIndex(idx);
          }}
        ></div>
      ))}
    </div>
  );
}
