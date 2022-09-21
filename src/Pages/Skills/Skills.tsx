import React from "react";
import { skills } from "../../utils/mocks/skills";
import "./skills.scss";

const Skills = () => {
  return (
    <div className="skills-container mobile-container container">
      <h1 className="page-title">Skills</h1>
      <div className="titles">
        <h2 className="secondary-title">Here is what I know</h2>
      </div>
      <div className="skills">
        {skills.map((item) => (
          <div className="skill" key={item.id}>
            <img src={item.image} alt={`${item.name}'s Image`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
