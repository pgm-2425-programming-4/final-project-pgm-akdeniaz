import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { API_URL, API_TOKEN } from "../../constants/constants.js";

export const Route = createFileRoute("/projects/")({
  component: ProjectPage,
});

function ProjectPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProject() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_URL}/projects?filters[documentId][$eq]=${projectId}&populate=tasks`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.data && data.data.length > 0) {
          setProject(data.data[0]);
        } else {
          setProject(null);
        }
      } catch (err) {
        setError(err.message);
        setProject(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [projectId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!project) return <div>Project not found.</div>;

  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.description}</p>
      {project.tasks && project.tasks.data.length > 0 && (
        <div>
          <h2>Tasks</h2>
          <ul>
            {project.tasks.data.map((task) => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
