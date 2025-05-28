import { useNavigate } from "react-router";

type FilterProps = {
  search: {
    name: string;
    climate: string;
    light: string;
  };
  setSearch: React.Dispatch<
    React.SetStateAction<{
      name: string;
      climate: string;
      light: string;
    }>
  >;
};

export function Filter({ search, setSearch }: FilterProps) {
  const navigate = useNavigate();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    setSearch((prev) => {
      return { ...prev, [name]: value };
    });

    const url = new URL(window.location.href);
    if (value === "") {
      url.searchParams.delete(name);
    } else {
      url.searchParams.set(name, value);
    }
    navigate(
      {
        pathname: url.pathname,
        search: url.search
      },
      { preventScrollReset: true }
    );
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      Filter by:
      <input
        type="text"
        placeholder="Plant name..."
        value={search.name}
        name="name"
        onChange={handleChange}
        title="Search by plant name"
        className="px-4 py-2 rounded-full border border-dark-green/20 focus:outline-none focus:ring-2 focus:ring-light-green/50"
      />
      <select
        className="px-4 py-2 rounded-full border border-dark-green/20 focus:outline-none focus:ring-2 focus:ring-light-green/50"
        title="Filter by climate"
        value={search.climate}
        name="climate"
        onChange={handleChange}
      >
        <option value="">Choose climate</option>
        <option value="tropical">Tropical</option>
        <option value="temperate">Temperate</option>
        <option value="arid">Arid</option>
      </select>
      <select
        className="px-4 py-2 rounded-full border border-dark-green/20 focus:outline-none focus:ring-2 focus:ring-light-green/50"
        title="Filter by ideal light"
        value={search.light}
        name="light"
        onChange={handleChange}
      >
        <option value="">Choose ideal light</option>
        <option value="direct">Direct</option>
        <option value="partial">Partial</option>
        <option value="indirect">Indirect</option>
        <option value="shade">Shade</option>
      </select>
    </div>
  );
}
