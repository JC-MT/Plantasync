import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { useGardenData } from "~/hooks/useGardenData";
import { FILTERED_PLANT_INCREMENT } from "~/constants";
import { useSearchParams, Form, useNavigation } from "react-router";
import type { Plant, Search } from "~/components/types/SharedTypes.js";

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
  const navigation = useNavigation();
  const { allPlants } = useGardenData();
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
    <div className="mt-7 mb-2 grid gap-2 place-self-center text-center">
      {showLoadMore && (
        <Form
          method="post"
          action={`/explore?${searchParams}`}
          preventScrollReset
        >
          <input
            type="hidden"
            name="limit"
            value={
              Math.max(limitParam, FILTERED_PLANT_INCREMENT) +
              FILTERED_PLANT_INCREMENT
            }
          />
          <input type="hidden" name="plantsExist" value={allPlants.length} />
          <Button
            type="submit"
            className="text-xl/none min-w-40 font-semibold starting:opacity-0 delay-300 opacity-100"
            disabled={navigation.formAction === "/explore"}
          >
            {navigation.formAction === "/explore" ? (
              <>
                <Spinner />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </Form>
      )}
      {!filteredPlants && (
        <Button
          type="submit"
          className="text-xl/none min-w-40 font-semibold starting:opacity-0 delay-300 opacity-100"
          disabled={navigation.formAction === "/explore"}
          onClick={() => {
            setSearchParams({});
            setSearch({ name: "", climate: "", ideal_light: "" });
          }}
        >
          {navigation.formAction === "/explore" ? (
            <>
              <Spinner />
              Resetting...
            </>
          ) : (
            "Reset Search"
          )}
        </Button>
      )}
      <p className="text-sm starting:opacity-0 delay-300 opacity-100">
        {currentPlants
          ? `Showing ${limitParam >= filteredPlants ? filteredPlants : limitParam} of ${allPlants.length} plants`
          : `No plants found`}
      </p>
    </div>
  );
}
