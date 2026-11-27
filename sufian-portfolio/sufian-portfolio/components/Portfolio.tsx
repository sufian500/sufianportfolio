"use client";
import { useCallback, useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import type { Project } from "@/data/types";
import { allProjects } from "@/data/projects";
import { profile } from "@/data/profile";
import Navbar from "./Navbar";
import HeroBanner from "./HeroBanner";
import ProjectsExplorer from "./ProjectsExplorer";
import ProjectDetailModal from "./ProjectDetailModal";
import CareerSelector from "./CareerSelector";
import SkillExplorer from "./SkillExplorer";
import ContactSection from "./ContactSection";
import { AboutSection, ExperienceSection, ResumeSection } from "./Sections";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

const RECENT_KEY = "sufian-recent";

export default function Portfolio() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Project | null>(null);
  const [recent, setRecent] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    try {
      const r = JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
      if (Array.isArray(r)) setRecent(r.filter((x) => typeof x === "string").slice(0, 8));
    } catch {}
    const t = setTimeout(() => setLoading(false), 700);
    const onScroll = () => setShowTop(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Deep link: /#project=ears opens that project
    const m = location.hash.match(/^#project=([\w-]+)/);
    if (m) {
      const p = allProjects.find((x) => x.id === m[1]);
      if (p) setOpen(p);
    }
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const onOpen = useCallback((p: Project) => {
    setOpen(p);
    if (p.status === "Concept") return;
    setRecent((prev) => {
      const next = [p.id, ...prev.filter((x) => x !== p.id)].slice(0, 8);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  return (
    <>
      <div className={`loader ${loading ? "" : "done"}`} aria-hidden={!loading}>
        <div className="wordmark">
          SUFIAN<span className="dot">.</span>
        </div>
      </div>
      <a href="#projects" className="sr-only">
        Skip to projects
      </a>
      <Navbar query={query} setQuery={setQuery} />
      <main>
        <HeroBanner />
        <ProjectsExplorer query={query} setQuery={setQuery} onOpen={onOpen} recent={recent} />
        <CareerSelector onOpen={onOpen} />
        <SkillExplorer onOpen={onOpen} />
        <AboutSection />
        <ExperienceSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <footer className="site gut">
        <div className="foot">
          <div>
            <div className="wordmark">
              SUFIAN<span className="dot">.</span>
            </div>
            <div className="tag">{profile.tagline}</div>
            <p style={{ margin: 0 }}>{profile.supporting}</p>
          </div>
          <nav aria-label="Footer">
            <a href="#home">Home</a>
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
            <a href="#resume">Resume</a>
            <a href="#contact">Contact</a>
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                <LinkedinIcon size={16} /> LinkedIn
              </a>
            )}
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                <GithubIcon size={16} /> GitHub
              </a>
            )}
          </nav>
        </div>
        <p className="copy">
          © {new Date().getFullYear()} {profile.name}. Thanks for browsing. The next title could be your team. This is an independent personal portfolio and is not affiliated with any streaming service.
        </p>
      </footer>
      <button className={`totop ${showTop ? "" : "hidden"}`} type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <ArrowUp size={22} />
      </button>
      <ProjectDetailModal project={open} onClose={() => setOpen(null)} />
    </>
  );
}
