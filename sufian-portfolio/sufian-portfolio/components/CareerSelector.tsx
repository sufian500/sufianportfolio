"use client";
import { useState } from "react";
import type { CareerId, Project } from "@/data/types";
import { careers } from "@/data/skills";
import { projects, conceptProjects } from "@/data/projects";
import ProjectCarousel from "./ProjectCarousel";

export default function CareerSelector({ onOpen }: { onOpen: (p: Project) => void }) {
  const [id, setId] = useState<CareerId>("ba");
  const c = careers.find((x) => x.id === id)!;
  const real = projects.filter((p) => p.careers.includes(id));
  const planned = conceptProjects.filter((p) => p.careers.includes(id));
  return (
    <section id="careers" className="section" aria-labelledby="careers-h">
      <div className="gut">
        <div className="section-head">
          <div>
            <h2 id="careers-h" className="big-title">Explore my work by career</h2>
            <p>Pick the role you are hiring for. Projects and skills reorder to match.</p>
          </div>
        </div>
        <div className="chips" role="group" aria-label="Choose a career path">
          {careers.map((x) => (
            <button key={x.id} type="button" className="chip" aria-pressed={id === x.id} onClick={() => setId(x.id)}>
              {x.label}
            </button>
          ))}
        </div>
        <p className="career-note">{c.blurb}</p>
        <div className="career-skills" aria-label={`Key skills for ${c.label}`}>
          {c.skills.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
      <div aria-live="polite">
        <ProjectCarousel id="career-real" title={`Recommended for ${c.label}`} items={real} onOpen={onOpen} />
        <ProjectCarousel id="career-planned" title="Planned for this path" note="Concept" items={planned} onOpen={onOpen} />
      </div>
    </section>
  );
}
