export interface Career {
  id: string;
  name: string;
  faculty: string;
  campus?: string;
  url?: string;
  semesters: number;
  credits: number;
  matriculaSem?: number;
  colegiaturaSem?: number;
  costoTotalSem?: number;
  totalTuitionRef: number;
  totalConBeca?: number;
  ahorroBeca?: number;
  asuDualDegree: boolean;
  asuPathway?: string;
  iconName?: string;
  description: string;
  highlight: string;
}

export interface Pillar {
  id: string;
  title: string;
  subtitle: string;
  partner: string;
  description: string;
  badge: string;
  stats: {
    label: string;
    value: string;
  }[];
  accentColor: "blue" | "red" | "gold";
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  highlight: string;
  icon: string;
}

export interface PartnerBenefit {
  partnerId: "rcb" | "diners" | "uide";
  partnerName: string;
  partnerRole: string;
  accentColor: string;
  tagline: string;
  benefits: BenefitItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "programa" | "finanzas" | "uide_asu" | "seguridad";
}
