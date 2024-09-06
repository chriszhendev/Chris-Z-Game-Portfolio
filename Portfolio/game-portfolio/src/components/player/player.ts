// src/components/Player.ts
import Matter from "matter-js";

export const createPlayer = (): Matter.Body => {
  const player = Matter.Bodies.rectangle(400, 500, 50, 50, {
    restitution: 0,
    friction: 1,
    inertia: Infinity,
  });

  Matter.Body.setAngle(player, 0);
  player.frictionAir = 0.0;

  return player;
};
