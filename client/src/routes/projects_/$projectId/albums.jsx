import { createFileRoute } from "@tanstack/react-router";
import { fetchProjectAlbums } from "../../../queries/fetch-project-albums";

export const Route = createFileRoute("/projects_/$projectId/albums")({
  loader: ({ params }) => {
    return fetchProjectAlbums(params.projectId);
  },
  component: RouteComponent,
});

function RouteComponent() {
  const albums = Route.useLoaderData();
  return (
    <div>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>{album.title}</li>
        ))}
        ;
      </ul>
    </div>
  );
}
