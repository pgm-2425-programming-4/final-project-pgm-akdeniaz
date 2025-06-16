import { createFileRoute } from "@tanstack/react-router";
import { fetchProjectPosts } from "../../../queries/fetch-project-posts";

export const Route = createFileRoute("/projects_/$projectId/posts")({
  loader: ({ params }) => {
    return fetchProjectPosts(params.projectId);
  },
  component: RouteComponent,
});

function RouteComponent() {
  const posts = Route.useLoaderData();
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
