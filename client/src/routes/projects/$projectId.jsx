import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { fetchProjectById } from "../../queries/fetch-project-by-id";
import { fetchTasks } from "../../data/fetchTasks";

export const Route = createFileRoute("/projects/$projectId")({
  loader: async ({ params }) => {
    const project = await fetchProjectById(params.projectId);
    const tasks = await fetchTasks(1, 10);
    if (!project) throw notFound();
    return { project, tasks };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { project, tasks } = Route.useLoaderData();

  return (
    <div>
      <h1 className="text-2xl font-bold">{project.attributes.project}</h1>
      <p>ID: {project.id}</p>

      <h2 className="text-xl font-bold">Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <Link
              to="/projects/$projectId/tasks/$taskId"
              params={{ projectId: project.id, taskId: task.id }}
            >
              {task.attributes.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
