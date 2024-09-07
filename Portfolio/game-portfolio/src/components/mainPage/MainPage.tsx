import React, { useEffect, useRef, useState } from "react";
import { createPlayer } from "../../matterjs/createPlayer";
import { handlePlayerMovement } from "../../matterjs/handlePlayerMovement";
import { createLevel } from "../../matterjs/createLevel";
import { setupCollisionEvents } from "../../matterjs/handleCollisionEvent";
import {
  createMatterEngine,
  stopMatterEngine,
} from "../../matterjs/createMatterEngine";
import Matter from "matter-js";

export default function MainPage() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const playerImgRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (!sceneRef.current) return;

    // Create engine
    const { engine, render, runner } = createMatterEngine(sceneRef.current);

    // Create player and level
    const player = createPlayer();
    createLevel(engine); // Initial level creation
    Matter.Composite.add(engine.world, player);

    // Set up player controls
    const cleanupPlayerControls = handlePlayerMovement(
      player,
      engine,
      (isFlipped) => setIsFlipped(isFlipped)
    );

    // Set up collision events
    setupCollisionEvents(engine);

    // Handle player repositioning, etc. (same logic as before)
    const updatePlayerImgPosition = () => {
      if (player && playerImgRef.current) {
        const { x, y } = player.position;
        playerImgRef.current.style.left = `${x - 50}px`;
        playerImgRef.current.style.top = `${y - 75}px`;
      }
    };

    const update = () => {
      updatePlayerImgPosition();
      requestAnimationFrame(update);
    };
    update();

    // Resize handler to recreate the level
    const handleResize = () => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      createLevel(engine); // Recreate the level when the window is resized
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      stopMatterEngine(render, runner, engine);
      cleanupPlayerControls();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div ref={sceneRef} className="w-full h-full" />
      <div
        ref={playerImgRef}
        className="absolute w-[100px] h-[150px]"
        style={{
          left: "0",
          top: "0",
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <img
            src="/images/cright.png"
            style={{ transform: isFlipped ? "scaleX(-1)" : "scaleX(1)" }}
            alt="Player"
            className="w-auto h-full object-fit"
          />
        </div>
        <div className="flex justify-center items-center flex-col text-white ">
          <div>Chris Zhen</div>
          <div className="whitespace-nowrap">Fullstack Developer</div>
        </div>
      </div>
    </div>
  );
}
