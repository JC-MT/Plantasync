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
        <VaulDrawer
          direction="top"
          isModal={false}
          contentClassName="bg-white flex flex-col rounded-b-xl fixed top-0 left-0 right-0 outline-none z-20 translate-y-14"
          useCustomOverlay={true}
        >
          {({ isOpen, setIsOpen }) => (
            <>
              <div className="p-4 bg-white flex-1">
                <div className="grid gap-2">
                  <NavLink
                    to="/plants"
                    className={({ isActive }) => {
                      return `ss-scale-75 delay-50 transition-transform duration-300 ease-out font-medium text-sm lg:text-base p-4 rounded-full hover:bg-dark-green hover:text-light-green
                        ${isActive ? "bg-dark-green text-light-green" : "bg-dark-green/5 text-dark-green"}
                        ${isOpen ? "scale-100" : "scale-75"}`;
                    }}
                    prefetch="intent"
                    end
                    onClick={() => setIsOpen(false)}
                  >
                    Demo Plants
                  </NavLink>
                  <NavLink
                    to={"/explore"}
                    className={({ isActive }) => {
                      return `ss-scale-75 delay-100 transition-transform duration-300 ease-out font-medium text-sm lg:text-base p-4 rounded-full hover:bg-dark-green hover:text-light-green
                        ${isActive ? "bg-dark-green text-light-green" : "bg-dark-green/5 text-dark-green"}
                        ${isOpen ? "scale-100" : "scale-75"}`;
                    }}
                    prefetch="intent"
                    end
                    onClick={() => setIsOpen(false)}
                  >
                    Explore Plants
                  </NavLink>
                  <NavLink
                    to={"/register"}
                    className={({ isActive }) => {
                      return `ss-scale-75 delay-150 transition-transform duration-300 ease-out font-medium text-sm lg:text-base p-4 rounded-full hover:bg-dark-green hover:text-light-green
                        ${isActive ? "bg-dark-green text-light-green" : "bg-dark-green/5 text-dark-green"}
                        ${isOpen ? "scale-100" : "scale-75"}`;
                    }}
                    prefetch="intent"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign up
                  </NavLink>
                  <NavLink
                    to={"/plants/add"}
                    className={({ isActive }) => {
                      return `ss-scale-75 delay-200 transition-transform duration-300 ease-out font-medium text-sm lg:text-base p-4 rounded-full hover:bg-dark-green hover:text-light-green
                        ${isActive ? "bg-dark-green text-light-green" : "bg-dark-green/5 text-dark-green"}
                        ${isOpen ? "scale-100" : "scale-75"}`;
                    }}
                    prefetch="intent"
                    onClick={() => setIsOpen(false)}
                  >
                    Add Plants
                  </NavLink>
                  <Link
                    to={"https://github.com/JC-MT/Plantasync"}
                    className={`ss-scale-75 delay-250 transition-transform duration-300 ease-out font-medium text-sm lg:text-base p-4 rounded-full bg-dark-green/5 hover:bg-dark-green hover:text-light-green after:text-xs after:ml-1 after:content-['↗']
                        ${isOpen ? "scale-100" : "scale-75"}`}
                    prefetch="intent"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub repository for Plantasync"
                    onClick={() => setIsOpen(false)}
                  >
                    Source Code
                  </Link>
                </div>
              </div>
              <div
                aria-hidden
                className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 my-8"
              />
            </>
          )}
        </VaulDrawer>
      </nav>
    </header>
  );
}
