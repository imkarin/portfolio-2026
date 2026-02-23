import "./AboutOutput.css";

const AboutOutput = () => {
  return (
    <div className="about-wrapper">
      <h2>Nice meeting ya :)</h2>
      <p>
        Hi! I'm Karin, a software developer with a passion for combining
        creativity & tech! I have over 8 years of experience as a developer of
        all kinds, but my specialty is web development. In my free time, I love
        gaming, making music, reading and venturing out in nature. Thanks for
        checking out my portfolio! (づ｡◕ <span className="emoji-mouth">‿‿</span>{" "}
        ◕｡)づ
      </p>

      <section className="languages">
        <h3>Languages</h3>
        <ul>
          <li>
            <span>Programming:</span>
          </li>
          <li>Typescript</li>
          <li>HTML5</li>
          <li>CSS3</li>
          <li>Python</li>
          <li>C#</li>
          <li>C/C++</li>
        </ul>
        <ul>
          <li>
            <span>Human:</span>
          </li>
          <li>Dutch</li>
          <li>English</li>
          <li>Spanish</li>
          <li>German</li>
          <li>French</li>
        </ul>
      </section>

      <section className="experience">
        <h3>Experience</h3>
        <div className="experience">
          <p>
            <span>Title:</span> Full-Stack Engineer{" "}
            <span className="company">@Schiphol Airport</span>
          </p>
          <p>
            <span>Description:</span>
            <ul>
              <li>
                Developed and maintained Deep Turnaround software: an internal
                tool used by several airports worldwide, to manage turnaround
                operations efficiently by monitoring the events of airplane
                turnarounds using camera's & AI.
              </li>
              <li>
                Maintained and developed new features for Schiphol's internal
                cargo system, used by various stakeholders in the cargo industry
                to import and export of goods.
              </li>
            </ul>
          </p>
          <p className="more-experience">
            To see all my work experience, please check out my{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://linkedin.com/in/karin-meijvogel"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      </section>

      <section className="education">
        <h3>Education</h3>
        <ul>
          <li>
            <span>Institute:</span> Hogeschool van Amsterdam
          </li>
          <li>
            <span>Education:</span> Communicaton & Multimedia Design
          </li>
          <li>
            <span>Degree:</span> Bachelor of Science
          </li>
        </ul>
      </section>
    </div>
  );
};

export default AboutOutput;
