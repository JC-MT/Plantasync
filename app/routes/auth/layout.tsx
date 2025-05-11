import { Outlet } from "react-router";
export default function Layout() {
  return (
    <section className="max-w-96 m-auto px-4 py-10">
      <Outlet />
    </section>
  );
}
