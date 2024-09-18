import Matter from "matter-js";

export function createBaseWorld() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

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
      label: "wall-left",
    }
  );
  const rightWall = Matter.Bodies.rectangle(
    screenWidth + 50,
    screenHeight / 2,
    200,
    screenHeight,
    { isStatic: true, label: "wall-right" }
  );
  return [ground, leftWall, rightWall];
}

// function clearLevel(engine: Matter.Engine) {
//     const allBodies = Matter.Composite.allBodies(engine.world);

//     Matter.Composite.remove(engine.world, nonPlayerBodies, false);
//   }
