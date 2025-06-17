import { API_URL, API_TOKEN } from "../constants/constants.js";

export async function createTask(taskData) {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({ data: taskData }),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  const json = await response.json();
  return json.data;
}
