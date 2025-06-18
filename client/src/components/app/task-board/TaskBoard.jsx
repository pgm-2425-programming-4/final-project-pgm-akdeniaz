import React from "react";
import { TaskCard } from "./TaskCard";

export function TaskBoard({ groupedTasks }) {
  const statuses = ["To do", "In progress", "Ready for review", "Done"];

  return (
    <div className="columns">
      {statuses.map((status) => (
        <div className="column" key={status}>
          <h3 className="is-size-5 has-text-weight-bold">{status}</h3>
          {groupedTasks[status]?.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ))}
    </div>
  );
}