import { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "@tanstack/react-router";
import { API_URL, API_TOKEN } from "../constants/constants.js";
import AddTaskPopup from "./AddTaskPopup.jsx";
import EditTaskPopup from "./EditTaskPopup.jsx";
import "./ProjectDetail.css";
import {
  createEntry,
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

export function ProjectDetail() {
  const { id } = useParams({ from: "/projects/$id" });

  const [documentId, setDocumentId] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [statusColumns, setStatusColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTag, setFilterTag] = useState("");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [newCardText, setNewCardText] = useState({});
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const persistTasks = (updated) => {
    setTasks(updated);
    const allTags = new Set(
      updated.flatMap((task) => task.tags.map((t) => t.name))
    );
    setTags(Array.from(allTags));
  };

  const fetchTasks = useCallback(
    async (docIdToUse = documentId) => {
      try {
        const taskRes = await fetch(
          `${API_URL}/projects/${docIdToUse}?populate[tasks][populate][0]=tags&populate[tasks][populate][1]=task_status&populate[tasks][populate][2]=projects`,
          { headers: { Authorization: `Bearer ${API_TOKEN}` } }
        );
        const taskJson = await taskRes.json();
        const tasks = taskJson.data?.tasks || [];
        persistTasks(tasks);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      }
    },
    [documentId]
  );

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`${API_URL}/projects?filters[id][$eq]=${id}`, {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
        });
        const json = await res.json();
        const project = json.data?.[0];
        if (!project) throw new Error("Project not found");

        const docId = project.documentId;
        setProjectName(project.project);
        setDocumentId(docId);

        const statusRes = await fetch(`${API_URL}/task-statuses`, {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
        });
        const statusJson = await statusRes.json();
        const filteredStatuses = statusJson.data
          .map((s) => s.name)
          .filter((n) => n.toLowerCase() !== "backlog");
        setStatusColumns(filteredStatuses);

        await fetchTasks(docId);
      } catch (err) {
        console.error("loadData error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id, fetchTasks]);

  const groupedTasks = statusColumns.map((status) => ({
    status,
    tasks: tasks.filter(
      (task) =>
        task.task_status?.name?.toLowerCase() === status.toLowerCase() &&
        (!filterTag || task.tags.some((tag) => tag.name === filterTag)) &&
        (!search || task.title.toLowerCase().includes(search.toLowerCase()))
    ),
  }));

  const handleAddTask = async (status) => {
    const title = newCardText[status]?.trim();
    if (!title) return;

    const statusId = await getTaskStatusIdByName(status);
    if (!statusId || !id) {
      alert("Missing status or project ID");
      return;
    }

    try {
      await createEntry("tasks", {
        title,
        task_status: { connect: [{ id: statusId }] },
        projects: { connect: [{ id: Number(id) }] },
      });
      await fetchTasks();
    } catch (err) {
      console.error("Failed to create task:", err);
    } finally {
      setNewCardText((prev) => ({ ...prev, [status]: "" }));
    }
  };

  const openEditPopup = (task) => setEditTask(task);

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("❌ Delete this task?")) return;
    try {
      await deleteEntry("tasks", taskId);
      await fetchTasks();
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="project-detail">
      <div className="header">
        <div className="header-left-row">
          <div className="project-title">
            Active project: {projectName}
            <Link to={`/projects/${id}/backlog`} className="view-backlog-link">
              View backlog
            </Link>
          </div>

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
        </div>

        <div className="header-right">
          <button className="open-popup" onClick={() => setShowAddPopup(true)}>
            Add Nieuwe taak
          </button>
        </div>
      </div>

      {showAddPopup && (
        <AddTaskPopup
          onClose={() => setShowAddPopup(false)}
          onTaskCreated={fetchTasks}
        />
      )}

      {editTask && (
        <EditTaskPopup
          task={editTask}
          onClose={() => setEditTask(null)}
          onTaskUpdated={fetchTasks}
        />
      )}

      <main className="task-columns-wrapper">
        <div className="task-columns">
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
                  <button
                    className="editTask"
                    onClick={() => openEditPopup(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="deleteTask"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ))}

          <div className="task-column add-column">
            <h3 className="add-column">+ Add another list</h3>
          </div>
        </div>
      </main>
    </div>
  );
}
