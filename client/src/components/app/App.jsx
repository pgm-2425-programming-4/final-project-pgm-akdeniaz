import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "../../routeTree.gen.ts";
import "./App.css";

const router = createRouter({ routeTree });

export default function App() {
  return (
      <RouterProvider router={router} />
  );
}
