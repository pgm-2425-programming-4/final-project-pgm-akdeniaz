export async function fetchProjectAlbums(projectId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/projects/${projectId}/albums`
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch album with id ${projectId}: ${response.status} ${response.statusText}`
    );
  }
  return await response.json();
}
