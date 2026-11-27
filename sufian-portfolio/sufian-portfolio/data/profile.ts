/** Personal details. Leave a value empty ("") to hide it everywhere on the site. */
export const profile = {
  name: "Sufian Sayed",
  brand: "SUFIAN.",
  tagline: "HIRE TO UNLOCK.",
  supporting: "Discover the skills. Explore the projects. Unlock the potential.",
  title: "Business & Technology Analyst",
  heroLine: "Transforming business challenges into data driven insights, intelligent systems and practical digital solutions.",
  capabilities: ["Business Analysis", "Data Analytics", "Systems Analysis", "Digital Solutions"],
  location: "Perth, Western Australia",
  workRights: "Full Australian working rights (Temporary Graduate visa). No sponsorship needed.",
  availability: "Available with four weeks notice",
  email: "sufiansayed@outlook.com",
  linkedin: "https://www.linkedin.com/in/sufian-sayed",
  github: "", // add your GitHub URL here to show it
  resumePdf: "/resume.pdf", // replace public/resume.pdf with your latest version
  about: [
    "I am a Business Information Systems graduate interested in the intersection of business, data and technology.",
    "My experience includes developing digital solutions, analysing operational data, working with business applications and exploring cloud based artificial intelligence technologies.",
    "I enjoy understanding business challenges, identifying opportunities for improvement and translating requirements into practical technology solutions.",
    "I am particularly interested in Business Analysis, Data Analytics, Systems Analysis and Digital Transformation.",
  ],
  education: [
    { title: "Bachelor of Commerce, Business Information Systems", org: "Curtin University, Bentley WA", date: "Jul 2023 to Jul 2026", note: "ISYS3002 capstone: EARS, as Scrum Master, Communication Manager and one of the main developers." },
  ],
  careerInterests: ["Business Analysis", "Data Analytics", "Systems Analysis", "Digital Transformation"],
  /** Add real certifications only, e.g. { name: "PL-300", issuer: "Microsoft", date: "2027" } */
  certifications: [] as { name: string; issuer: string; date: string }[],
  /** Courses or learning in progress. Leave empty to hide. */
  development: [] as string[],
};

export const experience = [
  {
    role: "Assistant Restaurant Manager",
    org: "Guzman y Gomez, Belmont WA",
    date: "Jul 2026 to present",
    type: "Operations and management",
    points: [
      "Analyse sales by hour and product in Microsoft Fabric and Power BI to align staffing and stock with demand.",
      "Monitor KPIs through Power BI trackers and act when sales, labour or cost fall off target.",
      "Investigate weekly net variance and wastage and lead an action plan to meet the store standard of better than minus 1%.",
      "Brief shift leaders before every shift, report to senior management and help with crew recruitment.",
    ],
    skills: ["Operational analysis", "Process improvement", "Stakeholder communication", "Resource management"],
  },
  {
    role: "Intern, AI Platform Development",
    org: "Construction technology company (confidential), Perth WA",
    date: "Jul 2026 to present",
    type: "Technology",
    points: [
      "Integrate AI features with Amazon Bedrock, Amazon S3 and a cloud database behind a Next.js and React front end.",
      "Research AI capabilities, design LLM prompts and contribute to the technical roadmap.",
    ],
    skills: ["Cloud", "Generative AI", "Problem solving"],
  },
  {
    role: "Junior Business Analyst",
    org: "Australia Agritech Pty Ltd, Perth WA",
    date: "Jun 2025 to Sep 2025",
    type: "Business analysis",
    points: [
      "Analysed stock movement across agricultural drone products to set reorder points and low stock alerts.",
      "Conducted market and competitor research and wrote recommendations for purchasing and positioning.",
      "Gathered requirements from staff and management and documented business processes.",
    ],
    skills: ["Requirements", "Business performance monitoring", "Research"],
  },
];
