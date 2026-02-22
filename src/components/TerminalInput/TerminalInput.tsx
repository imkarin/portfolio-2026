import { ChangeEvent, KeyboardEvent, FormEvent } from "react";
import Prompt from "../Prompt/Prompt";
import "./TerminalInput.css";
import { useTerminalContext } from "../../context/terminal-context";
import { initialOutputHistory } from "../../constants/output-histories";

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
  const { outputHistory } = useTerminalContext();
  const outputHistoryWithoutWelcomeMsg = outputHistory.filter(
    (entry) => !initialOutputHistory.includes(entry),
  );

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
        placeholder={
          outputHistoryWithoutWelcomeMsg.length === 0
            ? "type a command here"
            : ""
        }
      />
    </form>
  );
};

export default TerminalInput;
