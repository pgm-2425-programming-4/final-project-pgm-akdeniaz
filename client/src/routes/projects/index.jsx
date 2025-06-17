import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchProjects } from "../../data/fetchProjects";

export const Route = createFileRoute("/projects/")({
  loader: fetchProjects,
  component: RouteComponent,
});

function RouteComponent() {
  const projects = Route.useLoaderData();

  return (
    <div>
      <h2 className="text-xl font-bold">Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link
              to="/projects/$projectId"
              params={{ projectId: String(project.id) }}
            >
              {project.attributes.project}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
