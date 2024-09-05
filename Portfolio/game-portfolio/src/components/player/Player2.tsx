import React, { useEffect, useState } from "react";

export default function Player2() {
  const [position, setPosition] = useState({ x: 50, y: 0 });
  const [isMovingRight, setIsMovingRight] = useState(false);
  const [isMovingLeft, setIsMovingLeft] = useState(false);
  const [isCollidingRight, setIsCollidingRight] = useState(false);
  const [isCollidingLeft, setIsCollidingLeft] = useState(false);
  const movementSpeed = 1;

  const checkCollision = () => {
    const player = document.getElementById("player");
    const collisionBoxes = document.getElementsByClassName("collisionBox");

    let collisionOnRight = false;
    let collisionOnLeft = false;

    if (player) {
      const playerRect = player.getBoundingClientRect();

      for (let i = 0; i < collisionBoxes.length; i++) {
        const block = collisionBoxes[i] as HTMLElement;

        if (block.id !== "player") {
          const blockRect = block.getBoundingClientRect();

          const isCollidingRight =
            playerRect.right + 18 > blockRect.left &&
            playerRect.left < blockRect.right &&
            playerRect.bottom > blockRect.top &&
            playerRect.top < blockRect.bottom;

          const isCollidingLeft =
            playerRect.left - 18 < blockRect.right &&
            playerRect.right > blockRect.left &&
            playerRect.bottom > blockRect.top &&
            playerRect.top < blockRect.bottom;

          if (isCollidingRight) {
            collisionOnRight = true;
          }

          if (isCollidingLeft) {
            collisionOnLeft = true;
          }
        }
      }
    }

    // Update state variables for collision status
    setIsCollidingRight(collisionOnRight);
    setIsCollidingLeft(collisionOnLeft);
  };

  useEffect(() => {
    const move = () => {
      setPosition((prevPosition) => {
        let newXPosition = prevPosition.x;

        if (isMovingLeft || isMovingRight) {
          checkCollision(); // Check collision before moving
        }

        // Move only if not colliding
        if (isMovingLeft && !isCollidingLeft) {
          newXPosition = Math.max(prevPosition.x - movementSpeed, 0);
        }

        if (isMovingRight && !isCollidingRight) {
          newXPosition = Math.min(prevPosition.x + movementSpeed, 100);
        }

        return { x: newXPosition, y: prevPosition.y };
      });
    };

    const moveInterval = setInterval(move, 20);

    return () => clearInterval(moveInterval);
  }, [isMovingLeft, isMovingRight, isCollidingLeft, isCollidingRight]);

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

  return (
    <div
      id="player"
      style={{ left: `${position.x}%`, bottom: `${position.y}px` }}
      className="absolute w-[50px] h-[50px] bg-blue-500"
    >
      {/* The movable box */}
    </div>
  );
}
