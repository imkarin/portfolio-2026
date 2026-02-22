import { COMMAND_EXPLANATIONS } from "../../../../constants/command-explanations";
import "./HelpOutput.css";

const HelpOutput = () => {
  const cmds = Object.entries(COMMAND_EXPLANATIONS).map(([cmd, info]) => ({
    name: cmd,
    ...info,
  }));
  return (
    <table className="help-table">
      <thead>
        <tr>
          <th>Command</th>
          <th>Description</th>
          <th>Example</th>
        </tr>
      </thead>

      <tbody>
        {/* Map over cmds for rows */}
        {cmds.map(({ name, desc, example }) => (
          <tr key={name}>
            <td className="help-command">{name}</td>
            <td className="help-description">{desc}</td>
            <td className="help-example">{example}</td>
          </tr>
        ))}
        <tr>
          <td className="help-command">[egg]</td>
          <td className="help-description">
            ... and perhaps a few too many easter eggs
          </td>
          <td className="help-example">hint: tv</td>
        </tr>
      </tbody>
    </table>
  );
};

export default HelpOutput;
