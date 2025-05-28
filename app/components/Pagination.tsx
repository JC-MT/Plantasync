import { useLocation, useSearchParams, Form } from "react-router";
import { useGardenData } from "~/hooks/useGardenData";

const INCREMENT = 10;

export function Pagination({
  renderedPlants,
  renderFilteredList,
  setSearch
}: {
  renderedPlants: object[];
  renderFilteredList: (plant: any) => boolean;
  setSearch: (search: { name: string; climate: string; light: string }) => void;
}) {
  const { pathname, search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { plants }: { plants: any[] } = useGardenData();
  const visiblePlantCount = renderedPlants?.filter(renderFilteredList).length;
  const possiblePlantCount = plants?.filter(renderFilteredList).length;
  const limitParam = Number(searchParams.get("limit")) || visiblePlantCount;

  return (
    <div className="mt-10 grid place-self-center text-center">
      {visiblePlantCount < possiblePlantCount && (
        <Form method="post" action={pathname + search} preventScrollReset>
          <input type="hidden" name="limit" value={limitParam + INCREMENT} />
          <input type="hidden" name="plantsExist" value={plants.length} />
          <button
            type="submit"
            className="mb-4 px-4 py-1 rounded-full hover:cursor-pointer bg-dark-green/5 hover:bg-dark-green hover:text-light-green text-xl font-medium text-dark-green"
          >
            Load More
          </button>
        </Form>
      )}
      <p className="text-sm">
        {visiblePlantCount
          ? `Showing ${limitParam > plants.length ? visiblePlantCount : limitParam} of ${plants.length} plants`
          : `No plants found`}

        {!visiblePlantCount ? (
          <button
            type="button"
            className="mb-4 px-4 py-1 rounded-full hover:cursor-pointer bg-dark-green/5 hover:bg-dark-green hover:text-light-green text-xl font-medium text-dark-green"
            onClick={() => {
              setSearchParams({});
              setSearch({ name: "", climate: "", light: "" });
            }}
          >
            Reset Search
          </button>
        ) : null}
      </p>
    </div>
  );
}
