import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "../../routeTree.gen.ts";
import { ProjectsProvider } from "../../context/ProjectsContext.jsx";
import "./App.css";

const router = createRouter({ routeTree });

export default function App() {
  return (
    <ProjectsProvider>
      <RouterProvider router={router} />
    </ProjectsProvider>
  );
}
