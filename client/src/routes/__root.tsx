import { useEffect, useState } from "react";
import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import { API_URL, API_TOKEN } from "../constants/constants.js";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(`${API_URL}/projects`, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
        const json = await res.json();
        setProjects(json.data || []);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div className="wrapper">
      <aside className="menu">
        <ul className="menu-list">
          <li>
            <Link
              to="/"
              activeProps={{ className: "active", "aria-current": "page" }}
            >
              Home
            </Link>
          </li>
        </ul>

        <p className="menu-label">Projects</p>
        <ul className="menu-list">
          {projects.map((project) => {
            const id = project.id;
            const name = project.project;
            return (
              <li key={id}>
                <Link to={`/projects/${id}`}>{name}</Link>
              </li>
            );
          })}
        </ul>
        <ul>
          {projects.map((project) => {
          return (
            <Link
            to={`/projects/${project.slug}`}
            className="[&.is-active]:font-bold"
            key={project.id}
            >
              {project.Title}
            </Link>
          );
        })}
        </ul>
        <p className="menu-label">Info</p>
        <ul className="menu-list">
          <li>
            <Link
              to="/about"
              activeProps={{ className: "active", "aria-current": "page" }}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              activeProps={{ className: "active", "aria-current": "page" }}
            >
              Contact
            </Link>
          </li>
        </ul>
      </aside>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
