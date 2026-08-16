export interface NavItem {
  label: string;
  to: string;
  glyph: string;
  blurb: string;
}

export const navItems: NavItem[] = [
  { label: "Home", to: "/", glyph: "◎", blurb: "Enter the class universe" },
  { label: "Our Class", to: "/class", glyph: "🏫", blurb: "The classroom core" },
  { label: "Teacher", to: "/teacher", glyph: "👩‍🏫", blurb: "Teacher's chamber" },
  { label: "Students", to: "/students", glyph: "👨‍🎓", blurb: "Student hub · 33 nodes" },
  { label: "Houses", to: "/houses", glyph: "🏛️", blurb: "Four house towers" },
  { label: "Green Cabinet", to: "/green-cabinet", glyph: "🌱", blurb: "Green zone" },
  { label: "Leadership", to: "/monitors", glyph: "👑", blurb: "Class leadership" },
  { label: "Achievements", to: "/achievements", glyph: "🏆", blurb: "Hall of fame" },
  { label: "Events", to: "/events", glyph: "🎪", blurb: "Class events" },
  { label: "Timeline", to: "/timeline", glyph: "🕐", blurb: "Time tunnel" },
  { label: "Gallery", to: "/gallery", glyph: "🖼️", blurb: "Memory museum" },
  { label: "Projects", to: "/projects", glyph: "📚", blurb: "Project gallery" },
  { label: "Science Lab", to: "/science-lab", glyph: "🧪", blurb: "Virtual laboratory" },
  { label: "Calendar", to: "/calendar", glyph: "📅", blurb: "Activity center" },
  { label: "Yearbook", to: "/yearbook", glyph: "📖", blurb: "Yearbook vault" },
  { label: "About", to: "/about", glyph: "💠", blurb: "Website creator" },
];

/** Locations shown as clickable nodes in the 3D campus hub. */
export const campusLocations = navItems.filter((n) => n.to !== "/" && n.to !== "/events");
