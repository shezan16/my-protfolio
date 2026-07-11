export interface SkillBar {
  label: string;
  value: number;
  tags: string[];
}

export const SKILL_BARS: SkillBar[] = [
  { label: "Progress Bar", value: 90, tags: ["Django", "Python", "iOS"] },
  { label: "Inner Shadow", value: 75, tags: ["Documentation", "English"] },
  { label: "Design Systems", value: 85, tags: ["Figma", "Design", "Motion"] },
];

export const SKILL_TAGS: string[] = [
  "Progress",
  "Skills",
  "SRA",
  "Premesion",
  "Skiller Badges",
  "Professional",
  "SUI Badges",
];
