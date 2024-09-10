import React from "react";

export default function BackgroundContainer() {
  return (
    <div className="w-full h-full absolute inset-0">
      <div className="w-full h-full flex flex-col p-[100px]">
        <div className="py-16">
          <>
            <h1 className="text-7xl font-bold mb-2">Fullstack Developer</h1>
          </>
          <>
            <p className="mb-4 opacity-50 max-w-[800px]">
              Hi, I'm Chris, a full stack web developer. This site, built with
              React, TypeScript, and Matter.js, might seem a bit over the top,
              but I believe it showcases my ability to handle complex logic and
              demonstrates a solid grasp of state management. Feel free to look
              around and enjoy!
            </p>
          </>
        </div>

        <div className="absolute bottom-[175px]">
          <h2 className="text-5xl font-bold mb-8">Current Tech Stack</h2>
          <div className="flex flex-col text-2xl gap-8">
            <div>Front End:</div>
            <div>Back End:</div>
            <div>Others:</div>
          </div>
        </div>
      </div>
    </div>
  );
}
