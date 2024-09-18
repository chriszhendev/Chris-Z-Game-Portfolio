import React, { useEffect, useState, useRef } from "react";
import { createPlayer } from "../../matterjs/createPlayer";
import { World, Body, Events } from "matter-js";
import { handlePlayerMovement } from "../../matterjs/handlePlayerMovement";

type Props = {
  engine: Matter.Engine;
  windowSize: {
    width: number;
    height: number;
  };
};

export default function Player({ engine, windowSize }: Props) {
  const [facingLeft, setFacingLeft] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const playerRef = useRef<Body | null>(null); // Store player reference

  // Function to initialize or reinitialize the player
  const initializePlayer = (engine: Matter.Engine) => {
    if (playerRef.current) {
      // Remove the previous player from the world before adding a new one
      World.remove(engine.world, playerRef.current);
    }

    // Create a new player and add it to the world
    const player = createPlayer();
    handlePlayerMovement(player, engine, setFacingLeft);
    World.add(engine.world, player);
    playerRef.current = player;
  };

  useEffect(() => {
    // Initialize player when the engine is ready
    initializePlayer(engine);

    // Sync player position with React state
    const updatePosition = () => {
      if (playerRef.current) {
        const { position } = playerRef.current;
        setPosition({ x: position.x, y: position.y });
      }
    };

    // Update player position after each Matter.js tick
    Events.on(engine, "afterUpdate", updatePosition);

    return () => {
      Events.off(engine, "afterUpdate", updatePosition); // Cleanup event listener
    };
  }, [engine]);

  useEffect(() => {
    // Reinitialize player on window size changes
    initializePlayer(engine);
  }, [windowSize, engine]);

  return (
    <div
      className="absolute w-[100px] h-[150px]"
      style={{
        left: `${position.x - 50}px`,
        top: `${position.y - 75}px`,
      }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <img
          src="/images/cright.png"
          style={{ transform: facingLeft ? "scaleX(-1)" : "scaleX(1)" }}
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
