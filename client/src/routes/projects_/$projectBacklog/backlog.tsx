import { createFileRoute } from "@tanstack/react-router";
import { PaginatedTaskList } from "../../../components/app/paginated-task-list/paginated-task-list";

export const Route = createFileRoute("/projects_/$projectBacklog/backlog")({
  loader: ({ params }) => {
    return { projectSlug: params.projectBacklog };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { projectSlug } = Route.useLoaderData();
  return <PaginatedTaskList projectSlug={projectSlug} />;
}
