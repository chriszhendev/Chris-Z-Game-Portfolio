import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { createPlayer } from "../player/player";
import { createLevel1 } from "../level1/level1";
import { handlePlayerMovement } from "../player/playerController";

const Game: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<Matter.Body | null>(null);
  const aspectRatio = 16 / 9; // Define the aspect ratio

  useEffect(() => {
    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Composite = Matter.Composite;

    // Create an engine
    const engine = Engine.create();

    engine.gravity.y = 9;

    // Function to update canvas size
    const updateCanvasSize = (render: Matter.Render) => {
      const width = window.innerWidth;
      const height = window.innerWidth / aspectRatio;

      // Update render options and canvas dimensions
      render.options.width = width;
      render.options.height = height;

      // Update the canvas size
      render.canvas.width = width;
      render.canvas.height = height;
    };

    // Create a renderer and attach it to the scene div
    const render = Render.create({
      element: sceneRef.current!,
      engine: engine,
      options: {
        width: window.innerWidth, // Set initial width to screen width
        height: window.innerWidth / aspectRatio, // Set initial height based on aspect ratio
        wireframes: false,
      },
    });

    // Update canvas size based on initial screen dimensions
    updateCanvasSize(render);

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
    const cleanupPlayerControls = handlePlayerMovement(playerBody, engine);

    // Update the canvas size on window resize
    const handleResize = () => updateCanvasSize(render);
    window.addEventListener("resize", handleResize);

    // Clean up when component unmounts
    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
      cleanupPlayerControls();
      window.removeEventListener("resize", handleResize);
    };
  }, [aspectRatio]);

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div ref={sceneRef} className="w-full h-full" />
    </div>
  );
};

export default Game;
