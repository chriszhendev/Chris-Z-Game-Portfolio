import Matter, { Composite, Body, Bodies, World, Events } from "matter-js";
import React, { useEffect, useRef, useState } from "react";
import { createMatterBlock } from "../../matterjs/levelManager";

type Props = {
  width: number;
  height: number;
  imgsrc: string;
  label: string;
  engine: Matter.Engine;
};

export default function SkillCube({
  width,
  height,
  imgsrc,
  label,
  engine,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const blockRef = useRef<Body | null>(null);

  function createBlock() {
    if (blockRef.current) {
      Composite.remove(engine.world, blockRef.current);
    }
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const initialX = rect.left + rect.width / 2;
      const initialY = rect.top + rect.height / 2;
      const newBlock = createMatterBlock(
        width,
        height,
        initialX,
        initialY,
        label,
        false
      );
      blockRef.current = newBlock;
      Matter.World.add(engine.world, newBlock);
      setPosition({ x: initialX, y: initialY });
    }
  }

  useEffect(() => {
    createBlock();
    const updatePosition = () => {
      if (blockRef.current) {
        const { position } = blockRef.current;
        setPosition({ x: position.x, y: position.y });
      }
    };
    Events.on(engine, "afterUpdate", updatePosition);

    return () => {
      if (blockRef.current) {
        Composite.remove(engine.world, blockRef.current as Body);
      }
      Events.off(engine, "afterUpdate", updatePosition);
    };
  }, [engine]);

  return (
    <div className="relative inline-block text-center group" ref={containerRef}>
      <img
        src={imgsrc}
        alt={label}
        className="transition-transform duration-300 group-hover:scale-125"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          objectFit: "contain",
        }}
      />
      <span className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {label}
      </span>
    </div>
  );
}
