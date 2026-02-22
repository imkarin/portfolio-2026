import { ChangeEvent, KeyboardEvent, FormEvent, useRef } from "react";
import Prompt from "../Prompt/Prompt";
import "./TerminalInput.css";
import { useTerminalContext } from "../../context/terminal-context";
import { initialOutputHistory } from "../../constants/output-histories";
import { EASTER_EGG_COMMANDS } from "../../constants/command-explanations";

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

  const inputRef = useRef<HTMLInputElement>(null);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    const val = e.target.value.toLowerCase();

    const detectedEasterEgg = EASTER_EGG_COMMANDS.find((command) =>
      val.includes(command),
    );

    // Check if input value includes any of the easter egg commands and change text color
    if (detectedEasterEgg) {
      const indexInInputVal = val.indexOf(detectedEasterEgg);

      if (indexInInputVal === 0) {
        if (inputRef.current) {
          inputRef.current.classList.add("rainbow");
        }
      }
    } else {
      if (inputRef.current) {
        inputRef.current.classList.remove("rainbow");
      }
    }
  };

  return (
    <form className="terminal-input-line" onSubmit={onSubmit}>
      <Prompt />
      <input
        type="text"
        className="terminal-input"
        value={value}
        ref={inputRef}
        onChange={onInputChange}
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
