import { useState, useEffect, Dispatch, SetStateAction } from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;

export const usePersistentState = <T>(key: string, initialValue: T | (() => T)): [T, SetValue<T>] => {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn("Failed to save to localStorage:", e);
    }
  }, [key, value]);

  return [value, setValue];
};
