import { ReactNode } from "react";

type OutputType =
  | "welcome-ascii"
  | "info"
  | "error"
  | "success"
  | "input"
  | "clear"
  | "ascii"
  | "cat-pre-fetch"
  | "dog-pre-fetch"
  | "history-repeat-cmd";

export interface OutputItem {
  type: OutputType;
  content?: ReactNode;
}

export interface CommandResult extends OutputItem {
  shouldSetInput?: boolean;
}
