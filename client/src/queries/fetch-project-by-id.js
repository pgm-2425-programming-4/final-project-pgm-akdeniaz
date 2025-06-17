import { API_URL, API_TOKEN } from "../constants/constants";

export async function fetchProjectById(projectId) {
  const response = await fetch(`${API_URL}/projects/${projectId}?populate=*`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch project with id ${projectId}: ${response.status} ${response.statusText}`
    );
  }

  const json = await response.json();
  return json.data;
}
