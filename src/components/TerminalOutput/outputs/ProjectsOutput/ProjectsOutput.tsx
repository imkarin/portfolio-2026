import "./ProjectsOutput.css";

const projects = [
  {
    name: "Mottorijschool Stelvio",
    desc: "Web development, design, and SEO - Improved SEO rankings from 0 to top 3 for all major keywords, resulting in a significant increase in website traffic and customer inquiries",
    link: { href: "https://stelvio.vercel.app", text: "stelvio website" },
  },
  {
    name: "Rock-paper-scissors (AI)",
    desc: "Trained a neural network to recognize hand gestures for rock, paper, and scissors using TensorFlow.js.",
    link: {
      href: "https://github.com/imkarin/rock-paper-scissors",
      text: "rock-paper-scissors",
    },
  },
  {
    name: "EasyVoip",
    desc: "Web development, design and illustrations",
    link: { href: "https://easyvoip.nl", text: "easyvoip.nl" },
  },
  {
    name: "Stardew Valley Tracker",
    desc: "Handy tool for Stardew Valley players to track their progress in completing their game",
    link: {
      href: "https://stardew.karins.cafe",
      text: "SDV Bundle Tracker",
    },
  },
  { name: "\n" },
  {
    name: "And lots more...",
    desc: "I've worked for several companies on many different projects, both internal and client-facing. Please check out my LinkedIn for more details, or feel free to reach out to me :)",
    link: {
      href: "https://www.linkedin.com/in/karin-meijvogel/",
      text: "linkedin",
    },
  },
];

const ProjectsOutput = () => {
  return (
    <div className="projects">
      <p>
        here's some projects I've worked on. most of my work experience can be
        found on my{" "}
        <a
          href="https://linkedin.com/in/karin-meijvogel"
          target="_blank"
          rel="noopener noreferrer"
        >
          linkedin
        </a>{" "}
        though. if you'd like to know more, don't hesitate to reach out
      </p>
      <p>----</p>
      <table className="projects-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((language) => (
            <tr key={language.name}>
              <td className="name">{language.name}</td>

              {language.desc && <td>{language.desc}</td>}

              {language.link && (
                <td>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={language.link.href}
                  >
                    {language.link.text}
                  </a>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsOutput;
