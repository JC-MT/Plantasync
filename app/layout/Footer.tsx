const { VITE_IMAGE_CDN_URL } = import.meta.env;

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className=" bg-dark-green text-light-green">
      <div className="grid md:grid-cols-2 px-4 md:px-16 py-8 md:py-12 max-w-7xl mx-auto">
        <div className="flex flex-col mb-10 md:mb-0 place-content-between">
          <a href="/" className="w-fit">
            <h2 className="text-3xl font-bold uppercase">Plantasync</h2>
            <p className="text-base">Keep your plants alive</p>
          </a>
          <div className="items-center gap-1 hidden md:flex">
            <p className="text-base">© {currentYear} - Plantasync</p>
            <img
              alt="logo"
              className="object-cover size-5"
              src={`${VITE_IMAGE_CDN_URL}plantasynclogo.png?v=1746559703&width=50`}
            />
          </div>
        </div>
        <div className="grid gap-5">
          <div className="flex flex-wrap gap-y-5 gap-x-10 md:gap-x-20 lg:justify-end">
            <div className="flex flex-col md:gap-1">
              <h3 className="mb-2 text-xl font-bold">Navigation</h3>
              <a
                className="text-base w-fit hover:underline underline-offset-4"
                href="/"
              >
                Home
              </a>
              <a
                className="text-base w-fit hover:underline underline-offset-4"
                href="/my-plants"
              >
                Demo plants
              </a>
              <a
                className="text-base w-fit hover:underline underline-offset-4"
                href="/explore"
              >
                Explore Plants
              </a>
              <a
                className="text-base w-fit hover:underline underline-offset-4"
                href="/new"
              >
                Add Plant
              </a>
            </div>
            <div className="flex flex-col md:gap-1">
              <h3 className="mb-2 text-xl font-bold">Contact</h3>
              <div className="flex gap-1 h-fit items-center">
                <a
                  href="https://github.com/JC-MT"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    className="size-5 rounded-full invert-100"
                    alt="GitHub"
                    src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/jan-matias/"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    className="size-6.5 invert-100"
                    alt="LinkedIn"
                    src="https://www.pngmart.com/files/21/Linkedin-In-Logo-PNG-HD.png"
                  />
                </a>
              </div>
              <a
                className="text-base w-fit hover:underline underline-offset-4"
                href="/"
              >
                Lorem Link
              </a>
              <a
                className="text-base w-fit hover:underline underline-offset-4"
                href="/"
              >
                Lorem Link
              </a>
            </div>
          </div>
          <div className="flex items-center gap-1 md:hidden">
            <p className="text-base">© {currentYear} - Plantasync</p>
            <img
              alt="logo"
              className="object-cover size-5"
              src={`${VITE_IMAGE_CDN_URL}plantasynclogo.png?v=1746559703&width=50`}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
