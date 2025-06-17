import { API_URL, API_TOKEN } from '../constants/constants.js';

const headers = {
  Authorization: `Bearer ${API_TOKEN}`,
  'Content-Type': 'application/json',
};

export const fetchProjects = async () => {
  const response = await fetch(`${API_URL}/projects?populate=*`, { headers });
  if (!response.ok) throw new Error('Failed to fetch projects');
  const data = await response.json();
  return data.data;
};

export const fetchProjectById = async (documentId) => {
  const response = await fetch(`${API_URL}/projects/${documentId}?populate=*`, { headers });
  if (!response.ok) throw new Error(`Failed to fetch project with id ${documentId}`);
  const data = await response.json();
  return data.data;
};

export const createProject = async (projectData) => {
  const response = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ data: projectData }),
  });
  if (!response.ok) throw new Error('Failed to create project');
  const data = await response.json();
  return data.data;
};

export const updateProject = async (documentId, projectData) => {
  const response = await fetch(`${API_URL}/projects/${documentId}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ data: projectData }),
  });
  if (!response.ok) throw new Error(`Failed to update project with id ${documentId}`);
  const data = await response.json();
  return data.data;
};

export const deleteProject = async (documentId) => {
  const response = await fetch(`${API_URL}/projects/${documentId}`, {
    method: 'DELETE',
    headers,
  });
  if (!response.ok) throw new Error(`Failed to delete project with id ${documentId}`);
};
