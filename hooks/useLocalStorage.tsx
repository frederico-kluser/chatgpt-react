import { useEffect, useState } from "react";

const useLocalStorage = (key: string) => {
  const [value, setValue] = useState<string | null>(null);

  const updateValue = () => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(key);
      if (item !== value) {
        setValue(item);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(updateValue, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return value;
};

export default useLocalStorage;
