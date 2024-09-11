import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Matter from "matter-js";
import { createPlayer } from "../../matterjs/createPlayer";
import { handlePlayerMovement } from "../../matterjs/handlePlayerMovement";

interface PlayerProps {
  engine: Matter.Engine;
}

export default function Player({ engine }: PlayerProps) {
  // Access player state from Redux using the custom hook
  const { x, y, facingLeft } = useAppSelector((state) => state.player.player);
  const dispatch = useAppDispatch();
  const playerRef = useRef<Matter.Body | null>(null);

  useEffect(() => {
    const player = createPlayer();
    playerRef.current = player;
    Matter.Composite.add(engine.world, player);

    // Set up player controls
    const cleanupPlayerControls = handlePlayerMovement(
      player,
      engine,
      dispatch
    );

    // Cleanup on unmount
    return () => {
      cleanupPlayerControls();
      if (playerRef.current) {
        Matter.Composite.remove(engine.world, playerRef.current);
      }
    };
  }, [dispatch, engine]);

  return (
    <div
      className="absolute w-[100px] h-[150px]"
      style={{
        left: `${x - 50}px`, // Update position based on Redux state
        top: `${y - 75}px`, // Update position based on Redux state
      }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <img
          src="/images/cright.png"
          style={{ transform: facingLeft ? "scaleX(-1)" : "scaleX(1)" }} // Update facing direction based on Redux state
          alt="Player"
          className="w-auto h-full object-fit"
        />
      </div>
      <div className="flex justify-center items-center flex-col text-white">
        <div>Chris Zhen</div>
        <div className="whitespace-nowrap">Fullstack Developer</div>
      </div>
    </div>
  );
}
