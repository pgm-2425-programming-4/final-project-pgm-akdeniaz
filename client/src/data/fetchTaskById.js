import { API_URL, API_TOKEN } from "../constants/constants.js";

export async function fetchTaskById(taskId) {
  const response = await fetch(`${API_URL}/tasks/${taskId}?populate=*`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch task with id ${taskId}`);
  }

  const json = await response.json();
  return json.data;
}
