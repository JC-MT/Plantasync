import { useGardenData } from "~/hooks/useGardenData";
import { FILTERED_PLANT_INCREMENT } from "~/constants";
import type { Plant, Search } from "~/components/types/SharedTypes.js";
import { useLocation, useSearchParams, Form } from "react-router";

export function Pagination({
  currentPlants,
  filteredPlants,
  filterFunction,
  setSearch,
  currentSearch
}: {
  currentPlants: number;
  filteredPlants: number;
  filterFunction: (plant: Plant, search: Search) => boolean;
  setSearch: (search: Search) => void;
  currentSearch: Search;
}) {
  const { allPlants } = useGardenData();
  const { pathname, search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const limitParam = Number(searchParams.get("limit")) || filteredPlants;
  const filterIsActive = Object.values(currentSearch).some(
    (value) => value.length > 0
  );
  const allFilteredPlants = allPlants.filter((plant) =>
    filterFunction(plant, currentSearch)
  ).length;

  const showLoadMore = filterIsActive
    ? filteredPlants < allFilteredPlants
    : currentPlants < allPlants.length;

  return (
    <div className="mt-10 grid place-self-center text-center">
      {showLoadMore && (
        <Form method="post" action={pathname + search} preventScrollReset>
          <input
            type="hidden"
            name="limit"
            value={
              Math.max(limitParam, FILTERED_PLANT_INCREMENT) +
              FILTERED_PLANT_INCREMENT
            }
          />
          <input type="hidden" name="plantsExist" value={allPlants.length} />
          <button
            type="submit"
            className="mb-4 px-8 py-2 rounded-full hover:cursor-pointer bg-dark-green/5 hover:bg-dark-green hover:text-light-green text-xl font-medium text-dark-green"
          >
            Load More
          </button>
        </Form>
      )}
      <p className="text-sm starting:opacity-0 delay-300 opacity-100">
        {currentPlants
          ? `Showing ${limitParam >= filteredPlants ? filteredPlants : limitParam} of ${allPlants.length} plants`
          : `No plants found`}

        {!filteredPlants ? (
          <button
            type="button"
            className="mb-4 px-4 py-1 rounded-full hover:cursor-pointer bg-dark-green/5 hover:bg-dark-green hover:text-light-green text-xl font-medium text-dark-green"
            onClick={() => {
              setSearchParams({});
              setSearch({ name: "", climate: "", ideal_light: "" });
            }}
          >
            Reset Search
          </button>
        ) : null}
      </p>
    </div>
  );
}
