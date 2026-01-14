import type { User } from "~/components/types/SharedTypes";
import { NavLink, useRouteLoaderData } from "react-router";
import VaulDrawer from "../components/Drawer";
import { navLinks } from "~/constants";

export function Navbar() {
  const user: User | null | undefined = useRouteLoaderData("root");
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
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) => {
                return `font-medium text-sm lg:text-base py-1 px-4 rounded-full  hover:bg-dark-green hover:text-light-green
                ${isActive ? "bg-dark-green text-light-green" : "bg-dark-green/5 text-dark-green"}`;
              }}
              {...link?.attributes}
              prefetch="intent"
            >
              {link?.attributes?.reactive === "user" && user
                ? "Your Garden"
                : link.name}
            </NavLink>
          ))}
        </div>
        <VaulDrawer
          direction="top"
          isModal={false}
          contentClassName="bg-white flex flex-col rounded-b-xl fixed top-0 left-0 right-0 outline-none z-20 translate-y-14"
          useCustomOverlay={true}
          title="Navigation Drawer"
        >
          {({ isOpen, setIsOpen }) => (
            <>
              <div className="p-4 bg-white flex-1">
                <div className="grid gap-2">
                  {navLinks.map((link, idx) => (
                    <NavLink
                      key={link.name}
                      to={link.to}
                      className={({ isActive }) => {
                        return `starting:scale-75 delay-100 transition-transform ease-out font-medium text-sm lg:text-base p-4 rounded-full hover:bg-dark-green hover:text-light-green
                        ${isActive ? "bg-dark-green text-light-green" : "bg-dark-green/5 text-dark-green"}
                        ${isOpen ? "scale-100" : "scale-75"}`;
                      }}
                      style={{ animationDuration: `${idx * 100 + 300}ms` }}
                      {...link?.attributes}
                      prefetch="viewport"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </div>
              </div>
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mt-4 mb-8" />
            </>
          )}
        </VaulDrawer>
      </nav>
    </header>
  );
}
