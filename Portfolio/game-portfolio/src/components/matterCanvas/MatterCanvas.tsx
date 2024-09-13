import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import {
  createMatterEngine,
  stopMatterEngine,
} from "../../matterjs/createMatterEngine";
import { setupCollisionEvents } from "../../matterjs/handleCollisionEvent";
import { createLevel } from "../../matterjs/createLevel";
import Player from "../player/Player";
import Level1 from "../level1/Level1";

export default function MatterCanvas() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const currentLevel = useSelector(
    (state: RootState) => state.level.level.currentLevel
  );
  const [matterEngine, setMatterEngine] = useState<Matter.Engine | null>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    // Create engine
    const { engine, render, runner } = createMatterEngine(sceneRef.current);

    createLevel(engine, currentLevel); // Initial level creation
    setMatterEngine(engine);

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
      createLevel(engine, currentLevel);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      stopMatterEngine(render, runner, engine);
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch, currentLevel]);

  const renderLevel = () => {
    switch (currentLevel) {
      case 0:
        return <Level1 engine={matterEngine!} />;
      default:
        return <div>Unknown Level</div>;
    }
  };

  return (
    <div ref={sceneRef} className="w-full h-full">
      {matterEngine && renderLevel()}
      {matterEngine && <Player engine={matterEngine} />}
    </div>
  );
}
