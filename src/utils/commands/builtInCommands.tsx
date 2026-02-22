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
  let [command, ...args] = trimmed.split(" ");
  const arg = args.join(" ");

  if (trimmed === "tv shows" || trimmed === "tv series") {
    command = trimmed;
  }
  console.log("command", command);
  switch (command.toLowerCase()) {
    // Personalized commands
    case "rifurbish":
      return {
        type: "info",
        content: (
          <>
            hi <span className="highlight">Rifurbish</span>! thanks for taking a
            look at my silly lil' site :)
          </>
        ),
      };

    // Easter eggs
    case "hi":
      const catOrDog = Math.random() < 0.5 ? "cat" : "dog";
      return {
        type: "info",
        content: (
          <img
            src={
              catOrDog === "cat"
                ? "https://c.tenor.com/V63KyNY_beIAAAAC/tenor.gif"
                : "https://c.tenor.com/hfOsQwdPcyMAAAAd/tenor.gif"
            }
          />
        ),
      };
    case "hello":
      return {
        type: "info",
        content: <img src="https://c.tenor.com/Tsob5aHiS3UAAAAC/tenor.gif" />,
      };
    case "hey":
      return {
        type: "info",
        content: (
          <>
            <img src="https://c.tenor.com/CQ1MQ0t6fn8AAAAC/tenor.gif" />
            <p>sealutations</p>
          </>
        ),
      };
    case "bonjour":
      return {
        type: "info",
        content: <img src="/bonjour_bear.jpg" />,
      };
    case "anime":
      return {
        type: "info",
        content: (
          <>
            <p>i'm so glad you asked!! here are some of my favourite anime</p>
            <p>----</p>
            <ul>
              <li>spy x family</li>
              <li>apothecary diaries</li>
              <li>death note</li>
              <li>your lie in april</li>
              <li>frieren</li>
              <li>tokyo ghoul</li>
              <li>solo leveling</li>
              <li>chainsaw man</li>
              <li>dandadan</li>
              <li>jujutsu kaisen</li>
              <li>demon slayer</li>
              <li>durarara!!</li>
              <li>dog & scissors</li>
              <li>and manyyyy more...</li>
            </ul>
          </>
        ),
      };
    case "shows":
    case "movies":
    case "series":
    case "tv series":
    case "tv shows":
    case "tv":
      return {
        type: "info",
        content: (
          <>
            <p>
              you found my shows & movies collection! here are some of my
              favourites
            </p>
            <p>----</p>
            <ul>
              <li>arcane</li>
              <li>the pitt</li>
              <li>the good doctor</li>
              <li>dark (netflix series)</li>
              <li>ATLA</li>
              <li>ghibli movies</li>
              <li>the accountant</li>
              <li>spiderman: into the spider-verse movies</li>
              <li>a bunch of anime</li>
            </ul>
          </>
        ),
      };

    // Main commands
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
