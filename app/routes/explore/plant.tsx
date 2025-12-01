import { getData } from "~/db/query.js";
import { Slider } from "~/components/Slider.js";
import { Image } from "~/components/Image.js";
const { VITE_IMAGE_CDN_URL } = import.meta.env;
import { defaultSliderPlants } from "~/constants";
import { InfoCard } from "~/components/InfoCard.js";
import { SliderCard } from "~/components/SliderCard.js";
import PageContainer from "~/layout/PageContainer.js";
import { PlantDetails } from "~/components/PlantDetails.js";
import type { Plant } from "~/components/types/SharedTypes.js";

export async function loader({
  params
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
    { name: "description", content: "This is the Detail page" }
  ];
}

export default function Detail({ loaderData }: { loaderData: Plant }) {
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
          <div className="tracking-tight text-balance">
            <h1
              className="text-3xl/none md:text-5xl font-bold"
              style={{
                viewTransitionName: `plant-title-${loaderData.id}`
              }}
            >
              {loaderData.name}
            </h1>
            <p className="text-base font-medium">{loaderData.category}</p>
          </div>
          <InfoCard>
            <PlantDetails plant={loaderData} />
          </InfoCard>
          <InfoCard hasSlider={true}>
            <Slider title="Most Popular Plants">
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
