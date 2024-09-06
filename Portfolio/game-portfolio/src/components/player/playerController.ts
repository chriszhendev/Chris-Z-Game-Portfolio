import Matter from "matter-js";

export const handlePlayerMovement = (
  player: Matter.Body,
  engine: Matter.Engine
) => {
  const velocity = 20; // Horizontal speed
  const jumpVelocity = -30; // Jump impulse speed (negative for upward movement)
  const keysPressed: { [key: string]: boolean } = {};
  let isGrounded = false; // Track if the player is on the ground

  // Handle key down
  const handleKeyDown = (event: KeyboardEvent) => {
    if (!player) return;

    keysPressed[event.key] = true;

    // Jump when space is pressed and the player is grounded
    if (event.key === " " && isGrounded) {
      Matter.Body.setVelocity(player, {
        x: player.velocity.x,
        y: jumpVelocity,
      });
      isGrounded = false; // The player is no longer grounded after jumping
    }
  };

  // Handle key up
  const handleKeyUp = (event: KeyboardEvent) => {
    if (!player) return;

    keysPressed[event.key] = false;
  };

  const updatePlayerMovement = () => {
    let xVelocity = 0;

    // Horizontal movement
    if (keysPressed["ArrowLeft"] || keysPressed["a"]) {
      xVelocity = -velocity;
    } else if (keysPressed["ArrowRight"] || keysPressed["d"]) {
      xVelocity = velocity;
    }

    // Only set the horizontal velocity (vertical velocity will be handled by jumping/gravity)
    if (xVelocity !== player.velocity.x) {
      Matter.Body.setVelocity(player, { x: xVelocity, y: player.velocity.y });
    }

    // Check if the player is grounded by detecting collisions with the ground or static bodies
    const allCollisions = Matter.Query.collides(
      player,
      Matter.Composite.allBodies(engine.world)
    );
    isGrounded = allCollisions.some(
      (collision) => collision.bodyB.isStatic || collision.bodyA.isStatic
    ); // The player is grounded if colliding with a static body

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
