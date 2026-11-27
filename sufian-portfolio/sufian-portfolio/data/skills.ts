import type { Career, Skill } from "./types";

/**
 * Skills shown in the library and the "Unlock My Skills" explorer.
 * show: false hides a skill until you confirm you have used or studied it.
 */
export const skills: Skill[] = [
  // Business Analysis
  { name: "Requirements Gathering", group: "Business Analysis", show: true, description: "Running conversations with users and managers to find out what a system or process really needs to do.", applications: ["Agritech operational needs", "EARS client requirements"], related: ["User Stories", "MoSCoW", "Stakeholder Analysis"], projects: ["ears", "stock-analysis"] },
  { name: "MoSCoW Prioritisation", group: "Business Analysis", show: true, description: "Agreeing what is Must, Should, Could and Will not have before building, so scope stays realistic.", applications: ["EARS scope agreed with the client before sprint 1"], related: ["Requirements Gathering", "Scrum"], projects: ["ears"] },
  { name: "Process Mapping and BPMN", group: "Business Analysis", show: true, description: "Drawing how work flows today and how it should flow, so gaps and waste are visible.", applications: ["Documenting Agritech business processes", "University BIS coursework"], related: ["Process Documentation"], projects: ["stock-analysis"] },
  { name: "Process Documentation", group: "Business Analysis", show: true, description: "Writing clear references for how a process or system works.", applications: ["Agritech process references", "EARS user guide and test report (team)"], related: ["Process Mapping and BPMN"], projects: ["stock-analysis", "ears"] },
  { name: "Stakeholder Communication", group: "Business Analysis", show: true, description: "Keeping clients, supervisors and teams aligned with regular, plain language updates.", applications: ["EARS weekly client meetings, agendas, minutes and reports", "Briefing shift leaders before every shift"], related: ["Scrum"], projects: ["ears", "ops-performance"] },
  { name: "User Stories", group: "Business Analysis", show: false, description: "Capturing requirements from the user's point of view with acceptance criteria.", applications: [], related: ["Requirements Gathering"], projects: [] },
  { name: "Business Requirements Documents", group: "Business Analysis", show: false, description: "Formal documents that set out what a solution must deliver.", applications: [], related: ["Requirements Gathering"], projects: [] },

  // Data Analytics
  { name: "Power BI", group: "Data Analytics", show: true, description: "Building and reading reports and dashboards that turn data into decisions.", applications: ["Weekly KPI trackers at work", "Aviation dashboard (in progress)"], related: ["Microsoft Fabric", "Power Query", "Excel"], projects: ["aviation-dashboard", "ops-performance"] },
  { name: "Microsoft Fabric", group: "Data Analytics", show: true, description: "Microsoft's analytics platform, used to analyse sales and trading data.", applications: ["Sales analysis by hour and product"], related: ["Power BI"], projects: ["ops-performance"] },
  { name: "Excel", group: "Data Analytics", show: true, description: "Analysis, modelling and reporting in spreadsheets.", applications: ["Stock movement and reorder point analysis", "Aviation data preparation"], related: ["Power BI", "Power Query"], projects: ["stock-analysis", "aviation-dashboard"] },
  { name: "Power Query", group: "Data Analytics", show: true, description: "Cleaning and shaping raw data before it reaches a report.", applications: ["Preparing aviation flight data"], related: ["Power BI", "Excel"], projects: ["aviation-dashboard"] },
  { name: "Variance Analysis", group: "Data Analytics", show: true, description: "Comparing expected and actual results and tracing the gap to its cause.", applications: ["Weekly net variance and wastage investigation"], related: ["Power BI", "Excel"], projects: ["ops-performance"] },
  { name: "SQL", group: "Data Analytics", show: true, description: "Querying relational data with SELECT, JOIN and GROUP BY.", applications: ["University coursework"], related: ["Relational Database Design"], projects: [] },
  { name: "Python", group: "Data Analytics", show: false, description: "Scripting and data analysis with pandas.", applications: [], related: [], projects: [] },

  // Development
  { name: "HTML", group: "Development", show: true, description: "Semantic page structure.", applications: ["EARS, 0 W3C validation errors"], related: ["CSS", "JavaScript"], projects: ["ears"] },
  { name: "CSS", group: "Development", show: true, description: "Layout and visual design for the web.", applications: ["EARS interface"], related: ["HTML"], projects: ["ears"] },
  { name: "JavaScript", group: "Development", show: true, description: "Application logic in the browser.", applications: ["EARS features, audit engine and offline support"], related: ["Progressive Web Apps"], projects: ["ears"] },
  { name: "Progressive Web Apps", group: "Development", show: true, description: "Web apps that install like native apps and work offline.", applications: ["EARS service worker and manifest"], related: ["JavaScript"], projects: ["ears"] },
  { name: "React", group: "Development", show: true, description: "Component based user interfaces.", applications: ["AI platform front end"], related: ["Next.js"], projects: ["ai-construction"] },
  { name: "Next.js", group: "Development", show: true, description: "React framework for production web apps.", applications: ["AI platform front end"], related: ["React"], projects: ["ai-construction"] },

  // Database
  { name: "Cloud Database", group: "Database", show: true, description: "Storing application data in a managed cloud database.", applications: ["AI platform data layer"], related: ["Amazon S3"], projects: ["ai-construction"] },
  { name: "Relational Database Design", group: "Database", show: false, description: "Designing tables, keys and relationships.", applications: [], related: ["SQL"], projects: [] },
  { name: "PostgreSQL", group: "Database", show: false, description: "Open source relational database.", applications: [], related: ["SQL"], projects: [] },
  { name: "MySQL", group: "Database", show: false, description: "Open source relational database.", applications: [], related: ["SQL"], projects: [] },

  // Cloud & AI
  { name: "Amazon Bedrock", group: "Cloud & AI", show: true, description: "AWS service for building with foundation models.", applications: ["AI features in a construction platform"], related: ["Amazon S3", "Prompt Design"], projects: ["ai-construction"] },
  { name: "Amazon S3", group: "Cloud & AI", show: true, description: "AWS object storage, used for documents.", applications: ["Document storage for the AI platform"], related: ["Amazon Bedrock"], projects: ["ai-construction"] },
  { name: "Prompt Design", group: "Cloud & AI", show: true, description: "Designing and testing the instructions behind LLM features.", applications: ["Iterating prompts for AI platform features"], related: ["Amazon Bedrock", "Generative AI"], projects: ["ai-construction"] },
  { name: "Generative AI", group: "Cloud & AI", show: true, description: "Using large language models to solve business problems.", applications: ["AI platform research and product direction"], related: ["Amazon Bedrock", "Prompt Design"], projects: ["ai-construction"] },
  { name: "RAG", group: "Cloud & AI", show: false, description: "Retrieval augmented generation: answering from your own documents.", applications: [], related: ["Amazon Bedrock"], projects: [] },

  // Project Management
  { name: "Scrum", group: "Project Management", show: true, description: "Delivering in short sprints with planning, stand ups, reviews and retrospectives.", applications: ["Scrum Master for EARS across four sprints"], related: ["Agile", "Stakeholder Communication"], projects: ["ears"] },
  { name: "Agile", group: "Project Management", show: true, description: "Iterative delivery with frequent client feedback.", applications: ["Two formal client demos on EARS"], related: ["Scrum"], projects: ["ears"] },
  { name: "Project Documentation", group: "Project Management", show: true, description: "Agendas, minutes, progress reports and sprint reports.", applications: ["EARS weekly reports and sprint reports"], related: ["Stakeholder Communication"], projects: ["ears"] },
  { name: "Jira", group: "Project Management", show: false, description: "Tracking work items and sprints.", applications: [], related: ["Scrum"], projects: [] },
];

