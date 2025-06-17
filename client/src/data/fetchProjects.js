import { API_URL, API_TOKEN } from "../constants/constants.js";

export async function fetchProjects() {
  const response = await fetch(`${API_URL}/projects?populate=*`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  const json = await response.json();
  return json.data;
}
