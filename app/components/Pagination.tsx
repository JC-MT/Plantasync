import { useLocation, useSearchParams, Form } from "react-router";
import { useGardenData } from "~/hooks/useGardenData";

const INCREMENT = 10;

export function Pagination() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { plants }: { plants: any[] } = useGardenData();
  const limitParam = Number(searchParams.get("limit")) || INCREMENT;

  return (
    <div className="mt-10 grid place-self-center text-center">
      {plants.length > limitParam && (
        <Form method="post" action={location.pathname} preventScrollReset>
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
      {plants.length && (
        <p className="text-sm">
          Showing {limitParam > plants.length ? plants.length : limitParam} of{" "}
          {plants.length} plants
        </p>
      )}
    </div>
  );
}
