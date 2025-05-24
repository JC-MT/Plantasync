import { useEffect, useState } from "react";
import { getData } from "~/db/query";
import { useLocalStorage } from "~/hooks/useLocalStorage";
const EXPIRATION_MS = 1000 * 60 * 10;

export function useGardenData() {
  const [plants, setPlants] = useState([]);
  const { value, setValue } = useLocalStorage("gardenData", {
    data: {},
    timestamp: Date.now()
  });

  const fetchGardenData = async () => {
    const data = await getData("garden?select=*");
    if (!data) {
      throw new Response("Failed to get plants:", { status: 500 });
    }
    setPlants(data);
    setValue({ data, timestamp: Date.now() });
  };

  useEffect(() => {
    const { data, timestamp } = value;
    if (data.length) {
      const now = Date.now();

      if (now - timestamp < EXPIRATION_MS) {
        setPlants(data);
        return;
      }
    }

    fetchGardenData();
  }, [plants]);

  return { plants, setPlants };
}
