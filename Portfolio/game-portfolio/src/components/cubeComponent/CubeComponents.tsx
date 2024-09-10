import React, { useEffect } from "react";
import Matter from "matter-js";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setCubes } from "../../store/cubes";
import SingleCube from "./SingleCube";

interface CubeComponentsProps {
  engine: Matter.Engine;
}

export default function CubeComponents({ engine }: CubeComponentsProps) {
  const dispatch = useAppDispatch();
  const cubes = useAppSelector((state) => state.cubes.cubes);

  useEffect(() => {
    let animationFrameId: number;

    const updateCubes = () => {
      const cubeBodies = Matter.Composite.allBodies(engine.world).filter(
        (body) => body.label.startsWith("smallCube")
      );

      const updatedCubes = cubeBodies.map((cube) => ({
        label: cube.label,
        x: cube.position.x,
        y: cube.position.y,
        angle: cube.angle,
      }));

      // Dispatch all cubes' positions and rotations to the Redux store
      dispatch(setCubes(updatedCubes));

      // Continuously update
      animationFrameId = requestAnimationFrame(updateCubes);
    };

    updateCubes();

    return () => {
      cancelAnimationFrame(animationFrameId); // Clean up the animation loop on unmount
    };
  }, [engine, dispatch]);

  return (
    <div className="absolute w-full h-full">
      {/* Render SingleCube for each cube */}
      {cubes.map((cube) => (
        <SingleCube
          key={cube.label}
          label={cube.label}
          x={cube.x}
          y={cube.y}
          angle={cube.angle}
        />
      ))}
    </div>
  );
}
