import { API_URL, API_TOKEN } from "../constants/constants.js";

export async function deleteTask(taskId) {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete task with id ${taskId}`);
  }

  return true;
}
