const { VITE_IMAGE_CDN_URL } = import.meta.env;
import { Image } from "~/components/Image";

export function meta() {
  return [
    { title: "Plantasync — Keep your plants alive" },
    {
      name: "description",
      content:
        "With Plantasync, you will be able to keep your plants alive longer."
    }
  ];
}

export default function Home() {
  return (
    <>
      <section className="relative">
        <Image
          imageUrl={`${VITE_IMAGE_CDN_URL}parallax-hero.png?v=1746351965`}
          sizes="100vw"
          isHero={true}
          alt={"Hero image of various house plants"}
          classNames={"min-h-52 object-cover bg-slate-300"}
          loading="eager"
          width={2500}
          height={1109}
        />
        <div className="text-dark-green w-full font-sans md:absolute top-0 grid gap-4 px-4 my-10 md:mt-24 transform-[all]">
          <div className="grid gap-1 md:place-items-center md:place-content-center">
            <h1 className="text-4xl/none md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase">
              Plantasync
            </h1>
            <h2 className="text-3xl/none font-light italic">
              Keep your plants alive
            </h2>
          </div>
          <a
            className="text-center px-5 py-3 bg-dark-green text-white rounded-bl-lg rounded-tr-lg w-full sm:w-fit md:justify-self-center"
            href="/plants"
          >
            Get started with demo plants
          </a>
        </div>
      </section>
      <section className="grid gap-8 mx-4 my-10 px-4 md:px-16 py-10 rounded-xl bg-white text-dark-green max-w-6xl xl:mx-auto">
        <h3 className="text-pretty md:w-1/2 mx-auto text-center text-4xl md:text-5xl font-semibold">
          Tools that keep your green thumb happy
        </h3>
        <div className="grid md:grid-cols-10 gap-6">
          <div className="grid gap-2 rounded-xl bg-light-green p-4 md:col-span-4">
            <div className="flex gap-2 items-center">
              <a
                href="https://www.flaticon.com/free-icons/plant"
                title="plant icons"
                className="min-w-fit pointer-events-none"
                aria-label="Plant icons created by Freepik - Flaticon"
                tabIndex={-1}
              >
                <img
                  src={`${VITE_IMAGE_CDN_URL}watering-plants.png?v=1746526232`}
                  alt=""
                  className="size-9 md:size-12"
                />
              </a>
              <h3 className="text-xl md:text-2xl font-medium text-balance">
                Intelligent watering reminders
              </h3>
            </div>
            <p className="text-base">
              With Plantasync, you will be able to keep your plants alive
              longer. You can set reminders or depend on our dynamic
              notification system that will account for weather and your plants
              epecific needs.
            </p>
          </div>
          <div className="grid gap-2 rounded-xl bg-dark-green p-4 text-light-green md:col-span-6">
            <div className="flex gap-2 items-center">
              <a
                href="https://www.flaticon.com/free-icons/plant"
                title="plant icons"
                className="min-w-fit pointer-events-none"
                aria-label="Plant icons created by Freepik - Flaticon"
                tabIndex={-1}
              >
                <img
                  src={`${VITE_IMAGE_CDN_URL}watering-plants.png?v=1746526232`}
                  alt=""
                  className="size-9 md:size-12"
                />
              </a>
              <h3 className="text-xl md:text-2xl font-medium text-balance">
                Intelligent watering reminders
              </h3>
            </div>
            <p className="text-base">
              With Plantasync, you will be able to keep your plants alive
              longer. You can set reminders or depend on our dynamic
              notification system that will account for weather and your plants
              epecific needs.
            </p>
          </div>
          <div className="grid gap-2 rounded-xl bg-medium-green p-4 md:col-span-6">
            <div className="flex gap-2 items-center">
              <a
                href="https://www.flaticon.com/free-icons/plant"
                title="plant icons"
                className="min-w-fit pointer-events-none"
                aria-label="Plant icons created by Freepik - Flaticon"
                tabIndex={-1}
              >
                <img
                  src={`${VITE_IMAGE_CDN_URL}watering-plants.png?v=1746526232`}
                  alt=""
                  className="size-9 md:size-12"
                />
              </a>
              <h3 className="text-xl md:text-2xl font-medium text-balance">
                Intelligent watering reminders
              </h3>
            </div>
            <p className="text-base">
              With Plantasync, you will be able to keep your plants alive
              longer. You can set reminders or depend on our dynamic
              notification system that will account for weather and your plants
              epecific needs.
            </p>
          </div>
          <div className="grid gap-2 rounded-xl bg-forrest-green p-4 text-light-green md:col-span-4">
            <div className="flex gap-2 items-center">
              <a
                href="https://www.flaticon.com/free-icons/plant"
                title="plant icons"
                className="min-w-fit pointer-events-none"
                aria-label="Plant icons created by Freepik - Flaticon"
                tabIndex={-1}
              >
                <img
                  src={`${VITE_IMAGE_CDN_URL}watering-plants.png?v=1746526232`}
                  alt=""
                  className="size-9 md:size-12"
                />
              </a>
              <h3 className="text-xl md:text-2xl font-medium text-balance">
                Intelligent watering reminders
              </h3>
            </div>
            <p className="text-base">
              With Plantasync, you will be able to keep your plants alive
              longer. You can set reminders or depend on our dynamic
              notification system that will account for weather and your plants
              epecific needs.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
