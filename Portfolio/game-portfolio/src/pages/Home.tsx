import React from "react";
import GameContainer from "../components/gameContainer/GameContainer";
import StickyHeader from "../components/header/StickyHeader";

export default function Home() {
  return (
    <div
      id="gameContainer"
      className="relative w-[100vw] h-[100vh] overflow-hidden"
    >
      <StickyHeader />
      <GameContainer />
    </div>
  );
}
