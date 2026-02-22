import WelcomeOutput from "../components/TerminalOutput/outputs/WelcomeOutput/WelcomeOutput";
import { OutputItem } from "../types/types";
import { WELCOME_ASCII } from "./ascii";

export const initialOutputHistory: OutputItem[] = [
  {
    type: "welcome-ascii",
    content: WELCOME_ASCII,
  },
  {
    type: "info",
    content: <WelcomeOutput />,
  },
];
