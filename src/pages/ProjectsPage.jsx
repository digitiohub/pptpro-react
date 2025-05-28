import React from "react";
import Navbar from "../components/ui/menus/Navbar";
import ProjectsHero from "../components/Projects/ProjectsHero";
import ProjectsGrid from "../components/Projects/ProjectsGrid";

const ProjectsPage = () => {
  return (
    <div className="projects-page">
      <Navbar />
      {/* <ProjectsHero /> */}
      <ProjectsGrid />
    </div>
  );
};

export default ProjectsPage;
