import React, { createContext, useState, useContext } from "react";

const ProjectsContext = createContext();

export function ProjectsProvider({ children }) {
  const [projects] = useState([
    { id: 2, name: "AtWork2", description: "Details for AtWork2 project" },
    { id: 4, name: "PGM4", description: "Details for PGM4 project" },
  ]);

  return (
    <ProjectsContext.Provider value={{ projects }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  return useContext(ProjectsContext);
}
