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

  const latestCommand = commandHistory[commandHistory.length - 1] || "";

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
    case "egg":
    case "[egg]":
    case "easteregg":
    case "easter":
      return {
        type: "info",
        content: (
          <>
            🐣 Nice try! There are a bunch of easter egg commands hidden around
            here... hint: try <span className="highlight">'hi'</span> or '
            <span className="highlight">hobbies</span>'
          </>
        ),
      };

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
    case "yo":
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
              <li>star wars movies</li>
              <li>the mandalorian</li>
              <li>spiderman: into the spider-verse movies</li>
              <li>a bunch of anime</li>
            </ul>
          </>
        ),
      };

    case "music":
    case "artists":
      return {
        type: "info",
        content: (
          <>
            <p>
              i love listening & playing music! my favourite instrument is the{" "}
              <span className="highlight">piano</span>, and here are some of my
              favourite artists
            </p>
            <p>----</p>
            <ul>
              <li>linkin park</li>
              <li>three days grace</li>
              <li>paramore (especially their older albums)</li>
              <li>keshi</li>
              <li>rosé</li>
              <li>lauv</li>
              <li>voilà</li>
              <li>
                a bunch of others... think genres like rock, alternative,
                (indie) pop, lofi hip-hop & classical
              </li>
            </ul>
          </>
        ),
      };

    case "piano":
      window.open(
        "https://imkarin.github.io/pianogame/",
        "_blank",
        "noopener,noreferrer",
      );
      return {
        type: "success",
        content: (
          <div>
            Opened{" "}
            <a
              href="https://imkarin.github.io/pianogame/"
              target="_blank"
              rel="noopener noreferrer"
            >
              piano game
            </a>
            ! Did you learn something new? :)
          </div>
        ),
      };

    case "fun":
    case "hobbies":
    case "hobby":
      return {
        type: "info",
        content: (
          <>
            <p>
              in my free time, i dabble in a bunch of different hobbies. perhaps
              there are some <span className="highlight">easter eggs</span>{" "}
              hidden here? ;)
            </p>
            <p>----</p>
            <ul>
              <li>
                listening to & making <span className="highlight">music</span>
              </li>
              <li>drawing and painting</li>
              <li>
                tv <span className="highlight">shows</span> and movies
              </li>
              <li>
                manga and <span className="highlight">anime</span>
              </li>
              <li>gaming (mostly indie games and a few shooters)</li>
              <li>
                board games (yahtzee, chess - even though i'm pretty bad lol)
              </li>
              <li>walks and hikes in nature</li>
              <li>
                discovering cozy <span className="highlight">cafes</span>
              </li>
            </ul>
          </>
        ),
      };

    case "cafe":
    case "cafes":
    case "café":
    case "drink":
    case "drinks":
    case "menu":
      return {
        type: "info",
        content: (
          <>
            <p>
              i looove discovering cozy cafes and i'm a sucker for a good cup of
              tea. if you're looking for inspiration, here are some of my go-to
              drinks
            </p>
            <p>----</p>
            <ul>
              <li>
                matcha latte (<span className="highlight">+</span> strawberry
                syrup)
              </li>
              <li>jasmine milk tea</li>
              <li>oolong milk tea</li>
              <li>mango or strawberry milk/milk tea</li>
              <li>homemade lemonade with lemon, mint or ginger</li>
              <li>homemade iced teas</li>
              <li>chai latte</li>
              <li>hot chocolate</li>
            </ul>
          </>
        ),
      };

    case "gaming":
    case "games":
    case "game":
    case "videogame":
    case "videogames":
      return {
        type: "info",
        content: (
          <>
            <p>some of my all time favourite games</p>
            <p>----</p>
            <ul>
              <li>hollow knight (!!!)</li>
              <li>hollow knight silksong (!!!)</li>
              <li>stardew valley</li>
              <li>nier: automata</li>
              <li>portal 2</li>
              <li>hades</li>
              <li>dredge</li>
              <li>celeste</li>
              <li>peak</li>
              <li>valorant (love-hate relationship tbh)</li>
              <li>pubg</li>
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
      return {
        type: "info",
        content: (
          <HelpOutput expanded={args.includes("-all") || args.includes("-a")} />
        ),
      };
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

    // Yes/no reply
    // @ts-ignore - intentional fall through: if latestCommand doesn't match, no/yes should just return command not found
    case "yes":
      if (latestCommand.toLowerCase() === "piano") {
        // Question was: "Did you learn something new? :)"
        return {
          type: "info",
          content: "nice! hope you liked it :)",
        };
      }

    // @ts-ignore - intentional fall through: if latestCommand doesn't match, no/yes should just return command not found
    case "no":
      if (latestCommand.toLowerCase() === "piano") {
        // Question was: "Did you learn something new? :)"
        return {
          type: "info",
          content: "skill issue",
        };
      }
    default:
      return {
        type: "error",
        content: `Command not found: ${command}. Type "help" for available commands.`,
      };
  }
};

export default executeBuiltInCommand;
