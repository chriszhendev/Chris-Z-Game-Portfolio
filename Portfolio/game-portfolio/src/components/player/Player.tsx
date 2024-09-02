import React, { useEffect, useState } from "react";

export default function Player() {
  const [xPosition, setXPosition] = useState(50);
  const [yPosition, setYPosition] = useState(0);
  const [isMovingLeft, setIsMovingLeft] = useState(false);
  const [isMovingRight, setIsMovingRight] = useState(false);
  const movementSpeed = 2;

  // Update the position based on key presses
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "a" || event.key === "A") {
        setIsMovingLeft(true);
      }
      if (event.key === "d" || event.key === "D") {
        setIsMovingRight(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "a" || event.key === "A") {
        setIsMovingLeft(false);
      }
      if (event.key === "d" || event.key === "D") {
        setIsMovingRight(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Move the element left or right
  useEffect(() => {
    const move = () => {
      setXPosition((prevPosition) => {
        let newPosition = prevPosition;

        if (isMovingLeft) {
          newPosition = Math.max(prevPosition - movementSpeed, 0);
        }

        if (isMovingRight) {
          newPosition = Math.min(prevPosition + movementSpeed, 100);
        }

        return newPosition;
      });
    };

    const interval = setInterval(move, 20); // Update every 20ms

    return () => clearInterval(interval);
  }, [isMovingLeft, isMovingRight]);

  return (
    <div
      style={{ left: `${xPosition}%`, bottom: `${yPosition}` }}
      className="absolute w-16 h-16 bg-blue-500"
    >
      {/* The movable box */}
    </div>
  );
}
