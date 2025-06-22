import { useState, useEffect } from "react";
import { TaskList } from "./task-list/task-list";
import { Pagination } from "./pagination/pagination";
import { PAGE_SIZE_OPTIONS } from "../../../constants/constants";
import { fetchTasks } from "../../../services/dataService";

export type Task = {
  id: number;
  documentId: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  status: string;
  tags: string[];
};

export function PaginatedTaskList({ projectSlug }: { projectSlug: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      try {
        const response = await fetchTasks({
          page: currentPage,
          pageSize,
          filters: {
            projects: { id: Number(projectSlug) },
            task_status: { name: "Backlog" },
          },
          sort: "createdAt:desc",
        });

        const mappedTasks = (response.data || []).map((task: any) => ({
          id: task.id,
          documentId: task.documentId,
          title: task.title,
          description: task.description,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
          publishedAt: task.publishedAt,
          status: task.task_status?.name ?? "Unknown",
          tags: task.tags.map((t: any) => t.name),
        }));

        const project = response.data?.[0]?.projects?.[0];
        setProjectName(project?.project ?? "Project");

        setTasks(mappedTasks);

        setPageCount(response.meta?.pagination?.pageCount || 1);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
        setTasks([]);
        setPageCount(1);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [currentPage, pageSize, projectSlug]);

  const handlePageChanged = (pageNumber: number) => setCurrentPage(pageNumber);
  const handlePageSizeChanged = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="section">
      <h2 className="title is-4 mb-4">Backlog for {projectName}</h2>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="mb-2">
            {task.title}
          </li>
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        pageSize={pageSize}
        onPageChanged={handlePageChanged}
        onPageSizeChanged={handlePageSizeChanged}
      />
    </div>
  );
}
