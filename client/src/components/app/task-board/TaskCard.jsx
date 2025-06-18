import React from "react";

export function TaskCard({ task }) {
  return (
    <div className="box">
      <h4 className="is-size-6 has-text-weight-semibold">{task.title}</h4>
      <div className="tags">
        {task.tags?.map((tag) => (
          <span key={tag} className="tag is-info">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}