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

export interface CampusExtras {
  seguroUniversitario: number;
  consejoEstudiantil: number;
  totalDerechosSemestre: number;
  examenIngles: number;
  examenIngreso: number;
}

export const CAMPUS_EXTRAS: Record<string, CampusExtras> = {
  Quito: {
    seguroUniversitario: 89.5,
    consejoEstudiantil: 20.0,
    totalDerechosSemestre: 109.5,
    examenIngles: 25.0,
    examenIngreso: 50.0,
  },
  Guayaquil: {
    seguroUniversitario: 60.0,
    consejoEstudiantil: 0.0,
    totalDerechosSemestre: 60.0,
    examenIngles: 25.0,
    examenIngreso: 30.0,
  },
  Loja: {
    seguroUniversitario: 45.5,
    consejoEstudiantil: 16.0,
    totalDerechosSemestre: 61.5,
    examenIngles: 25.0,
    examenIngreso: 0.0,
  },
  Online: {
    seguroUniversitario: 45.5,
    consejoEstudiantil: 8.0,
    totalDerechosSemestre: 53.5,
    examenIngles: 25.0,
    examenIngreso: 15.0,
  },
};

export function getCampusExtras(campus: string): CampusExtras {
  const normCampus = campus.trim();
  const matchKey = Object.keys(CAMPUS_EXTRAS).find(
    (k) => k.toLowerCase() === normCampus.toLowerCase()
  );
  return matchKey ? CAMPUS_EXTRAS[matchKey] : CAMPUS_EXTRAS["Quito"];
}

export function findCareerById(id: string): Career | undefined {
  return UIDE_ALL_CAREERS.find((c) => c.id === id);
}
