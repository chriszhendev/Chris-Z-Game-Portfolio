import React from "react";
import Player from "../components/player/Player";
import GameHome from "../components/gameHome/GameHome";

export default function Home() {
  return (
    <>
      <div id="gameContainer" className="relative w-[100vw] h-[100vh]">
        <GameHome />
        <Player />
      </div>
    </>
  );
}
