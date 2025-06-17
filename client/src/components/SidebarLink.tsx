import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { API_URL, API_TOKEN } from '../constants/constants';

interface Project {
  id: number;
  documentId: string;
  project: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface SidebarLinkProps {
  to: string;
  label: string;
  className?: string;
}

export default function SidebarLink({ to, label, className = '' }: SidebarLinkProps) {
  const [projectData, setProjectData] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isRoute = to.startsWith('/') || to === '';

  useEffect(() => {
    if (isRoute) return;

    async function fetchProject() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}/projects/${to}`, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const json = await response.json();
        if (!json.data) {
          throw new Error('Project not found');
        }
        setProjectData(json.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [to, isRoute]);

  if (isRoute) {
    return (
      <Link to={to} className={`sidebar-link ${className}`}>
        {label}
      </Link>
    );
  }

  if (loading) return <span>Loading...</span>;
  if (error) return <span>Error: {error}</span>;
  if (!projectData) return <span>Project not found</span>;

  return (
    <Link to={`/projects/${projectData.documentId}`} className={`sidebar-link ${className}`}>
      {label}
    </Link>
  );
}
