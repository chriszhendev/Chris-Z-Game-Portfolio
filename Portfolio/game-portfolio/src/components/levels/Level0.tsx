import React from "react";
import SkillCube from "../matterCubes/SkillCube";

type Props = {
  engine: Matter.Engine;
  windowSize: {
    width: number;
    height: number;
  };
};

export default function Level0({ engine, windowSize }: Props) {
  const cubeSize = 30;

  return (
    <div className="flex items-center w-full h-full">
      <div className="px-[100px]">
        <h1 className="font-bold mb-2 heading-1">Fullstack Developer</h1>

        <p className="mb-8 opacity-50 max-w-[800px] body-1">
          Hi, I'm Chris, a full stack web developer. This site, built with
          React, TypeScript, and Matter.js, might seem a bit over the top, but I
          believe it showcases my ability to handle complex logic and
          demonstrates a solid grasp of state management. Feel free to look
          around and enjoy!
        </p>
        <div className="">
          <h2 className="text-5xl font-bold mb-8">Current Tech Stack</h2>
          <div className="flex flex-col text-2xl gap-8">
            <div className="flex flex-row items-center">
              <div className="w-[140px]">Front End:</div>
              <div className="flex flex-row gap-4">
                <SkillCube
                  width={30}
                  height={30}
                  imgsrc="images/HTML.png"
                  label="HTML"
                  engine={engine}
                />
                <SkillCube
                  width={30}
                  height={30}
                  imgsrc="images/CSS.png"
                  label="CSS"
                  engine={engine}
                />
                {/* <SkillCube
                  width={30}
                  height={30}
                  imgsrc="images/HTML.png"
                  label="Javascript"
                  engine={engine}
                />
                <SkillCube
                  width={30}
                  height={30}
                  imgsrc="images/HTML.png"
                  label="React"
                  engine={engine}
                />
                <SkillCube
                  width={30}
                  height={30}
                  imgsrc="images/HTML.png"
                  label="Typescript"
                  engine={engine}
                /> */}
              </div>
            </div>

            <div id="back-end">Back End:</div>
            <div id="others">Others:</div>
          </div>
        </div>
      </div>
    </div>
  );
}
