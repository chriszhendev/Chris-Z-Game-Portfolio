import React from "react";
import MatterCanvas from "../matterCanvas/MatterCanvas";
import MatterCanvasOverlay from "../matterCanvasOverlay/MatterCanvasOverlay";

export default function GamefolioContainer() {
  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <MatterCanvas />
      {/* <MatterCanvasOverlay /> */}
    </div>
  );
}
