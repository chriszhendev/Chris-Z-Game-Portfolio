import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";

export default function Player() {
  const [xPosition, setXPosition] = useState(50);
  const [yPosition, setYPosition] = useState(0);
  const [isMovingLeft, setIsMovingLeft] = useState(false);
  const [isMovingRight, setIsMovingRight] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const movementSpeed = 1;
  const initialJumpVelocity = 30;
  const gravity = 2;

  const blocks = useAppSelector((state: RootState) => state.blocks.blocks);

  const checkCollision = (
    newXPosition: number,
    newYPosition: number,
    direction: "horizontal" | "vertical"
  ) => {
    for (const block of blocks) {
      const withinXBounds =
        newXPosition + 16 >= block.x && newXPosition <= block.x + block.width;
      const withinYBounds =
        newYPosition <= block.y + block.height && newYPosition + 16 >= block.y;

      if (withinXBounds && withinYBounds) {
        if (direction === "horizontal") {
          return true; // Stop horizontal movement
        }
        if (direction === "vertical") {
          if (newYPosition < block.y) {
            setIsJumping(false);
            return block.y + block.height; // Place player on top of the block
          } else {
            return newYPosition; // Stop vertical movement
          }
        }
      }
    }
    return direction === "vertical" ? newYPosition : false;
  };

  // Update the position based on key presses
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "a" || event.key === "A") {
        setIsMovingLeft(true);
      }
      if (event.key === "d" || event.key === "D") {
        setIsMovingRight(true);
      }
      if (event.key === " " && !isJumping && yPosition === 0) {
        setIsJumping(true);
        setVelocity(initialJumpVelocity);
        console.log("SPACE PRESSED");
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
  }, [isJumping, yPosition]);

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

    const interval = setInterval(move, 10);

    return () => clearInterval(interval);
  }, [isMovingLeft, isMovingRight]);

  // Handle the jump and gravity
  useEffect(() => {
    if (isJumping) {
      const jumpInterval = setInterval(() => {
        setYPosition((prevYPosition) => {
          const newVelocity = velocity - gravity;
          setVelocity(newVelocity);
          const newYPosition = Math.max(prevYPosition + newVelocity, 0);

          if (newYPosition === 0) {
            setIsJumping(false);
            setVelocity(0);
            clearInterval(jumpInterval);
          }

          return newYPosition;
        });
      }, 10);

      return () => clearInterval(jumpInterval);
    }
  }, [isJumping, velocity]);

  return (
    <div
      style={{ left: `${xPosition}%`, bottom: `${yPosition}px` }}
      className="absolute w-16 h-16 bg-blue-500"
    >
      {/* The movable box */}
    </div>
  );
}
