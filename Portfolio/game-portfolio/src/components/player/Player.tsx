import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";

export default function Player() {
  const [xPosition, setXPosition] = useState(50);
  const [yPosition, setYPosition] = useState(0);
  const [isMovingLeft, setIsMovingLeft] = useState(false);
  const [isMovingRight, setIsMovingRight] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [collidedTop, setCollidedTop] = useState(false);
  const [collidedBottom, setCollidedBottom] = useState(false);
  const [collidedLeft, setCollidedLeft] = useState(false);
  const [collidedRight, setCollidedRight] = useState(false);
  const movementSpeed = 1;
  const initialJumpVelocity = 30;
  const gravity = 2;

  const checkCollision = useCallback((): void => {
    console.log("CHECKING COLLISION");

    // Reset collision states
    setCollidedTop(false);
    setCollidedBottom(false);
    setCollidedLeft(false);
    setCollidedRight(false);

    // Get player and block elements by their id or class name
    const playerElement = document.getElementById("player");
    const blockElements = document.getElementsByClassName("collisionBox");

    if (playerElement && blockElements.length > 0) {
      // Get the player's bounding rectangle
      const playerRect = playerElement.getBoundingClientRect();

      // Loop through all blocks to check for collision
      Array.from(blockElements).forEach((blockElement) => {
        const blockRect = blockElement.getBoundingClientRect();

        // Check for collision using the bounding rectangles
        if (
          playerRect.left < blockRect.right &&
          playerRect.right > blockRect.left &&
          playerRect.top < blockRect.bottom &&
          playerRect.bottom > blockRect.top
        ) {
          console.log("Collision detected!");

          // Update collision states based on position
          if (
            playerRect.bottom > blockRect.top &&
            playerRect.top < blockRect.top
          ) {
            setCollidedBottom(true);
          }
          if (
            playerRect.top < blockRect.bottom &&
            playerRect.bottom > blockRect.bottom
          ) {
            setCollidedTop(true);
          }
          if (
            playerRect.right > blockRect.left &&
            playerRect.left < blockRect.left
          ) {
            setCollidedRight(true);
          }
          if (
            playerRect.left < blockRect.right &&
            playerRect.right > blockRect.right
          ) {
            setCollidedLeft(true);
          }
        }
      });
    }
  }, [setCollidedTop, setCollidedBottom, setCollidedLeft, setCollidedRight]);

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
    console.log("MOVING LEFT AND RIGHT");

    const move = () => {
      setXPosition((prevPosition) => {
        let newPosition = prevPosition;

        // Only check for collision when actually moving
        if (isMovingLeft || isMovingRight) {
          checkCollision();
        }

        // Move left if not colliding with left side
        if (isMovingLeft && !collidedLeft) {
          newPosition = Math.max(prevPosition - movementSpeed, 0);
        }

        // Move right if not colliding with right side
        if (isMovingRight && !collidedRight) {
          newPosition = Math.min(prevPosition + movementSpeed, 100);
        }

        return newPosition;
      });
    };

    // Run the movement function at a set interval
    const interval = setInterval(move, 10);

    // Clean up interval on component unmount or effect re-run
    return () => clearInterval(interval);
  }, [
    isMovingLeft,
    isMovingRight,
    collidedLeft,
    collidedRight,
    movementSpeed,
    checkCollision,
  ]);

  // Handle the jump and gravity
  useEffect(() => {
    console.log("MOVING UP AND DOWN");
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
      id="player"
      style={{ left: `${xPosition}%`, bottom: `${yPosition}px` }}
      className="absolute w-[50px] h-[50px] bg-blue-500"
    >
      {/* The movable box */}
    </div>
  );
}
