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
import Player from "../player/Player";
import { useAppDispatch } from "../../store/hooks";
import CubeComponents from "../cubeComponent/CubeComponents";
import BackgroundContainer from "../background/BackgroundContainer";

export default function MainPage() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const [matterEngine, setMatterEngine] = useState<Matter.Engine | null>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    // Create engine
    const { engine, render, runner } = createMatterEngine(sceneRef.current);

    // Create player and level
    const player = createPlayer();
    createLevel(engine); // Initial level creation
    setMatterEngine(engine);
    Matter.Composite.add(engine.world, player);

    // Set up player controls
    const cleanupPlayerControls = handlePlayerMovement(
      player,
      engine,
      dispatch
    );

    // Set up collision events
    setupCollisionEvents(engine);

    const update = () => {
      requestAnimationFrame(update);
    };
    update();

    // Resize handler to recreate the level
    const handleResize = () => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      createLevel(engine);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      stopMatterEngine(render, runner, engine);
      cleanupPlayerControls();
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div ref={sceneRef} className="w-full h-full" />
      <BackgroundContainer />
      <Player />
      {matterEngine !== null ? <CubeComponents engine={matterEngine} /> : null}
    </div>
  );
}
