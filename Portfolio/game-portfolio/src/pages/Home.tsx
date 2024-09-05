import React from "react";
import GameHome from "../components/gameHome/GameHome";
import Player2 from "../components/player/Player2";

export default function Home() {
  return (
    <>
      <div id="gameContainer" className="relative w-[100vw] h-[100vh]">
        <Player2 />
        <GameHome />
      </div>
    </>
  );
}
