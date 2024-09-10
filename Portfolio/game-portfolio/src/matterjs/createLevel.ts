// src/matter/level.ts
import Matter from "matter-js";

const frontEnd = ["HTML", "CSS", "Javascript", "React", "Typescript"];
const backEnd = [".Net", "C#", "Java", "Python"];
const others = ["Git", "Postgres", "MongoDB", "Wordpress"];

function createCubeRow(
  objList: string[],
  startX: number,
  y: number,
  gap: number,
  engine: Matter.Engine
) {
  const smallCubeSize = 30; // Size of the small cubes
  const interactiveBlockWidth = smallCubeSize; // Interactive block width (adjust based on design)
  const interactiveBlockHeight = 5; // Height of interactive block

  // Loop through the object list and calculate the position for each cube
  objList.forEach((obj, index) => {
    // Calculate X position for each block/cube based on index and gap
    const blockX = startX + index * (smallCubeSize + gap);

    // Create the interactive block
    const interactiveBlock = Matter.Bodies.rectangle(
      blockX,
      y + interactiveBlockHeight + smallCubeSize / 2, // Position for interactive block (below small cube)
      interactiveBlockWidth,
      interactiveBlockHeight,
      {
        isStatic: true,
        label: `interactiveBlock`, // Give each block a unique label
        render: { fillStyle: "rgba(0, 0, 0, 0)" },
      }
    );

    // Create the small cube above the interactive block
    const smallCube = Matter.Bodies.rectangle(
      blockX,
      y, // Position for small cube
      smallCubeSize, // Width of the small cube
      smallCubeSize, // Height of the small cube
      {
        isStatic: false,
        label: `smallCube-${obj}`, // Give each small cube a unique label based on the string
        render: { fillStyle: "rgba(0, 0, 0, 0)" },
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
    screenHeight + 200,
    screenWidth,
    600,
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

  function createSkillLevel() {
    createCubeRow(frontEnd, 250, screenHeight - 325, 20, engine);
    createCubeRow(backEnd, 250, screenHeight - 260, 20, engine);
    createCubeRow(others, 250, screenHeight - 195, 20, engine);
  }

  createSkillLevel();

  // Add objects to the world
  Matter.Composite.add(engine.world, [ground, leftWall, rightWall]);
};
