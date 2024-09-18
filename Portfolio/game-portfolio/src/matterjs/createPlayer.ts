// src/components/Player.ts
import Matter from "matter-js";

export const createPlayer = (): Matter.Body => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const xPosition = screenWidth - 400;
  const yPosition = screenHeight - 400;

  const player = Matter.Bodies.rectangle(xPosition, yPosition, 60, 150, {
    label: "player",
    restitution: 0,
    friction: 1,
    inertia: Infinity,
  });

  Matter.Body.setAngle(player, 0);
  player.frictionAir = 0.0;

  return player;
};
