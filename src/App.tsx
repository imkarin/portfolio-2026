import Terminal from "./components/Terminal/Terminal";
import { TerminalProvider } from "./context/terminal-context";

function App() {
  return (
    <TerminalProvider>
      <Terminal />
    </TerminalProvider>
  );
}

export default App;
