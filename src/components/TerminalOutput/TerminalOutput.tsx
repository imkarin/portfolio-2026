import { useRef, useEffect } from "react";
import { OutputItem } from "../../types/types";
import "./TerminalOutput.css";

interface TerminalOutputProps {
  outputHistory: OutputItem[];
}

const TerminalOutput = ({ outputHistory }: TerminalOutputProps) => {
  const outputRef = useRef<HTMLDivElement>(null);
  const outputLinesWrapperRef = useRef<HTMLDivElement>(null);

  // UseEffect on load: resize observer for outputLinesWrapper ref, that scrolls to bottom when output height changeß
  useEffect(() => {
    if (!outputLinesWrapperRef.current || !outputRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    });

    resizeObserver.observe(outputLinesWrapperRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [outputLinesWrapperRef.current, outputRef.current]);

  const renderLine = (item: OutputItem, index: number) => {
    if (item.type === "input") {
      return (
        <div key={index} className="terminal-line input-line">
          <div className="prompt">
            <span className="prompt-symbol">○</span>
            <span className="prompt-path">~</span>
            <span className="prompt-divider">›</span>
          </div>
          <span>{item.content}</span>
        </div>
      );
    }

    if (!item.content && item.type !== "clear") return null;

    if (item.type === "welcome-ascii") {
      return (
        <pre key={index} className="terminal-line welcome-ascii">
          {item.content}
        </pre>
      );
    }

    const className = `terminal-line ${
      item.type === "error"
        ? "error-line"
        : item.type === "info"
          ? "info-line"
          : item.type === "success"
            ? "success-line"
            : ""
    }`;

    return (
      <pre key={index} className={className}>
        {item.content}
      </pre>
    );
  };

  return (
    <section className="terminal-output" ref={outputRef}>
      <div className="output-lines-wrapper" ref={outputLinesWrapperRef}>
        {outputHistory.map((item, index) => renderLine(item, index))}
      </div>
    </section>
  );
};

export default TerminalOutput;
