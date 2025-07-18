import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div>
      <h3>
        Welcome to my Kanban app! Please select an item from the navigation
        menu.
      </h3>
    </div>
  );
}
