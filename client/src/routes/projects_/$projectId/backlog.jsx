import { createFileRoute } from "@tanstack/react-router";
import { fetchProjectBacklog } from "../../../queries/fetch-project-backlog";

export const Route = createFileRoute("/projects_/$projectId/backlog")({
  loader: ({ params }) => {
    return fetchProjectBacklog(params.projectId);
  },
  component: RouteComponent,
});

function RouteComponent() {
  const backlogs = Route.useLoaderData();
  return (
    <div>
      <ul>
        {backlogs.map((backlog) => (
          <li key={backlog.id}>{backlog.title}</li>
        ))}
        ;
      </ul>
    </div>
  );
}
