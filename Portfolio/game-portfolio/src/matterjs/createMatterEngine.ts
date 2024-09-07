// src/matter/engine.ts
import Matter from "matter-js";

export const createMatterEngine = (sceneRef: HTMLDivElement) => {
  const engine = Matter.Engine.create();
  engine.gravity.y = 9;

  const render = Matter.Render.create({
    element: sceneRef,
    engine: engine,
    options: {
      width: window.innerWidth,
      height: window.innerHeight,
      wireframes: false,
    },
  });

  Matter.Render.run(render);
  const runner = Matter.Runner.create();
  Matter.Runner.run(runner, engine);

  return { engine, render, runner };
};

export const stopMatterEngine = (
  render: Matter.Render,
  runner: Matter.Runner,
  engine: Matter.Engine
) => {
  Matter.Render.stop(render);
  Matter.Runner.stop(runner);
  Matter.Engine.clear(engine);
  render.canvas.remove();
  render.textures = {};
};
