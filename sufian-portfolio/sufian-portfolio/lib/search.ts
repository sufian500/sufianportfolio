import type { Category, Project } from "@/data/types";
import { careers, skills } from "@/data/skills";

export type Filter = "All" | Category;
export const filters: Filter[] = ["All", "Data Analytics", "Business Analysis", "Systems Development", "AI & Cloud", "Industry Solutions"];

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/** Text a project can be found by: name, technologies, category, industry, careers and linked skills. */
export function haystack(p: Project): string {
  const careerLabels = careers.filter((c) => p.careers.includes(c.id)).map((c) => c.label);
  const skillNames = skills.filter((s) => s.show && s.projects.includes(p.id)).map((s) => s.name);
  return norm([p.title, p.tagline, p.description, p.category, p.categoryLabel ?? "", p.industry ?? "", p.status, ...p.technologies, ...careerLabels, ...skillNames].join(" "));
}

export function searchProjects(list: Project[], query: string, filter: Filter): Project[] {
  const q = norm(query);
  const words = q ? q.split(" ") : [];
  // A search for a career name ("Business Analyst") returns that career's projects.
  const career = careers.find((c) => norm(c.label) === q || (q.length > 4 && norm(c.label).startsWith(q)));
  return list
    .filter((p) => !career || p.careers.includes(career.id))
    .filter((p) => filter === "All" || p.category === filter)
    .filter((p) => {
      if (!words.length || career) return true;
      const h = haystack(p);
      return words.every((w) => h.includes(w));
    })
    .sort((a, b) => (a.status === "Concept" ? 1 : 0) - (b.status === "Concept" ? 1 : 0));
}
