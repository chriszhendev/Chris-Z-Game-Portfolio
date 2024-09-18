import React from "react";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import Level0 from "./Level0";

type Props = {
  engine: Matter.Engine;
  windowSize: {
    width: number;
    height: number;
  };
};

export default function LevelContainer({ engine, windowSize }: Props) {
  // Explicitly type 'state' as RootState to fix the 'any' type issue
  const currentLevel = useAppSelector(
    (state: RootState) => state.level.level.currentLevel
  );

  // Conditionally render the level based on currentLevel
  const renderLevel = () => {
    switch (currentLevel) {
      case 0:
        return <Level0 engine={engine} windowSize={windowSize} />;
      default:
        return <div>No Level Loaded</div>;
    }
  };

  return (
    <div className="absolute top-0 left-0 inset-0 w-full h-full">
      {renderLevel()}
    </div>
  );
}
