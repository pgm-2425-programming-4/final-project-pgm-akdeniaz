export function TaskList({ tasks }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-card">
          <div className="task-title">{task.title}</div>
          <div className="task-status">{task.task_status}</div>
          <div className="tags">
            {task.labels?.map((label) => (
              <span key={label} className="tag is-black">
                {label}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
