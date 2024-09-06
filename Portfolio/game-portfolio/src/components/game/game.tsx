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
    engine.gravity.y = 9;

    // Create a renderer and attach it to the scene div
    const render = Render.create({
      element: sceneRef.current!,
      engine: engine,
      options: {
        width: window.innerWidth, // Set initial width to screen width
        height: window.innerHeight, // Set initial height to screen height
        wireframes: false,
      },
    });

    // Create the player
    const playerBody = createPlayer();
    setPlayer(playerBody);

    // Add player and level (ground and walls) to the world
    createLevel1(engine);
    Composite.add(engine.world, [playerBody]);

    // Run the renderer
    Render.run(render);

    // Create and run the engine runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Handle player movement
    const cleanupPlayerControls = handlePlayerMovement(playerBody, engine);

    // Function to check if the player is outside the screen bounds and reposition it
    const checkAndTeleportPlayer = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      if (playerBody) {
        const playerX = playerBody.position.x;
        const playerY = playerBody.position.y;

        // Check if player is outside screen bounds
        const playerOutsideScreen =
          playerX < 0 ||
          playerX > screenWidth ||
          playerY < 0 ||
          playerY > screenHeight;

        if (playerOutsideScreen) {
          // Reposition player to the middle of the screen
          Matter.Body.setPosition(playerBody, {
            x: screenWidth / 2,
            y: screenHeight / 2,
          });

          // Reset player's velocity to stop any further movement
          Matter.Body.setVelocity(playerBody, { x: 0, y: 0 });
        }
      }
    };

    // Check player position continuously
    const update = () => {
      checkAndTeleportPlayer(); // Continuously check if player is off-screen
      requestAnimationFrame(update); // Keep checking every frame
    };

    update(); // Start checking

    // Update the level (ground and walls) when the window is resized
    const handleResize = () => {
      render.options.width = window.innerWidth;
      render.options.height = window.innerHeight;
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;

      createLevel1(engine); // Recalculate level dimensions
    };

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
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div ref={sceneRef} className="w-full h-full" />
    </div>
  );
};

export default MatterJSScene;
