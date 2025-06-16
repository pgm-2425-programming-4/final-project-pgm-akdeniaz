import { createFileRoute, Link } from "@tanstack/react-router";

// Fetch all projects from the API
async function fetchAllUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/projects");
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  return await response.json();
}

export const Route = createFileRoute("/projects/")({
  loader: fetchAllUsers,
  component: RouteComponent,
});

function RouteComponent() {
  const projects = Route.useLoaderData();
  return (
    <div>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link to="/projects/$projectId" params={{ projectId: String(project.id) }}>
              {project.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
