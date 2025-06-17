import { createRootRoute, Outlet } from "@tanstack/react-router";
import SidebarLink from "../components/SidebarLink.tsx";
import Header from "../components/Header.tsx";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="columns is-gapless is-fullheight">
      <aside className="column is-3 menu has-background-light p-4">
        <nav className="menu-list">
          <SidebarLink to="/" label="Home" />

          <p className="menu-label">Projects</p>
          <SidebarLink to="r4vypj5p1akq7gt3f265ygm4" label="PGM4" />
          <SidebarLink to="xypo5tg3vdhvryz3pv7v41jv" label="AtWork2" />

          <p className="menu-label">Info</p>
          <SidebarLink to="/about" label="About" />
          <SidebarLink to="/contact" label="Contact" />
        </nav>
      </aside>

      <main className="column is-9 p-5">
        <Header />
        <Outlet />
        <TanStackRouterDevtools />
      </main>
    </div>
  );
}
