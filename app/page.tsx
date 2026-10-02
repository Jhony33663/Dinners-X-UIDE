"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  PREGRADO_CAREERS,
  PREGRADO_QUITO,
  PREGRADO_GUAYAQUIL,
  PREGRADO_ONLINE,
  getCampusExtras,
} from "@/lib/data";
import { Career } from "@/lib/types";
import {
  calculatePadQuote,
  generateAmortizationSchedule,
} from "@/lib/calculator";
import {
  Play,
  X,
  ChevronDown,
  Shield,
  ShieldCheck,
  TrendingUp,
  BookOpen,
  FileText,
  Mail,
  Info,
  ExternalLink,
} from "lucide-react";
import confetti from "canvas-confetti";
import { getAssetPath } from "@/lib/paths";

export default function Home() {
  // Modal States
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadType, setLeadType] = useState<"ahorro" | "asesoria">("ahorro");

  // Career Selection (Exclusivamente Pregrado: Quito UIO, Guayaquil, Online - Sin PVC ni Maestrías)
  const [selectedCareerId, setSelectedCareerId] = useState<string>(
    PREGRADO_QUITO[0]?.id || "uio-administracion-empresas"
  );
  const [applyPadScholarship, setApplyPadScholarship] = useState<boolean>(false);

  const selectedCareer = useMemo(() => {
    const found = PREGRADO_CAREERS.find((c) => c.id === selectedCareerId);
    return found || PREGRADO_QUITO[0] || PREGRADO_CAREERS[0];
  }, [selectedCareerId]);

  // Complementary fees (Consejo Estudiantil, Seguro Universitario)
  const campusExtras = useMemo(
    () => getCampusExtras(selectedCareer.campus || "Quito"),
    [selectedCareer.campus]
  );

  // Active Target Goal based on career & scholarship
  const effectiveCareerTuition = useMemo(() => {
    if (applyPadScholarship && selectedCareer.totalConBeca) {
      return selectedCareer.totalConBeca;
    }
    return selectedCareer.totalTuitionRef;
  }, [selectedCareer, applyPadScholarship]);

  // Simulator State ("calcula tu ahorro ahora")
  const [childAge, setChildAge] = useState<number>(5);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(150);
  const [showEmailPreview, setShowEmailPreview] = useState<boolean>(false);
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  // Beneficios Tabs State ("Paquete beneficios socios diners")
  const [activeTab, setActiveTab] = useState<"rcb" | "diners" | "uide">("rcb");

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Lead Form State
  const [isDinersMember, setIsDinersMember] = useState<string>("si");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    childAge: "5",
  });

  // Financial calculations
  const targetAge = 18;
  const savingYears = Math.max(1, targetAge - childAge);
  const savingMonths = savingYears * 12;

  // Monthly yield projection (4.5% gross fiduciario - 2% SRI retention)
  const effectiveMonthlyRate = (0.045 / 12) * (1 - 0.02);
  const projectedFund = useMemo(() => {
    return Math.round(
      monthlyContribution *
        ((Math.pow(1 + effectiveMonthlyRate, savingMonths) - 1) /
          effectiveMonthlyRate)
    );
  }, [monthlyContribution, effectiveMonthlyRate, savingMonths]);

  const totalCapitalContributed = useMemo(() => {
    return monthlyContribution * savingMonths;
  }, [monthlyContribution, savingMonths]);

  const projectedInterestNet = useMemo(() => {
    return Math.max(0, projectedFund - totalCapitalContributed);
  }, [projectedFund, totalCapitalContributed]);

  // Official Actuarial calculation for selected career tuition
  const careerPadQuote = useMemo(() => {
    return calculatePadQuote(effectiveCareerTuition, childAge);
  }, [effectiveCareerTuition, childAge]);

  // Amortization Schedule
  const amortizationSchedule = useMemo(() => {
    return generateAmortizationSchedule(effectiveCareerTuition, childAge, 6);
  }, [effectiveCareerTuition, childAge]);

  const openLeadModal = (type: "ahorro" | "asesoria") => {
    setLeadType(type);
    setIsSubmitted(false);
    setLeadModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#03185D", "#4C71FC", "#910048", "#28A745"],
      });
    } catch {}
  };

  return (
    <div className="min-h-screen bg-white text-[#313131] flex flex-col antialiased selection:bg-[#4C71FC] selection:text-white font-poppins">
      <main className="flex-1">
        {/* ========================================================
            FILA B2:D5: REINVENTORS PAD & VIDEO EXPLICATIVO
           ======================================================== */}
        <section
          className="relative min-h-[640px] lg:min-h-[720px] flex flex-col justify-between border-b border-[#E2E8F0] overflow-hidden bg-[#F8FAFC]"
          style={{
            backgroundImage: `url('${getAssetPath("assets/reinventors_pad_hero.jpg")}')`,
            backgroundSize: "cover",
            backgroundPosition: "center 28%",
          }}
        >
          {/* Sutil viñeta para asegurar legibilidad manteniendo 100% visible la fotografía de la familia */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/40 to-white/90 pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 w-full flex flex-col justify-between flex-1">
            {/* B2:D2: Centrado sobre las 3 columnas */}
            <div className="text-center max-w-4xl mx-auto mb-10">
              <span className="inline-block px-5 py-1.5 rounded-full bg-[#03185D] text-white text-xs sm:text-sm font-black tracking-widest uppercase mb-4 shadow-sm">
                REINVENTORS PAD
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#03185D] tracking-tight uppercase leading-tight drop-shadow-xs">
                El futuro de tus hijos lo reiventas desde hoy
              </h1>
            </div>

            {/* B3:D5: Fila con Columna B:C (Texto editorial) y Columna D (VIDEO EXPLICATIVO) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-auto">
              {/* Col B:C (Spans 2 columns / 8 de 12) */}
              <div className="lg:col-span-8">
                <div className="bg-white/94 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-white/85 shadow-[0_20px_50px_-15px_rgba(3,24,93,0.18)] space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF0FF] text-[#03185D] text-xs font-bold border border-[#D5E2FF]">
                    <span className="w-2 h-2 rounded-full bg-[#2952E8]" />
                    <span>Fondo Educativo</span>
                  </div>

                  <p className="text-base sm:text-xl text-[#03185D] leading-relaxed font-semibold border-l-4 border-[#2952E8] pl-5 py-1">
                    &ldquo;Reinventors PAD es un programa de ahorro educativo en alianza entre UIDE, Diners Club y RCB que permite a las familias planificar el futuro universitario de sus hijos mientras acceden a experiencias de desarrollo personal, académico y familiar&rdquo;
                  </p>
                </div>
              </div>

              {/* Col D (Spans 1 column / 4 de 12): VIDEO EXPLICATIVO */}
              <div className="lg:col-span-4 flex flex-col justify-center">
                <div
                  onClick={() => setVideoModalOpen(true)}
                  className="group relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/90 cursor-pointer aspect-video bg-[#03185D] flex items-center justify-center transform transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    backgroundImage: `url('${getAssetPath("assets/video-logros-poster.jpg")}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Reproducir VIDEO EXPLICATIVO"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setVideoModalOpen(true);
                  }}
                >
                  <div className="absolute inset-0 bg-[#03185D]/40 group-hover:bg-[#03185D]/20 transition-colors" />

                  <div className="relative z-10 flex flex-col items-center text-center p-4">
                    <div className="w-16 h-16 rounded-full bg-white text-[#03185D] group-hover:bg-[#2952E8] group-hover:text-white flex items-center justify-center shadow-2xl transition-all transform group-hover:scale-110 mb-3">
                      <Play className="w-7 h-7 fill-current translate-x-0.5" />
                    </div>
                    <span className="text-sm font-black tracking-widest text-white uppercase drop-shadow-md">
                      VIDEO EXPLICATIVO
                    </span>
                    <span className="text-[11px] text-white/90 font-medium mt-1">
                      Conoce el programa en 1 min
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            FILA B6:D7: 3 COLUMNAS DE PILARES DEL PROGRAMA
           ======================================================== */}
        <section className="py-16 bg-[#F8FAFC] border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Col B (B6:B7): SEGURIDAD FINANCIERA */}
              <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-2 flex items-center justify-center mb-6 shadow-xs overflow-hidden">
                    <img
                      src={getAssetPath("assets/icono-seguridad-financiera.jpg")}
                      alt="Seguridad Financiera"
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
                  <h3 className="text-lg font-black text-[#03185D] uppercase tracking-wide mb-3">
                    SEGURIDAD FINANCIERA
                  </h3>
                  <p className="text-sm text-[#4A5568] leading-relaxed font-medium">
                    Un fondo para educación superior de tus hijos
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#F1F5F9] text-xs font-semibold text-[#2952E8] flex items-center justify-between">
                  <span>Fideicomiso & Respaldo RCB</span>
                </div>
              </div>

              {/* Col C (C6:C7): DESARROLLO INTEGRAL */}
              <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-2 flex items-center justify-center mb-6 shadow-xs overflow-hidden">
                    <img
                      src={getAssetPath("assets/icono-desarrollo-integral.jpg")}
                      alt="Desarrollo Integral"
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
                  <h3 className="text-lg font-black text-[#03185D] uppercase tracking-wide mb-3">
                    DESARROLLO INTEGRAL
                  </h3>
                  <p className="text-sm text-[#4A5568] leading-relaxed font-medium">
                    Actividades, talleres y experiencias para potenciar su talento
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#F1F5F9] text-xs font-semibold text-[#2952E8] flex items-center justify-between">
                  <span>Acompañamiento vocacional continuo</span>
                </div>
              </div>

              {/* Col D (D6:D7): VINCULACIÓN UNIVERSITARIA TEMPRANA */}
              <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-2 flex items-center justify-center mb-6 shadow-xs overflow-hidden">
                    <img
                      src={getAssetPath("assets/icono-vinculacion-temprana.jpg")}
                      alt="Vinculación Universitaria Temprana"
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
                  <h3 className="text-lg font-black text-[#03185D] uppercase tracking-wide mb-3">
                    VINCULACIÓN UNIVERSITARIA TEMPRANA
                  </h3>
                  <p className="text-sm text-[#4A5568] leading-relaxed font-medium">
                    Acceso progresivo al ecosistema de la universidad #1 en innovación de Ecuador
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#F1F5F9] text-xs font-semibold text-[#2952E8] flex items-center justify-between">
                  <span>Experiencia Arizona State University</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            FILA B8:D10: NUESTRAS CARRERAS
           ======================================================== */}
        <section id="carreras" className="py-20 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Título de Sección B8:D8 */}
            <div className="max-w-4xl mx-auto text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-black text-[#03185D] tracking-tight uppercase leading-snug">
                Nuestras Carreras: una experiencia universitaria que transforma el futuro de tu hijo/a
              </h2>
              <div className="w-20 h-1 bg-[#2952E8] mx-auto mt-4 rounded-full" />
            </div>

            {/* 3 Columnas Fieles a la Fila 9-10 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Col B (B9:B10): Copy Institucional + 5 Viñetas */}
              <div className="lg:col-span-5 space-y-5">
                <p className="text-sm sm:text-base text-[#4A5568] leading-relaxed">
                  &ldquo;En la UIDE, no solo eliges una carrera, eliges una formación con visión global. Tu hijo/a accederá a programas académicos conectados con las tendencias del mundo, experiencias internacionales, certificaciones de valor profesional y oportunidades únicas a través de alianzas estratégicas como <strong>Arizona State University (ASU)</strong>. Porque en la UIDE no nos preparamos para el futuro: lo reinventamos.&rdquo;
                </p>

                {/* 5 Viñetas Oficiales (✔ con SVG limpio) */}
                <div className="space-y-3 bg-[#F8FAFC] p-6 rounded-2xl border border-[#E2E8F0]">
                  {[
                    "Titulación internacional",
                    "Alianzas globales y experiencia ASU",
                    "Certificaciones profesionales durante la carrera",
                    "Aprendizaje práctico y conexión con la industria",
                    "Formación para liderar, innovar y transformar",
                  ].map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#EBF0FF] text-[#2952E8] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.5 6.5L4.5 8.5L9.5 3.5" />
                        </svg>
                      </div>
                      <span className="text-sm font-bold text-[#03185D]">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Col C (C9:C10): Menú despegable carreras pregrado UIO */}
              <div className="lg:col-span-3 bg-[#F8FAFC] p-6 rounded-2xl border border-[#CBD5E1] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-[#2952E8] block">
                    Oferta Exclusiva Pregrado
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EBF0FF] text-[#03185D]">
                    {PREGRADO_CAREERS.length} Carreras
                  </span>
                </div>
                <label
                  htmlFor="career-dropdown-uio"
                  className="block text-sm font-black uppercase tracking-tight text-[#03185D]"
                >
                  Menú despegable carreras pregrado UIO:
                </label>

                <div className="relative">
                  <select
                    id="career-dropdown-uio"
                    value={selectedCareerId}
                    onChange={(e) => setSelectedCareerId(e.target.value)}
                    className="w-full h-12 pl-4 pr-10 rounded-xl border border-[#CBD5E1] bg-white text-[#03185D] font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#2952E8] appearance-none cursor-pointer shadow-xs"
                  >
                    <optgroup label="Pregrado Quito (UIO) — 21 Carreras">
                      {PREGRADO_QUITO.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.semesters} sem.)
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Pregrado Guayaquil — 1 Carrera">
                      {PREGRADO_GUAYAQUIL.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.semesters} sem.)
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Pregrado Online — 2 Carreras">
                      {PREGRADO_ONLINE.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.semesters} sem.)
                        </option>
                      ))}
                    </optgroup>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#03185D]">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] space-y-2 text-xs">
                  <div className="flex justify-between items-start gap-2">
                    <div className="font-bold text-[#03185D] leading-tight">
                      {selectedCareer.name}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EBF0FF] text-[#2952E8] shrink-0">
                      {selectedCareer.campus || "Quito"}
                    </span>
                  </div>
                  <div className="text-[#656565]">
                    {selectedCareer.faculty}
                  </div>
                  {selectedCareer.asuPathway && (
                    <div className="text-[11px] font-bold text-[#16A34A] bg-[#DCFCE7] px-2.5 py-1 rounded-lg">
                      ASU Pathway: {selectedCareer.asuPathway}
                    </div>
                  )}
                  {selectedCareer.url && (
                    <a
                      href={selectedCareer.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2952E8] hover:underline pt-1"
                    >
                      <span>Ver plan de estudios oficial</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Col D (D9:D10): Valor promedio carrera */}
              <div className="lg:col-span-4 bg-gradient-to-br from-white to-[#EFF6FF] p-6 sm:p-7 rounded-2xl border-2 border-[#BFDBFE] shadow-md space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-[#DBEAFE]">
                  <span className="text-xs font-black uppercase tracking-wider text-[#03185D]">
                    Valor promedio carrera
                  </span>
                  <span className="text-[11px] font-bold text-[#2952E8] bg-[#EBF0FF] px-2.5 py-0.5 rounded-full">
                    UIDE {selectedCareer.campus || "Quito"}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-[#656565] block uppercase font-bold">
                    Inversión referencial total:
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-[#03185D] tracking-tight">
                    ${effectiveCareerTuition.toLocaleString("en-US")}
                  </div>
                  <div className="text-xs text-[#2952E8] font-bold mt-1">
                    ${Math.round(effectiveCareerTuition / selectedCareer.semesters).toLocaleString("en-US")} / semestre
                    <span className="text-[#656565] font-normal ml-1">
                      ({selectedCareer.semesters} semestres)
                    </span>
                  </div>
                </div>

                {/* Toggle Beca PAD UIDE */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E2E8F0]">
                  <div>
                    <span className="text-xs font-bold text-[#03185D] block">
                      Aplicar Beca Reinventors PAD (21% - 25%)
                    </span>
                    <span className="text-[10px] text-[#656565]">
                      Beneficio preferencial socios Diners Club
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setApplyPadScholarship(!applyPadScholarship)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                      applyPadScholarship ? "bg-[#16A34A]" : "bg-[#CBD5E1]"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        applyPadScholarship ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Aranceles Complementarios UIDE */}
                <div className="pt-2 border-t border-[#DBEAFE] space-y-1 text-xs text-[#1E40AF]">
                  <div className="flex justify-between">
                    <span>• Consejo Estudiantil (anual):</span>
                    <span className="font-bold">${campusExtras.consejoEstudiantil} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Seguro Universitario (semestral):</span>
                    <span className="font-bold">${campusExtras.seguroUniversitario} USD</span>
                  </div>
                  <p className="text-[10px] text-[#656565] pt-1 italic">
                    * Precios aproximados oficiales UIDE sujetos a congelamiento arancelario con Reinventors PAD.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            CAMPUS UIDE: ACCORDION INTERACTIVO
            "LA UIDE ESTÁ A UN PASO DE DISTANCIA"
           ======================================================== */}
        <section className="py-16 sm:py-20 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Título de Sección con Watermark UIDE */}
            <div className="relative text-center mb-10 select-none">
              <span className="absolute left-1/2 -top-6 sm:-top-8 -translate-x-1/2 text-6xl sm:text-8xl lg:text-9xl font-black text-[#03185D]/[0.05] tracking-widest pointer-events-none uppercase">
                UIDE
              </span>
              <h2 className="relative text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight text-[#0F172A] uppercase leading-tight">
                LA UIDE ESTÁ A <span className="text-[#03185D]">UN PASO</span> DE DISTANCIA
              </h2>
            </div>

            {/* Accordion Component */}
            <div className="uide-campus-accordion" role="region" aria-label="Explora nuestros campus">
              {/* Campus Loja */}
              <a
                href="https://www.uide.edu.ec/pregrado-presencial-loja/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Conoce el Campus Loja"
              >
                <img
                  src={getAssetPath("assets/campus-loja.jpg")}
                  alt="Campus Loja UIDE"
                  loading="lazy"
                />
                <div className="absolute right-4 bottom-4 pointer-events-none opacity-20 hidden sm:block">
                  <svg className="w-16 h-20 text-white" viewBox="0 0 60 75" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 5 H55 V45 C55 60 30 70 30 70 C30 70 5 60 5 45 Z" />
                  </svg>
                </div>
                <span className="uide-campus-label">CAMPUS LOJA</span>
              </a>

              {/* Campus Quito */}
              <a
                href="https://www.uide.edu.ec/pregrado-presencial-quito/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Conoce el Campus Quito"
              >
                <img
                  src={getAssetPath("assets/campus-quito.jpg")}
                  alt="Campus Quito UIDE"
                  loading="lazy"
                />
                <div className="absolute right-4 bottom-4 pointer-events-none opacity-20 hidden sm:block">
                  <svg className="w-16 h-20 text-white" viewBox="0 0 60 75" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 5 H55 V45 C55 60 30 70 30 70 C30 70 5 60 5 45 Z" />
                  </svg>
                </div>
                <span className="uide-campus-label">CAMPUS QUITO</span>
              </a>

              {/* Campus Guayaquil */}
              <a
                href="https://www.uide.edu.ec/pregrado-presencial-guayaquil/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Conoce el Campus Guayaquil"
              >
                <img
                  src={getAssetPath("assets/campus-gye.jpg")}
                  alt="Campus Guayaquil UIDE"
                  loading="lazy"
                />
                <div className="absolute right-4 bottom-4 pointer-events-none opacity-20 hidden sm:block">
                  <svg className="w-16 h-20 text-white" viewBox="0 0 60 75" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 5 H55 V45 C55 60 30 70 30 70 C30 70 5 60 5 45 Z" />
                  </svg>
                </div>
                <span className="uide-campus-label">CAMPUS GUAYAQUIL</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================
            FILA B11:D13: ¿POR QUÉ EMPEZAR HOY?
           ======================================================== */}
        <section id="cotizador" className="py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Título de Sección B11:D11 */}
            <div className="max-w-3xl mx-auto text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-black text-[#03185D] tracking-tight uppercase">
                ¿Por qué empezar hoy?
              </h2>
              <div className="w-20 h-1 bg-[#2952E8] mx-auto mt-4 rounded-full" />
            </div>

            {/* 3 Columnas Fieles a B12:D13 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Col B (B12:B13): Si empiezas temprano */}
              <div className="lg:col-span-3 bg-white rounded-2xl p-6 border-2 border-[#BBF7D0] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E2E8F0]">
                    <div className="w-7 h-7 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2.5 6.5L4.5 8.5L9.5 3.5" />
                      </svg>
                    </div>
                    <h3 className="text-base font-black text-[#15803D]">
                      Si empiezas temprano
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      "Menor aporte mensual",
                      "Mayor fondo acumulado",
                      "Más años de beneficios",
                      "Más oportunidades para tu hijo",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm font-bold text-[#1F2937]">
                        <div className="w-5 h-5 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
                          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2.5 6.5L4.5 8.5L9.5 3.5" />
                          </svg>
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-[#F1F5F9] text-[11px] text-[#15803D] font-semibold bg-[#F0FDF4] p-3 rounded-lg">
                  Impacto: Rendimiento fiduciario compuesto que reduce significativamente el esfuerzo financiero familiar.
                </div>
              </div>

              {/* Col C (C12:C13): Si esperas */}
              <div className="lg:col-span-3 bg-white rounded-2xl p-6 border-2 border-[#FECACA] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E2E8F0]">
                    <div className="w-7 h-7 rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                        <path d="M3 3L9 9M9 3L3 9" />
                      </svg>
                    </div>
                    <h3 className="text-base font-black text-[#B91C1C]">
                      Si esperas
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      "Mayor esfuerzo financiero",
                      "Menos beneficios acumulados",
                      "Menor tiempo de planificación",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm font-bold text-[#374151]">
                        <div className="w-5 h-5 rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center shrink-0">
                          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                            <path d="M3 3L9 9M9 3L3 9" />
                          </svg>
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-[#F1F5F9] text-[11px] text-[#B91C1C] font-semibold bg-[#FEF2F2] p-3 rounded-lg">
                  Riesgo: Al llegar el momento universitario, los aranceles completos deben asumirse sin protección fiduciaria.
                </div>
              </div>

              {/* Col D (D12:D13): calcula tu ahorro ahora (FORMATO COTIZADOR CORREO ADJUNTO) */}
              <div className="lg:col-span-6 bg-white rounded-2xl p-7 border-2 border-[#2952E8] shadow-xl relative overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-lg sm:text-xl font-black text-[#03185D] uppercase tracking-tight">
                    calcula tu ahorro ahora
                  </h3>
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-[#EBF0FF] text-[#2952E8]">
                    Cotizador Oficial
                  </span>
                </div>
                <p className="text-xs text-[#656565] mb-6">
                  (FORMATO COTIZADOR CORREO ADJUNTO)
                </p>

                {/* Sliders Interactivos */}
                <div className="space-y-5">
                  {/* Slider 1: Edad */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-bold uppercase text-[#03185D]">
                        Edad actual de tu hijo/a:
                      </span>
                      <span className="text-base font-black text-[#2952E8]">
                        {childAge} {childAge === 1 ? "año" : "años"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={16}
                      value={childAge}
                      onChange={(e) => setChildAge(parseInt(e.target.value, 10))}
                      className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#2952E8]"
                    />
                    <div className="flex justify-between text-[10px] text-[#94A3B8] mt-1 font-mono">
                      <span>1 año</span>
                      <span>8 años</span>
                      <span>16 años</span>
                    </div>
                  </div>

                  {/* Slider 2: Aporte mensual */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-bold uppercase text-[#03185D]">
                        Aporte mensual programado:
                      </span>
                      <span className="text-base font-black text-[#2952E8]">
                        ${monthlyContribution} / mes
                      </span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={600}
                      step={25}
                      value={monthlyContribution}
                      onChange={(e) =>
                        setMonthlyContribution(parseInt(e.target.value, 10))
                      }
                      className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#2952E8]"
                    />
                    <div className="flex justify-between text-[10px] text-[#94A3B8] mt-1 font-mono">
                      <span>$50</span>
                      <span>$300</span>
                      <span>$600+</span>
                    </div>
                  </div>

                  {/* Resultados Proyectados */}
                  <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1]">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#656565] block">
                        Años de capitalización:
                      </span>
                      <span className="text-xl font-black text-[#03185D]">
                        {savingYears} {savingYears === 1 ? "año" : "años"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#656565] block">
                        Fondo Total Proyectado:
                      </span>
                      <span className="text-2xl font-black text-[#16A34A]">
                        ${projectedFund.toLocaleString("en-US")}
                      </span>
                    </div>
                  </div>

                  {/* Botones de Vista Previa del Cotizador Correo Adjunto */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowEmailPreview(!showEmailPreview)}
                      className="flex-1 py-3 px-4 rounded-full text-center text-xs font-bold uppercase tracking-wider diners-btn-secondary flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Mail className="w-4 h-4 text-[#2952E8]" />
                      <span>
                        {showEmailPreview
                          ? "Ocultar Formato Correo"
                          : "Ver Formato Cotizador Correo Adjunto"}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openLeadModal("ahorro")}
                      className="py-3 px-6 rounded-full text-center text-xs font-bold uppercase tracking-wider diners-btn-primary shadow-sm cursor-pointer"
                    >
                      Solicitar Corrida
                    </button>
                  </div>

                  {/* Formato Cotizador Correo Adjunto (Desplegable) */}
                  {showEmailPreview && (
                    <div className="mt-3 p-5 rounded-xl bg-[#F8FAFC] border-2 border-dashed border-[#CBD5E1] text-left space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-[#E2E8F0]">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />
                          <span className="text-xs font-black text-[#03185D] uppercase tracking-wider">
                            FORMATO COTIZADOR CORREO ADJUNTO (PDF)
                          </span>
                        </div>
                        <span className="text-[10px] text-[#656565] font-mono">
                          Adjunto: Cotizacion_Reinventors_PAD.pdf
                        </span>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-[#E2E8F0] shadow-xs space-y-2 text-xs">
                        <div className="flex justify-between font-bold text-[#03185D]">
                          <span>
                            Programa: Reinventors PAD (Fondo Educativo)
                          </span>
                          <span className="text-[#16A34A]">Plan Vigente 2026</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] text-[#4A5568] py-1 border-y border-[#F1F5F9]">
                          <div>• Edad actual hijo: <strong>{childAge} años</strong></div>
                          <div>• Aporte mensual: <strong>${monthlyContribution} / mes</strong></div>
                          <div>• Años de capitalización: <strong>{savingYears} años ({savingMonths} meses)</strong></div>
                          <div>• Aporte total programado: <strong>${totalCapitalContributed.toLocaleString("en-US")}</strong></div>
                          <div>• Rendimiento fiduciario est.: <strong className="text-[#16A34A]">+${projectedInterestNet.toLocaleString("en-US")}</strong></div>
                          <div>• Fondo total proyectado: <strong className="text-[#03185D]">${projectedFund.toLocaleString("en-US")}</strong></div>
                        </div>
                        <p className="text-[10px] text-[#656565] italic">
                          * Este documento es la corrida financiera enviada automáticamente al correo del socio Diners Club al solicitar asesoría, respaldada por la fiduciaria Raúl Coka Barriga.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Botón Amortización */}
                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAmortization(!showAmortization)}
                      className="text-xs font-bold text-[#2952E8] hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>
                        {showAmortization
                          ? "Ocultar Tabla de Amortización"
                          : `Ver corrida actuarial oficial para ${selectedCareer.name}`}
                      </span>
                    </button>
                  </div>

                  {showAmortization && (
                    <div className="mt-2 overflow-x-auto p-3 bg-white rounded-xl border border-[#CBD5E1] text-[11px]">
                      <div className="flex justify-between font-bold text-[#03185D] mb-2">
                        <span>Meta Carrera: ${effectiveCareerTuition.toLocaleString("en-US")}</span>
                        <span>Cuota Mensual Total: ${careerPadQuote.cuotaTotal} / mes</span>
                      </div>
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-[#E2E8F0] text-[#656565]">
                            <th className="py-1">Mes</th>
                            <th className="py-1">Aporte PAD</th>
                            <th className="py-1">Seguro RCB</th>
                            <th className="py-1">Interés Neto</th>
                            <th className="py-1 text-right">Saldo Final</th>
                          </tr>
                        </thead>
                        <tbody>
                          {amortizationSchedule.rows.map((row) => (
                            <tr
                              key={row.mes}
                              className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC]"
                            >
                              <td className="py-1 font-mono">{row.mes}</td>
                              <td className="py-1">${row.aportePad}</td>
                              <td className="py-1">${row.seguroMensual}</td>
                              <td className="py-1 text-[#16A34A]">
                                +${(row.interesMes - row.retencionMes).toFixed(2)}
                              </td>
                              <td className="py-1 font-bold text-right">
                                ${row.saldoFinal.toLocaleString("en-US")}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            FILA B14:D14: PAQUETE BENEFICIOS SOCIOS DINERS
           ======================================================== */}
        <section id="beneficios" className="py-20 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Título de Sección B14:D14 */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-[#03185D] tracking-tight uppercase">
                Paquete beneficios socios diners
              </h2>
              <div className="w-20 h-1 bg-[#2952E8] mx-auto mt-4 rounded-full" />
            </div>

            {/* 3 Pestañas Fieles a la Fila 14 */}
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 border-b-2 border-[#E2E8F0] mb-8 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("rcb")}
                  className={`py-3.5 px-4 text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer text-center ${
                    activeTab === "rcb"
                      ? "border-b-4 border-[#2952E8] text-[#03185D] bg-[#F8FAFC] rounded-t-xl"
                      : "border-b-4 border-transparent text-[#94A3B8] hover:text-[#03185D]"
                  }`}
                >
                  PESTAÑA RAUL COKA BARRIGA
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("diners")}
                  className={`py-3.5 px-4 text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer text-center ${
                    activeTab === "diners"
                      ? "border-b-4 border-[#2952E8] text-[#03185D] bg-[#F8FAFC] rounded-t-xl"
                      : "border-b-4 border-transparent text-[#94A3B8] hover:text-[#03185D]"
                  }`}
                >
                  PESTAÑA DINERS CLUB
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("uide")}
                  className={`py-3.5 px-4 text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer text-center ${
                    activeTab === "uide"
                      ? "border-b-4 border-[#2952E8] text-[#03185D] bg-[#F8FAFC] rounded-t-xl"
                      : "border-b-4 border-transparent text-[#94A3B8] hover:text-[#03185D]"
                  }`}
                >
                  PESTAÑA UIDE
                </button>
              </div>

              {/* Contenido Pestaña 1: RAUL COKA BARRIGA */}
              {activeTab === "rcb" && (
                <div className="bg-[#F8FAFC] p-8 rounded-2xl border border-[#E2E8F0] space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-[#03185D] text-white flex items-center justify-center font-bold text-sm">
                      RCB
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-[#03185D]">
                        Respaldo Financiero & Fiduciario — Raúl Coka Barriga
                      </h4>
                      <span className="text-xs text-[#656565]">
                        Líder fiduciario y de custodia de fondos educativos en el Ecuador
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-3.5 text-sm text-[#4A5568]">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#EBF0FF] text-[#2952E8] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.5 6.5L4.5 8.5L9.5 3.5" />
                        </svg>
                      </div>
                      <span>
                        <strong>Custodia Fiduciaria:</strong> Fondos administrados bajo fideicomiso mercantil autónomo, inembargable y auditado por la Superintendencia.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#EBF0FF] text-[#2952E8] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.5 6.5L4.5 8.5L9.5 3.5" />
                        </svg>
                      </div>
                      <span>
                        <strong>Seguro de Continuidad Educativa:</strong> Cobertura por invalidez o fallecimiento del tutor ($25 USD/mes) que garantiza el 100% de la meta universitaria proyectada.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#EBF0FF] text-[#2952E8] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.5 6.5L4.5 8.5L9.5 3.5" />
                        </svg>
                      </div>
                      <span>
                        <strong>Rentabilidad Programada:</strong> Rendimientos financieros que maximizan el fondo por sobre la inflación local.
                      </span>
                    </li>
                  </ul>
                </div>
              )}

              {/* Contenido Pestaña 2: DINERS CLUB */}
              {activeTab === "diners" && (
                <div className="bg-[#F8FAFC] p-8 rounded-2xl border border-[#E2E8F0] space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-[#03185D] text-white flex items-center justify-center font-bold text-sm">
                      DC
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-[#03185D]">
                        Beneficios Exclusivos Socios Diners Club
                      </h4>
                      <span className="text-xs text-[#656565]">
                        Flexibilidad de aportes, acumulación y privilegios para socios
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-3.5 text-sm text-[#4A5568]">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#EBF0FF] text-[#2952E8] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.5 6.5L4.5 8.5L9.5 3.5" />
                        </svg>
                      </div>
                      <span>
                        <strong>Débito Automático Programado:</strong> Aportes mensuales automáticos con 0% de comisión administrativa adicional.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#EBF0FF] text-[#2952E8] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.5 6.5L4.5 8.5L9.5 3.5" />
                        </svg>
                      </div>
                      <span>
                        <strong>Millas / Recompensas Club Miles:</strong> Cada aporte al plan educativo suma millas 1:1 en el programa Club Miles de Diners.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#EBF0FF] text-[#2952E8] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.5 6.5L4.5 8.5L9.5 3.5" />
                        </svg>
                      </div>
                      <span>
                        <strong>Facilidades de Diferido:</strong> Posibilidad de realizar aportes extraordinarios o regularizaciones con condiciones preferenciales.
                      </span>
                    </li>
                  </ul>
                </div>
              )}

              {/* Contenido Pestaña 3: UIDE */}
              {activeTab === "uide" && (
                <div className="bg-[#F8FAFC] p-8 rounded-2xl border border-[#E2E8F0] space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-[#910048] text-[#EAAA00] flex items-center justify-center font-bold text-sm">
                      UIDE
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-[#03185D]">
                        Ventajas Académicas & Admisión UIDE
                      </h4>
                      <span className="text-xs text-[#656565]">
                        Vinculación temprana y beneficios en la universidad #1 en innovación
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-3.5 text-sm text-[#4A5568]">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#EBF0FF] text-[#2952E8] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.5 6.5L4.5 8.5L9.5 3.5" />
                        </svg>
                      </div>
                      <span>
                        <strong>Congelamiento de Aranceles:</strong> Blindaje total contra incrementos futuros en la matrícula de la carrera de tu hijo.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#EBF0FF] text-[#2952E8] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.5 6.5L4.5 8.5L9.5 3.5" />
                        </svg>
                      </div>
                      <span>
                        <strong>Acceso Preferente al Ecosistema ASU:</strong> Conexión con programas de intercambio y titulación internacional con Arizona State University.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#EBF0FF] text-[#2952E8] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.5 6.5L4.5 8.5L9.5 3.5" />
                        </svg>
                      </div>
                      <span>
                        <strong>Talleres Vocacionales y Campus Pass:</strong> Talleres, bootcamps y uso de instalaciones universitarias desde etapas escolares.
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* ========================================================
                FILA B15:D15: DOS BOTONES DE ACCIÓN (Col B & Col D)
               ======================================================== */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12 items-center">
              {/* Col B (B15): Quiero comenzar mi plan de ahorro */}
              <div>
                <button
                  type="button"
                  onClick={() => openLeadModal("ahorro")}
                  className="w-full py-4 px-6 rounded-full text-center text-xs sm:text-sm font-bold uppercase tracking-wider diners-btn-primary shadow-md cursor-pointer"
                >
                  Quiero comenzar mi plan de ahorro
                </button>
              </div>

              {/* Col C (C15): Espacio intermedio (vacío como en el Excel) */}
              <div className="hidden md:block" />

              {/* Col D (D15): Quiero asesoría personalizada */}
              <div>
                <button
                  type="button"
                  onClick={() => openLeadModal("asesoria")}
                  className="w-full py-4 px-6 rounded-full text-center text-xs sm:text-sm font-bold uppercase tracking-wider diners-btn-secondary shadow-md cursor-pointer"
                >
                  Quiero asesoría personalizada
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            FILA B16:D16: CIERRE INSPIRACIONAL
           ======================================================== */}
        <section className="py-20 bg-gradient-to-b from-[#F0F5FF] via-white to-[#F8FAFC] text-center relative overflow-hidden border-b border-[#D5E2FF]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#03185D] uppercase">
              &ldquo;REINVENTEMOS EL FUTURO&rdquo;
            </h2>

            <p className="text-lg sm:text-xl text-[#313131] leading-relaxed font-medium max-w-3xl mx-auto">
              &ldquo;Cada aporte realizado hoy acerca a tu hijo a la universidad de sus sueños y le abre la puerta a experiencias que transformarán su futuro.&rdquo;
            </p>
          </div>
        </section>

        {/* ========================================================
            FILA B17:D17: SECCIÓN FAQ
           ======================================================== */}
        <section id="faq" className="py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-[#03185D] uppercase tracking-tight">
                SECCIÓN FAQ
              </h2>
              <div className="w-16 h-1 bg-[#2952E8] mx-auto mt-3 rounded-full" />
            </div>

            {/* Acordeón FAQ */}
            <div className="space-y-4">
              {[
                {
                  q: "¿Reinventors PAD es una tarjeta de crédito o un crédito educativo?",
                  a: "No, categóricamente no es una tarjeta de crédito. Es un programa de ahorro programado a futuro administrado bajo la figura de un fideicomiso educativo con el respaldo fiduciario de Raúl Coka Barriga y la alianza de Diners Club y la UIDE.",
                },
                {
                  q: "¿A qué edad de mi hijo puedo iniciar el plan de ahorro?",
                  a: "Puedes comenzar desde el primer año de edad de tu hijo hasta los 16 años. Mientras más temprano inicies, menor será el aporte mensual requerido y mayor será el fondo acumulado con beneficios de congelamiento arancelario en la UIDE.",
                },
                {
                  q: "¿Qué ocurre si mi hijo decide estudiar otra carrera o en otra sede?",
                  a: "El fondo acumulado es totalmente flexible. Puede ser aplicado a cualquier carrera de pregrado presencial u online de la UIDE (Quito, Loja, Guayaquil) o transferido conforme las reglas del contrato fiduciario con Raúl Coka Barriga.",
                },
                {
                  q: "¿Cuáles son los métodos de aporte con Diners Club?",
                  a: "Puedes programar un débito recurrente mensual a través de tu tarjeta Diners Club o TITANIUM sin costo adicional por transacción, sumando millas y beneficios del programa Club Miles 1:1.",
                },
                {
                  q: "¿Qué cobertura brinda el seguro de Raúl Coka Barriga?",
                  a: "Por un aporte fijo de $25.00 USD/mes, la póliza cubre el 100% de la colegiatura restante en caso de fallecimiento o incapacidad total permanente del tutor, garantizando que tu hijo culmine su carrera en la UIDE.",
                },
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaqIndex(openFaqIndex === idx ? null : idx)
                    }
                    className="w-full text-left px-6 py-4 font-bold text-[#03185D] flex justify-between items-center text-sm sm:text-base hover:bg-[#F8FAFC] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="ml-4 shrink-0 text-[#2952E8]">
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-200 ${
                          openFaqIndex === idx ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </button>
                  {openFaqIndex === idx && (
                    <div className="px-6 pb-4 text-sm text-[#4A5568] border-t border-[#F1F5F9] pt-3 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            FILA B18:D18: LOGOS DE LA ALIANZA
           ======================================================== */}
        <footer className="bg-white py-14 border-t border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 3 Columnas: logo uide | logo diners | logo raul coka barriga */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center py-6 border-b border-[#F1F5F9]">
              {/* Col B (B18): logo uide */}
              <div className="flex flex-col items-center">
                <div className="h-16 px-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center">
                  <img
                    src={getAssetPath("logos/uide-logo.webp")}
                    alt="Logo UIDE powered by ASU"
                    className="h-10 w-auto object-contain"
                  />
                </div>
              </div>

              {/* Col C (C18): logo diners */}
              <div className="flex flex-col items-center">
                <div className="h-16 px-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center">
                  <img
                    src={getAssetPath("logos/diners-logo.png")}
                    alt="Logo Diners Club International"
                    className="h-8 w-auto object-contain"
                  />
                </div>
              </div>

              {/* Col D (D18): logo raul coka barriga */}
              <div className="flex flex-col items-center">
                <div className="h-16 px-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center">
                  <img
                    src={getAssetPath("logos/rcb-logo.webp")}
                    alt="Logo Raúl Coka Barriga"
                    className="h-8 w-auto object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Copyright & Fiduciary Disclaimer */}
            <div className="mt-8 text-center text-xs text-[#94A3B8] space-y-1">
              <p>
                © 2026 Reinventors PAD. Todos los derechos reservados. Alianza UIDE, Diners Club del Ecuador y Raúl Coka Barriga.
              </p>
              <p className="text-[11px]">
                Reinventors PAD es un programa previsor de ahorro educativo universitario mediante fideicomiso mercantil autónomo. No constituye tarjeta de crédito ni emisión de deuda bancaria.
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* ========================================================
          MODAL VIDEO EXPLICATIVO (D3:D5)
         ======================================================== */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-white/20">
            <div className="p-4 bg-[#03185D] text-white flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider">
                VIDEO EXPLICATIVO — REINVENTORS PAD
              </span>
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video bg-black relative flex items-center justify-center overflow-hidden">
              <video
                controls
                autoPlay
                playsInline
                poster={getAssetPath("assets/video-logros-poster.jpg")}
                className="w-full h-full object-cover"
              >
                <source src={getAssetPath("assets/video-logros-800x450.mp4")} type="video/mp4" />
                Tu navegador no soporta la reproducción de video HTML5.
              </video>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL FORMULARIO DE ASESORÍA / INICIO DE PLAN (B15:D15)
         ======================================================== */}
      {leadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#CBD5E1]">
            <div className="p-5 bg-[#03185D] text-white flex justify-between items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block text-[#4C71FC]">
                  {leadType === "ahorro" ? "Plan de Ahorro Educativo" : "Asesoría Personalizada"}
                </span>
                <h4 className="text-base font-black">
                  {leadType === "ahorro" ? "Comenzar mi Plan de Ahorro" : "Solicitar Asesoría Personalizada"}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setLeadModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#313131] mb-1">
                    Nombre y Apellido *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="Ej. Carlos Mendoza"
                    className="w-full h-11 px-4 rounded-xl border border-[#CBD5E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2952E8]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#313131] mb-1">
                      Teléfono Móvil *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="0991234567"
                      className="w-full h-11 px-4 rounded-xl border border-[#CBD5E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2952E8]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#313131] mb-1">
                      Edad de tu hijo/a *
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={17}
                      required
                      value={formData.childAge}
                      onChange={(e) =>
                        setFormData({ ...formData, childAge: e.target.value })
                      }
                      className="w-full h-11 px-4 rounded-xl border border-[#CBD5E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2952E8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#313131] mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="tu-correo@dominio.com"
                    className="w-full h-11 px-4 rounded-xl border border-[#CBD5E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2952E8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#313131] mb-1">
                    ¿Eres socio Diners Club? *
                  </label>
                  <select
                    value={isDinersMember}
                    onChange={(e) => setIsDinersMember(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-[#CBD5E1] bg-white text-sm text-[#03185D] font-medium focus:outline-none focus:ring-2 focus:ring-[#2952E8]"
                  >
                    <option value="si">Sí, soy socio Diners Club / TITANIUM</option>
                    <option value="no">Aún no soy socio (quiero aplicar)</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider diners-btn-primary shadow-md cursor-pointer"
                  >
                    Enviar Solicitud
                  </button>
                </div>

                {isSubmitted && (
                  <div className="p-4 rounded-xl bg-[#DCFCE7] border border-[#86EFAC] text-xs text-[#166534] font-bold flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>¡Solicitud registrada con éxito! Un asesor especializado te contactará en menos de 24 horas.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
