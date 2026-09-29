"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  CAREERS_DATA,
  FAQ_DATA,
  UIDE_CAMPUSES,
  getCareersByCampus,
  getCampusExtras,
} from "@/lib/data";
import { Career } from "@/lib/types";
import {
  calculatePadQuote,
  generateAmortizationSchedule,
  TASA_NOMINAL_ANUAL,
  RETENCION_SRI,
  SEGURO_RCB_MENSUAL,
  MAX_CARGO_MENSUAL,
} from "@/lib/calculator";
import {
  Play,
  X,
  Check,
  ChevronDown,
  Shield,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Award,
  BookOpen,
  Calendar,
  FileText,
  Mail,
  User,
  Phone,
  Send,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Info,
} from "lucide-react";
import confetti from "canvas-confetti";
import { getAssetPath } from "@/lib/paths";

export default function Home() {
  // Video Modal State
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Campus & Career Selection
  const [selectedCampus, setSelectedCampus] = useState<string>("Quito");
  const [selectedCareerId, setSelectedCareerId] = useState<string>(
    CAREERS_DATA[0].id
  );
  const [applyPadScholarship, setApplyPadScholarship] = useState<boolean>(false);

  // Filtered Careers
  const availableCareers = useMemo(() => {
    const list = getCareersByCampus(selectedCampus);
    return list.length > 0 ? list : CAREERS_DATA;
  }, [selectedCampus]);

  const selectedCareer = useMemo(() => {
    const found = availableCareers.find((c) => c.id === selectedCareerId);
    return found || availableCareers[0] || CAREERS_DATA[0];
  }, [availableCareers, selectedCareerId]);

  // Complementary fees (Consejo Estudiantil, Seguro Universitario)
  const campusExtras = useMemo(
    () => getCampusExtras(selectedCampus),
    [selectedCampus]
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
  const [conversionType, setConversionType] = useState<"ahorro" | "asesoria">(
    "ahorro"
  );
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

  const handleCampusChange = (campus: string) => {
    setSelectedCampus(campus);
    const list = getCareersByCampus(campus);
    if (list.length > 0) {
      setSelectedCareerId(list[0].id);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
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
    <div className="min-h-screen bg-white text-[#313131] flex flex-col antialiased selection:bg-[#4C71FC] selection:text-white">
      {/* ========================================================
          1. TOP BAR DE MARCA (Modo Claro & Co-Branding UIDE x Diners)
         ======================================================== */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Co-Branding Oficial UIDE x Diners Club (Lineamientos Pág. 9) */}
            <div className="flex items-center gap-3 sm:gap-6">
              {/* Logo UIDE con Afiliación ASU */}
              <div className="flex items-center">
                <img
                  src={getAssetPath("logos/uide-logo.webp")}
                  alt="UIDE powered by Arizona State University"
                  className="h-10 w-auto object-contain"
                />
              </div>

              {/* Separador Vertical Oficial */}
              <div className="h-8 w-px bg-[#CBD5E1]" />

              {/* Logo Diners Club International */}
              <div className="flex items-center">
                <img
                  src={getAssetPath("logos/diners-logo.png")}
                  alt="Diners Club International"
                  className="h-8 w-auto object-contain"
                />
              </div>

              {/* Separador Vertical Secundario */}
              <div className="hidden md:block h-8 w-px bg-[#CBD5E1]" />

              {/* Logo Aliado Fiduciario RCB */}
              <div className="hidden md:flex items-center">
                <img
                  src={getAssetPath("logos/rcb-logo.webp")}
                  alt="Raúl Coka Barriga"
                  className="h-7 w-auto object-contain"
                />
              </div>
            </div>

            {/* CTAs en Azul Diners Claro */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollToSection("cotizador")}
                className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase diners-btn-secondary cursor-pointer"
              >
                Simular Ahorro
              </button>
              <button
                type="button"
                onClick={() => {
                  setConversionType("ahorro");
                  scrollToSection("contacto-form");
                }}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase diners-btn-primary shadow-xs cursor-pointer"
              >
                Quiero mi Plan
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ========================================================
            2. HERO SECTION (Fiel a REINVENTORS PAD B2:C5 & D3:D5)
           ======================================================== */}
        <section
          className="relative min-h-[640px] lg:min-h-[740px] flex items-center border-b border-[#E2E8F0] overflow-hidden bg-[#F8FAFC]"
          style={{
            backgroundImage: `url('${getAssetPath("assets/reinventors_pad_hero.jpg")}')`,
            backgroundSize: "cover",
            backgroundPosition: "right 18% center",
          }}
        >
          {/* Subtle atmospheric vignette only on left edge to frame the card, leaving the family 100% bright and clear */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/40 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Columna Izquierda: Tarjeta Editorial Glassmorphic */}
              <div className="lg:col-span-7 xl:col-span-6">
                <div className="bg-white/94 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-white/85 shadow-[0_25px_60px_-15px_rgba(3,24,93,0.16)] space-y-6">
                  {/* Co-Branding Tag */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF0FF] text-[#03185D] text-xs font-black tracking-wider uppercase border border-[#D5E2FF]">
                    <span className="text-[#910048] font-black">UIDE</span>
                    <span className="text-[#656565] text-[10px]">✕</span>
                    <span className="text-[#03185D] font-black">DINERS CLUB</span>
                    <span className="text-[#2952E8] ml-1">● Programa de Ahorro Futuro</span>
                  </div>

                  {/* B2: REINVENTORS PAD */}
                  <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-black text-[#03185D] tracking-tight leading-[1.06]">
                    REINVENTORS PAD
                  </h1>

                  {/* Subtítulo B2 */}
                  <p className="text-lg sm:text-xl font-bold text-[#2952E8] leading-snug">
                    El futuro de tus hijos lo reiventas desde hoy
                  </p>

                  {/* Lead Paragraph B3:C5 */}
                  <p className="text-sm sm:text-base text-[#4A5568] leading-relaxed border-l-4 border-[#2952E8] pl-4 py-1">
                    &ldquo;Reinventors PAD es un programa de ahorro educativo en alianza
                    entre UIDE, Diners Club y RCB que permite a las familias planificar
                    el futuro universitario de sus hijos mientras acceden a
                    experiencias de desarrollo personal, académico y familiar&rdquo;
                  </p>

                  {/* Clave Fiduciaria: NO es tarjeta de crédito */}
                  <div className="p-3.5 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#16A34A] flex items-center justify-center text-white shrink-0 shadow-xs">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <p className="text-xs text-[#166534] font-medium leading-relaxed">
                      <strong>Fondo Garantizado de Ahorro Futuro:</strong> No es una
                      tarjeta de crédito ni instrumento de endeudamiento. Es un fideicomiso
                      mercantil autónomo y previsor para blindar la colegiatura superior
                      de tus hijos.
                    </p>
                  </div>

                  {/* CTAs B15:D15 */}
                  <div className="flex flex-wrap gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setConversionType("ahorro");
                        scrollToSection("contacto-form");
                      }}
                      className="px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider diners-btn-primary shadow-sm cursor-pointer"
                    >
                      Quiero comenzar mi plan de ahorro
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setConversionType("asesoria");
                        scrollToSection("contacto-form");
                      }}
                      className="px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider diners-btn-secondary cursor-pointer"
                    >
                      Quiero asesoría personalizada
                    </button>
                  </div>

                  {/* Image Dimension Badge for Hero asset */}
                  <div className="pt-1 flex items-center gap-2 text-[11px] font-mono text-[#656565]">
                    <span className="w-2 h-2 rounded-full bg-[#2952E8]" />
                    <span>
                      Asset Hero Lifestyle: <strong>1920 × 850 px</strong> (Desktop) · 768 × 600 px (Tablet) · 420 × 500 px (Móvil)
                    </span>
                  </div>
                </div>
              </div>

              {/* Columna Derecha: La fotografía de la familia queda totalmente descubierta y visible, con disparador del Video Explicativo */}
              <div className="lg:col-span-5 xl:col-span-6 flex flex-col justify-end items-end h-full pt-6 lg:pt-0">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setVideoModalOpen(true)}
                    className="group flex items-center gap-4 p-3 pr-6 rounded-2xl bg-white/94 backdrop-blur-md border border-white/80 shadow-2xl hover:bg-[#03185D] hover:text-white transition-all transform hover:scale-105 duration-200 cursor-pointer"
                    aria-label="Reproducir Video Explicativo"
                  >
                    <div className="w-13 h-13 rounded-xl bg-[#2952E8] group-hover:bg-white text-white group-hover:text-[#03185D] flex items-center justify-center shadow-md transition-colors shrink-0">
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-black tracking-widest uppercase block text-[#03185D] group-hover:text-white">
                        VIDEO EXPLICATIVO
                      </span>
                      <span className="text-[11px] text-[#656565] group-hover:text-white/80 block mt-0.5">
                        Alianza UIDE + Diners Club + RCB (2 min)
                      </span>
                      <span className="text-[10px] text-[#2952E8] group-hover:text-white/90 font-bold block mt-0.5">
                        Ver reproducción en video →
                      </span>
                    </div>
                  </button>

                  <div className="mt-2 text-right">
                    <span className="text-[10px] font-mono bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded">
                      Poster Video: 800 × 450 px (16:9)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            3. PILARES DEL PROGRAMA (Fiel a Fila 6: B6:D7)
           ======================================================== */}
        <section className="py-16 bg-[#F8FAFC] border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="pill-badge bg-white text-[#03185D] border border-[#E2E8F0] shadow-xs mb-3">
                Pilares del Programa
              </span>
              <h2 className="text-3xl font-black text-[#03185D] tracking-tight">
                Un modelo integral para el futuro de tu familia
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pilar 1: B6:B7 */}
              <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#EBF0FF] text-[#4C71FC] flex items-center justify-center mb-6">
                    <Shield className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-black text-[#03185D] uppercase tracking-wide mb-3">
                    SEGURIDAD FINANCIERA
                  </h3>
                  <p className="text-sm text-[#4A5568] leading-relaxed">
                    Un fondo para educación superior de tus hijos
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#F1F5F9] text-xs font-semibold text-[#4C71FC] flex items-center justify-between">
                  <span>Fideicomiso & Respaldo RCB</span>
                  <span className="text-[10px] font-mono text-[#94A3B8]">
                    Icono: 80 × 80 px
                  </span>
                </div>
              </div>

              {/* Pilar 2: C6:C7 */}
              <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#EBF0FF] text-[#4C71FC] flex items-center justify-center mb-6">
                    <TrendingUp className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-black text-[#03185D] uppercase tracking-wide mb-3">
                    DESARROLLO INTEGRAL
                  </h3>
                  <p className="text-sm text-[#4A5568] leading-relaxed">
                    Actividades, talleres y experiencias para potenciar su talento
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#F1F5F9] text-xs font-semibold text-[#4C71FC] flex items-center justify-between">
                  <span>Acompañamiento vocacional continuo</span>
                  <span className="text-[10px] font-mono text-[#94A3B8]">
                    Icono: 80 × 80 px
                  </span>
                </div>
              </div>

              {/* Pilar 3: D6:D7 */}
              <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#EBF0FF] text-[#4C71FC] flex items-center justify-center mb-6">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-black text-[#03185D] uppercase tracking-wide mb-3">
                    VINCULACIÓN UNIVERSITARIA TEMPRANA
                  </h3>
                  <p className="text-sm text-[#4A5568] leading-relaxed">
                    Acceso progresivo al ecosistema de la universidad #1 en innovación de Ecuador
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#F1F5F9] text-xs font-semibold text-[#4C71FC] flex items-center justify-between">
                  <span>Experiencia Arizona State University</span>
                  <span className="text-[10px] font-mono text-[#94A3B8]">
                    Icono: 80 × 80 px
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            4. NUESTRAS CARRERAS (Fiel a Fila 8-10: B8:D10)
           ======================================================== */}
        <section id="carreras" className="py-20 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Título de Sección B8:D8 */}
            <div className="max-w-4xl mx-auto text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-black text-[#03185D] tracking-tight">
                Nuestras Carreras: una experiencia universitaria que transforma el futuro de tu hijo/a
              </h2>
              <div className="w-20 h-1 bg-[#4C71FC] mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Columna Izquierda: Copy Institucional B9:B10 + 5 Viñetas */}
              <div className="lg:col-span-6 space-y-6">
                <p className="text-base text-[#4A5568] leading-relaxed">
                  &ldquo;En la UIDE, no solo eliges una carrera, eliges una formación
                  con visión global. Tu hijo/a accederá a programas académicos
                  conectados con las tendencias del mundo, experiencias internacionales,
                  certificaciones de valor profesional y oportunidades únicas a través
                  de alianzas estratégicas como <strong>Arizona State University (ASU)</strong>.
                  Porque en la UIDE no nos preparamos para el futuro: lo reinventamos.&rdquo;
                </p>

                {/* 5 Viñetas Oficiales (✔) */}
                <div className="space-y-3.5 bg-[#F8FAFC] p-6 rounded-2xl border border-[#E2E8F0]">
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
                      <span className="text-sm font-semibold text-[#03185D]">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Asset Dimension Tag */}
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#656565] bg-[#F1F5F9] px-3.5 py-2 rounded-lg">
                  <Info className="w-4 h-4 text-[#4C71FC]" />
                  <span>
                    Asset Imagen Carreras / Campus: <strong>600 × 400 px</strong> (Ratio 3:2)
                  </span>
                </div>
              </div>

              {/* Columna Derecha: C9:D10 Menú desplegable carreras pregrado UIO & Valor promedio carrera */}
              <div className="lg:col-span-6 bg-white p-8 rounded-2xl border-2 border-[#D5E2FF] shadow-lg space-y-6">
                <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#E2E8F0] gap-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4C71FC]">
                      Pregrado UIDE · Catálogo Completo
                    </span>
                    <h3 className="text-xl font-black text-[#03185D]">
                      Explora Carreras y Proyección
                    </h3>
                  </div>

                  {/* Campus Selector */}
                  <div className="flex gap-1 bg-[#F1F5F9] p-1 rounded-xl">
                    {UIDE_CAMPUSES.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => handleCampusChange(c)}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          selectedCampus === c
                            ? "bg-[#03185D] text-white"
                            : "text-[#656565] hover:text-[#03185D]"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dropdown: Menú desplegable carreras pregrado */}
                <div>
                  <label
                    htmlFor="career-select"
                    className="block text-xs font-bold uppercase tracking-wider text-[#313131] mb-2"
                  >
                    Menú desplegable carreras pregrado {selectedCampus}:
                  </label>
                  <div className="relative">
                    <select
                      id="career-select"
                      value={selectedCareerId}
                      onChange={(e) => setSelectedCareerId(e.target.value)}
                      className="w-full h-12 pl-4 pr-10 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-[#03185D] font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#4C71FC] appearance-none cursor-pointer"
                    >
                      {availableCareers.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.faculty}) — {c.semesters} semestres
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#03185D]">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Toggle Beca PAD UIDE */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div>
                    <span className="text-xs font-bold text-[#03185D] block">
                      Aplicar Beca Reinventors PAD (21% - 25%)
                    </span>
                    <span className="text-[11px] text-[#656565]">
                      Beneficio preferencial exclusivo para socios Diners Club
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setApplyPadScholarship(!applyPadScholarship)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                      applyPadScholarship ? "bg-[#28A745]" : "bg-[#CBD5E1]"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        applyPadScholarship ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Dynamic Display: Valor promedio carrera */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF] border border-[#BFDBFE]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#656565] block mb-1">
                    Valor promedio carrera estimado:
                  </span>
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <span className="text-3xl sm:text-4xl font-black text-[#03185D] tracking-tight">
                        ${effectiveCareerTuition.toLocaleString("en-US")}
                      </span>
                      <span className="text-xs text-[#656565] block mt-0.5 font-medium">
                        {applyPadScholarship
                          ? "Inversión total con Beca PAD incluida"
                          : "Inversión referencial total estimada"}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-[#4C71FC] block">
                        $
                        {Math.round(
                          effectiveCareerTuition / selectedCareer.semesters
                        ).toLocaleString("en-US")}{" "}
                        / semestre
                      </span>
                      <span className="text-xs text-[#656565] font-medium">
                        {selectedCareer.semesters} semestres
                      </span>
                    </div>
                  </div>

                  {/* Complementary Fees breakdown */}
                  <div className="mt-4 pt-3 border-t border-[#DBEAFE] space-y-1 text-xs text-[#1E40AF]">
                    <div className="flex justify-between">
                      <span>• Consejo Estudiantil (anual):</span>
                      <span className="font-bold">
                        ${campusExtras.consejoEstudiantil} USD
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Seguro Universitario (semestral):</span>
                      <span className="font-bold">
                        ${campusExtras.seguroUniversitario} USD
                      </span>
                    </div>
                    <p className="text-[10px] text-[#656565] pt-1 italic">
                      * Precios aproximados oficiales UIDE. Para congelar aranceles y acceder a beneficios, inicia tu plan en el cotizador.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            5. ¿POR QUÉ EMPEZAR HOY? + COTIZADOR (Fiel a Fila 11-13)
           ======================================================== */}
        <section id="cotizador" className="py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="pill-badge bg-white text-[#4C71FC] border border-[#CBD5E1] shadow-xs mb-3">
                Planificación Financiera
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#03185D] tracking-tight">
                ¿Por qué empezar hoy?
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Columna 1: Si empiezas temprano (B12:B13) */}
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
                    <div className="flex items-center gap-3 text-sm font-bold text-[#1F2937]">
                      <div className="w-5 h-5 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.5 6.5L4.5 8.5L9.5 3.5" />
                        </svg>
                      </div>
                      <span>Menor aporte mensual</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold text-[#1F2937]">
                      <div className="w-5 h-5 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.5 6.5L4.5 8.5L9.5 3.5" />
                        </svg>
                      </div>
                      <span>Mayor fondo acumulado</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold text-[#1F2937]">
                      <div className="w-5 h-5 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.5 6.5L4.5 8.5L9.5 3.5" />
                        </svg>
                      </div>
                      <span>Más años de beneficios</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold text-[#1F2937]">
                      <div className="w-5 h-5 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.5 6.5L4.5 8.5L9.5 3.5" />
                        </svg>
                      </div>
                      <span>Más oportunidades para tu hijo</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-[#F1F5F9] text-[11px] text-[#15803D] font-semibold bg-[#F0FDF4] p-3 rounded-lg">
                  Impacto: El rendimiento fiduciario y los aportes programados reducen hasta un 40% el desembolso total de la carrera.
                </div>
              </div>

              {/* Columna 2: Si esperas (C12:C13) */}
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
                    <div className="flex items-center gap-3 text-sm font-bold text-[#374151]">
                      <div className="w-5 h-5 rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                          <path d="M3 3L9 9M9 3L3 9" />
                        </svg>
                      </div>
                      <span>Mayor esfuerzo financiero</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold text-[#374151]">
                      <div className="w-5 h-5 rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                          <path d="M3 3L9 9M9 3L3 9" />
                        </svg>
                      </div>
                      <span>Menos beneficios acumulados</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold text-[#374151]">
                      <div className="w-5 h-5 rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                          <path d="M3 3L9 9M9 3L3 9" />
                        </svg>
                      </div>
                      <span>Menor tiempo de planificación</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-[#F1F5F9] text-[11px] text-[#B91C1C] font-semibold bg-[#FEF2F2] p-3 rounded-lg">
                  Riesgo: Al llegar el grado de bachillerato, los costos semestrales se deben cubrir de golpe sin fondo de respaldo.
                </div>
              </div>

              {/* Columna 3: calcula tu ahorro ahora (D12:D13) */}
              <div className="lg:col-span-6 bg-white rounded-2xl p-8 border-2 border-[#4C71FC] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#4C71FC] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-bl-xl">
                  Simulador Activo
                </div>

                <h3 className="text-xl font-black text-[#03185D] mb-1">
                  calcula tu ahorro ahora
                </h3>
                <p className="text-xs text-[#656565] mb-6">
                  Formato oficial del cotizador: ajusta la edad actual de tu hijo y tu capacidad de ahorro
                </p>

                {/* Sliders Interactivos */}
                <div className="space-y-6">
                  {/* Slider 1: Edad del hijo */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-bold uppercase text-[#03185D]">
                        Edad actual de tu hijo/a:
                      </span>
                      <span className="text-base font-black text-[#4C71FC]">
                        {childAge} {childAge === 1 ? "año" : "años"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={16}
                      value={childAge}
                      onChange={(e) => setChildAge(parseInt(e.target.value, 10))}
                      className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#4C71FC]"
                    />
                    <div className="flex justify-between text-[10px] text-[#94A3B8] mt-1 font-mono">
                      <span>1 año (Bebé)</span>
                      <span>8 años (Escuela)</span>
                      <span>16 años (Colegio)</span>
                    </div>
                  </div>

                  {/* Slider 2: Aporte mensual */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-bold uppercase text-[#03185D]">
                        Aporte mensual programado:
                      </span>
                      <span className="text-base font-black text-[#4C71FC]">
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
                      className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#4C71FC]"
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
                      <span className="text-2xl font-black text-[#28A745]">
                        ${projectedFund.toLocaleString("en-US")}
                      </span>
                    </div>
                  </div>

                  {/* Botones de Acción */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setConversionType("ahorro");
                        scrollToSection("contacto-form");
                      }}
                      className="flex-1 py-3 rounded-full text-center text-xs font-bold uppercase tracking-wider diners-btn-primary cursor-pointer shadow-sm"
                    >
                      Guardar Cotización y Recibir Asesoría
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowEmailPreview(!showEmailPreview)}
                      className="px-5 py-3 rounded-full text-center text-xs font-bold uppercase tracking-wider diners-btn-secondary flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Mail className="w-4 h-4 text-[#4C71FC]" />
                      <span>
                        {showEmailPreview
                          ? "Ocultar Formato Correo"
                          : "Ver Formato Correo Adjunto"}
                      </span>
                    </button>
                  </div>

                  {/* Formato Cotizador Correo Adjunto (Desplegable) */}
                  {showEmailPreview && (
                    <div className="mt-4 p-5 rounded-xl bg-[#F8FAFC] border-2 border-dashed border-[#CBD5E1] text-left space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-[#E2E8F0]">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#28A745]" />
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
                            Programa: Reinventors PAD (Fideicomiso RCB - Diners Club - UIDE)
                          </span>
                          <span className="text-[#28A745]">Plan Vigente 2026</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] text-[#4A5568] py-1 border-y border-[#F1F5F9]">
                          <div>• Edad actual hijo: <strong>{childAge} años</strong></div>
                          <div>• Aporte mensual: <strong>${monthlyContribution} / mes</strong></div>
                          <div>• Años de capitalización: <strong>{savingYears} años ({savingMonths} meses)</strong></div>
                          <div>• Aporte total programado: <strong>${totalCapitalContributed.toLocaleString("en-US")}</strong></div>
                          <div>• Rendimiento fiduciario est.: <strong className="text-[#28A745]">+${projectedInterestNet.toLocaleString("en-US")}</strong></div>
                          <div>• Fondo total proyectado: <strong className="text-[#03185D]">${projectedFund.toLocaleString("en-US")}</strong></div>
                        </div>
                        <p className="text-[10px] text-[#656565] italic">
                          * Este documento es la corrida financiera enviada automáticamente al correo del socio Diners Club al solicitar asesoría, respaldada por la fiduciaria Raúl Coka Barriga.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Botón Amortización Desplegable */}
                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => setShowAmortization(!showAmortization)}
                      className="text-xs font-bold text-[#4C71FC] hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
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
                    <div className="mt-3 overflow-x-auto p-3 bg-white rounded-xl border border-[#CBD5E1] text-[11px]">
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
                              <td className="py-1 text-[#28A745]">
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
            6. PAQUETE BENEFICIOS SOCIOS DINERS (Fiel a Fila 14: B14:D14)
           ======================================================== */}
        <section id="beneficios" className="py-20 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-[#03185D] tracking-tight">
                Paquete beneficios socios diners
              </h2>
              <p className="text-sm text-[#656565] mt-2">
                Selecciona cada entidad aliada para conocer las ventajas exclusivas integradas en Reinventors PAD:
              </p>
            </div>

            {/* Pestañas Interactivas (Tabs: RCB | DINERS CLUB | UIDE) */}
            <div className="max-w-4xl mx-auto">
              <div className="flex border-b-2 border-[#E2E8F0] mb-8 justify-center gap-2 sm:gap-6">
                <button
                  type="button"
                  onClick={() => setActiveTab("rcb")}
                  className={`px-4 sm:px-8 py-3 text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === "rcb"
                      ? "border-b-4 border-[#4C71FC] text-[#03185D]"
                      : "border-b-4 border-transparent text-[#94A3B8] hover:text-[#03185D]"
                  }`}
                >
                  PESTAÑA RAUL COKA BARRIGA
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("diners")}
                  className={`px-4 sm:px-8 py-3 text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === "diners"
                      ? "border-b-4 border-[#4C71FC] text-[#03185D]"
                      : "border-b-4 border-transparent text-[#94A3B8] hover:text-[#03185D]"
                  }`}
                >
                  PESTAÑA DINERS CLUB
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("uide")}
                  className={`px-4 sm:px-8 py-3 text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === "uide"
                      ? "border-b-4 border-[#4C71FC] text-[#03185D]"
                      : "border-b-4 border-transparent text-[#94A3B8] hover:text-[#03185D]"
                  }`}
                >
                  PESTAÑA UIDE
                </button>
              </div>

              {/* Tab 1: PESTAÑA RAUL COKA BARRIGA */}
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
                  <ul className="space-y-3 text-sm text-[#4A5568]">
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

              {/* Tab 2: PESTAÑA DINERS CLUB */}
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
                  <ul className="space-y-3 text-sm text-[#4A5568]">
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

              {/* Tab 3: PESTAÑA UIDE */}
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
                  <ul className="space-y-3 text-sm text-[#4A5568]">
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

            {/* Botones de Acción B15:D15 */}
            <div className="max-w-xl mx-auto mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={() => {
                  setConversionType("ahorro");
                  scrollToSection("contacto-form");
                }}
                className="py-4 px-8 rounded-full text-center text-xs font-bold uppercase tracking-wider diners-btn-primary shadow-md cursor-pointer"
              >
                Quiero comenzar mi plan de ahorro
              </button>
              <button
                type="button"
                onClick={() => {
                  setConversionType("asesoria");
                  scrollToSection("contacto-form");
                }}
                className="py-4 px-8 rounded-full text-center text-xs font-bold uppercase tracking-wider diners-btn-secondary cursor-pointer"
              >
                Quiero asesoría personalizada
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================
            7. CIERRE INSPIRACIONAL (Fiel a Fila 16: B16:D16)
           ======================================================== */}
        <section className="py-20 bg-gradient-to-b from-[#F0F5FF] via-white to-[#F8FAFC] text-center relative overflow-hidden border-y border-[#D5E2FF]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
            <span className="pill-badge bg-white text-[#03185D] border border-[#CBD5E1] shadow-xs">
              UIDE · Diners Club · RCB
            </span>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#03185D] uppercase">
              &ldquo;REINVENTEMOS EL FUTURO&rdquo;
            </h2>

            <p className="text-lg sm:text-xl text-[#313131] leading-relaxed font-medium max-w-3xl mx-auto">
              &ldquo;Cada aporte realizado hoy acerca a tu hijo a la universidad de sus sueños y le abre la puerta a experiencias que transformarán su futuro.&rdquo;
            </p>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => {
                  setConversionType("ahorro");
                  scrollToSection("contacto-form");
                }}
                className="inline-flex items-center justify-center px-10 py-4 rounded-full text-xs font-bold tracking-widest uppercase diners-btn-primary shadow-lg shadow-blue-500/25 cursor-pointer"
              >
                Comenzar Plan de Ahorro Educativo
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================
            8. SECCIÓN FAQ (Fiel a Fila 17: B17:D17)
           ======================================================== */}
        <section id="faq" className="py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-[#03185D] uppercase tracking-tight">
                SECCIÓN FAQ
              </h2>
              <p className="text-xs text-[#656565] uppercase font-bold tracking-wider mt-1">
                Preguntas frecuentes sobre el programa de ahorro educativo Reinventors PAD
              </p>
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
            9. FORMULARIO DE ASESORÍA / REGISTRO
           ======================================================== */}
        <section
          id="contacto-form"
          className="py-16 bg-white border-b border-[#E2E8F0]"
        >
          <div className="max-w-xl mx-auto px-4 sm:px-6">
            <div className="bg-[#F8FAFC] p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
              <h3 className="text-xl font-black text-[#03185D] text-center mb-1">
                Solicita tu Asesoría Personalizada
              </h3>
              <p className="text-xs text-[#656565] text-center mb-6">
                Un asesor de Diners Club y UIDE preparará la corrida financiera exacta para tu familia
              </p>

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
                    className="w-full h-11 px-4 rounded-xl border border-[#CBD5E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#4C71FC]"
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
                      className="w-full h-11 px-4 rounded-xl border border-[#CBD5E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#4C71FC]"
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
                      className="w-full h-11 px-4 rounded-xl border border-[#CBD5E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#4C71FC]"
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
                    className="w-full h-11 px-4 rounded-xl border border-[#CBD5E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#4C71FC]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#313131] mb-1">
                    ¿Eres socio Diners Club? *
                  </label>
                  <select
                    value={isDinersMember}
                    onChange={(e) => setIsDinersMember(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-[#CBD5E1] bg-white text-sm text-[#03185D] font-medium focus:outline-none focus:ring-2 focus:ring-[#4C71FC]"
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
                    Enviar Solicitud de Plan
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
        </section>

        {/* ========================================================
            10. FOOTER & LOGOS ALIANZA (Fiel a Fila 18: B18:D18)
           ======================================================== */}
        <footer className="bg-white py-12 border-t border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#94A3B8]">
                Alianza Estratégica Tripartita
              </span>
            </div>

            {/* B18:D18 Logos de la Alianza con Dimensiones Oficiales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center py-6 border-y border-[#F1F5F9]">
              {/* Logo UIDE (B18) */}
              <div className="flex flex-col items-center">
                <div className="h-16 px-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center">
                  <img
                    src={getAssetPath("logos/uide-logo.webp")}
                    alt="Logo UIDE powered by ASU"
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <span className="text-[10px] font-mono text-[#94A3B8] mt-2">
                  Asset Oficial: <strong>220 × 65 px</strong>
                </span>
              </div>

              {/* Logo Diners (C18) */}
              <div className="flex flex-col items-center">
                <div className="h-16 px-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center">
                  <img
                    src={getAssetPath("logos/diners-logo.png")}
                    alt="Logo Diners Club International"
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <span className="text-[10px] font-mono text-[#94A3B8] mt-2">
                  Asset Oficial: <strong>220 × 60 px</strong>
                </span>
              </div>

              {/* Logo Raul Coka Barriga (D18) */}
              <div className="flex flex-col items-center">
                <div className="h-16 px-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center">
                  <img
                    src={getAssetPath("logos/rcb-logo.webp")}
                    alt="Logo Raúl Coka Barriga"
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <span className="text-[10px] font-mono text-[#94A3B8] mt-2">
                  Asset Oficial: <strong>200 × 60 px</strong>
                </span>
              </div>
            </div>

            {/* Copyright & Disclaimer */}
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
                Video Explicativo — Reinventors PAD
              </span>
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video bg-black flex flex-col items-center justify-center text-white p-6 text-center">
              <Play className="w-16 h-16 text-[#4C71FC] mb-4 fill-current" />
              <h4 className="text-xl font-bold mb-2">Video de Inducción para Familias</h4>
              <p className="text-xs text-white/70 max-w-md">
                Reproductor preparado para enlazar con la URL oficial de YouTube o Vimeo del programa institucional UIDE × Diners Club.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
