import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="about-paragraph">
      <p>
        💻 Junior Web Developer | HTML, CSS, JavaScript | 🚀 Learning React &
        Strapi | 🌱 Building projects and growing every day
      </p>
      <p className="about-name">Akdenis Niaziev</p>
    </div>
  );
}
