import Matter from "matter-js";

// Function to create or update ground, walls, and a new block
export const createLevel1 = (engine: Matter.Engine) => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Remove existing ground, walls, and interactive block from the world before creating new ones
  const bodiesToRemove = Matter.Composite.allBodies(engine.world).filter(
    (body) =>
      body.label === "ground" ||
      body.label === "wall" ||
      body.label === "interactiveBlock" ||
      body.label === "smallCube"
  );

  // Ensure all existing bodies (ground, walls, blocks) are removed before adding new ones
  bodiesToRemove.forEach((body) => {
    Matter.Composite.remove(engine.world, body);
  });

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

  // Create a static block that will be destroyed after the player touches it
  const interactiveBlock = Matter.Bodies.rectangle(
    screenWidth / 2,
    screenHeight / 2 + 100, // Place it in the middle of the screen
    100, // Block width
    50, // Block height
    {
      isStatic: true, // Initially static
      label: "interactiveBlock",
      render: { fillStyle: "blue" }, // Optional: Give it a color
    }
  );

  // Create a small non-static cube and place it on top of the interactive block
  const smallCube = Matter.Bodies.rectangle(
    screenWidth / 2, // Same x position as the interactive block
    screenHeight / 2 + 50, // Position it on top of the interactive block
    60, // Cube width
    60, // Cube height
    {
      isStatic: false, // Non-static, so it will be affected by gravity
      label: "smallCube",
      render: { fillStyle: "red" }, // Optional: Give it a color
    }
  );

  // Add the ground, walls, interactive block, and small cube to the world
  Matter.Composite.add(engine.world, [
    ground,
    leftWall,
    rightWall,
    interactiveBlock,
    smallCube,
  ]);

  // Collision handler for the interactive block (destroy it when the player touches it)
  Matter.Events.on(engine, "collisionStart", (event) => {
    event.pairs.forEach((collision) => {
      const { bodyA, bodyB } = collision;

      // Check if the player is colliding with the interactive block
      if (
        (bodyA.label === "player" && bodyB.label === "interactiveBlock") ||
        (bodyB.label === "player" && bodyA.label === "interactiveBlock")
      ) {
        // Remove the interactive block from the world
        Matter.Composite.remove(engine.world, interactiveBlock);
        console.log("Interactive block destroyed!");
      }
    });
  });
};
