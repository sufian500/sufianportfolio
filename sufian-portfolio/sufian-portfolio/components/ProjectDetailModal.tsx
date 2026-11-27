"use client";
import { useEffect, useRef } from "react";
import { ArrowLeft, ExternalLink, Play, X } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import type { Project } from "@/data/types";
import { careers } from "@/data/skills";
import { StatusBadge } from "./ProjectCard";

function List({ title, items }: { title: string; items?: string[] }) {
  if (!items || !items.length) return null;
  return (
    <div className="m-section">
      <h3>{title}</h3>
      <ul>
        {items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ProjectDetailModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (project && !d.open) d.showModal();
    if (!project && d.open) d.close();
  }, [project]);

  const p = project;
  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby="m-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      {p && (
        <>
          <button className="m-close" type="button" onClick={onClose} aria-label="Close project details">
            <X size={22} />
          </button>
          <div className="m-hero" style={{ background: p.banner ? `url(${p.banner}) center/cover` : p.theme }}>
            {p.logo && <img className="m-logo" src={p.logo} alt="" width={64} height={64} />}
            <div className="m-meta">
              <StatusBadge status={p.status} />
              <span>{p.categoryLabel ?? p.category}</span>
            </div>
            <h2 id="m-title">{p.title}</h2>
            <div className="btn-row">
              {p.liveUrl && (
                <a className="btn btn-white" href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Play size={18} fill="currentColor" /> View live project
                </a>
              )}
              {p.demoUrl && (
                <a className="btn btn-grey" href={p.demoUrl} target="_blank" rel="noopener noreferrer">
                  <Play size={18} /> Watch demo
                </a>
              )}
              {p.githubUrl && (
                <a className="btn btn-grey" href={p.githubUrl} target="_blank" rel="noopener noreferrer">
                  <GithubIcon size={18} /> View GitHub
                </a>
              )}
              <button className="btn btn-outline" type="button" onClick={onClose}>
                <ArrowLeft size={18} /> Back to projects
              </button>
            </div>
            {p.liveNote && <p style={{ margin: "10px 0 0", fontSize: 14, color: "#d4d4d8" }}>{p.liveNote}</p>}
          </div>

          <div className="m-body">
            <div>
              <div className="m-meta">
                {p.date && <span className="match">{p.date}</span>}
                {p.industry && <span>{p.industry}</span>}
              </div>
              <p style={{ color: "#e4e4e7", fontSize: 17 }}>{p.description}</p>
              {p.confidential && <div className="conf">Confidential client work. Only a general overview and technologies are shown. No client details, architecture or data.</div>}
              {p.problem && (
                <div className="m-section">
                  <h3>Business problem</h3>
                  <p>{p.problem}</p>
                </div>
              )}
              <List title="Objectives" items={p.objectives} />
              <List title="My contribution" items={p.contribution} />
              {p.requirements && p.requirements.length > 0 && (
                <div className="m-section">
                  <h3>Requirements and analysis</h3>
                  <div className="req">
                    {p.requirements.map((b) => (
                      <div key={b.label}>
                        <h4>{b.label}</h4>
                        <ul>{b.items.map((x) => <li key={x}>{x}</li>)}</ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {p.design && p.design.length > 0 && (
                <div className="m-section">
                  <h3>System design</h3>
                  <div className="req">
                    {p.design.map((b) => (
                      <div key={b.label}>
                        <h4>{b.label}</h4>
                        <ul>{b.items.map((x) => <li key={x}>{x}</li>)}</ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <List title="Key features" items={p.features} />
              {p.screenshots && p.screenshots.length > 0 && (
                <div className="m-section">
                  <h3>Screenshots</h3>
                  <div className="gallery">
                    {p.screenshots.map((s) => (
                      <img key={s.src} src={s.src} alt={s.alt} loading="lazy" />
                    ))}
                  </div>
                </div>
              )}
              <List title="Results and outcomes" items={p.outcomes} />
              <List title="Challenges and learning" items={p.challenges} />
            </div>
            <dl className="m-side">
              {p.role && (
                <>
                  <dt>My role</dt>
                  <dd>{p.role}</dd>
                </>
              )}
              {p.technologies.length > 0 && (
                <>
                  <dt>Technologies</dt>
                  <dd className="tags">{p.technologies.map((t) => <span key={t}>{t}</span>)}</dd>
                </>
              )}
              <dt>Relevant careers</dt>
              <dd>{careers.filter((c) => p.careers.includes(c.id)).map((c) => c.label).join(", ")}</dd>
              {p.liveUrl && (
                <>
                  <dt>Live link</dt>
                  <dd>
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                      {p.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")} <ExternalLink size={14} />
                    </a>
                  </dd>
                </>
              )}
            </dl>
          </div>
        </>
      )}
    </dialog>
  );
}
