import Matter from "matter-js";

export const createLevel1 = (): Matter.Body[] => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Create ground that extends the full width of the screen
  const ground = Matter.Bodies.rectangle(
    screenWidth / 2,
    screenHeight,
    screenWidth,
    60,
    {
      isStatic: true,
    }
  );

  // Create left wall at the left edge of the screen
  const leftWall = Matter.Bodies.rectangle(
    0,
    screenHeight / 2,
    60,
    screenHeight,
    {
      isStatic: true,
    }
  );

  // Create right wall at the right edge of the screen
  const rightWall = Matter.Bodies.rectangle(
    screenWidth,
    screenHeight / 2,
    60,
    screenHeight,
    {
      isStatic: true,
    }
  );

  return [ground, leftWall, rightWall];
};
