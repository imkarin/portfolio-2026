export const EASTER_EGG_COMMANDS = [
  "[egg]",
  "egg",
  "easteregg",
  "easter",
  "hello",
  "hey",
  "hi",
  "yo",
  "bonjour",
  "anime",
  "tv",
  "shows",
  "series",
  "movies",
  "music",
  "artists",
  "piano",
  "fun",
  "hobby",
  "hobbies",
  "cafe",
  "cafes",
  "café",
  "drink",
  "drinks",
  "menu",
  "gaming",
  "videogames",
  "videogame",
  "games",
  "game",
  "rifurbish",
];

export const COMMAND_EXPLANATIONS: {
  [key: string]: { desc: string; example: string; important?: boolean };
} = {
  about: {
    desc: "Get to know me :)",
    example: "about",
    important: true,
  },
  projects: {
    desc: "Show some projects I've worked on",
    example: "projects",
    important: true,
  },
  cat: {
    desc: "Get a cute cat image",
    example: "cat | meow",
    important: true,
  },
  dog: {
    desc: "Get a cute dog image",
    example: "dog | doge | doggo",
    important: true,
  },
  languages: {
    desc: "Languages I know",
    example: "languages",
    important: true,
  },
  github: {
    desc: "Open my Github profile",
    example: "github",
    important: true,
  },
  linkedin: {
    desc: "Open my LinkedIn profile",
    example: "linkedin",
    important: true,
  },
  email: {
    desc: "Get my email address",
    example: "email",
    important: true,
  },
  history: {
    desc: "Show the history of the commands you've used",
    example: "history",
    important: true,
  },
  theme: {
    desc: "Toggle theme",
    example: "theme",
    important: true,
  },
  help: {
    desc: "Show available commands. Use 'help -all' to show all commands.",
    example: "help -all | help -a",
    important: true,
  },

  echo: {
    desc: "Print a text on the screen",
    example: "echo <your text here>",
  },
  date: {
    desc: "Show current date and time",
    example: "date",
  },
  uname: {
    desc: "Show system information",
    example: "uname -a",
  },
  neofetch: {
    desc: "Display system information but make it look cool",
    example: "neofetch",
  },
  clear: {
    desc: "Empty the screen",
    example: "clear",
  },
  "clear-history": {
    desc: "Clear the command history",
    example: "clear-history",
  },

  // whoami: {
  //   desc: "Show your username",
  //   example: "whoami",
  // },
  // pwd: {
  //   desc: "Show the directory you're currently in",
  //   example: "pwd",
  // },
  // ls: {
  //   desc: "List directory contents",
  //   example: "ls",
  // },
};
