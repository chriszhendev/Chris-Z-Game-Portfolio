import React from "react";
import Game from "../components/game/game";

export default function Home() {
  return (
    <>
      <div id="gameContainer" className="relative w-[100vw] h-[100vh]">
        <Game />
      </div>
    </>
  );
}
