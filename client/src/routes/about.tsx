import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="p-2">
      <p>
        Deze applicatie is ontwikkeld als oefening binnen het
        opleidingsonderdeel PGM4 aan Arteveldehogeschool. Het doel is om een
        interactieve taakbeheerapp te bouwen met behulp van TanStack Router en
        een Kanban-bord.
      </p>
      <p className="about-name">Akdenis Niaziev</p>
      <a href="https://www.linkedin.com/in/akdenis-niaziev/">LinkedIn</a>
    </div>
  );
}
