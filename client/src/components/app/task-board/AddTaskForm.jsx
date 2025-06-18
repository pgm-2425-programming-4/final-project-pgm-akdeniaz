import React, { useState } from "react";
import { createTask } from "../../../data/taskService";

export function AddTaskForm({ projectId, onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("Backlog");

  async function handleSubmit(e) {
    e.preventDefault();
    const tagArray = tags.split(",").map((t) => t.trim());
    const newTask = {
      title,
      tags: tagArray,
      task_status: status,
      project: projectId,
    };
    try {
      await createTask(newTask);
      onTaskAdded();
      setTitle("");
      setTags("");
      setStatus("Backlog");
    } catch (err) {
      ale
rt("Failed to create task");
    }
  }
  return (
    <form onSubmit={handleSubmit} className="box">
      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
      </div>
      <div className="field">
        <label className="label">Tags (comma-separated)</label>
        <div className="control">
          <input className="input" value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
      </div>
      <div className="field">
        <label className="label">Status</label>
        <div className="control">
          <div className="select">
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>Backlog</option>
              <option>To do</option>
              <option>In progress</option>
              <option>Ready for review</option>
              <option>Done</option>
            </select>
          </div>
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button className="button is-primary" type="submit">
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
}