import React, { useEffect, useRef, useState } from "react";
import Matter, { Engine, Render, World, Bodies } from "matter-js";
import { createBaseWorld } from "../../matterjs/levelManager";
import {
  createMatterEngine,
  stopMatterEngine,
} from "../../matterjs/createMatterEngine";
import Player from "../player/player";
import LevelContainer from "../levels/LevelContainer";

export default function GameContainer() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [matterEngine, setMatterEngine] = useState<Matter.Engine | null>(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    if (!sceneRef.current) return;
    const { engine, render, runner } = createMatterEngine(sceneRef.current);
    setMatterEngine(engine);
    const baseWolrd = createBaseWorld();
    Matter.World.add(engine.world, baseWolrd);

    const update = () => {
      requestAnimationFrame(update);
    };
    update();

    const handleResize = () => {
      Matter.World.clear(engine.world, false);
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      const baseWolrd = createBaseWorld();
      Matter.World.add(engine.world, baseWolrd);
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      stopMatterEngine(render, runner, engine);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={sceneRef} className="w-full h-full">
      {matterEngine && (
        <LevelContainer engine={matterEngine} windowSize={windowSize} />
      )}
      {matterEngine && <Player engine={matterEngine} windowSize={windowSize} />}
    </div>
  );
}
