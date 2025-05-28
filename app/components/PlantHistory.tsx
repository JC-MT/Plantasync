import { useState } from "react";

export default function PlantHistory({ actions }) {
  const [selected, setSelected] = useState({
    default: true,
    created: false,
    watered: false,
    updated: false,
    skipped: false
  });
  const [showAmount, setShowAmount] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(actions.filter(handleFiltering).length);

  function handleSelected(option) {
    setSelected({ ...selected, default: false, [option]: !selected[option] });
    setStart(0);
    if (showAmount) {
      setCurrentPage(1);
      setEnd(showAmount);
    }
  }

  function handleFiltering(action) {
    if (
      selected.default === false &&
      selected.created === false &&
      selected.watered === false &&
      selected.updated === false &&
      selected.skipped === false
    ) {
      setSelected({ ...selected, default: true });
    }

    if (
      selected[action.action.toLowerCase()] === true ||
      selected.default === true
    ) {
      return action;
    }
  }

  function handlePagination(showAmount, page, pageLimit) {
    if (page > 0 && page <= pageLimit) {
      if (showAmount) {
        setShowAmount(showAmount);
        setCurrentPage(page);
        setEnd(showAmount * page);
        setStart(showAmount * (page - 1));
      } else {
        setEnd(actions.filter(handleFiltering).length);
        setStart(0);
        setShowAmount(20);
      }
    }
  }

  return (
    <div className="flex flex-col p-4 rounded-md border border-zinc-200 bg-white text-dark-green overflow-hidden">
      <div>
        <h2 className="font-bold text-3xl md:text-4xl">History</h2>

        <div className="flex items-center gap-1">
          <h3 className="text-base font-semibold">Filter by:</h3>
          <div className="flex flex-row gap-1 overflow-x-auto snap-x">
            <button
              type="button"
              onClick={() => handleSelected("created")}
              className={`border cursor-pointer rounded-full border-zinc-200 ${
                selected.created
                  ? "bg-dark-green text-light-green"
                  : "bg-dark-green/5 text-dark-green"
              } p-2 py-1 px-4 gap-1 hover:bg-dark-green hover:text-light-green`}
            >
              <p>Created</p>
            </button>
            <button
              type="button"
              onClick={() => handleSelected("watered")}
              className={`border cursor-pointer rounded-full border-zinc-200 ${
                selected.watered
                  ? "bg-dark-green text-light-green"
                  : "bg-dark-green/5 text-dark-green"
              } p-2 py-1 px-4 hover:bg-dark-green hover:text-light-green`}
            >
              <p>Watered</p>
            </button>
            <button
              type="button"
              onClick={() => handleSelected("updated")}
              className={`border cursor-pointer rounded-full border-zinc-200 ${
                selected.updated
                  ? "bg-dark-green text-light-green"
                  : "bg-dark-green/5 text-dark-green"
              } p-2 py-1 px-4 hover:bg-dark-green hover:text-light-green`}
            >
              <p>Updated</p>
            </button>
            <button
              type="button"
              onClick={() => handleSelected("skipped")}
              className={`border cursor-pointer rounded-full border-zinc-200 ${
                selected.skipped
                  ? "bg-dark-green text-light-green"
                  : "bg-dark-green/5 text-dark-green"
              } p-2 py-1 px-4 hover:bg-dark-green hover:text-light-green`}
            >
              <p>Skipped</p>
            </button>
          </div>
        </div>
        <div className="flex h-fit">
          <div className="w-fit bg-white rounded-lg">
            <ul className="flex items-center justify-between gap-2 text-sm">
              <li>
                <div className="flex items-center">
                  <input
                    onChange={() => handlePagination(0, 1, 1)}
                    value={showAmount}
                    name="amount"
                    type="radio"
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm font-medium">All</label>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <input
                    onChange={() => handlePagination(5, 1, 1)}
                    name="amount"
                    type="radio"
                    value={showAmount}
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm font-medium">5 per page</label>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <input
                    onChange={() => handlePagination(10, 1, 1)}
                    name="amount"
                    type="radio"
                    value={showAmount}
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm font-bold">10 per page</label>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col divide-y divide-zinc-200 gap-1">
        {actions
          .filter(handleFiltering)
          .slice(start, end)
          .map((action, id) => {
            const icon = {
              //   Watered: Watered,
              //   Updated: Updated,
              //   Skipped: Skipped,
              Created: "https://cdn-icons-png.flaticon.com/512/628/628324.png"
            };
            const link = {
              Watered: "https://www.flaticon.com/free-icons/plant",
              Updated: "https://www.flaticon.com/free-icons/refresh",
              Skipped: "https://www.flaticon.com/free-icons/skip"
            };
            const title = {
              Watered: "Plant icons created by Freepik - Flaticon",
              Updated: "Refresh icons created by Freepik - Flaticon",
              Skipped: "Skip icons created by Gajah Mada - Flaticon"
            };

            return (
              <div
                key={id}
                className="flex flex-row place-content-between pointer-events-none"
              >
                <p className="text-left text-base font-semibold text-dark-green">
                  {action.action} on{" "}
                  {/* {dayjs(action.date).format('MMM D, YYYY')}{' '} */}
                </p>
                <a
                  href={link[action.action] || "#"}
                  rel="noreferrer"
                  target="_blank"
                  title={title[action.action]}
                >
                  {/* <img
                      alt="action icon"
                      className="mr-3 h-6 w-6"
                      src={icon[action.action]}
                    /> */}
                </a>
              </div>
            );
          })}
      </div>
    </div>
  );
}
