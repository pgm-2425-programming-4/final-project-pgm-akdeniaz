import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { fetchProjectById } from "../../queries/fetch-project-by-id";

export const Route = createFileRoute("/projects/$projectId")({
  loader: async ({ params }) => {
    const data = await fetchProjectById(params.projectId);
    if (!data) {
      throw notFound();
    }
    return data;
  },
  component: RouteComponent,
  notFoundComponent: () => <div>Project not found</div>,
});

function RouteComponent() {
  const data = Route.useLoaderData();
  return (
    <div>
      <p>{data.name}</p>
      <p>
        {data.address.street} {data.address.suite}
      </p>
      <p>
        {data.address.zipcode}, {data.address.city}
      </p>
      <p>
        <a href={`https://${data.website}`} target="_blank">
          {data.website}
        </a>
      </p>
      <p>
        <a href={`mailto: ${data.email}`}>{data.email}</a>
      </p>
      <p>
        <a href={`tel: ${data.phone}`}>{data.phone}</a>
      </p>

      <ul>
        <li>
          <Link to="/projects/$projectId/posts" params={{ projectId: data.id }}>
            Posts
          </Link>
        </li>
        <li>
          <Link to="/projects/$projectId/albums" params={{ projectId: data.id }}>
            Albums
          </Link>
        </li>
      </ul>
    </div>
  );
}
