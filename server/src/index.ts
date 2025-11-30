import type { Core } from "@strapi/strapi";

// Seed data for a realistic PGM task board
const seedData = {
  taskStatuses: [
    { name: "Backlog" },
    { name: "To Do" },
    { name: "In Progress" },
    { name: "Ready for Review" },
    { name: "Done" },
  ],
  tags: [
    { name: "Frontend" },
    { name: "Backend" },
    { name: "Bug" },
    { name: "Feature" },
    { name: "Documentation" },
    { name: "UI/UX" },
    { name: "API" },
    { name: "Database" },
    { name: "Testing" },
    { name: "Urgent" },
    { name: "Low Priority" },
    { name: "Refactor" },
  ],
  projects: [
    { project: "PGM-3" },
    { project: "PGM-4" },
    { project: "Final Project" },
  ],
  tasks: [
    // PGM-3 Tasks
    {
      title: "Set up React project with Vite",
      description:
        "Initialize the React project using Vite as the build tool. Configure TypeScript, ESLint, and Prettier for code quality. Set up the folder structure following best practices.",
      projectName: "PGM-3",
      statusName: "Done",
      tagNames: ["Frontend", "Feature"],
      externalId: "PGM3-001",
    },
    {
      title: "Implement Tanstack Router",
      description:
        "Set up client-side routing using Tanstack Router. Create route definitions for all pages including home, projects, and backlog views. Implement nested routes for project details.",
      projectName: "PGM-3",
      statusName: "Done",
      tagNames: ["Frontend", "Feature"],
      externalId: "PGM3-002",
    },
    {
      title: "Create navigation component",
      description:
        "Build a responsive navigation bar that displays all projects. Include active state styling and mobile hamburger menu. Use CSS modules for scoped styling.",
      projectName: "PGM-3",
      statusName: "Done",
      tagNames: ["Frontend", "UI/UX"],
      externalId: "PGM3-003",
    },
    {
      title: "Design task card component",
      description:
        "Create a reusable TaskCard component that displays task title, status badge, and labels. Support click handler for opening task details dialog. Ensure accessibility with proper ARIA attributes.",
      projectName: "PGM-3",
      statusName: "In Progress",
      tagNames: ["Frontend", "UI/UX", "Feature"],
      externalId: "PGM3-004",
    },
    {
      title: "Implement task board layout",
      description:
        "Create a Kanban-style board layout with columns for each task status (except Backlog). Tasks should be grouped by status and displayed in their respective columns. Add horizontal scrolling for mobile.",
      projectName: "PGM-3",
      statusName: "In Progress",
      tagNames: ["Frontend", "UI/UX"],
      externalId: "PGM3-005",
    },
    {
      title: "Add task filtering functionality",
      description:
        "Implement multi-field filtering for tasks. Allow filtering by status, labels, and search term. Use URL query parameters to persist filter state. Show active filter count in UI.",
      projectName: "PGM-3",
      statusName: "To Do",
      tagNames: ["Frontend", "Feature"],
      externalId: "PGM3-006",
    },
    {
      title: "Create task detail dialog",
      description:
        "Build a modal dialog component for viewing full task details. Display title, description, status, labels, and comments. Allow editing task status from within the dialog.",
      projectName: "PGM-3",
      statusName: "To Do",
      tagNames: ["Frontend", "UI/UX", "Feature"],
      externalId: "PGM3-007",
    },
    {
      title: "Implement backlog pagination",
      description:
        "Create paginated view for backlog tasks. Default to 10 items per page with option to change. Display total item count and current page indicator. Use Tanstack Query for data fetching.",
      projectName: "PGM-3",
      statusName: "Backlog",
      tagNames: ["Frontend", "Feature"],
      externalId: "PGM3-008",
    },
    {
      title: "Set up Tanstack Query",
      description:
        "Configure Tanstack Query for server state management. Set up QueryClient with sensible defaults. Implement custom hooks for fetching projects, tasks, and comments.",
      projectName: "PGM-3",
      statusName: "Done",
      tagNames: ["Frontend", "API"],
      externalId: "PGM3-009",
    },
    {
      title: "Add loading and error states",
      description:
        "Implement skeleton loaders for task cards and board columns. Create error boundary components with retry functionality. Add toast notifications for API errors.",
      projectName: "PGM-3",
      statusName: "Backlog",
      tagNames: ["Frontend", "UI/UX"],
      externalId: "PGM3-010",
    },
    {
      title: "Implement drag-and-drop for tasks",
      description:
        "Add drag-and-drop functionality to move tasks between status columns. Use react-beautiful-dnd or dnd-kit library. Optimistically update UI and sync with backend.",
      projectName: "PGM-3",
      statusName: "Backlog",
      tagNames: ["Frontend", "Feature", "UI/UX"],
      externalId: "PGM3-011",
    },
    {
      title: "Create new task form",
      description:
        "Build a form for creating new tasks with title, description, labels, and initial status. Implement form validation with helpful error messages. Clear form on successful submission.",
      projectName: "PGM-3",
      statusName: "To Do",
      tagNames: ["Frontend", "Feature"],
      externalId: "PGM3-012",
    },

    // PGM-4 Tasks
    {
      title: "Set up Strapi CMS",
      description:
        "Initialize Strapi project with SQLite for local development. Configure content types for Projects, Tasks, TaskStatuses, Tags, and Comments. Set up relationships between models.",
      projectName: "PGM-4",
      statusName: "Done",
      tagNames: ["Backend", "Database"],
      externalId: "PGM4-001",
    },
    {
      title: "Configure REST API endpoints",
      description:
        "Set up Strapi REST API routes for all content types. Configure proper populate options for relations. Enable filtering, sorting, and pagination on collection endpoints.",
      projectName: "PGM-4",
      statusName: "Done",
      tagNames: ["Backend", "API"],
      externalId: "PGM4-002",
    },
    {
      title: "Create seed data script",
      description:
        "Write bootstrap function to seed database with realistic sample data. Include multiple projects, various task statuses, and sample comments. Ensure idempotent execution.",
      projectName: "PGM-4",
      statusName: "In Progress",
      tagNames: ["Backend", "Database"],
      externalId: "PGM4-003",
    },
    {
      title: "Set up public API permissions",
      description:
        "Configure Strapi roles and permissions for public API access. Enable find, findOne, create, update, delete for required content types. Restrict sensitive operations.",
      projectName: "PGM-4",
      statusName: "To Do",
      tagNames: ["Backend", "API"],
      externalId: "PGM4-004",
    },
    {
      title: "Add task status update endpoint",
      description:
        "Implement custom controller action for updating task status. Validate status transitions if needed. Return updated task with populated relations.",
      projectName: "PGM-4",
      statusName: "Backlog",
      tagNames: ["Backend", "API", "Feature"],
      externalId: "PGM4-005",
    },
    {
      title: "Implement comment endpoints",
      description:
        "Create REST endpoints for adding and retrieving comments on tasks. Include author name and timestamp. Support nested comments if time permits.",
      projectName: "PGM-4",
      statusName: "Ready for Review",
      tagNames: ["Backend", "API", "Feature"],
      externalId: "PGM4-006",
    },
    {
      title: "Deploy Strapi to Render",
      description:
        "Set up production deployment on Render. Configure environment variables for production. Set up PostgreSQL database for production use. Configure CORS for frontend domain.",
      projectName: "PGM-4",
      statusName: "Backlog",
      tagNames: ["Backend", "Documentation"],
      externalId: "PGM4-007",
    },
    {
      title: "Fix CORS configuration",
      description:
        "Debug CORS issues preventing frontend from accessing API. Update middleware configuration to allow frontend origin. Test with production and development URLs.",
      projectName: "PGM-4",
      statusName: "Done",
      tagNames: ["Backend", "Bug"],
      externalId: "PGM4-008",
    },
    {
      title: "Add API documentation",
      description:
        "Document all API endpoints with request/response examples. Include authentication requirements and rate limits. Generate OpenAPI specification if possible.",
      projectName: "PGM-4",
      statusName: "Backlog",
      tagNames: ["Backend", "Documentation"],
      externalId: "PGM4-009",
    },

    // Final Project Tasks
    {
      title: "Project planning and wireframes",
      description:
        "Create detailed wireframes for all application views. Document user flows and interaction patterns. Present to team for feedback and iteration.",
      projectName: "Final Project",
      statusName: "Done",
      tagNames: ["Documentation", "UI/UX"],
      externalId: "FP-001",
    },
    {
      title: "Set up GitHub repository",
      description:
        "Create repository with proper .gitignore for React and Node projects. Set up branch protection rules for main. Configure GitHub Actions for CI/CD.",
      projectName: "Final Project",
      statusName: "Done",
      tagNames: ["Documentation"],
      externalId: "FP-002",
    },
    {
      title: "Configure Vercel deployment",
      description:
        "Connect GitHub repository to Vercel. Configure build settings for Vite project. Set up environment variables for API URL. Enable preview deployments for PRs.",
      projectName: "Final Project",
      statusName: "In Progress",
      tagNames: ["Frontend", "Documentation"],
      externalId: "FP-003",
    },
    {
      title: "Write unit tests for components",
      description:
        "Set up Jest and React Testing Library. Write tests for TaskCard, TaskBoard, and Filter components. Aim for 70% code coverage on critical components.",
      projectName: "Final Project",
      statusName: "Backlog",
      tagNames: ["Frontend", "Testing"],
      externalId: "FP-004",
    },
    {
      title: "Performance optimization",
      description:
        "Implement useMemo and useCallback for expensive computations. Add React.lazy for code splitting. Optimize images and bundle size. Run Lighthouse audit.",
      projectName: "Final Project",
      statusName: "Backlog",
      tagNames: ["Frontend", "Refactor"],
      externalId: "FP-005",
    },
    {
      title: "Mobile responsive design",
      description:
        "Ensure all views work on mobile devices (320px-768px). Implement touch-friendly interactions. Test on actual mobile devices. Fix any layout overflow issues.",
      projectName: "Final Project",
      statusName: "To Do",
      tagNames: ["Frontend", "UI/UX"],
      externalId: "FP-006",
    },
    {
      title: "Accessibility audit",
      description:
        "Run accessibility audit using axe DevTools. Fix color contrast issues. Add proper focus management. Ensure keyboard navigation works throughout app.",
      projectName: "Final Project",
      statusName: "Backlog",
      tagNames: ["Frontend", "UI/UX"],
      externalId: "FP-007",
    },
    {
      title: "Implement state management with Zustand",
      description:
        "Set up Zustand store for complex UI state. Manage filter state, selected task, and modal visibility. Create selectors for derived state.",
      projectName: "Final Project",
      statusName: "Ready for Review",
      tagNames: ["Frontend", "Feature", "Refactor"],
      externalId: "FP-008",
    },
    {
      title: "Add dark mode support",
      description:
        "Implement dark mode toggle with CSS custom properties. Persist preference in localStorage. Respect system preference by default. Smooth transition between themes.",
      projectName: "Final Project",
      statusName: "Backlog",
      tagNames: ["Frontend", "Feature", "UI/UX"],
      externalId: "FP-009",
    },
    {
      title: "Final presentation preparation",
      description:
        "Prepare demo script highlighting key features. Create slides explaining technical decisions. Practice live demo flow. Prepare for Q&A about implementation.",
      projectName: "Final Project",
      statusName: "Backlog",
      tagNames: ["Documentation"],
      externalId: "FP-010",
    },
  ],
  comments: [
    {
      content:
        "Great progress on this! The routing setup looks clean. Make sure to add error boundaries for each route.",
      author: "Jan Janssen",
      taskExternalId: "PGM3-002",
    },
    {
      content:
        "I tested the navigation on mobile and the hamburger menu works well. Small suggestion: add a slight animation when opening.",
      author: "Emma De Vries",
      taskExternalId: "PGM3-003",
    },
    {
      content:
        "The card design is looking good! Can we add a subtle shadow on hover to make it feel more interactive?",
      author: "Lucas Peeters",
      taskExternalId: "PGM3-004",
    },
    {
      content:
        "Remember to handle empty states when there are no tasks in a column. Maybe show a placeholder message.",
      author: "Sophie Maes",
      taskExternalId: "PGM3-005",
    },
    {
      content:
        "Strapi is set up and running. I added some sample data for testing. Let me know if you need more.",
      author: "Thomas Willems",
      taskExternalId: "PGM4-001",
    },
    {
      content:
        "The endpoints are working. Use ?populate=* to get all relations, or be specific like ?populate[0]=tags&populate[1]=task_status",
      author: "Thomas Willems",
      taskExternalId: "PGM4-002",
    },
    {
      content:
        "I reviewed the comment implementation. Looks good! One thing: we should add createdAt to sort comments chronologically.",
      author: "Jan Janssen",
      taskExternalId: "PGM4-006",
    },
    {
      content:
        "Wireframes approved by the team. Moving forward with implementation. Good job on the user flow diagrams!",
      author: "Prof. Van Damme",
      taskExternalId: "FP-001",
    },
    {
      content:
        "Branch protection is set up. All PRs need at least one approval before merging to main.",
      author: "Emma De Vries",
      taskExternalId: "FP-002",
    },
    {
      content:
        "Vercel preview deploys are working. Each PR now gets its own preview URL automatically.",
      author: "Lucas Peeters",
      taskExternalId: "FP-003",
    },
    {
      content:
        "The Zustand implementation looks solid. I like how you separated the slices. Ready to merge after minor tweaks.",
      author: "Sophie Maes",
      taskExternalId: "FP-008",
    },
  ],
};

