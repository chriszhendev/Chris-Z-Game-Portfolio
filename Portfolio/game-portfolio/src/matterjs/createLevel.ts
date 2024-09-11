// src/matter/level.ts
import Matter from "matter-js";
import { createLevelOne } from "./createLevel1";

type LevelMap = {
  [key: number]: (engine: Matter.Engine) => void;
};

const levelMap: LevelMap = { 0: createLevelOne };

function clearLevel(engine: Matter.Engine) {
  Matter.Composite.clear(engine.world, false);
}

// Create ground and walls
function createBaseLevel(engine: Matter.Engine) {
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
  console.log("CREATED WALL!");
  Matter.World.add(engine.world, [ground, leftWall, rightWall]);
}

export function createLevel(engine: Matter.Engine, levelIdx: number): void {
  if (!engine || !(levelIdx in levelMap)) return;
  clearLevel(engine);
  createBaseLevel(engine);
  levelMap[levelIdx](engine);
}
