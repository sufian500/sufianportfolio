export type Status = "Live" | "Completed" | "In Progress" | "Prototype" | "Concept";

export type Category =
  | "Data Analytics"
  | "Business Analysis"
  | "Systems Development"
  | "AI & Cloud"
  | "Industry Solutions";

export type CareerId = "ba" | "da" | "aa" | "csa" | "ea" | "pm";

export interface Block {
  label: string;
  items: string[];
}

export interface Project {
  id: string;
  title: string;
  /** One line shown on cards */
  tagline: string;
  description: string;
  category: Category;
  /** Shown as the label on the card, e.g. "Data Analytics & Business Intelligence" */
  categoryLabel?: string;
  industry?: string;
  technologies: string[];
  status: Status;
  /** e.g. "2026" or "Semester 1, 2026" */
  date?: string;
  role?: string;
  problem?: string;
  objectives?: string[];
  contribution?: string[];
  requirements?: Block[];
  design?: Block[];
  features?: string[];
  outcomes?: string[];
  challenges?: string[];
  screenshots?: { src: string; alt: string }[];
  /** Optional image paths in /public. Without them a generated poster is drawn. */
  thumbnail?: string;
  banner?: string;
  /** Small logo shown on the poster, e.g. /ears-logo.svg */
  logo?: string;
  /** CSS gradient for the generated poster */
  theme: string;
  liveUrl?: string;
  liveNote?: string;
  githubUrl?: string;
  demoUrl?: string;
  careers: CareerId[];
  confidential?: boolean;
  featured?: boolean;
  /** Higher numbers appear first in "Recently added" */
  added: number;
  /** Row this project appears in */
  row: RowId;
}

export type RowId =
  | "featured"
  | "bi"
  | "ba"
  | "systems"
  | "cloud"
  | "industry";

export interface Skill {
  name: string;
  group: string;
  description: string;
  applications: string[];
  related: string[];
  /** Project ids */
  projects: string[];
  /** Set false to hide a skill without deleting it */
  show: boolean;
}

export interface Career {
  id: CareerId;
  label: string;
  blurb: string;
  skills: string[];
}