async function seedDatabase(strapi: Core.Strapi) {
  const shouldSeed = await shouldRunSeed(strapi);
  if (!shouldSeed) {
    strapi.log.info("📦 Database already seeded, skipping...");
    return;
  }

  strapi.log.info("🌱 Seeding database with sample data...");

  try {
    // 1. Create Task Statuses
    const statusMap: Record<string, string> = {};
    for (const status of seedData.taskStatuses) {
      const existing = await strapi
        .documents("api::task-status.task-status")
        .findFirst({
          filters: { name: status.name },
        });
      if (!existing) {
        const created = await strapi
          .documents("api::task-status.task-status")
          .create({
            data: { ...status, publishedAt: new Date() },
          });
        statusMap[status.name] = created.documentId;
        strapi.log.info(`  ✓ Created status: ${status.name}`);
      } else {
        statusMap[status.name] = existing.documentId;
      }
    }

    // 2. Create Tags
    const tagMap: Record<string, string> = {};
    for (const tag of seedData.tags) {
      const existing = await strapi.documents("api::tag.tag").findFirst({
        filters: { name: tag.name },
      });
      if (!existing) {
        const created = await strapi.documents("api::tag.tag").create({
          data: { ...tag, publishedAt: new Date() },
        });
        tagMap[tag.name] = created.documentId;
        strapi.log.info(`  ✓ Created tag: ${tag.name}`);
      } else {
        tagMap[tag.name] = existing.documentId;
      }
    }

    // 3. Create Projects
    const projectMap: Record<string, string> = {};
    for (const project of seedData.projects) {
      const existing = await strapi
        .documents("api::project.project")
        .findFirst({
          filters: { project: project.project },
        });
      if (!existing) {
        const created = await strapi.documents("api::project.project").create({
          data: { ...project, publishedAt: new Date() },
        });
        projectMap[project.project] = created.documentId;
        strapi.log.info(`  ✓ Created project: ${project.project}`);
      } else {
        projectMap[project.project] = existing.documentId;
      }
    }

    // 4. Create Tasks
    const taskMap: Record<string, string> = {};
    for (const task of seedData.tasks) {
      const existing = await strapi.documents("api::task.task").findFirst({
        filters: { externalId: task.externalId },
      });
      if (!existing) {
        const created = await strapi.documents("api::task.task").create({
          data: {
            title: task.title,
            description: task.description,
            externalId: task.externalId,
            task_status: statusMap[task.statusName],
            projects: projectMap[task.projectName],
            tags: task.tagNames.map((name) => tagMap[name]),
            publishedAt: new Date(),
          },
        });
        taskMap[task.externalId] = created.documentId;
        strapi.log.info(`  ✓ Created task: ${task.title}`);
      } else {
        taskMap[task.externalId] = existing.documentId;
      }
    }

    // 5. Create Comments (using strapi.db.query for untyped content type)
    for (const comment of seedData.comments) {
      const taskDocumentId = taskMap[comment.taskExternalId];
      if (taskDocumentId) {
        // Find the task by documentId to get the actual id
        const task = await strapi.documents("api::task.task").findFirst({
          filters: { externalId: comment.taskExternalId },
        });
        if (task) {
          // Check if comment already exists using raw query
          const existingComments = await strapi.db
            .query("api::comment.comment")
            .findMany({
              where: {
                content: comment.content,
                author: comment.author,
              },
            });
          if (existingComments.length === 0) {
            await strapi.db.query("api::comment.comment").create({
              data: {
                content: comment.content,
                author: comment.author,
                task: task.id,
              },
            });
            strapi.log.info(`  ✓ Created comment by: ${comment.author}`);
          }
        }
      }
    }

    strapi.log.info("✅ Database seeding completed!");
  } catch (error) {
    strapi.log.error("❌ Error seeding database:", error);
  }
}

async function shouldRunSeed(strapi: Core.Strapi): Promise<boolean> {
  // Check if we already have projects (indicates seeding was done)
  const projects = await strapi.documents("api::project.project").findMany({});
  return projects.length === 0;
}

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await seedDatabase(strapi);
  },
};
