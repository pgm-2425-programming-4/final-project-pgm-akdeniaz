import { API_URL, API_TOKEN } from "../constants/constants.js";

const JSON_HEADERS = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_TOKEN}`,
};

const AUTH_HEADERS = {
  Authorization: `Bearer ${API_TOKEN}`,
};

export async function getTasksByProject(projectId) {
  const res = await fetch(
    `${API_URL}/projects?filters[id][$eq]=${projectId}&populate[tasks][populate][0]=tags&populate[tasks][populate][1]=task_status`,
    {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    }
  );

  const json = await res.json();
  return json.data?.[0] ?? null;
}

function appendNestedFilters(params, prefix, obj) {
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}[${key}]` : key;
    if (typeof value === "object" && value !== null) {
      appendNestedFilters(params, path, value);
    } else {
      params.append(`${path}[$eq]`, value);
    }
  }
}

export async function fetchTasks({ page, pageSize, filters, sort }) {
  const params = new URLSearchParams();

  params.append("pagination[page]", page.toString());
  params.append("pagination[pageSize]", pageSize.toString());
  if (sort) params.append("sort", sort);
  if (filters) {
    appendNestedFilters(params, "filters", filters);
  }

  params.append("populate[0]", "tags");
  params.append("populate[1]", "task_status");
  params.append("populate[2]", "projects");

  const url = `${API_URL}/tasks?${params.toString()}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });

  return await res.json();
}

export async function createEntry(type, data) {
  const response = await fetch(`${API_URL}/${type}`, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Create failed:", errorText);
    throw new Error(`Failed to create ${type}`);
  }

  const json = await response.json();
  return json.data;
}

export async function updateEntry(type, documentId, data) {
  const strapiId = await getStrapiIdByDocumentId(type, documentId);
  if (!strapiId)
    throw new Error(`No ${type} found with documentId ${documentId}`);

  const response = await fetch(`${API_URL}/${type}/${strapiId}`, {
    method: "PUT",
    headers: JSON_HEADERS,
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Update failed:", errorText);
    throw new Error(`Failed to update ${type} ${documentId}`);
  }

  const json = await response.json();
  return json.data;
}

export async function deleteEntry(type, documentId) {
  const strapiId = await getStrapiIdByDocumentId(type, documentId);
  if (!strapiId)
    throw new Error(`No ${type} found with documentId ${documentId}`);

  const response = await fetch(`${API_URL}/${type}/${strapiId}`, {
    method: "DELETE",
    headers: AUTH_HEADERS,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Delete failed:", errorText);
    throw new Error(`Failed to delete ${type} ${documentId}`);
  }

  return true;
}
