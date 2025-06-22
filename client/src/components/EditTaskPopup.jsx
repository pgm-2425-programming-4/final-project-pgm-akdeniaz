import { useEffect, useState } from "react";
import { updateEntry } from "../services/dataService";
import { API_URL, API_TOKEN } from "../constants/constants";
import "./TaskPopup.css";

export default function EditTaskPopup({ task, onClose, onTaskUpdated }) {
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [selectedTags, setSelectedTags] = useState(
    task.tags?.map((t) => t.id) || []
  );
  const [selectedProject, setSelectedProject] = useState(
    task.projects?.[0]?.id || ""
  );
  const [selectedStatus, setSelectedStatus] = useState(
    task.task_status?.id || ""
  );

  const [projects, setProjects] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsRes, statusesRes, tagsRes] = await Promise.all([
          fetch(`${API_URL}/projects`, {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
          }),
          fetch(`${API_URL}/task-statuses`, {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
          }),
          fetch(`${API_URL}/tags`, {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
          }),
        ]);

        const [projectsJson, statusesJson, tagsJson] = await Promise.all([
          projectsRes.json(),
          statusesRes.json(),
          tagsRes.json(),
        ]);

        setProjects(projectsJson.data || []);
        setStatuses(statusesJson.data || []);
        setTags(tagsJson.data || []);
      } catch (err) {
        console.error("Failed to fetch form options", err);
      }
    }
    fetchData();
  }, []);

  const handleCheckboxChange = (value) => {
    setSelectedTags((prev) =>
      prev.includes(value)
        ? prev.filter((tag) => tag !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task?.documentId) {
      alert("Invalid task selected for editing.");
      return;
    }

    if (!title || !selectedProject || !selectedStatus) {
      alert("All required fields must be filled.");
      return;
    }

    const payload = {
      title,
      description,
      task_status: selectedStatus,
      projects: selectedProject,
      tags: selectedTags,
    };

    try {
      await updateEntry("tasks", task.documentId, payload);
      onTaskUpdated();
      onClose();
    } catch (err) {
      console.error("Error updating task", err);
      alert("Failed to update task.");
    }
  };

  return (
    <div className="popup">
      <div className="popup__inner">
        <h2>Bewerk taak {title}</h2>
        <form className="popup__container" onSubmit={handleSubmit}>
          <div className="popup__block">
            <div className="popup__content">
              <label className="popup__item">
                Titel:
                <input
                  required
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label className="popup__item">
                Taak Types:
                <div className="popup__checkbox-group">
                  {tags.map((tag) => (
                    <label key={tag.id} className="popup__checkbox-item">
                      <input
                        type="checkbox"
                        value={tag.id}
                        checked={selectedTags.includes(tag.id)}
                        onChange={() => handleCheckboxChange(tag.id)}
                      />
                      {tag.attributes?.name || tag.name}
                    </label>
                  ))}
                </div>
              </label>
            </div>

            <div className="popup__content">
              <label className="popup__item">
                Project:
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(Number(e.target.value))}
                >
                  <option value="">-- Selecteer een project --</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.attributes?.project || p.project}
                    </option>
                  ))}
                </select>
              </label>
              <label className="popup__item">
                Status:
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(Number(e.target.value))}
                >
                  <option value="">-- Selecteer een status --</option>
                  {statuses.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.attributes?.name || s.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="popup__content popup__content--description">
              <label className="popup__item">
                Beschrijving:
                <textarea
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
            </div>
          </div>

          <div className="popup__btn">
            <button type="submit" className="submit">
              Bewerken
            </button>
            <button type="button" className="close" onClick={onClose}>
              Annuleren
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
