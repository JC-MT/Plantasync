import { Combobox } from "./Combobox";
import { Input } from "../components/ui/input";
import { useSearchParams } from "react-router";
import { climates, lights } from "../constants";
import { type ChangeEvent, type Dispatch, type SetStateAction } from "react";

type Props = {
  search: {
    name: string;
    climate: string;
    ideal_light: string;
  };
  setSearch: Dispatch<
    SetStateAction<{
      name: string;
      climate: string;
      ideal_light: string;
    }>
  >;
};

export function Filter({ search, setSearch }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    setSearch((prev) => {
      return { ...prev, [name]: value };
    });

    if (value === "") {
      searchParams.delete(name);
    } else {
      searchParams.set(name, value);
    }

    setSearchParams(searchParams);
  };

  return (
    <div className="grid md:grid-cols-2 gap-2 w-full">
      <Input
        type="text"
        placeholder="Type a plant name..."
        className="text-dark-green"
        value={search.name}
        name="name"
        onChange={handleChange}
        title="Search by plant name"
      />
      <div className="grid grid-cols-2 gap-2">
        <Combobox
          name="climate"
          value={search.climate}
          options={climates}
          artifact="climate"
          handleSelect={handleChange}
        />
        <Combobox
          name="ideal_light"
          value={search.ideal_light}
          options={lights}
          artifact="light"
          handleSelect={handleChange}
        />
      </div>
    </div>
  );
}
