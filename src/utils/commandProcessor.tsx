import AboutOutput from "../components/TerminalOutput/outputs/AboutOutput/AboutOutput";
import CatOutput from "../components/TerminalOutput/outputs/CatOutput/CatOutput";
import HelpOutput from "../components/TerminalOutput/outputs/HelpOutput/HelpOutput";
import LanguagesOutput from "../components/TerminalOutput/outputs/LanguagesOutput/LanguagesOutput";
import ProjectsOutput from "../components/TerminalOutput/outputs/ProjectsOutput/ProjectsOutput";
import { NEOFETCH } from "../constants/ascii";
import { CommandResult, OutputItem } from "../types/types";

interface ProcessCommandActions {
  commandHistory: string[];
  clearOutputHistory: () => void;
  addToOutputHistory: (item: OutputItem) => void;
  addToCommandHistory: (command: string) => void;
  clearCommandHistory: () => void;
  toggleTheme: () => void;
  setInput: (value: string) => void;
}

// Get History Command: when user types !n, retrieve the nth command from history and set it as current input
const getHistoryCommand = (indexStr: string): CommandResult => {
  const history = JSON.parse(
    localStorage.getItem("terminal-command-history") || "[]",
  );
  const index = parseInt(indexStr, 10);

  if (isNaN(index) || index < 0 || index >= history.length) {
    return { type: "error", content: `History index out of range` };
  }

  return {
    type: "history-repeat-cmd",
    content: history[index],
    shouldSetInput: true,
  };
};

// Main function to process user input command
export const processCommand = async (
  input: string,
  actions: ProcessCommandActions,
): Promise<void> => {
  const {
    commandHistory,
    addToOutputHistory,
    clearOutputHistory,
    addToCommandHistory,
    clearCommandHistory,
    setInput,
    toggleTheme,
  } = actions;

  const trimmedInput = input.trim();
  if (!trimmedInput) return;

  // Reset input field to empty
  setInput("");

  let output: CommandResult;

  // If the input started with "!", treat it as a history reference command
  if (trimmedInput.startsWith("!") && trimmedInput.length > 1) {
    const afterBang = trimmedInput.slice(1);
    if (/^\d+$/.test(afterBang)) {
      output = getHistoryCommand(afterBang);
      setInput(output.content as string);
    } else {
      output = { type: "error", content: "Invalid history reference" };
    }
    return;
  } else {
    // Otherwise, try to execute it as a built-in command
    output = await executeBuiltInCommand(
      trimmedInput,
      commandHistory,
      clearCommandHistory,
      toggleTheme,
    );
  }

  // The "clear" command doesn't get added to OutputHistory,
  // Otherwise the cleared screen would still show the "clear" command output
  if (output.type === "clear") {
    addToCommandHistory(input);
    clearOutputHistory();
    return;
  }

  // Also show the input command as part of the output history, so that it gets rendered in the terminal
  addToOutputHistory({ type: "input", content: input });
  addToOutputHistory({
    type: output.type,
    content: output.content,
  });

  // After "cat" command is entered, the output type will be "cat-pre-fetch":
  // 1. We add this to OutputHistory, to show the loading message,
  // 2. then we execute the "cat-fetch" command to get the actual cat image,
  // 3. and update the OutputHistory with the cat image output after we get the response from the API
  // We don't add "cat-fetch" to the OutputHistory, because it doesn't need to be rendered in the terminal
  if (output.type === "cat-pre-fetch") {
    output = await executeBuiltInCommand(
      "cat-fetch",
      commandHistory,
      clearCommandHistory,
      toggleTheme,
    );
    // Add the cat image to the output history, so that it gets rendered in the terminal
    addToOutputHistory({ type: output.type, content: output.content });
  }

  addToCommandHistory(input);
};

const executeBuiltInCommand = async (
  trimmed: string,
  commandHistory: string[],
  clearCommandHistory: () => void,
  toggleTheme: () => void,
): Promise<CommandResult> => {
  const [command, ...args] = trimmed.split(" ");
  const arg = args.join(" ");

  switch (command.toLowerCase()) {
    case "theme":
      toggleTheme();
      return { type: "success", content: "Changed theme" };
    case "about":
      return {
        type: "info",
        content: <AboutOutput />,
      };
    case "languages":
      return {
        type: "info",
        content: <LanguagesOutput />,
      };
    case "projects":
      return {
        type: "info",
        content: <ProjectsOutput />,
      };
    case "github":
      window.open(
        "https://github.com/imkarin",
        "_blank",
        "noopener,noreferrer",
      );
      return {
        type: "success",
        content: (
          <div>
            Opened{" "}
            <a
              href="https://github.com/imkarin"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github profile
            </a>
            !
          </div>
        ),
      };
    case "linkedin":
      window.open(
        "https://linkedin.com/in/karin-meijvogel",
        "_blank",
        "noopener,noreferrer",
      );
      return {
        type: "success",
        content: (
          <div>
            Opened{" "}
            <a
              href="https://linkedin.com/in/karin-meijvogel"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn profile
            </a>
            !
          </div>
        ),
      };
    case "contact":
    case "email":
      window.open("mailto:karinnn-m@hotmail.com", "_self");
      return {
        type: "success",
        content: (
          <div>
            Opened email client to{" "}
            <a href="mailto:karinnn-m@hotmail.com" rel="noopener noreferrer">
              contact me
            </a>
            !
          </div>
        ),
      };
    case "help":
      return { type: "info", content: <HelpOutput /> };
    case "clear":
      return { type: "clear" };
    case "history": {
      if (commandHistory.length === 0) {
        return { type: "info", content: "No command history" };
      }
      const formatted = commandHistory
        .map(
          (cmd: string, index: number) =>
            `${index <= 9 ? ` ${index}` : index} | ${cmd}`,
        )
        .join("\n");
      return { type: "info", content: formatted };
    }
    case "clear-history":
      clearCommandHistory();
      return { type: "success", content: "Command history cleared" };
    case "echo":
      return { type: "info", content: arg || "Usage: echo <text>" };
    case "date":
      return { type: "info", content: new Date().toLocaleString() };
    case "whoami":
      return { type: "info", content: "web-wanderer" };
    case "neofetch":
      return { type: "ascii", content: NEOFETCH };
    case "ls":
      return { type: "info", content: "" };
    case "pwd":
      return { type: "info", content: "/home/web-wanderer" };
    case "uname":
      return {
        type: "info",
        content:
          arg === "-a"
            ? "CozyOS portfolio 1.0.0 Cozy Kernel Version 1.0.0 arm64"
            : "CozyOS",
      };

    case "cat":
      return {
        type: "cat-pre-fetch",
        content: "getting a cute cat for you...\n----",
      };
    case "cat-fetch":
      const res = await fetch("https://api.thecatapi.com/v1/images/search");
      const data = await res.json();
      return {
        type: "info",
        content: <CatOutput url={data[0]?.url} />,
      };

    default:
      return {
        type: "error",
        content: `Command not found: ${command}. Type "help" for available commands.`,
      };
  }
};
