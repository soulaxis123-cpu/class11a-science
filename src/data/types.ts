/**
 * SCIENCE NEXUS — data models.
 * UI reads ONLY from src/data/*. Replace placeholder values here later;
 * no component changes are required.
 */

export type HouseId = "chanakya" | "valmiki" | "patanjali" | "dronacharya";

export type StudentRole =
  | "Student"
  | "Boys Monitor"
  | "Girls Monitor"
  | "Green Cabinet"
  | "House Captain"
  | "House Vice Captain";

export interface Student {
  /** Unique roll number, 1–33 */
  roll: number;
  /** null = not provided yet (renders as placeholder) */
  name: string | null;
  house: HouseId | null;
  roles: StudentRole[];
  /** Image URL or null for the elegant placeholder avatar */
  photo: string | null;
  intro: string | null;
  quote: string | null;
  interests: string[];
  achievements: string[];
  projects: string[];
}

export interface House {
  id: HouseId;
  name: string;
  /** CSS custom property holding the configurable accent color */
  colorVar: string;
  emblem: string;
  motto: string | null;
  teacher: string | null;
  captain: string | null;
  viceCaptain: string | null;
  points: number;
  achievements: string[];
  events: string[];
  description: string | null;
}

export interface GreenMember {
  slot: number;
  name: string | null;
  roll: number | null;
  responsibility: string | null;
}

export interface Achievement {
  id: string;
  title: string | null;
  category: "Academic" | "House" | "Sports" | "Competition" | "Class" | "Individual";
  holder: string | null;
  date: string | null;
  description: string | null;
}

export interface TimelineEntry {
  id: string;
  title: string | null;
  date: string | null;
  description: string | null;
  tag: string;
}

export interface GalleryItem {
  id: string;
  title: string | null;
  category: string;
  media: string | null;
  type: "image" | "video";
}

export interface Project {
  id: string;
  title: string | null;
  subject: "Physics" | "Chemistry" | "Biology" | "Mathematics" | "Interdisciplinary";
  team: string | null;
  description: string | null;
  date: string | null;
  result: string | null;
  media: string | null;
}

export interface ClassEvent {
  id: string;
  title: string | null;
  date: string | null;
  type: "Exam" | "Test" | "Project" | "Competition" | "Birthday" | "School" | "House";
  description: string | null;
}

export interface LabSection {
  id: "physics" | "chemistry" | "biology" | "mathematics";
  name: string;
  symbol: string;
  tagline: string;
  entries: { title: string | null; note: string | null }[];
}
