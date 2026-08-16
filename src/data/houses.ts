import type { House, HouseId } from "./types";

/**
 * House accent colors are CSS variables defined in src/styles.css
 * (--house-chanakya, --house-valmiki, --house-patanjali, --house-dronacharya).
 * Change them there once the real house colors are known — nothing else needs editing.
 */
export const houses: House[] = [
  {
    id: "chanakya",
    name: "Chanakya",
    colorVar: "--house-chanakya",
    emblem: "◈",
    motto: null,
    teacher: null,
    captain: null,
    viceCaptain: null,
    points: 0,
    achievements: [],
    events: [],
    description: null,
  },
  {
    id: "valmiki",
    name: "Valmiki",
    colorVar: "--house-valmiki",
    emblem: "◆",
    motto: null,
    teacher: null,
    captain: null,
    viceCaptain: null,
    points: 0,
    achievements: [],
    events: [],
    description: null,
  },
  {
    id: "patanjali",
    name: "Patanjali",
    colorVar: "--house-patanjali",
    emblem: "❖",
    motto: null,
    teacher: null,
    captain: null,
    viceCaptain: null,
    points: 0,
    achievements: [],
    events: [],
    description: null,
  },
  {
    id: "dronacharya",
    name: "Dronacharya",
    colorVar: "--house-dronacharya",
    emblem: "◇",
    motto: null,
    teacher: null,
    captain: null,
    viceCaptain: null,
    points: 0,
    achievements: [],
    events: [],
    description: null,
  },
];

export function getHouse(id: HouseId | null | undefined): House | undefined {
  if (!id) return undefined;
  return houses.find((h) => h.id === id);
}

export function houseColor(id: HouseId | null | undefined): string {
  const house = getHouse(id);
  return house ? `var(${house.colorVar})` : "var(--muted-foreground)";
}
