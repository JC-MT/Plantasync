import { NavLink, Link } from "react-router";
import VaulDrawer from "../components/Drawer";

export function Navbar() {
  return (
    <header className="w-full z-30 sticky top-0 border-b border-zinc-200 bg-light-theme text-dark-green">
      <nav className="max-w-7xl h-(--navbar-height) mx-auto px-4 lg:px-16 flex justify-between items-center">
        <NavLink
          to={"/"}
          className={"text-3xl font-bold tracking-tighter font-sans"}
          prefetch="intent"
        >
          Plantasync
        </NavLink>
        <div className="hidden md:flex gap-2">
          <NavLink
            to="/plants"
            className={({ isActive }) => {
              return `font-medium text-sm lg:text-base py-1 px-4 rounded-full  hover:bg-dark-green hover:text-light-green
                ${isActive ? "bg-dark-green text-light-green" : "bg-dark-green/5 text-dark-green"}`;
            }}
            prefetch="intent"
            end
          >
            Demo Plants
          </NavLink>
          <NavLink
            to={"/explore"}
            className={({ isActive }) => {
              return `font-medium text-sm lg:text-base py-1 px-4 rounded-full  hover:bg-dark-green hover:text-light-green
                ${isActive ? "bg-dark-green text-light-green" : "bg-dark-green/5 text-dark-green"}`;
            }}
            prefetch="intent"
            end
          >
            Explore Plants
          </NavLink>
          <NavLink
            to={"/register"}
            className={({ isActive }) => {
              return `font-medium text-sm lg:text-base py-1 px-4 rounded-full  hover:bg-dark-green hover:text-light-green
                ${isActive ? "bg-dark-green text-light-green" : "bg-dark-green/5 text-dark-green"}`;
            }}
            prefetch="intent"
          >
            Sign up
          </NavLink>
          <NavLink
            to={"/plants/add"}
            className={({ isActive }) => {
              return `font-medium text-sm lg:text-base py-1 px-4 rounded-full  hover:bg-dark-green hover:text-light-green
                ${isActive ? "bg-dark-green text-light-green" : "bg-dark-green/5 text-dark-green"}`;
            }}
            prefetch="intent"
          >
            Add Plants
          </NavLink>
          <Link
            to={"https://github.com/JC-MT/Plantasync"}
            className={
              "font-medium text-sm lg:text-base py-1 px-4 rounded-full bg-dark-green/5 hover:bg-dark-green hover:text-light-green after:text-xs after:ml-1 after:content-['↗']"
            }
            prefetch="intent"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository for Plantasync"
          >
            Source Code
          </Link>
        </div>
        <VaulDrawer isModal={false} direction="top"/>
      </nav>
    </header>
  );
}
