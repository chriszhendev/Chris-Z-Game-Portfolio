import Matter from "matter-js";

export function createCubeRow(
  objList: string[],
  startX: number,
  y: number,
  gap: number,
  engine: Matter.Engine
) {
  const smallCubeSize = 30;
  const interactiveBlockWidth = smallCubeSize;
  const interactiveBlockHeight = 5;

  objList.forEach((obj, index) => {
    const blockX = startX + index * (smallCubeSize + gap);
    const interactiveBlock = Matter.Bodies.rectangle(
      blockX,
      y + interactiveBlockHeight + smallCubeSize / 2,
      interactiveBlockWidth,
      interactiveBlockHeight,
      {
        isStatic: true,
        label: `interactiveBlock`,
        render: { fillStyle: "rgba(0, 255, 0)" },
      }
    );

    const smallCube = Matter.Bodies.rectangle(
      blockX,
      y,
      smallCubeSize,
      smallCubeSize,
      {
        isStatic: false,
        label: `smallCube-${obj}`,
        render: { fillStyle: "rgba(255, 0, 0)" },
      }
    );

    Matter.Composite.add(engine.world, [interactiveBlock, smallCube]);
  });
}

// example of fill style { fillStyle: "rgba(0, 0, 0, 0)" }
export function createMatterCube(
  x: number,
  y: number,
  height: number,
  width: number,
  isStatic: boolean,
  label?: string,
  fillColor?: string
) {
  const block = Matter.Bodies.rectangle(x, y, width, height, {
    isStatic: isStatic,
    label: label ? label : "unknownBlock",
    render: { fillStyle: fillColor ? fillColor : "rgba(255, 0, 0)" },
  });
  return block;
}
