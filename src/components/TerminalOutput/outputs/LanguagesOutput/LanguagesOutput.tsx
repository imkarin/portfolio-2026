import "./LanguagesOutput.css";

const languages = [
  { name: "Dutch", proficiency: "100%" },
  { name: "English", proficiency: "100%" },
  { name: "Spanish", proficiency: "70%" },
  { name: "German", proficiency: "50%" },
  { name: "French", proficiency: "40%" },
  { name: "Gen-z language", proficiency: "0%" },

  { name: "TypeScript", proficiency: "90%" },
  { name: "JavaScript", proficiency: "90%" },
  { name: "HTML5/CSS3", proficiency: "95%" },
  { name: "Python", proficiency: "50%" },

  { name: "Meme speak", proficiency: "90%" },
  { name: "Japanese", proficiency: "1% [learning]" },
];

const LanguagesOutput = () => {
  return (
    <div className="languages">
      <p>
        i'm a huge language nerd. i'm always trying to learn new ones - but a
        bunch of them i only speak a little, and didn't make it to this list.
        here are the ones i do feel comfortable with:
      </p>
      <p>----</p>
      <table className="languages-table">
        <tbody>
          {languages.map((language) => (
            <tr key={language.name}>
              <td>{language.name}</td>
              <td>- {language.proficiency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LanguagesOutput;
