import { useState } from "react";
import { fetchTasks } from "../../../data/fetchTasks";
import { TaskList } from "./task-list/task-list";
import { Pagination } from "./pagination/pagination";
import { PAGE_SIZE_OPTIONS } from "../../../constants/constants";
import { useQuery } from "@tanstack/react-query";

export function PaginatedTaskList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);

  function handlePageChanged(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handlePageSizeChanged(size) {
    setPageSize(size);
  }

  const { data } = useQuery({
    queryKey: ["tasks", { currentPage, pageSize }],
    queryFn: () => fetchTasks(currentPage, pageSize),
  });

  const tasks = data?.data || [];
  const pageCount = data?.meta?.pagination?.pageCount || 1;

  return (
    <>
      <div style={{ marginBottom: "2rem" }}>
        <TaskList tasks={tasks} />
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
