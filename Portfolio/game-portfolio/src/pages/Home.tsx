import React from "react";
import FloatingBox from "../components/floatingbox/FloatingBox";
import Player from "../components/player/Player";

export default function Home() {
  return (
    <>
      <div className="relative w-[100vw] h-[100vh]">
        <Player />
      </div>
    </>
  );
}
