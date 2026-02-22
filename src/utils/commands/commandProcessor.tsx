import AboutOutput from "../../components/TerminalOutput/outputs/AboutOutput/AboutOutput";
import ImageFetchOutput from "../../components/TerminalOutput/outputs/ImageFetchOutput/ImageFetchOutput";
import HelpOutput from "../../components/TerminalOutput/outputs/HelpOutput/HelpOutput";
import LanguagesOutput from "../../components/TerminalOutput/outputs/LanguagesOutput/LanguagesOutput";
import ProjectsOutput from "../../components/TerminalOutput/outputs/ProjectsOutput/ProjectsOutput";
import { NEOFETCH } from "../../constants/ascii";
import { CommandResult, OutputItem } from "../../types/types";
import executeBuiltInCommand from "./builtInCommands";

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

  // After "dog" (or "cat") command is entered, the output type will be "dog-pre-fetch":
  // 1. We add this to OutputHistory, to show the loading message,
  // 2. then we execute the "dog-fetch" command to get the actual dog image,
  // 3. and update the OutputHistory with the dog image output after we get the response from the API
  // We don't add "dog-fetch" to the OutputHistory, because it doesn't need to be rendered in the terminal
  if (output.type.includes("pre-fetch")) {
    const fetchCommand = output.type.replace("pre-fetch", "fetch");
    output = await executeBuiltInCommand(
      fetchCommand,
      commandHistory,
      clearCommandHistory,
      toggleTheme,
    );
    // Add the fetched image to the output history, so that it gets rendered in the terminal
    addToOutputHistory({ type: output.type, content: output.content });
  }

  addToCommandHistory(input);
};
