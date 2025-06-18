import { Task } from "./paginated-task-list";

export function TaskColumns({ tasks }: { tasks: Task[] }) {
  const statusGroups = tasks.reduce((groups, task) => {
    if (task.task_status?.name !== "Backlog") {
      const status = task.task_status?.name || "Unknown";
      if (!groups[status]) groups[status] = [];
      groups[status].push(task);
    }
    return groups;
  }, {} as Record<string, Task[]>);

  return (
    <div className="task-columns">
      {Object.entries(statusGroups).map(([status, statusTasks]) => (
        <div key={status} className="task-column">
          <h3>{status}</h3>
          {statusTasks.map((task) => (
            <div key={task.id} className="task-card">
              <p>{task.title}</p>
              {task.tags?.length > 0 && (
                <div className="task-tags">
                  {task.tags.map((tag) => (
                    <span key={tag.id} className="task-label">
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TaskColumns;
