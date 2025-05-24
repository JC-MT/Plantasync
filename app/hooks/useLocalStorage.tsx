import { useState, useEffect } from "react";

export function useLocalStorage(key: string, initialValue: any) {
  const isBrowser = typeof window !== "undefined";
  const [value, setValue] = useState(() => {
    if (isBrowser) {
      const savedItem = localStorage.getItem(key);
      return savedItem ? JSON.parse(savedItem) : initialValue;
    }
  });

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value]);

  return { value, setValue };
}
