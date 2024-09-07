// src/matter/level.ts
import Matter from "matter-js";

const frontEnd = ["HTML", "CSS", "Javascript", "React", "Typescript"];
const backEnd = [".Net", "C#", "Java", "Python"];
const others = ["Git", "Postgres", "MongoDB", "Wordpress"];

function createCubeRow(
  objList: string[],
  x: number,
  y: number,
  gap: number,
  engine: Matter.Engine
) {
  const totalWidth = objList.length * (100 + gap) - gap; // Calculate total width of all objects and gaps
  const startX = x - totalWidth / 2; // Start X position to center the row

  objList.forEach((obj, index) => {
    // Calculate X position for each block/cube based on index and gap
    const blockX = startX + index * (100 + gap);

    // Create the interactive block
    const interactiveBlock = Matter.Bodies.rectangle(
      blockX,
      y + 100, // Position for interactive block (below small cube)
      100,
      50,
      {
        isStatic: true,
        label: `interactiveBlock`, // Give each block a unique label based on the string
        render: { fillStyle: "blue" },
      }
    );

    // Create the small cube above the interactive block
    const smallCube = Matter.Bodies.rectangle(
      blockX,
      y, // Position for small cube
      60,
      60,
      {
        isStatic: false,
        label: `smallCube-${obj}`, // Give each small cube a unique label based on the string
        render: { fillStyle: "red" },
      }
    );

    // Add both the block and cube to the world
    Matter.Composite.add(engine.world, [interactiveBlock, smallCube]);

    console.log(
      `Created interactive block and small cube for ${obj} at (${blockX}, ${y})`
    );
  });
}

// Function to create ground, walls, and a new block
export const createLevel = (engine: Matter.Engine) => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Remove existing ground, walls, and blocks
  const bodiesToRemove = Matter.Composite.allBodies(engine.world).filter(
    (body) =>
      body.label === "ground" ||
      body.label === "wall" ||
      body.label === "interactiveBlock" ||
      body.label.startsWith("smallCube")
  );

  bodiesToRemove.forEach((body) => {
    Matter.Composite.remove(engine.world, body);
  });

  // Create ground and walls
  const ground = Matter.Bodies.rectangle(
    screenWidth / 2,
    screenHeight + 100,
    screenWidth,
    400,
    { isStatic: true, label: "ground" }
  );
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
  const rightWall = Matter.Bodies.rectangle(
    screenWidth + 50,
    screenHeight / 2,
    200,
    screenHeight,
    { isStatic: true, label: "wall" }
  );

  createCubeRow(frontEnd, screenWidth / 2, screenHeight / 2, 50, engine);
  createCubeRow(backEnd, screenWidth / 2, screenHeight / 2 - 150, 50, engine);
  createCubeRow(others, screenWidth / 2, screenHeight / 2 - 300, 50, engine);

  // Add objects to the world
  Matter.Composite.add(engine.world, [ground, leftWall, rightWall]);
};
