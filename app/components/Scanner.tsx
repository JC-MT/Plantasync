import { Slider } from "./Slider";
import { Spinner } from "./ui/spinner";
import { useFetcher } from "react-router";
import { SliderCard } from "./SliderCard";
import { FileInput } from "./ui/file-input";
import { Label } from "../components/ui/label";
const { VITE_IMAGE_CDN_URL } = import.meta.env;
import { Button } from "../components/ui/button";
import { defaultSliderPlants } from "~/constants";
import { capitalizeFirstLetters } from "~/utils";

interface Result {
  species: {
    commonNames: string[];
  };
  images: { url: { m: string } }[];
  score: number;
}

export default function Scanner({
  ...props
}: React.HTMLAttributes<HTMLFormElement>) {
  const fetcher = useFetcher();

  return (
    <section className="space-y-7 py-5 pl-5 bg-white rounded-lg shadow-md w-full self-start grid overflow-x-scroll">
      <fetcher.Form
        method="post"
        action="/api/scan"
        encType="multipart/form-data"
        {...props}
      >
        <div className="grid gap-1">
          <Label htmlFor="picture">Image</Label>
          <FileInput name="images" />
          <p className="text-muted-foreground text-sm">
            Required: Please add an image of the plant you want to scan.
          </p>
        </div>
        <Button
          className="max-w-32 font-semibold"
          type="submit"
          disabled={fetcher.state === "submitting"}
        >
          {fetcher.state === "submitting" ? (
            <>
              <Spinner />
              Scanning...
            </>
          ) : (
            "Scan"
          )}
        </Button>
      </fetcher.Form>
      {fetcher.data ? (
        <>
          {fetcher.data.ok ? (
            <Slider title="Scan Results">
              {fetcher.data.data?.results.map((item: Result, index: number) => (
                <SliderCard
                  key={`scan-result-${index}`}
                  imageUrl={item.images[0].url.m}
                  name={capitalizeFirstLetters(item.species.commonNames[0])}
                  description={`${(item.score * 100).toFixed(2)}% match`}
                />
              ))}
            </Slider>
          ) : (
            <div className="p-4 border rounded mr-5">
              <h3 className="font-semibold text-red-600">Error:</h3>
              <p className="text-red-500">{fetcher.data.error}</p>
              {fetcher.data.details && (
                <pre className="mt-2 text-xs bg-red-50 p-2 rounded">
                  {JSON.stringify(fetcher.data.details, null, 2)}
                </pre>
              )}
            </div>
          )}
        </>
      ) : (
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
      )}
    </section>
  );
}
