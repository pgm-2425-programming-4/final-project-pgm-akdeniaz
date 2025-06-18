import { Task } from "../paginated-task-list";

  type TaskListProps = {
    tasks: Task[];
  };

  export function TaskList({ tasks }: TaskListProps) {
    return (
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <div className="task-title">{task.title}</div>
            <div className="task-status">{task.status}</div>
            <div className="tags">
              {task.tags?.map((tag) => (
                <span key={tag} className="tag is-black">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }