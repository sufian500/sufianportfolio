import { Download } from "lucide-react";
import { experience, profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups, skills } from "@/data/skills";

export function AboutSection() {
  return (
    <section id="about" className="section gut" aria-labelledby="about-h">
      <div className="section-head">
        <h2 id="about-h" className="big-title">About me</h2>
      </div>
      <div className="about">
        <div>
          {profile.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <h3 style={{ margin: "24px 0 10px", fontSize: 18 }}>Education</h3>
          {profile.education.map((e) => (
            <div key={e.title} className="job" style={{ gridTemplateColumns: "minmax(0,1fr)" }}>
              <div>
                <h3>{e.title}</h3>
                <div className="org">
                  {e.org} · {e.date}
                </div>
                <p style={{ margin: 0 }}>{e.note}</p>
              </div>
            </div>
          ))}
          {profile.certifications.length > 0 && (
            <>
              <h3 style={{ margin: "24px 0 10px", fontSize: 18 }}>Certifications</h3>
              <ul>{profile.certifications.map((c) => <li key={c.name}>{c.name}, {c.issuer}, {c.date}</li>)}</ul>
            </>
          )}
          {profile.development.length > 0 && (
            <>
              <h3 style={{ margin: "24px 0 10px", fontSize: 18 }}>Professional development</h3>
              <ul>{profile.development.map((c) => <li key={c}>{c}</li>)}</ul>
            </>
          )}
        </div>
        <dl className="facts">
          <div><dt>Name</dt><dd>{profile.name}</dd></div>
          <div><dt>Headline</dt><dd>{profile.title}</dd></div>
          <div><dt>Location</dt><dd>{profile.location}</dd></div>
          <div><dt>Work rights</dt><dd className="ok">{profile.workRights}</dd></div>
          <div><dt>Availability</dt><dd>{profile.availability}</dd></div>
          <div><dt>Career interests</dt><dd>{profile.careerInterests.join(", ")}</dd></div>
          <div><dt>Technical skills</dt><dd>{skills.filter((s) => s.show).slice(0, 12).map((s) => s.name).join(", ")}</dd></div>
        </dl>
      </div>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="section gut" aria-labelledby="exp-h">
      <div className="section-head">
        <div>
          <h2 id="exp-h" className="big-title">Professional experience</h2>
          <p>Hands on work in operations, business analysis and technology.</p>
        </div>
      </div>
      <div className="timeline">
        {experience.map((j) => (
          <article className="job" key={j.role}>
            <div>
              <div className="when">{j.date}</div>
              <span className="type">{j.type}</span>
            </div>
            <div>
              <h3>{j.role}</h3>
              <div className="org">{j.org}</div>
              <ul>{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
              <div className="tags">{j.skills.map((s) => <span key={s}>{s}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ResumeSection() {
  return (
    <section id="resume" className="section gut" aria-labelledby="resume-h">
      <div className="section-head">
        <div>
          <h2 id="resume-h" className="big-title">Resume</h2>
          <p>The short version. Download the full PDF for applications.</p>
        </div>
        {profile.resumePdf && (
          <a className="btn btn-red" href={profile.resumePdf} download="Sufian_Sayed_Resume.pdf">
            <Download size={18} /> Download CV
          </a>
        )}
      </div>
      <div className="resume">
        <div className="box">
          <h3>Professional summary</h3>
          <p style={{ margin: 0, color: "#d8d8dc" }}>
            Business Information Systems graduate from Curtin University (2026) who turns operational data into decisions. Analyses sales, KPIs and cost variance in Power BI and Microsoft Fabric, helps build an AI platform on AWS, and was Scrum Master, Communication Manager and one of the main developers of the live EARS web app.
          </p>
        </div>
        <div className="box">
          <h3>Education</h3>
          <ul>{profile.education.map((e) => <li key={e.title}>{e.title}, {e.org}, {e.date}</li>)}</ul>
          {profile.certifications.length > 0 && (
            <>
              <h3 style={{ marginTop: 16 }}>Certifications</h3>
              <ul>{profile.certifications.map((c) => <li key={c.name}>{c.name}, {c.issuer}</li>)}</ul>
            </>
          )}
        </div>
        <div className="box">
          <h3>Experience</h3>
          <ul>{experience.map((j) => <li key={j.role}>{j.role}, {j.org.split(",")[0]} ({j.date})</li>)}</ul>
        </div>
        <div className="box">
          <h3>Projects</h3>
          <ul>{projects.map((p) => <li key={p.id}>{p.title.split(":")[0]} ({p.status})</li>)}</ul>
        </div>
        <div className="box" style={{ gridColumn: "1 / -1" }}>
          <h3>Technical skills</h3>
          <ul>
            {skillGroups.map((g) => {
              const l = skills.filter((s) => s.show && s.group === g);
              return l.length ? <li key={g}><strong>{g}:</strong> {l.map((s) => s.name).join(", ")}</li> : null;
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
