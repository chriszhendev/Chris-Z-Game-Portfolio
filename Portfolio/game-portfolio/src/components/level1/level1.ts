import Matter from "matter-js";

// Function to create or update ground and walls
export const createLevel1 = (engine: Matter.Engine) => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Remove existing walls and ground from the world before creating new ones
  const bodiesToRemove = Matter.Composite.allBodies(engine.world).filter(
    (body) => body.label === "ground" || body.label === "wall"
  );
  Matter.Composite.remove(engine.world, bodiesToRemove);

  // Create ground that extends the full width of the screen
  const ground = Matter.Bodies.rectangle(
    screenWidth / 2,
    screenHeight + 50,
    screenWidth,
    300,
    {
      isStatic: true,
      label: "ground",
    }
  );

  // Create left wall at the left edge of the screen
  const leftWall = Matter.Bodies.rectangle(
    0 - 50,
    screenHeight / 2,
    200,
    screenHeight,
    {
      isStatic: true,
      label: "wall",
    }
  );

  // Create right wall at the right edge of the screen
  const rightWall = Matter.Bodies.rectangle(
    screenWidth + 50,
    screenHeight / 2,
    200,
    screenHeight,
    {
      isStatic: true,
      label: "wall",
    }
  );

  // Add new ground and walls to the world
  Matter.Composite.add(engine.world, [ground, leftWall, rightWall]);
};
