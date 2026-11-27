"use client";
import { Info, Play } from "lucide-react";
import type { Project } from "@/data/types";

export function StatusBadge({ status }: { status: Project["status"] }) {
  return (
    <span className={`status s-${status.replace(" ", "-")}`}>
      <i aria-hidden="true" />
      {status}
    </span>
  );
}

export function Poster({ p, big = false }: { p: Project; big?: boolean }) {
  const img = big ? p.banner ?? p.thumbnail : p.thumbnail;
  const glyph = p.title.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase();
  return (
    <div className="poster" style={{ background: p.theme }}>
      {img && <img className="shot" src={img} alt="" loading="lazy" />}
      {!img && (
        <span className="glyph" aria-hidden="true">
          {glyph}
        </span>
      )}
      <div className="poster-top">
        {p.logo ? <img className="poster-logo" src={p.logo} alt={`${p.title.split(":")[0]} logo`} width={32} height={32} /> : <span className="poster-mark" aria-hidden="true">S.</span>}
        <StatusBadge status={p.status} />
      </div>
      <h4>{p.title.split(":")[0]}</h4>
    </div>
  );
}

export default function ProjectCard({ p, onOpen }: { p: Project; onOpen: (p: Project) => void }) {
  const demo = p.demoUrl ?? p.liveUrl;
  return (
    <article className="card">
      <button className="card-open" type="button" onClick={() => onOpen(p)} aria-label={`${p.title}. ${p.status}. View details`}>
        <Poster p={p} />
      </button>
      <div className="card-body">
        <div className="card-meta">
          {p.categoryLabel && <b>{p.categoryLabel}</b>}
          {!p.categoryLabel && <b>{p.category}</b>}
          {p.date && <span>{p.date}</span>}
        </div>
        <p>{p.tagline}</p>
        <div className="card-more">
          <div>
            {p.technologies.length > 0 && (
              <div className="tags">
                {p.technologies.slice(0, 5).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            )}
            <div className="card-actions">
              {demo && (
                <a className="round play" href={demo} target="_blank" rel="noopener noreferrer" aria-label={`Play demo of ${p.title}`}>
                  <Play size={16} fill="currentColor" />
                </a>
              )}
              <button className="round" type="button" onClick={() => onOpen(p)} aria-label={`View details of ${p.title}`}>
                <Info size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
