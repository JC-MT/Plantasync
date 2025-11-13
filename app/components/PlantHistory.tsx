import { Suspense } from "react";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import type { Action } from "./types/SharedTypes";
import { useSearchParams, Await } from "react-router";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "./ui/pagination";

export function PlantHistory({ actions }: { actions: Promise<Action[]> }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || "1");
  const currentFilter = searchParams.get("filter") || "";

  const handleParamChange = (param: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (params.get(param)?.toLowerCase() === value.toLowerCase()) {
      params.delete(param);
    } else {
      params.set(param, value.toLowerCase());
    }
    setSearchParams(params, {
      preventScrollReset: true
    });
  };

  return (
    <div className="grid gap-2">
      <div className="flex flex-col md:flex-row gap-3">
        <h2 className="font-bold text-2xl/none md:text-3xl/none">History</h2>
        <div className="grid grid-cols-2 md:flex md:flex-wrap gap-1 md:gap-2">
          {["Updated", "Skipped", "Rotated", "Watered"].map((button, idx) => {
            return (
              <Button
                variant={
                  currentFilter.toLowerCase() === button.toLowerCase()
                    ? "default"
                    : "outline"
                }
                className="font-semibold"
                key={idx}
                onMouseDown={() => handleParamChange("filter", button)}
                onPointerDown={() => handleParamChange("filter", button)}
              >
                {button}
              </Button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col divide-y divide-zinc-200 gap-1">
        <Suspense
          fallback={
            <div className="flex gap-2 items-center">
              <Spinner /> Loading...
            </div>
          }
        >
          <Await resolve={actions}>
            {(resolvedActions) =>
              resolvedActions.map((action, idx) => (
                <div
                  key={idx}
                  className="flex flex-row place-content-between pointer-events-none"
                >
                  <p className="capitalize text-left text-base font-semibold text-dark-green">
                    {action.type}
                  </p>
                </div>
              ))
            }
          </Await>
        </Suspense>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onMouseDown={() =>
                handleParamChange("page", `${Math.max(currentPage - 1, 1)}`)
              }
              onPointerDown={() =>
                handleParamChange("page", `${Math.max(currentPage - 1, 1)}`)
              }
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              isActive={currentPage === 1}
              onMouseDown={() => handleParamChange("page", "1")}
              onPointerDown={() => handleParamChange("page", "1")}
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              isActive={currentPage === 2}
              onMouseDown={() => handleParamChange("page", "2")}
              onPointerDown={() => handleParamChange("page", "2")}
            >
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onMouseDown={() =>
                handleParamChange("page", `${currentPage + 1}`)
              }
              onPointerDown={() =>
                handleParamChange("page", `${currentPage + 1}`)
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
