"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/data/types";
import ProjectCard from "./ProjectCard";

export default function ProjectCarousel({ id, title, note, items, onOpen }: { id: string; title: string; note?: string; items: Project[]; onOpen: (p: Project) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  if (!items.length) return null;
  const go = (dir: number) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };
  return (
    <section className="row gut" id={id} aria-labelledby={`${id}-h`}>
      <h3 id={`${id}-h`}>
        {title} {note && <small>{note}</small>}
      </h3>
      <div className="track-wrap">
        <button className="arrow l" type="button" onClick={() => go(-1)} aria-label={`Scroll ${title} left`}>
          <ChevronLeft size={30} />
        </button>
        <div
          className="track"
          ref={ref}
          tabIndex={0}
          role="region"
          aria-label={`${title}, scrollable`}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
            if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
          }}
        >
          {items.map((p) => (
            <ProjectCard key={p.id} p={p} onOpen={onOpen} />
          ))}
        </div>
        <button className="arrow r" type="button" onClick={() => go(1)} aria-label={`Scroll ${title} right`}>
          <ChevronRight size={30} />
        </button>
      </div>
    </section>
  );
}
