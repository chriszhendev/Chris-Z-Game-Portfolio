// src/components/MatterJSScene.tsx
import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { createPlayer } from "../player/player";
import { createLevel1 } from "../level1/level1";
import { handlePlayerMovement } from "../player/playerController";

const MatterJSScene: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<Matter.Body | null>(null);

  useEffect(() => {
    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Composite = Matter.Composite;

    // Create an engine
    const engine = Engine.create();

    // Create a renderer and attach it to the scene div
    const render = Render.create({
      element: sceneRef.current!,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false,
      },
    });

    // Create the player
    const playerBody = createPlayer();
    setPlayer(playerBody);

    // Create the ground and walls
    const walls = createLevel1();

    // Add bodies to the world
    Composite.add(engine.world, [playerBody, ...walls]);

    // Run the renderer
    Render.run(render);

    // Create and run the engine runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Handle player movement
    const cleanupPlayerControls = handlePlayerMovement(playerBody);

    // Clean up when component unmounts
    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
      cleanupPlayerControls();
    };
  }, []);

  return <div ref={sceneRef} />;
};

export default MatterJSScene;
