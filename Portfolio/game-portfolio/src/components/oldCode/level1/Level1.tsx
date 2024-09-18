import React, { useEffect, useState } from "react";
import Matter from "matter-js";
import SingleCube from "./SingleCube";

type Props = {
  engine: Matter.Engine;
};

export default function Level1({ engine }: Props) {
  const [smallCubes, setSmallCubes] = useState<
    { label: string; x: number; y: number }[]
  >([]);

  useEffect(() => {
    let animationFrameId: number;

    const updateCubes = () => {
      const cubeBodies = Matter.Composite.allBodies(engine.world).filter(
        (body) => body.label.startsWith("smallCube-")
      );

      const cubes = cubeBodies.map((cube) => ({
        label: cube.label,
        x: cube.position.x,
        y: cube.position.y,
      }));

      setSmallCubes(cubes);
      animationFrameId = requestAnimationFrame(updateCubes);
    };

    updateCubes();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [engine]);

  return (
    <>
      <div className="absolute w-[100vw] h-[100vh] inset-0">
        <div className="pl-[100px] pt-[150px]">
          <h1 className="font-bold mb-2 heading-1">Fullstack Developer</h1>

          <p className="mb-4 opacity-50 max-w-[800px] body-1">
            Hi, I'm Chris, a full stack web developer. This site, built with
            React, TypeScript, and Matter.js, might seem a bit over the top, but
            I believe it showcases my ability to handle complex logic and
            demonstrates a solid grasp of state management. Feel free to look
            around and enjoy!
          </p>
        </div>

        <div className="pl-[100px] absolute bottom-[175px]">
          <h2 className="text-5xl font-bold mb-8">Current Tech Stack</h2>
          <div className="flex flex-col text-2xl gap-8">
            <div>Front End:</div>
            <div>Back End:</div>
            <div>Others:</div>
          </div>
        </div>
      </div>
      <>
        {smallCubes.map((cube, idx) => (
          <SingleCube key={idx} label={cube.label} x={cube.x} y={cube.y} />
        ))}
      </>
    </>
  );
}
