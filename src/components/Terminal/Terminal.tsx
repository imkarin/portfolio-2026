import { useEffect, useRef, KeyboardEvent, FormEvent } from "react";
import TerminalOutput from "../TerminalOutput/TerminalOutput";
import TerminalInput from "../TerminalInput/TerminalInput";
import { useTerminalContext } from "../../context/terminal-context";
import { processCommand } from "../../utils/commandProcessor";
import "./Terminal.css";

const Terminal = () => {
  const {
    outputHistory,
    addToOutputHistory,
    clearOutputHistory,
    input,
    setInput,
    navigateCommandHistory,
    commandHistory,
    addToCommandHistory,
    clearCommandHistory,
    theme,
    toggleTheme,
  } = useTerminalContext();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on initial render
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Set css class on body based on theme
  useEffect(() => {
    // Remove old theme-classes
    document.body.classList.forEach((cls) => {
      if (cls.startsWith("theme-")) {
        document.body.classList.remove(cls);
      }
    });

    // Add new theme class
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      navigateCommandHistory("up", setInput);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      navigateCommandHistory("down", setInput);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    processCommand(input, {
      commandHistory,
      clearOutputHistory,
      addToOutputHistory,
      addToCommandHistory,
      clearCommandHistory,
      setInput,
      toggleTheme,
    });
  };

  return (
    <div className="terminal-wrapper">
      <TerminalOutput outputHistory={outputHistory} />
      <TerminalInput
        value={input}
        onChange={setInput}
        onKeyDown={handleKeyDown}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Terminal;
