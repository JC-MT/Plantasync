import { Link } from "react-router";

export function Navbar() {
  return (
    <header className="w-full z-20 sticky top-0 border-b border-zinc-200 bg-light-theme text-dark-green">
      <nav className="max-w-7xl h-(--navbar-height) mx-auto px-4 lg:px-16 flex justify-between items-center">
        <Link
          to={"/"}
          className={"text-3xl font-bold tracking-tighter font-sans"}
          prefetch="intent"
        >
          Plantasync
        </Link>
        <div className="hidden md:flex gap-2">
          <Link
            to={"/"}
            className={
              "font-medium text-sm lg:text-base py-1 px-4 rounded-full bg-dark-green/5 hover:bg-dark-green hover:text-light-green"
            }
            prefetch="intent"
          >
            Demo Plants
          </Link>
          <Link
            to={"/"}
            className={
              "font-medium text-sm lg:text-base py-1 px-4 rounded-full bg-dark-green/5 hover:bg-dark-green hover:text-light-green"
            }
            prefetch="intent"
          >
            Explore Plants
          </Link>
          <Link
            to={"/"}
            className={
              "font-medium text-sm lg:text-base py-1 px-4 rounded-full bg-dark-green/5 hover:bg-dark-green hover:text-light-green"
            }
            prefetch="intent"
          >
            Sign up
          </Link>
          <Link
            to={"/"}
            className={
              "font-medium text-sm lg:text-base py-1 px-4 rounded-full bg-dark-green/5 hover:bg-dark-green hover:text-light-green"
            }
            prefetch="intent"
          >
            Add Plants
          </Link>
          <Link
            to={"/"}
            className={
              "font-medium text-sm lg:text-base py-1 px-4 rounded-full bg-dark-green/5 hover:bg-dark-green hover:text-light-green after:text-xs after:ml-1 after:content-['↗']"
            }
            prefetch="intent"
          >
            Source Code
          </Link>
        </div>
      </nav>
    </header>
  );
}
