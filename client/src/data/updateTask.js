import { API_URL, API_TOKEN } from "../constants/constants.js";

export async function updateTask(taskId, taskData) {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({ data: taskData }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update task with id ${taskId}`);
  }

  const json = await response.json();
  return json.data;
}
