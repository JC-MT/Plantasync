import { Image } from "~/components/Image";
import {
  CalendarCheck,
  ClipboardList,
  ClockAlert,
  ScanSearch,
} from "lucide-react";

export function meta() {
  return [
    { title: "Plantasync — Keep your plants alive" },
    {
      name: "description",
      content:
        "With Plantasync, you will be able to keep your plants alive longer.",
    },
  ];
}

export default function Home() {
  return (
    <section>
      <div className="relative">
        <div data-animated="parallax">
          <Image
            imageUrl="parallax-hero.png?v=1746351965"
            sizes="100vw"
            isHero={true}
            alt={"Hero image of various house plants"}
            classNames={"min-h-52 object-cover bg-slate-300 mx-auto"}
            loading="eager"
            width={2500}
            height={1109}
            viewTransition={undefined}
          />
        </div>
        <div className="text-dark-green w-full font-sans md:absolute top-0 grid gap-4 px-4 pt-10 mb-10 md:pt-24 z-10 relative bg-light-theme md:bg-transparent">
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
      </div>
      <div className="bg-light-theme mb-10 md:pt-10 relative">
        <section className="grid gap-8 mx-4 px-4 md:px-16 py-10 rounded-xl bg-white text-dark-green max-w-6xl xl:mx-auto relative">
          <h3 className="text-pretty md:w-1/2 mx-auto text-center text-4xl md:text-5xl font-semibold">
            Tools that keep your green thumb happy
          </h3>
          <div className="grid md:grid-cols-10 gap-6">
            <div
              data-animated="box"
              className="flex flex-col gap-2 rounded-xl bg-light-green p-4 md:col-span-4"
            >
              <div className="flex gap-2 items-center">
                <ClockAlert />
                <h3 className="text-lg md:text-xl font-medium text-balance">
                  Intelligent watering reminders
                </h3>
              </div>
              <p className="text-base">
                With Plantasync, you will be able to keep your plants alive
                longer. Plantasync will remind you when it's time to water your
                plants.
              </p>
            </div>
            <div
              data-animated="box"
              className="flex flex-col gap-2 rounded-xl bg-dark-green p-4 text-light-green md:col-span-6"
            >
              <div className="flex gap-2 items-center">
                <CalendarCheck />
                <h3 className="text-lg md:text-xl font-medium text-balance">
                  Custom Schedules
                </h3>
              </div>
              <p className="text-base">
                Create custom watering schedules for your plants to ensure they
                receive the right amount of water at the right time.
              </p>
            </div>
            <div
              data-animated="box"
              className="flex flex-col gap-2 rounded-xl bg-medium-green p-4 md:col-span-6"
            >
              <div className="flex gap-2 items-center">
                <ScanSearch />
                <h3 className="text-lg md:text-xl font-medium text-balance">
                  Plant Scanner
                </h3>
              </div>
              <p className="text-base">
                Our Plant Scanner is useful for a smoother set up process or to
                simply identify the plant right in front of you.
              </p>
            </div>
            <div
              data-animated="box"
              className="flex flex-col gap-2 rounded-xl bg-forrest-green p-4 text-light-green md:col-span-4"
            >
              <div className="flex gap-2 items-center">
                <ClipboardList />
                <h3 className="text-lg md:text-xl font-medium text-balance">
                  History
                </h3>
              </div>
              <p className="text-base">
                Keep track of past actions to get a better understanding of your
                plant care routine.
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
