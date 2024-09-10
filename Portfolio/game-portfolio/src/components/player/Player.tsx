import React from "react";
import { useAppSelector } from "../../store/hooks";

export default function Player() {
  // Access player state from Redux using the custom hook
  const { x, y, facingLeft } = useAppSelector((state) => state.player.player);

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
