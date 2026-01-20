import { NavLink, useRouteLoaderData } from "react-router";
import type { User } from "~/components/types/SharedTypes";
import { navLinks } from "~/constants";
const { VITE_IMAGE_CDN_URL } = import.meta.env;

export function Footer() {
  const currentYear = new Date().getFullYear();
  const user: User | null | undefined = useRouteLoaderData("root");
  return (
    <footer className="bg-dark-green text-light-green">
      <div className="grid md:grid-cols-2 px-4 md:px-16 py-8 md:py-12 max-w-7xl mx-auto">
        <div className="flex flex-col mb-10 md:mb-0 place-content-between">
          <NavLink
            to={"/"}
            className={"text-3xl font-bold tracking-tighter font-sans"}
            prefetch="intent"
          >
            <h2 className="text-3xl font-bold uppercase">Plantasync</h2>
            <p className="text-base">Keep your plants alive</p>
          </NavLink>
          <div className="items-center gap-1 hidden md:flex">
            <p className="text-base">© {currentYear} - Plantasync</p>
            <img
              alt="logo"
              className="object-cover size-5"
              loading="lazy"
              src={`${VITE_IMAGE_CDN_URL}plantasynclogo.png?v=1746559703&width=50`}
            />
          </div>
        </div>
        <div className="grid gap-5">
          <div className="flex flex-wrap gap-y-5 gap-x-10 md:gap-x-20 lg:justify-end">
            <div className="flex flex-col md:gap-1">
              <h3 className="mb-2 text-xl font-bold">Navigation</h3>
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  className="text-base w-fit hover:underline underline-offset-4"
                  {...link?.attributes}
                  prefetch="intent"
                  end
                >
                  {link?.attributes?.reactive === "user" && user
                    ? "Your Garden"
                    : link.name}
                </NavLink>
              ))}
            </div>
            <div className="flex flex-col md:gap-1">
              <h3 className="mb-2 text-xl font-bold">Contact</h3>
              <div className="flex gap-1 h-fit items-center">
                <a
                  href="https://github.com/JC-MT"
                  target="_blank"
                  rel="noopener"
                  className="flex items-end"
                >
                  <img
                    className="size-5 rounded-full invert-100"
                    alt="GitHub"
                    src={`${VITE_IMAGE_CDN_URL}github.png?v=1761144509&width=50`}
                    loading="lazy"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/jan-matias/"
                  target="_blank"
                  rel="noopener"
                  className="flex items-end"
                >
                  <img
                    className="size-6.5 invert-100"
                    alt="LinkedIn"
                    src={`${VITE_IMAGE_CDN_URL}Linkedin.png?v=1761144509&width=50`}
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 md:hidden">
            <p className="text-base">© {currentYear} - Plantasync</p>
            <img
              alt="logo"
              className="object-cover size-5"
              loading="lazy"
              src={`${VITE_IMAGE_CDN_URL}plantasynclogo.png?v=1746559703&width=50`}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
