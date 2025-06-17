import { createFileRoute, notFound } from "@tanstack/react-router";
import { fetchTaskById } from "../../../data/fetchTaskById";

export const Route = createFileRoute("/tasks_/$taskId/$taskId")({
  loader: async ({ params }) => {
    const task = await fetchTaskById(params.taskId);
    if (!task) throw notFound();
    return task;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const task = Route.useLoaderData();

  return (
    <div>
      <h1 className="text-2xl font-bold">{task.attributes.title}</h1>
      <p>{task.attributes.description}</p>
      <p>Status: {task.attributes.status.name}</p>
      <p>Project: {task.attributes.project.project}</p>
    </div>
  );
}
