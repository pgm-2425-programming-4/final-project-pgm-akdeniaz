import { API_URL, API_TOKEN } from "../constants/constants.js";

const JSON_HEADERS = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_TOKEN}`,
};

const AUTH_HEADERS = {
  Authorization: `Bearer ${API_TOKEN}`,
};

export async function createEntry(type, data) {
  const response = await fetch(`${API_URL}/${type}`, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify({ data }),
  });
  if (!response.ok) throw new Error(`Failed to create ${type}`);
  const json = await response.json();
  return json.data;
}

export async function updateEntry(type, id, data) {
  const response = await fetch(`${API_URL}/${type}/${id}`, {
    method: "PUT",
    headers: JSON_HEADERS,
    body: JSON.stringify({ data }),
  });
  if (!response.ok) throw new Error(`Failed to update ${type} ${id}`);
  const json = await response.json();
  return json.data;
}

export async function deleteEntry(type, id) {
  const response = await fetch(`${API_URL}/${type}/${id}`, {
    method: "DELETE",
    headers: AUTH_HEADERS,
  });
  if (!response.ok) throw new Error(`Failed to delete ${type} ${id}`);
  return true;
}

export async function fetchEntries(
  type,
  { page = 1, pageSize = 100, filters = {}, sort = "createdAt:desc" } = {}
) {
  const params = new URLSearchParams();
  params.set("pagination[page]", page);
  params.set("pagination[pageSize]", pageSize);
  params.set("sort", sort);
  params.set("populate", "*");

  for (const [field, value] of Object.entries(filters)) {
    if (value) {
      if (field.includes(".")) {
        const [nested, sub] = field.split(".");
        params.set(`filters[${nested}][${sub}][$eq]`, value);
      } else {
        params.set(`filters[${field}][$eq]`, value);
      }
    }
  }

  const url = `${API_URL}/${type}?${params.toString()}`;
  console.log("Request URL:", url);

  const response = await fetch(url, { headers: AUTH_HEADERS });
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Fetch failed: ${response.status}: ${errorText}`);
    throw new Error(`Failed to fetch ${type}`);
  }

  const json = await response.json();
  return json;
}
