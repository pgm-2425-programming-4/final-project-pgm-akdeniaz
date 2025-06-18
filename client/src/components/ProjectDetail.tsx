import { useEffect, useState } from "react";
import { useParams, Outlet, Link } from "@tanstack/react-router";
import { API_URL, API_TOKEN } from "../constants/constants.js";
import "./ProjectDetail.css";

import {
  createEntry,
  updateEntry,
  deleteEntry,
} from "../services/dataService.js";

async function getTaskStatusIdByName(name) {
  const res = await fetch(
    `${API_URL}/task-statuses?filters[name][$eq]=${name}`,
    { headers: { Authorization: `Bearer ${API_TOKEN}` } }
  );
  const json = await res.json();
  return json.data?.[0]?.id || null;
}

async function getProjectIdFromDocumentId(documentId) {
  const res = await fetch(
    `${API_URL}/projects?filters[documentId][$eq]=${documentId}`,
    { headers: { Authorization: `Bearer ${API_TOKEN}` } }
  );
  const json = await res.json();
  return json.data?.[0]?.id || null;
}

export function ProjectDetail() {
  const { projectId } = useParams({ from: "/projects/$projectId" });
  const [projectName, setProjectName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTag, setFilterTag] = useState("");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [newCardText, setNewCardText] = useState({});

  const persistTasks = (updated) => {
    setTasks(updated);
    const allTags = new Set(
      updated.flatMap((task) => task.tags.map((t) => t.name))
    );
    setTags(Array.from(allTags));
  };

  const fetchTasksAndProject = async () => {
    try {
      const projectRes = await fetch(
        `${API_URL}/projects?filters[documentId][$eq]=${projectId}`,
        { headers: { Authorization: `Bearer ${API_TOKEN}` } }
      );
      const projectJson = await projectRes.json();
      const project = projectJson.data?.[0];
      setProjectName(
        project?.project || project?.project || "Unknown Project"
      );

      const taskRes = await fetch(`${API_URL}/tasks?populate=*`, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      });
      const taskJson = await taskRes.json();

      const filtered = taskJson.data
        .filter((t) => {
          if (t.projects?.documentId)
            return t.projects.documentId === projectId;
          const rel = t.projects?.data;
          return (
            Array.isArray(rel) &&
            rel.some((p) => p.documentId === projectId)
          );
        })
        .map((t) => ({
          id: t.id,
          documentId: t.documentId,
          title: t.title,
          description: t.description,
          createdAt: t.createdAt,
          updatedAt: t.updatedAt,
          publishedAt: t.publishedAt,
          task_status: t.task_status ?? { name: "Unknown" },
          tags: t.tags ?? [],
        }));

      persistTasks(filtered);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasksAndProject();
  }, [projectId]);

  if (loading) return <p>Loading...</p>;

  const statusColumns = ["To do", "In progress", "Ready for review", "Done"];

  const groupedTasks = statusColumns.map((status) => ({
    status,
    tasks: tasks.filter(
      (task) =>
        task.task_status?.name === status &&
        (!filterTag || task.tags.some((tag) => tag.name === filterTag)) &&
        (!search || task.title.toLowerCase().includes(search.toLowerCase()))
    ),
  }));

  const handleAddTask = async (status) => {
    const title = newCardText[status]?.trim();
    if (!title) return;

    const statusId = await getTaskStatusIdByName(status);
    const projectStrapiId = await getProjectIdFromDocumentId(projectId);

    if (!statusId || !projectStrapiId) {
      alert("Failed to find project or status ID.");
      return;
    }

    try {
      const newTask = await createEntry("tasks", {
        title,
        task_status: statusId,
        projects: [projectStrapiId],
      });
      fetchTasksAndProject();
    } catch (err) {
      console.error("Failed to create task", err);
    } finally {
      setNewCardText((prev) => ({ ...prev, [status]: "" }));
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("❌ Delete this task?")) return;
    try {
      await deleteEntry("tasks", id);
      fetchTasksAndProject();
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  const handleEditTask = async (task) => {
    const newTitle = prompt("📝 Edit task title:", task.title);
    if (!newTitle || newTitle === task.title) return;
    try {
      await updateEntry("tasks", task.id, { title: newTitle });
      fetchTasksAndProject();
    } catch (err) {
      console.error("Failed to update task", err);
    }
  };

  return (
    <div className="project-detail">
      <div className="header">
        <div className="filters">
          <select
            className="filter-select"
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
          >
            <option value="">All Tags</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <input
            className="search-input"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <h2 className="project-title">
          Active project: {projectName}
          <Link
            to={`/projects/${projectId}/backlog`}
            className="view-backlog-link"
          >
            View backlog
          </Link>
        </h2>
      </div>

      <main className="task-columns scrollable-columns">
        {groupedTasks.map((column) => (
          <div key={column.status} className="task-column">
            <h3>{column.status}</h3>
            {column.tasks.map((task) => (
              <div key={task.id} className="task-card">
                <p>{task.title}</p>
                <div className="tags">
                  {task.tags.map((tag) => (
                    <span key={tag.id} className={`tag ${tag.name}`}>
                      {tag.name}
                    </span>
                  ))}
                </div>
                <button onClick={() => handleEditTask(task)}>📝</button>
                <button onClick={() => handleDeleteTask(task.id)}>❌</button>
              </div>
            ))}
            <input
              value={newCardText[column.status] || ""}
              onChange={(e) =>
                setNewCardText({
                  ...newCardText,
                  [column.status]: e.target.value,
                })
              }
              placeholder="New task title"
            />
            <button
              className="add-card"
              onClick={() => handleAddTask(column.status)}
            >
              ➕
            </button>
          </div>
        ))}
        <div className="task-column add-column">
          <h3>+ Add another list</h3>
        </div>
      </main>
    </div>
  );
}
