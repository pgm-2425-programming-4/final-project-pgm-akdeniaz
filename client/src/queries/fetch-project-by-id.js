export async function fetchProjectById(projectId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/projects/${projectId}`
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch project with id ${projectId}: ${response.status} ${response.statusText}`
    );
  }
  return await response.json();
}
