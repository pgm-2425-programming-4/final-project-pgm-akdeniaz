import { API_URL, API_TOKEN } from "../constants/constants.js";

export async function fetchTags() {
  const response = await fetch(`${API_URL}/tags`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tags");
  }

  const json = await response.json();
  return json.data;
}