export const skillGroups = ["Business Analysis", "Data Analytics", "Development", "Database", "Cloud & AI", "Project Management"];

export const careers: Career[] = [
  { id: "ba", label: "Business Analyst", blurb: "Requirements, process improvement and stakeholder communication.", skills: ["Requirements Gathering", "MoSCoW Prioritisation", "Process Mapping and BPMN", "Stakeholder Communication"] },
  { id: "da", label: "Data Analyst", blurb: "Dashboards, KPIs and variance analysis that drive decisions.", skills: ["Power BI", "Microsoft Fabric", "Excel", "Power Query", "Variance Analysis", "SQL"] },
  { id: "aa", label: "Application Analyst", blurb: "Understanding how applications support the business, and improving them.", skills: ["Requirements Gathering", "JavaScript", "Progressive Web Apps", "Next.js"] },
  { id: "csa", label: "Computer Systems Analyst", blurb: "How systems, cloud services and data fit together.", skills: ["Amazon Bedrock", "Amazon S3", "Cloud Database", "Progressive Web Apps"] },
  { id: "ea", label: "Enterprise Architecture", blurb: "Graduate level learning: how business capability and technology connect. No senior experience claimed.", skills: ["Generative AI", "Amazon Bedrock", "Process Mapping and BPMN"] },
  { id: "pm", label: "Project Management", blurb: "Graduate level: Scrum delivery, reporting and stakeholder management on real projects.", skills: ["Scrum", "Agile", "Project Documentation", "Stakeholder Communication"] },
];
