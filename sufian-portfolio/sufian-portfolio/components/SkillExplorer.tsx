"use client";
import { useState } from "react";
import type { Project } from "@/data/types";
import { skillGroups, skills } from "@/data/skills";
import { allProjects } from "@/data/projects";
import { StatusBadge } from "./ProjectCard";

export default function SkillExplorer({ onOpen }: { onOpen: (p: Project) => void }) {
  const visible = skills.filter((s) => s.show);
  const [sel, setSel] = useState(visible.find((s) => s.name === "Power BI")?.name ?? visible[0]?.name);
  const s = visible.find((x) => x.name === sel);
  const linked = s ? (s.projects.map((id) => allProjects.find((p) => p.id === id)).filter(Boolean) as Project[]) : [];

  return (
    <section id="skills" className="section gut" aria-labelledby="skills-h">
      <div className="section-head">
        <div>
          <h2 id="skills-h" className="big-title">Unlock my skills</h2>
          <p>Click a skill to see where I have used it.</p>
        </div>
      </div>
      <div className="skill-lib">
        <div>
          {skillGroups.map((g) => {
            const list = visible.filter((x) => x.group === g);
            if (!list.length) return null;
            return (
              <div className="skill-group" key={g}>
                <h3>{g}</h3>
                <div className="skill-btns">
                  {list.map((x) => (
                    <button key={x.name} type="button" className="skill-btn" aria-pressed={sel === x.name} aria-controls="skill-panel" onClick={() => setSel(x.name)}>
                      {x.name}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        {s && (
          <aside className="skill-panel" id="skill-panel" aria-live="polite">
            <h3>{s.name}</h3>
            <p style={{ margin: 0, color: "#d8d8dc" }}>{s.description}</p>
            {s.applications.length > 0 && (
              <>
                <h4>Practical applications</h4>
                <ul>{s.applications.map((a) => <li key={a}>{a}</li>)}</ul>
              </>
            )}
            <h4>Relevant projects</h4>
            {linked.length ? (
              linked.map((p) => (
                <button key={p.id} type="button" className="mini" onClick={() => onOpen(p)}>
                  <span className="sw" style={{ background: p.theme }} aria-hidden="true" />
                  <span style={{ display: "grid", gap: 4 }}>
                    <strong style={{ fontSize: 14 }}>{p.title.split(":")[0]}</strong>
                    <StatusBadge status={p.status} />
                  </span>
                </button>
              ))
            ) : (
              <p style={{ margin: 0, color: "var(--mute)", fontSize: 14 }}>Studied at university. A portfolio project is planned.</p>
            )}
            {s.related.length > 0 && (
              <>
                <h4>Related technologies</h4>
                <div className="tags">{s.related.map((r) => <span key={r}>{r}</span>)}</div>
              </>
            )}
          </aside>
        )}
      </div>
    </section>
  );
}
