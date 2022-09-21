import React from "react";
import { projectOpenSource, projects } from "../../utils/mocks/projects";
import "./projects.scss";

const Projects = () => {
  return (
    <div className="projects mobile-container container">
      <h1 className="page-title">Projects</h1>
      <div className="projects-top">
        <div className="titles">
          <h2 className="secondary-title">Private Source Projects</h2>
        </div>
      </div>
      <div className="projectsCards">
        {projects.map((item) => (
          <a href={item.project.url} key={item.id}>
            <div className="projectCard">
              <div className="projectCardTop">
                <div className="projectCardLeft">
                  <h3>{item.project.name}</h3>
                  <span>{item.project.url}</span>
                </div>
                <div className="projectCardLeft">
                  <img
                    src={item.project.proifle}
                    alt={`${item.project.name}'s Icon`}
                  />
                </div>
              </div>
              <div className="projectCardBottom">
                <p>{item.project.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="titles">
        <h1 className="page-title">Open Source Projects</h1>
      </div>
      <div className="open-source-cards">
        {projectOpenSource.map((item) => (
          <div
            className="open-source-card"
            onClick={() => window.location.replace(item.project.url)}
          >
            <div className="open-source-left">
              <img
                src={item.project.profile}
                alt={`${item.project.name}'s Thumbnail`}
              />
            </div>
            <div className="open-source-right">
              <h3>{item.project.name}</h3>
              <span>{item.project.url}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
