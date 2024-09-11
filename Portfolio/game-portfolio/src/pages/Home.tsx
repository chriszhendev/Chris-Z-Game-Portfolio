import React from "react";
import MainPage from "../components/mainPage/MainPage";
import StickyHeader from "../components/header/StickyHeader";
import GamefolioContainer from "../components/gameFolio/GamefolioContainer";

export default function Home() {
  return (
    <div id="gameContainer" className="relative w-[100vw] h-[100vh]">
      <StickyHeader />
      <GamefolioContainer />
    </div>
  );
}
