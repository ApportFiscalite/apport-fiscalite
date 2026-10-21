import type { LinePlacement } from "./SectionLines";

export const heroLines = [
  { variant: 1, mobile: { x: -149.1, y: 60.5, width: 656.2 }, desktop: { x: -5, y: 14.5, width: 1930 } },
] as const satisfies readonly LinePlacement[];

export const servicesLines = [
  { variant: 4, mobile: { x: -848.6, y: 209.9, width: 1352.9 }, desktop: { x: -5, y: 9.4, width: 1930 } },
] as const satisfies readonly LinePlacement[];

export const aboutLines = [
  { variant: 2, mobile: { x: -463.2, y: 808.8, width: 966.4 }, desktop: { x: -5, y: 989.1, width: 1925 } },
] as const satisfies readonly LinePlacement[];

export const contactLines = [
  { variant: 3, mobile: { x: -103.2, bottom: 1.5, width: 1080.8 }, desktop: { x: -5, bottom: -8.2, width: 1930 } },
] as const satisfies readonly LinePlacement[];
