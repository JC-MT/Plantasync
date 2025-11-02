import { useEffect, useState } from "react";
import { getData } from "~/db/query";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import type { Plant } from "~/components/types/SharedTypes.js";
import { LOCAL_STORAGE_EXPIRATION_MS } from "~/constants";

export function useGardenData() {
  const [allPlants, setAllPlants] = useState<Plant[]>([]);
  const { value, setValue } = useLocalStorage("gardenData", {
    data: [],
    timestamp: 0
  });

  const fetchGardenData = () => {
    getData("garden?select=*")
      .then((data) => {
        const plants = data || [];
        setAllPlants(plants);
        setValue({ data: plants, timestamp: Date.now() });
      })
      .catch((error) => {
        console.error("Failed to fetch garden data:", error);
        setAllPlants([]);
      });
  };

  useEffect(() => {
    if (value?.data?.length && value?.timestamp) {
      const isExpired =
        Date.now() - value.timestamp > LOCAL_STORAGE_EXPIRATION_MS;

      if (!isExpired) {
        setAllPlants(value.data);
        return;
      }
    }

    fetchGardenData();
  }, []);

  return { allPlants, setAllPlants, fetchGardenData };
}
