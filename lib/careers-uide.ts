import { Career } from "./types";
import rawCareers from "./uide_careers.json";

export const UIDE_CAMPUSES = [
  "Quito",
  "Guayaquil",
  "Loja",
  "Online",
] as const;

export type UideCampus = (typeof UIDE_CAMPUSES)[number];

export const UIDE_ALL_CAREERS: Career[] = rawCareers as unknown as Career[];

export function getCareersByCampus(campus: string): Career[] {
  const normCampus = campus.trim().toLowerCase();
  return UIDE_ALL_CAREERS.filter(
    (c) => c.campus && c.campus.toLowerCase() === normCampus
  );
}

export function getQuitoCareers(): Career[] {
  return getCareersByCampus("Quito");
}

export function findCareerById(id: string): Career | undefined {
  return UIDE_ALL_CAREERS.find((c) => c.id === id);
}
