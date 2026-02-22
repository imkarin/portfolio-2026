export const COMMAND_EXPLANATIONS: {
  [key: string]: { desc: string; example: string };
} = {
  about: {
    desc: "Get to know me :)",
    example: "about",
  },
  projects: {
    desc: "Show some projects I've worked on",
    example: "projects",
  },
  cat: {
    desc: "Get a cute cat image",
    example: "cat | meow",
  },
  dog: {
    desc: "Get a cute dog image",
    example: "dog | doge | doggo",
  },
  languages: {
    desc: "Languages I know",
    example: "languages",
  },
  github: {
    desc: "Open my Github profile",
    example: "github",
  },
  linkedin: {
    desc: "Open my LinkedIn profile",
    example: "linkedin",
  },
  email: {
    desc: "Get my email address",
    example: "email",
  },
  echo: {
    desc: "Print a text on the screen",
    example: "echo <your text here>",
  },
  date: {
    desc: "Show current date and time",
    example: "date",
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
  history: {
    desc: "Show the history of the commands you've used",
    example: "history",
  },
  theme: {
    desc: "Toggle theme",
    example: "theme",
  },
};
