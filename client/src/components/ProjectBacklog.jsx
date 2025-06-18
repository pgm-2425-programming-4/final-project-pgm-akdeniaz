import React from "react";
import { Outlet, useLocation } from "@tanstack/react-router";

export default function ProjectBacklog({ groupedTasks }) {
  const { pathname } = useLocation();
  const isBacklog = pathname.endsWith("/backlog");

  return (
    <main className="task-columns scrollable-columns">
      {isBacklog ? (
        <Outlet />
      ) : (
        groupedTasks.map(({ status, tasks }) => (
          <div key={status} className="task-column">
            <h3>{status}</h3>
            {tasks.map((task) => (
              <div key={task.id} className="task-card">
                <p>{task.title}</p>
                <div className="tags">
                  {task.tags.map((tag) => (
                    <span key={tag.id} className={`tag ${tag.name}`}>
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </main>
  );
}
