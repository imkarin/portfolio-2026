import { createContext, useContext, ReactNode } from "react";
import { useState, useCallback } from "react";
import { usePersistentState } from "../hooks/usePersistentState";
import { OutputItem } from "../types/types";
import { initialOutputHistory } from "../constants/output-histories";

const themeOptions = ["midnight", "forest", "cozy", "black-and-white"];

interface TerminalContextValue {
  outputHistory: OutputItem[];
  addToOutputHistory: (item: OutputItem) => void;
  clearOutputHistory: () => void;
  input: string;
  setInput: (value: string) => void;
  commandHistory: string[];
  addToCommandHistory: (command: string) => void;
  clearCommandHistory: () => void;
  navigateCommandHistory: (
    direction: "up" | "down",
    setInput: (value: string) => void,
  ) => void;
  theme: (typeof themeOptions)[number];
  toggleTheme: () => void;
}

const TerminalContext = createContext<TerminalContextValue | null>(null);

// Terminal Context: provides state and functions related to terminal input, output, and command history
export const TerminalProvider = ({ children }: { children: ReactNode }) => {
  const [outputHistory, setOutputHistory] =
    useState<OutputItem[]>(initialOutputHistory);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = usePersistentState<string[]>(
    "terminal-command-history",
    [],
  );
  const [_, setHistoryIndex] = useState<number>(commandHistory.length);

  const [theme, setTheme] = usePersistentState<(typeof themeOptions)[number]>(
    "terminal-theme",
    "midnight",
  );

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const currentIndex = themeOptions.indexOf(prev);
      const nextIndex = (currentIndex + 1) % themeOptions.length;
      return themeOptions[nextIndex];
    });
  }, [themeOptions, setTheme]);

  // Command history functions
  const addToCommandHistory = useCallback(
    (command: string) => {
      if (command.trim()) {
        setCommandHistory((prev) => [...prev, command]);
        setHistoryIndex(commandHistory.length + 1);
      }
    },
    [setCommandHistory, commandHistory.length],
  );

  const clearCommandHistory = useCallback(() => {
    setCommandHistory([]);
    setHistoryIndex(0);
  }, [setCommandHistory]);

  // Output history functions
  const addToOutputHistory = useCallback(
    (item: OutputItem) => {
      setOutputHistory((prev) => [...prev, item]);
    },
    [setOutputHistory],
  );

  const clearOutputHistory = useCallback(() => {
    setOutputHistory(initialOutputHistory);
  }, [setOutputHistory]);

  // Navigating history on arrow up/down
  const navigateHistory = useCallback(
    (direction: "up" | "down", setInput: (value: string) => void) => {
      if (commandHistory.length === 0) return;

      setHistoryIndex((prev) => {
        let newIndex = prev;

        if (direction === "up") {
          newIndex = Math.max(prev - 1, 0);
        } else {
          newIndex = Math.min(prev + 1, commandHistory.length);
        }

        if (newIndex < commandHistory.length) {
          setInput(commandHistory[newIndex]);
        } else {
          setInput("");
        }

        return newIndex;
      });
    },
    [commandHistory],
  );

  return (
    <TerminalContext.Provider
      value={{
        outputHistory,
        addToOutputHistory,
        clearOutputHistory,
        input,
        setInput,
        commandHistory,
        addToCommandHistory,
        clearCommandHistory,
        navigateCommandHistory: navigateHistory,
        theme: theme,
        toggleTheme,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
};

// Hook to get TerminalContext or return error if used outside of TerminalProvider
export const useTerminalContext = () => {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error(
      "useTerminalContext must be used within a TerminalProvider",
    );
  }
  return context;
};
