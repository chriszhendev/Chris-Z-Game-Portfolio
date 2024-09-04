interface BlockProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function Block({ x, y, width, height }: BlockProps) {
  return (
    <div
      style={{
        left: `${x}%`,
        bottom: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: "red",
      }}
      className="absolute collisionBox"
    />
  );
}
