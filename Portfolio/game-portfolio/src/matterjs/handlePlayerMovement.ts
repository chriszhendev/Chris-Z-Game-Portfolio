import Matter from "matter-js";
import { AppDispatch } from "../store/store";
import { setPlayerState } from "../store/player";

export const handlePlayerMovement = (
  player: Matter.Body,
  engine: Matter.Engine,
  dispatch: AppDispatch // Accept dispatch as a parameter
) => {
  const velocity = 20;
  const jumpVelocity = -35;
  const keysPressed: { [key: string]: boolean } = {};
  let isGrounded = false;
  let flipped = false;

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
      flipped = true;
    } else if (
      keysPressed["ArrowRight"] ||
      keysPressed["d"] ||
      keysPressed["D"]
    ) {
      xVelocity = velocity;
      flipped = false;
    }

    if (xVelocity !== player.velocity.x) {
      Matter.Body.setVelocity(player, { x: xVelocity, y: player.velocity.y });
    }

    // Check if the player is grounded
    const allCollisions = Matter.Query.collides(
      player,
      Matter.Composite.allBodies(engine.world)
    );
    isGrounded = allCollisions.some(
      (collision) => collision.bodyB.isStatic || collision.bodyA.isStatic
    );

    // Dispatch the player state to Redux
    dispatch(
      setPlayerState({
        x: player.position.x,
        y: player.position.y,
        facingLeft: flipped, // Set direction based on movement
      })
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
