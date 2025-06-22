import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProjectDetail } from "../../components/ProjectDetail";
import { getTasksByProject } from "../../services/dataService";

export const Route = createFileRoute("/projects/$id")({
  loader: async ({ params }) => {
    const id = params.id;
    const data = await getTasksByProject(id);
    if (!data) throw notFound();
    return [data, id];
  },

  component: RouteComponent,
  notFoundComponent: () => (
    <section className="section">
      <div className="container has-text-centered">
        <div className="notification is-danger">
          <p className="title is-4">Project not found</p>
          <p className="subtitle is-6">
            The project you're looking for doesn't exist.
          </p>
          <a href="/projects" className="button is-light mt-4">
            Back to Projects
          </a>
        </div>
      </div>
    </section>
  ),
});

function RouteComponent() {
  const [data, id] = Route.useLoaderData();
  return <ProjectDetail tasks={data.tasks} projectSlug={id} />;
}
