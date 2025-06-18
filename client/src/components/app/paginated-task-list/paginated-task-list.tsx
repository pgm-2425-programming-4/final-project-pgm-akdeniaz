import { useState, useEffect } from "react";
import { TaskList } from "./task-list/task-list";
import { Pagination } from "./pagination/pagination";
import { PAGE_SIZE_OPTIONS } from "../../../constants/constants";
import { useParams } from "@tanstack/react-router";

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

export function PaginatedTaskList() {
  const { projectId } = useParams({ from: "/projects/$projectId" });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      try {
        const response = await fetchTasks({
          page: currentPage,
          pageSize,
          filters: { "projects.documentId": projectId },
          sort: "createdAt:desc",
        });

        const mappedTasks = (response.data || []).map((task: Task) => {
          const createdDate = new Date(task.createdAt);
          const now = new Date();
          const daysSinceCreation = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24);

          let status = "To do";
          if (daysSinceCreation > 21) status = "Done";
          else if (daysSinceCreation > 14) status = "Ready for review";
          else if (daysSinceCreation > 7) status = "In progress";

          const tagOptions = ["Back-end", "Infra", "Documentation", "Front-end", "Design"];
          const tag = tagOptions[Math.floor(Math.random() * tagOptions.length)];

          return { ...task, status, tags: [tag] };
        });

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
  }, [currentPage, pageSize, projectId]);

  const handlePageChanged = (pageNumber: number) => setCurrentPage(pageNumber);

  const handlePageSizeChanged = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when page size changes
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="columns is-multiline">
        <div className="column is-one-quarter">
          <h3>To do</h3>
          <TaskList tasks={tasks.filter((task) => task.status === "To do")} />
        </div>
        <div className="column is-one-quarter">
          <h3>In progress</h3>
          <TaskList tasks={tasks.filter((task) => task.status === "In progress")} />
        </div>
        <div className="column is-one-quarter">
          <h3>Ready for review</h3>
          <TaskList tasks={tasks.filter((task) => task.status === "Ready for review")} />
        </div>
        <div className="column is-one-quarter">
          <h3>Done</h3>
          <TaskList tasks={tasks.filter((task) => task.status === "Done")} />
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        pageSize={pageSize}
        onPageChanged={handlePageChanged}
        onPageSizeChanged={handlePageSizeChanged}
      />
    </>
  );
}
