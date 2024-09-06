import Matter from "matter-js";

export const createLevel1 = (): Matter.Body[] => {
  const ground = Matter.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
  const leftWall = Matter.Bodies.rectangle(0, 300, 60, 600, { isStatic: true });
  const rightWall = Matter.Bodies.rectangle(800, 300, 60, 600, {
    isStatic: true,
  });

  return [ground, leftWall, rightWall];
};
