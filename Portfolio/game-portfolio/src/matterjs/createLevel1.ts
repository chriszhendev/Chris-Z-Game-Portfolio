import { createCubeRow } from "./util";

export function createLevelOne(engine: Matter.Engine) {
  const frontEnd = ["HTML", "CSS", "Javascript", "React", "Typescript"];
  const backEnd = [".Net", "C#", "Java", "Python"];
  const others = ["Git", "Postgres", "MongoDB", "Wordpress"];
  const screenHeight = window.innerHeight;

  createCubeRow(frontEnd, 250, screenHeight - 325, 20, engine);
  createCubeRow(backEnd, 250, screenHeight - 260, 20, engine);
  createCubeRow(others, 250, screenHeight - 195, 20, engine);
}
