import React, { useState } from "react";

type Props = {
  maxTop: { x: string; y: string };
  maxBottom: { x: string; y: string };
  initSpeed: number;
  dimension: { width: string; height: string };
};

export default function FloatingBox({
  maxTop,
  maxBottom,
  initSpeed,
  dimension,
}: Props) {
  const getRandomPosition = () => {
    const randomTop = `${
      Math.random() * (parseFloat(maxBottom.y) - parseFloat(maxTop.y)) +
      parseFloat(maxTop.y)
    }%`;
    const randomLeft = `${
      Math.random() * (parseFloat(maxBottom.x) - parseFloat(maxTop.x)) +
      parseFloat(maxTop.x)
    }%`;
    return { y: randomTop, x: randomLeft };
  };

  const getRandomDirection = () => (Math.random() > 0.5 ? 1 : -1);

  const [currentPosition, setCurrentPosition] = useState(getRandomPosition);
  const [direction, setDirection] = useState(getRandomDirection); // 1 for down, -1 for up

  return (
    <div
      style={{
        top: currentPosition.y,
        left: currentPosition.x,
        width: dimension.width,
        height: dimension.height,
      }}
      className="absolute"
    >
      FloatingBox
    </div>
  );
}
