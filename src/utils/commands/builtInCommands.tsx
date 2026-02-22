import AboutOutput from "../../components/TerminalOutput/outputs/AboutOutput/AboutOutput";
import HelpOutput from "../../components/TerminalOutput/outputs/HelpOutput/HelpOutput";
import ImageFetchOutput from "../../components/TerminalOutput/outputs/ImageFetchOutput/ImageFetchOutput";
import LanguagesOutput from "../../components/TerminalOutput/outputs/LanguagesOutput/LanguagesOutput";
import ProjectsOutput from "../../components/TerminalOutput/outputs/ProjectsOutput/ProjectsOutput";
import { NEOFETCH } from "../../constants/ascii";
import { CommandResult } from "../../types/types";

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
    case "meow":
      return {
        type: "cat-pre-fetch",
        content: "getting a cute cat for you...\n----",
      };
    case "cat-fetch":
      const resCat = await fetch("https://api.thecatapi.com/v1/images/search");
      const dataCat = await resCat.json();
      return {
        type: "info",
        content: <ImageFetchOutput topic="cat" url={dataCat[0]?.url} />,
      };

    case "dog":
    case "doge":
    case "doggo":
      return {
        type: "dog-pre-fetch",
        content: "getting a cute dog for you...\n----",
      };
    case "dog-fetch":
      const resDog = await fetch("https://dog.ceo/api/breeds/image/random");
      const dataDog = await resDog.json();
      return {
        type: "info",
        content: <ImageFetchOutput topic="dog" url={dataDog?.message} />,
      };

    default:
      return {
        type: "error",
        content: `Command not found: ${command}. Type "help" for available commands.`,
      };
  }
};

export default executeBuiltInCommand;
