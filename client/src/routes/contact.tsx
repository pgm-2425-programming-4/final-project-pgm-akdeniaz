import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <a
        href="mailto:&#97;&#107;&#100;&#101;&#110;&#105;&#115;&#46;&#110;&#105;&#97;&#122;&#105;&#101;&#118;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;"
        className="footer-email"
      >
        akdenis.niaziev@gmail.com
      </a>

      <hr />
      <footer>
        <p>© Akdenis Niaziev</p>
        <a href="https://github.com/pgm-akdeniaz">
          GitHub{" "}
          <svg
            width="16"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L4 12M12 4H8M12 4V8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/akdenis-niaziev/">
          LinkedIn{" "}
          <svg
            width="16"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L4 12M12 4H8M12 4V8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </a>
      </footer>
    </div>
  );
}
