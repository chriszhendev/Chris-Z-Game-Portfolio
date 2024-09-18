// src/matter/events.ts
import Matter from "matter-js";
import { setLevel } from "../store/levels"; // Import setLevel action

export const setupCollisionEvents = (
  engine: Matter.Engine,
  dispatch: AppDispatch
) => {
  Matter.Events.on(engine, "collisionStart", (event) => {
    event.pairs.forEach(({ bodyA, bodyB }) => {
      // Handle interactive block collision
      if (
        (bodyA.label === "player" && bodyB.label === "interactiveBlock") ||
        (bodyB.label === "player" && bodyA.label === "interactiveBlock")
      ) {
        const interactiveBlock =
          bodyA.label === "interactiveBlock" ? bodyA : bodyB;
        Matter.Composite.remove(engine.world, interactiveBlock);
        console.log("Interactive block destroyed!");
      }

      // Handle player-right wall collision
      if (
        (bodyA.label === "player" && bodyB.label === "wall-right") ||
        (bodyB.label === "player" && bodyA.label === "wall-right")
      ) {
        console.log("Player collided with the right wall!");

        // Dispatch an action to increment the current level
        dispatch(setLevel((prevLevel) => prevLevel + 1));
      }
    });
  });
};
