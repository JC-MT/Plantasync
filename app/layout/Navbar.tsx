import { Link } from "react-router";

export function Navbar() {
  return (
    <header className="w-full sticky top-0">
      <nav className="max-w-7xl h-14 mx-auto px-4 flex justify-between items-center">
        <div className="flex flex-1"></div>
        <Link
          to={"/"}
          className={"text-green text-2xl font-bold tracking-tighter font-sans"}
          prefetch="intent"
        >
          Plantasync
        </Link>
        <div className="flex flex-1"></div>
      </nav>
    </header>
  );
}
