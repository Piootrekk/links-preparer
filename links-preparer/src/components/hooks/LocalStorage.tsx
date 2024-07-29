import { useState, useEffect } from "react";

export const clearData = (key: string) => {
  localStorage.removeItem(key);
};

export const getData = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
};

export const setData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const useLocalStorage = <T,>(key: string, initialValue?: T) => {
  const [value, setValue] = useState<T>(() => getData(key) || initialValue);

  useEffect(() => {
    setData(key, value);
  }, [value, key]);

  return [value, setValue] as const;
};

export default useLocalStorage;
