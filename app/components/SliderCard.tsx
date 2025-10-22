import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { useFetcher } from "react-router";

export function SliderCard({
  imageUrl,
  name,
  description
}: {
  imageUrl: string;
  name: string;
  description: string;
}) {
  const fetcher = useFetcher();
  return (
    <div className="flex flex-col rounded-lg overflow-hidden border border-zinc-200 animate-slide-in-card delay-75 min-w-44 sm:min-w-56 snap-start">
      <img
        src={imageUrl}
        width="1000"
        height="1000"
        className="h-44 sm:h-48 md:h-52 lg:h-56 w-full object-cover bg-plant-card rounded-t-lg border-b border-zinc-200"
        loading="lazy"
        alt="Stock plant image"
      />
      <div className="flex gap-2 items-center justify-between p-2 bg-white flex-grow">
        <div className="flex flex-col w-[calc(100%-58px)] md:w-[calc(100%-70px)]">
          <h3 className="text-sm/tight md:text-lg/tight font-semibold truncate">
            {name}
          </h3>
          <p className="text-xs/tight md:text-sm/tight">{description}</p>
        </div>
        <fetcher.Form
          method="post"
          action="/plants/add"
          encType="multipart/form-data"
        >
          <input type="hidden" name="intent" value="add" />
          <input type="hidden" name="name" value={name} />
          <input type="hidden" name="image" value={imageUrl} />
          <Button
            className="text-xs/none md:text-sm/none font-semibold px-3 py-1.5 md:px-4 md:py-2 h-8 md:h-9 min-w-12"
            type="submit"
            disabled={fetcher.state === "submitting"}
          >
            {fetcher.state === "submitting" ? <Spinner /> : "Add"}
          </Button>
        </fetcher.Form>
      </div>
    </div>
  );
}
