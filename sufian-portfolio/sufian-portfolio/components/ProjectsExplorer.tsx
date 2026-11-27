"use client";
import { useMemo, useState } from "react";
import type { Project } from "@/data/types";
import { allProjects, conceptProjects, projects, rows } from "@/data/projects";
import { filters, searchProjects, type Filter } from "@/lib/search";
import ProjectCarousel from "./ProjectCarousel";
import ProjectCard from "./ProjectCard";

export default function ProjectsExplorer({ query, setQuery, onOpen, recent }: { query: string; setQuery: (q: string) => void; onOpen: (p: Project) => void; recent: string[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const searching = query.trim().length > 0 || filter !== "All";
  const results = useMemo(() => searchProjects(allProjects, query, filter), [query, filter]);

  const recentItems = recent.map((id) => allProjects.find((p) => p.id === id)).filter(Boolean) as Project[];
  const recentlyAdded = [...projects].sort((a, b) => b.added - a.added);
  const collection = projects.filter((p) => p.featured);

  return (
    <div id="projects">
      <div className="gut section" style={{ paddingBottom: 6 }}>
        <div className="section-head">
          <div>
            <h2 className="big-title">Projects</h2>
            <p>Hover a title for more, or open it for the full story. Search from the top bar.</p>
          </div>
        </div>
        <div className="chips" role="group" aria-label="Filter projects by category">
          {filters.map((f) => (
            <button key={f} type="button" className="chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {f === "All" ? "All projects" : f}
            </button>
          ))}
        </div>
      </div>

      {searching ? (
        <section className="gut section" aria-live="polite" aria-label="Search results">
          <p style={{ color: "var(--mute)", margin: 0 }}>
            {results.length} result{results.length === 1 ? "" : "s"}
            {query && <> for “{query}”</>}
            {filter !== "All" && <> in {filter}</>}
          </p>
          {results.length > 0 ? (
            <div className="results">
              {results.map((p) => (
                <ProjectCard key={p.id} p={p} onOpen={onOpen} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <p style={{ margin: "0 0 12px" }}>Nothing matches that yet. Try Power BI, AWS, Scrum or Business Analyst.</p>
              <button
                className="btn btn-grey btn-sm"
                type="button"
                onClick={() => {
                  setQuery("");
                  setFilter("All");
                }}
              >
                Clear search
              </button>
            </div>
          )}
        </section>
      ) : (
        <>
          {recentItems.length > 0 && <ProjectCarousel id="row-recent" title="Continue exploring" note="Recently viewed" items={recentItems} onOpen={onOpen} />}
          {rows.map((r) => (
            <ProjectCarousel key={r.id} id={`row-${r.id}`} title={r.title} items={projects.filter((p) => p.row === r.id)} onOpen={onOpen} />
          ))}
          <ProjectCarousel id="row-new" title="Recently added" items={recentlyAdded} onOpen={onOpen} />
          <ProjectCarousel id="row-collection" title="My collection" note="Hand picked" items={collection} onOpen={onOpen} />
          <section className="gut">
            <details className="concepts">
              <summary>
                Coming soon <small>{conceptProjects.length} planned projects, labelled Concept until they are built</small>
              </summary>
              {rows
                .filter((r) => r.id !== "featured")
                .map((r) => (
                  <div key={r.id} style={{ marginLeft: "calc(-1 * max(4vw, 16px))", marginRight: "calc(-1 * max(4vw, 16px))" }}>
                    <ProjectCarousel id={`concept-${r.id}`} title={r.title} note="Concept" items={conceptProjects.filter((p) => p.row === r.id)} onOpen={onOpen} />
                  </div>
                ))}
            </details>
          </section>
        </>
      )}
    </div>
  );
}
