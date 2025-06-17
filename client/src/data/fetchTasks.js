import { API_URL, API_TOKEN } from "../constants/constants.js";

export async function fetchTasks(page, pageSize) {
  const result = await fetch(
    `${API_URL}/tasks?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*&sort=createdAt:desc`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );

  if (!result.ok) {
    const error = await result.json();
    throw new Error(
      `Failed to fetch tasks: ${result.status} ${result.statusText} - ${JSON.stringify(error)}`
    );
  }

  // return result.json();
}
