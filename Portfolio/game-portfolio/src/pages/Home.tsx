import React from "react";
import MainPage from "../components/mainPage/MainPage";

export default function Home() {
  return (
    <>
      <div id="gameContainer" className="relative w-[100vw] h-[100vh]">
        <MainPage />
      </div>
    </>
  );
}
