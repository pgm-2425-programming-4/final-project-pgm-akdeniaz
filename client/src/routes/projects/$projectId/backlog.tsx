import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ProjectRoute } from "./$projectId";
import { API_URL, API_TOKEN } from "../../../constants/constants.js";

export const BacklogRoute = createFileRoute({
  getParentRoute: () => ProjectRoute,
  path: "backlog",
  component: BacklogPage,
});

function BacklogPage() {
  const { projectId } = BacklogRoute.useParams();
  const [projectName, setProjectName] = useState("");
  const [loadingProject, setLoadingProject] = useState(true);
  const [tasks, setTasks] = useState<{ id: number; title: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${API_URL}/projects?filters[documentId][$eq]=${projectId}`,
          { headers: { Authorization: `Bearer ${API_TOKEN}` } }
        );
        const json = await res.json();
        setProjectName(
          json.data?.[0]?.project ?? "Unknown Project"
        );
      } catch {
        setProjectName("Unknown Project");
      } finally {
        setLoadingProject(false);
      }
    })();
  }, [projectId]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const url =
          `${API_URL}/tasks?` +
          `filters[projects][documentId][$eq]=${projectId}&` +
          `filters[task_status][name][$eq]=Backlog&` +
          `pagination[page]=${page}&` +
          `pagination[pageSize]=${pageSize}&` +
          `populate=*&sort=createdAt:desc`;

        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
        });
        const json = await res.json();

        setTasks(
          (json.data ?? []).map((d: any) => ({
            id: d.id,
            title: d.title ?? "(no title)",
          }))
        );
        setPageCount(json.meta?.pagination?.pageCount ?? 1);
      } catch (err) {
        console.error("Failed to fetch backlog tasks", err);
        setTasks([]);
        setPageCount(1);
      } finally {
        setLoading(false);
      }
    })();
  }, [projectId, page, pageSize]);

  if (loadingProject) return <p>Loading project info…</p>;
  if (loading) return <p>Loading backlog tasks…</p>;

  return (
    <div style={{ maxWidth: 650, margin: "0 auto", padding: "1.5rem" }}>
      <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>
        Backlog for {projectName}
      </h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((t) => (
          <li
            key={t.id}
            style={{ padding: ".5rem 0", borderBottom: "1px solid #ddd" }}
          >
            {t.title}
          </li>
        ))}
      </ul>

      <div
        style={{
          marginTop: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(+e.target.value);
            setPage(1);
          }}
        >
          {[10, 20, 50].map((s) => (
            <option key={s} value={s}>
              {s}/page
            </option>
          ))}
        </select>

        <nav style={{ display: "flex", gap: ".5rem" }}>
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              style={{
                background: p === page ? "#1d4ed8" : undefined,
                color: p === page ? "white" : undefined,
              }}
              disabled={p === page}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            disabled={page === pageCount}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
}
