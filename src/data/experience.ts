export interface ExperienceItem {
  period: string;
  title: string;
  company: string;
  side: "left" | "right";
}

export const EXPERIENCE: ExperienceItem[] = [
  { period: "2025 - Present", title: "CSE Student", company: "Daffodil International University", side: "left" },
  { period: "July 2025", title: "Web Development Course", company: "Programming Hero", side: "right" },
  { period: "2026", title: "Creative Developer", company: "Personal Projects", side: "left" },
  { period: "2026", title: "Full Stack Developer", company: "Modern Web Applications", side: "right" },
];
