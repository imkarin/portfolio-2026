import { ChangeEvent, KeyboardEvent, FormEvent } from "react";
import Prompt from "../Prompt/Prompt";
import "./TerminalInput.css";

interface TerminalInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
}

const TerminalInput = ({
  value,
  onChange,
  onKeyDown,
  onSubmit,
}: TerminalInputProps) => {
  return (
    <form className="terminal-input-line" onSubmit={onSubmit}>
      <Prompt />
      <input
        type="text"
        className="terminal-input"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        onKeyDown={onKeyDown}
        autoFocus
        spellCheck={false}
        autoComplete="off"
        placeholder="type a command here..."
      />
    </form>
  );
};

export default TerminalInput;
