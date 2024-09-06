import Matter from "matter-js";

export const handlePlayerMovement = (player: Matter.Body) => {
  const velocity = 20;
  const keysPressed: { [key: string]: boolean } = {};

  // Handle key down
  const handleKeyDown = (event: KeyboardEvent) => {
    if (!player) return;

    keysPressed[event.key] = true;
  };

  // Handle key up
  const handleKeyUp = (event: KeyboardEvent) => {
    if (!player) return;

    keysPressed[event.key] = false;
  };

  const updatePlayerMovement = () => {
    let xVelocity = 0;
    let yVelocity = 2;

    if (keysPressed["ArrowLeft"] || keysPressed["a"]) {
      xVelocity = -velocity;
    } else if (keysPressed["ArrowRight"] || keysPressed["d"]) {
      xVelocity = velocity;
    }

    if (keysPressed["ArrowUp"] || keysPressed["w"]) {
      yVelocity = -velocity;
    } else if (keysPressed["ArrowDown"] || keysPressed["s"]) {
      yVelocity = velocity;
    }

    // Only set the velocity if it's different from the current velocity
    if (xVelocity !== player.velocity.x || yVelocity !== player.velocity.y) {
      Matter.Body.setVelocity(player, { x: xVelocity, y: yVelocity });
    }

    requestAnimationFrame(updatePlayerMovement); // Loop the update
  };

  // Attach event listeners
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  // Start the movement update loop
  updatePlayerMovement();

  // Cleanup function to remove event listeners
  return () => {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  };
};
