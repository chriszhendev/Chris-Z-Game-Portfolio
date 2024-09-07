// src/matter/events.ts
import Matter from "matter-js";

// Handle collision events
export const setupCollisionEvents = (engine: Matter.Engine) => {
  Matter.Events.on(engine, "collisionStart", (event) => {
    event.pairs.forEach(({ bodyA, bodyB }) => {
      if (
        (bodyA.label === "player" && bodyB.label === "interactiveBlock") ||
        (bodyB.label === "player" && bodyA.label === "interactiveBlock")
      ) {
        // Remove the interactive block when player touches it
        const interactiveBlock =
          bodyA.label === "interactiveBlock" ? bodyA : bodyB;
        Matter.Composite.remove(engine.world, interactiveBlock);
        console.log("Interactive block destroyed!");
      }
    });
  });
};
