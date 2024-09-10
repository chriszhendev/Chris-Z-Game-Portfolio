import React from "react";

type SingleCubeProps = {
  label: string;
  x: number;
  y: number;
  angle: number;
};

export default function SingleCube({ label, x, y, angle }: SingleCubeProps) {
  // Extract the cube name from the label (e.g., smallCube-html)
  const cubeName = label.split("smallCube-")[1];

  return (
    <div
      className="absolute flex flex-col items-center"
      style={{
        left: `${x - 15}px`,
        top: `${y - 15}px`,
      }}
    >
      <div className="group">
        <img
          src={`/images/${cubeName}.png`}
          alt={cubeName}
          className="w-[30px] h-[30px] transition-transform duration-300 transform group-hover:scale-150"
        />
        <div className="mt-2 w-full text-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {cubeName}
        </div>
      </div>
    </div>
  );
}
