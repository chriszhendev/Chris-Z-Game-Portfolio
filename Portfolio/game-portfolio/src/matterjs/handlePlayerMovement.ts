import Matter from "matter-js";

export const handlePlayerMovement = (
  player: Matter.Body,
  engine: Matter.Engine,
  flipPlayer: (isFlipped: boolean) => void // Pass the flip callback
) => {
  const velocity = 20;
  const jumpVelocity = -35;
  const keysPressed: { [key: string]: boolean } = {};
  let isGrounded = false;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!player) return;
    keysPressed[event.key] = true;

    if (event.key === " " && isGrounded) {
      Matter.Body.setVelocity(player, {
        x: player.velocity.x,
        y: jumpVelocity,
      });
      isGrounded = false;
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (!player) return;
    keysPressed[event.key] = false;
  };

  const updatePlayerMovement = () => {
    let xVelocity = 0;

    if (keysPressed["ArrowLeft"] || keysPressed["a"] || keysPressed["A"]) {
      xVelocity = -velocity;
      flipPlayer(true); // Flip player when moving left
    } else if (
      keysPressed["ArrowRight"] ||
      keysPressed["d"] ||
      keysPressed["D"]
    ) {
      xVelocity = velocity;
      flipPlayer(false); // Reset flip when moving right
    }

    if (xVelocity !== player.velocity.x) {
      Matter.Body.setVelocity(player, { x: xVelocity, y: player.velocity.y });
    }

    const allCollisions = Matter.Query.collides(
      player,
      Matter.Composite.allBodies(engine.world)
    );
    isGrounded = allCollisions.some(
      (collision) => collision.bodyB.isStatic || collision.bodyA.isStatic
    );

    requestAnimationFrame(updatePlayerMovement);
  };

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  updatePlayerMovement();

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  };
};
