const { VITE_IMAGE_CDN_URL } = import.meta.env;
import type { Plant, User } from "~/components/types/SharedTypes.js";
import { Image } from "~/components/Image.js";
import { Slider } from "~/components/Slider.js";
import { Button } from "~/components/ui/button";
import { getData, postData } from "~/db/query.js";
import { defaultSliderPlants } from "~/constants";
import { InfoCard } from "~/components/InfoCard.js";
import PageContainer from "~/layout/PageContainer.js";
import { SliderCard } from "~/components/SliderCard.js";
import { redirect, useFetcher, useRouteLoaderData } from "react-router";

export async function action({ request }: { request: Request }) {
  try {
    const contentType = request.headers.get("content-type");
    const data = contentType?.includes("application/json")
      ? await request.json()
      : await request.formData();

    const plant = await postData("garden", data);

    return redirect("/plants/" + plant[0].id);
  } catch (error) {
    return new Response(`error: ${error || "Failed to add plant"}`, {
      status: 400,
    });
  }
}

export async function loader({
  params,
}: {
  params: Record<string, string | undefined>;
}) {
  const plant = await getData(`garden?id=eq.${params.id}`);
  if (!plant) {
    throw new Response("Failed to get plants:", { status: 500 });
  }
  return plant[0];
}

export function meta({ data }: { data: any }) {
  return [
    { title: `Plantasync — ${data?.name || "Plant"} details` },
    { name: "description", content: "This is the Detail page" },
  ];
}

export default function Detail({ loaderData }: { loaderData: Plant }) {
  const fetcher = useFetcher();
  const user: User | null | undefined = useRouteLoaderData("root");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetcher.submit(
      {
        name: loaderData.name,
        category: loaderData.category,
        image: loaderData.image,
        user_id: user ? user.id : 0,
        demo_plant: user ? false : true,
      },
      {
        method: "post",
        action: `/explore/${loaderData.id}`,
        encType: "application/json",
      },
    );
  };

  return (
    <PageContainer>
      <div className="grid grid-cols-1 sm:grid-cols-[40%_auto] gap-2 sm:gap-5 md:gap-10 lg:gap-16">
        <Image
          imageUrl="default_plant_image.jpg?v=1746612628"
          classNames="w-full object-cover bg-plant-card border border-zinc-200 rounded-lg sticky top-20"
          loading="eager"
          sizes="(min-width: 768px) 42vw, 100vw"
          alt="Stock plant image"
          isHero={true}
          width={1000}
          height={1000}
          viewTransition={loaderData.id}
        />
        <div className="flex flex-col gap-4">
          <div
            className="tracking-tight text-balance"
            style={{
              viewTransitionName: `plant-title-${loaderData.id}`,
            }}
          >
            <h1 className="text-3xl/none md:text-5xl font-bold">
              {loaderData.name}
            </h1>
            <p className="text-base font-medium">{loaderData.category}</p>
          </div>
          <InfoCard>
            <fetcher.Form
              method="post"
              action={`/explore/${loaderData.id}`}
              onSubmit={handleSubmit}
              className="flex justify-between items-center gap-3"
            >
              <span className="text-sm/tight md:text-base/tight max-w-96 font-medium">
                Add this plant to your garden to keep track of its growth and
                care.
              </span>
              <Button type="submit" className="font-semibold">
                Add to Garden
              </Button>
            </fetcher.Form>
          </InfoCard>
          <InfoCard hasSlider={true}>
            <Slider title="Popular Plants">
              {defaultSliderPlants.map((plant, index) => (
                <SliderCard
                  key={index}
                  imageUrl={`${VITE_IMAGE_CDN_URL}default_plant_image.jpg?v=1746612628`}
                  name={plant.name}
                  description={plant.origin}
                />
              ))}
            </Slider>
          </InfoCard>
        </div>
      </div>
    </PageContainer>
  );
}
