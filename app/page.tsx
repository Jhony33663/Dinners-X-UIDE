"use client";

import React, { useState, useMemo } from "react";
import SmoothScrollProvider from "@/components/smooth-scroll/SmoothScrollProvider";
import TopographyCanvas from "@/components/canvas/TopographyCanvas";
import PanoramicView from "@/components/dashboard/PanoramicView";
import { CAREERS_DATA, FAQ_DATA, UIDE_CAMPUSES, getCareersByCampus, getCampusExtras } from "@/lib/data";
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
  CheckCircle2,
  Shield,
  ShieldCheck,
  TrendingUp,
  Plane,
  AlertTriangle,
  Table as TableIcon,
  Send,
  Lock,
  CreditCard,
  UserCheck,
  Sparkles,
  Info,
  Calendar,
  DollarSign,
  MapPin,
  GraduationCap,
  HelpCircle,
} from "lucide-react";
import confetti from "canvas-confetti";
import { getAssetPath } from "@/lib/paths";

export default function Home() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState<string>("Quito");
  const [selectedCareer, setSelectedCareer] = useState<Career>(CAREERS_DATA[0]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Available Careers by selected campus from official cotizador
  const availableCareers = useMemo(() => {
    const list = getCareersByCampus(selectedCampus);
    return list.length > 0 ? list : CAREERS_DATA;
  }, [selectedCampus]);

  // Aranceles complementarios por sede (Consejo Estudiantil, Seguro Universitario, Exámenes)
  const campusExtras = useMemo(
    () => getCampusExtras(selectedCampus),
    [selectedCampus]
  );

  // Simulator State ("calcula tu ahorro ahora")
  const [childAge, setChildAge] = useState<number>(8);
  const [applyPadScholarship, setApplyPadScholarship] = useState<boolean>(false);
  const [targetGoal, setTargetGoal] = useState<number>(CAREERS_DATA[0].totalTuitionRef);
  const [isCustomGoal, setIsCustomGoal] = useState<boolean>(false);
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  // Form State
  const [conversionType, setConversionType] = useState<"ahorro" | "asesoria">("ahorro");
  const [isDinersMember, setIsDinersMember] = useState<boolean>(true);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(true);
  const [dataConsent, setDataConsent] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sftpPayload, setSftpPayload] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    cedula: "",
    phone: "",
    email: "",
    city: "Quito",
  });

  // Official Financial Calculations via lib/calculator.ts
  const padResult = useMemo(
    () => calculatePadQuote(targetGoal, childAge),
    [targetGoal, childAge]
  );

  // Amortization Schedule Data
  const amortizationData = useMemo(
    () => generateAmortizationSchedule(targetGoal, childAge, 6),
    [targetGoal, childAge]
  );

  const handleCareerChange = (career: Career) => {
    setSelectedCareer(career);
    if (!isCustomGoal) {
      if (applyPadScholarship && career.totalConBeca) {
        setTargetGoal(career.totalConBeca);
      } else {
        setTargetGoal(career.totalTuitionRef);
      }
    }
  };

  const handleToggleScholarship = (apply: boolean) => {
    setApplyPadScholarship(apply);
    if (!isCustomGoal) {
      if (apply && selectedCareer.totalConBeca) {
        setTargetGoal(selectedCareer.totalConBeca);
      } else {
        setTargetGoal(selectedCareer.totalTuitionRef);
      }
    }
  };

  const handleCampusChange = (campus: string) => {
    setSelectedCampus(campus);
    const list = getCareersByCampus(campus);
    if (list.length > 0) {
      setSelectedCareer(list[0]);
      if (!isCustomGoal) {
        if (applyPadScholarship && list[0].totalConBeca) {
          setTargetGoal(list[0].totalConBeca);
        } else {
          setTargetGoal(list[0].totalTuitionRef);
        }
      }
    }
  };

  const scrollToSimulator = () => {
    const el = document.getElementById("cotizador");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSavingsForm = () => {
    setConversionType("ahorro");
    const el = document.getElementById("formulario");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAdvisoryForm = () => {
    setConversionType("asesoria");
    const el = document.getElementById("formulario");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFaq = () => {
    const el = document.getElementById("faq");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      record_id: `PAD-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toISOString(),
      action_type:
        conversionType === "ahorro"
          ? "START_SAVINGS_PLAN_CONTRACT"
          : "PERSONALIZED_ADVISORY_REQUEST",
      program: "REINVENTORS PAD (UIDE x Diners Club x Raul Coka Barriga)",
      simulation: {
        career_name: selectedCareer.name,
        target_goal_usd: targetGoal,
        child_age_years: childAge,
        term_months: padResult.plazoMeses,
        monthly_pad_savings_usd: padResult.aportePad,
        monthly_rcb_insurance_usd: padResult.seguroRcb,
        total_monthly_quote_usd: padResult.cuotaTotal,
        daily_effort_usd: padResult.esfuerzoDiario,
        sum_insured_rcb_usd: padResult.sumaAsegurada,
        net_interest_earned_usd: padResult.interesesNetos,
        clubmiles_projected: padResult.clubMiles,
      },
      client_data: {
        full_name: formData.fullName || "Santiago Paredes",
        national_id: formData.cedula || "1719284751",
        phone_number: formData.phone || "0998765432",
        email_address: formData.email || "santiago.paredes@example.com",
        city: formData.city,
        is_diners_club_member: isDinersMember,
        dpa_lopdp_consent: dataConsent,
        terms_accepted: termsAccepted,
        sftp_delivery_target: "sftp://secure-leads.dinersclub.com.ec/pad/inbound/",
      },
    };

    setSftpPayload(JSON.stringify(payload, null, 2));
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#910048", "#002D72", "#EAAA00", "#FFFFFF"],
      });
    } catch {}
  };

  return (
    <SmoothScrollProvider>
      <main className="relative min-h-screen bg-[#08090C] text-white selection:bg-[#910048] selection:text-white pb-12 w-full max-w-full overflow-x-hidden">
        {/* Procedural WebGL Andean Mountain Wireframe Background with Soft Clouds & Atmospheric Misty Peaks */}
        <TopographyCanvas />

        {/* ========================================================
            HERO PANORAMIC VIEW MATCHING EXACTLY THE REFERENCE IMAGE
           ======================================================== */}
        <PanoramicView
          onOpenVideo={() => setVideoModalOpen(true)}
          onOpenSimulator={scrollToSimulator}
          onOpenSavingsForm={scrollToSavingsForm}
          onOpenAdvisoryForm={scrollToAdvisoryForm}
          onScrollToFaq={scrollToFaq}
        />

        {/* ========================================================
            SECTION: NUESTRAS CARRERAS (UIDE × ASU)
           ======================================================== */}
        <section
          id="carreras"
          className="relative max-w-7xl mx-auto py-20 px-3 sm:px-6 lg:px-8 border-t border-white/10 w-full max-w-full overflow-hidden"
        >
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white drop-shadow">
              Nuestras Carreras:{" "}
              <span className="text-gradient-uide">
                una experiencia universitaria que transforma el futuro de tu hijo/a
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed max-w-3xl mx-auto font-medium">
              &ldquo;En la UIDE, no solo eliges una carrera, eliges una formación con visión global. 
              Tu hijo/a accederá a programas académicos conectados con las tendencias del mundo, 
              experiencias internacionales, certificaciones de valor profesional y oportunidades únicas a través 
              de alianzas estratégicas como Arizona State University (ASU). Porque en la UIDE no nos 
              preparamos para el futuro: lo reinventamos.&rdquo;
            </p>

            {/* Exact 5 Checkmarks from text */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-6 text-left">
              {[
                "Titulación internacional",
                "Alianzas globales y experiencia ASU",
                "Certificaciones profesionales durante la carrera",
                "Aprendizaje práctico y conexión con la industria",
                "Formación para liderar, innovar y transformar",
              ].map((bullet, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl glass-panel bg-[#0a0d16]/95 border border-white/15 flex items-center space-x-3 shadow-md"
                >
                  <div className="p-1 rounded-md bg-[#a80054] text-white shrink-0">
                    <Check className="w-3.5 h-3.5 font-black" />
                  </div>
                  <span className="text-xs font-bold text-white">{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Selector de Sede / Campus UIDE Oficial */}
          <div className="max-w-3xl mx-auto mb-6 flex flex-wrap justify-center gap-2">
            {UIDE_CAMPUSES.map((campus) => {
              const isActive = selectedCampus.toLowerCase() === campus.toLowerCase();
              return (
                <button
                  key={campus}
                  type="button"
                  onClick={() => handleCampusChange(campus)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border flex items-center space-x-2 ${
                    isActive
                      ? "bg-[#910048] text-white border-pink-400 shadow-[0_0_20px_rgba(145,0,72,0.5)] scale-105"
                      : "bg-[#0a0d16]/90 text-slate-300 border-white/10 hover:border-white/30 hover:text-white"
                  }`}
                >
                  <MapPin className={`w-3.5 h-3.5 ${isActive ? "text-[#ffc72c]" : "text-slate-400"}`} />
                  <span>Campus {campus}</span>
                </button>
              );
            })}
          </div>

          {/* Menú desplegable carreras pregrado UIDE & Valor oficial carrera (Modelo Cotizador UG/PG) */}
          <div className="max-w-3xl mx-auto glass-panel bg-[#0a0d16]/95 rounded-3xl p-6 sm:p-8 border border-white/20 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-100 flex items-center justify-between">
                <span>Catálogo Oficial Pregrado UIDE ({selectedCampus})</span>
                <span className="text-[#ffc72c] font-bold">{availableCareers.length} carreras disponibles</span>
              </label>

              <select
                value={selectedCareer.id}
                onChange={(e) => {
                  const career = availableCareers.find((c) => c.id === e.target.value) || CAREERS_DATA.find((c) => c.id === e.target.value);
                  if (career) handleCareerChange(career);
                }}
                className="w-full bg-[#08090C] text-white text-sm sm:text-base font-medium rounded-2xl p-4 border border-white/25 focus:border-[#ff3377] focus:outline-none cursor-pointer"
              >
                {availableCareers.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#0c0f14]">
                    {c.name} — {c.faculty}
                  </option>
                ))}
              </select>
            </div>

            {/* Valor oficial y promedio de carrera (Modelo Cotizador UIDE UG/PG) */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#910048]/30 via-[#002D72]/30 to-[#EAAA00]/25 border border-white/15 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-300 uppercase tracking-wider block font-semibold">
                    Valor Oficial Total Carrera ({selectedCareer.semesters} semestres)
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-[#ffc72c] font-mono mt-1 drop-shadow">
                    ${selectedCareer.totalTuitionRef.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    <span className="text-sm font-normal text-slate-200"> USD</span>
                  </div>
                  <div className="text-[11px] text-slate-200 font-mono mt-0.5 flex flex-wrap items-center gap-2">
                    <span>{selectedCareer.semesters} semestres</span>
                    <span>•</span>
                    <span>{selectedCareer.highlight}</span>
                    {selectedCareer.asuDualDegree && (
                      <span className="px-2 py-0.5 rounded-full bg-red-950/80 border border-red-500/40 text-red-200 text-[10px] font-bold">
                        ASU 3+1 / Dual Degree
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={scrollToSimulator}
                  className="py-3 px-5 rounded-xl bg-gradient-to-r from-[#a80054] to-[#c70063] hover:from-[#c70063] hover:to-[#e60073] text-white text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer shadow-lg active:scale-95 shrink-0"
                >
                  Calcular Ahorro para esta Carrera
                </button>
              </div>

              {/* Desglose oficial de matrícula y colegiatura del cotizador */}
              {selectedCareer.colegiaturaSem && (
                <div className="pt-3 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-[10px] text-slate-400 block uppercase">Matrícula / Semestre</span>
                    <span className="font-bold text-white">${selectedCareer.matriculaSem?.toFixed(2)} USD</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-[10px] text-slate-400 block uppercase">Colegiatura / Semestre</span>
                    <span className="font-bold text-white">${selectedCareer.colegiaturaSem?.toFixed(2)} USD</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                    <span className="text-[10px] text-emerald-400 block uppercase">Con Beca Fidelidad PAD</span>
                    <span className="font-bold text-emerald-300">
                      ${selectedCareer.totalConBeca?.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#910048]/30 border border-pink-400/30">
                    <span className="text-[10px] text-pink-300 block uppercase">Ahorro con Beca UIDE</span>
                    <span className="font-bold text-pink-200">
                      -${selectedCareer.ahorroBeca?.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
                    </span>
                  </div>
                </div>
              )}

              {/* Aranceles Complementarios Oficiales: Consejo Estudiantil, Seguro Universitario y Exámenes */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-slate-300 uppercase tracking-wider block font-semibold">
                  Aranceles Complementarios Semestrales Oficiales (Campus {selectedCampus})
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-[10px] text-slate-400 block uppercase">Consejo Estudiantil</span>
                    <span className="font-bold text-white">
                      ${campusExtras.consejoEstudiantil.toFixed(2)} USD
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-[10px] text-slate-400 block uppercase">Seguro Universitario</span>
                    <span className="font-bold text-white">
                      ${campusExtras.seguroUniversitario.toFixed(2)} USD
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-[10px] text-slate-400 block uppercase">Total Derechos Semestre</span>
                    <span className="font-bold text-[#ffc72c]">
                      ${campusExtras.totalDerechosSemestre.toFixed(2)} USD
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-[10px] text-slate-400 block uppercase">Examen Ubicación Inglés</span>
                    <span className="font-bold text-blue-300">
                      ${campusExtras.examenIngles.toFixed(2)} USD
                    </span>
                  </div>
                </div>
              </div>

              {/* AVISO REQUERIDO: PRECIO APROXIMADO & CTA PARA LLENAR DATOS */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/40 border border-amber-500/40 space-y-3">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h5 className="font-bold text-amber-300 font-mono uppercase text-xs">
                      Estimación Aproximada y Precio Final Personalizado
                    </h5>
                    <p className="text-slate-200 text-xs leading-relaxed">
                      Los valores presentados de matrícula, colegiatura, aportes al <strong>Consejo Estudiantil</strong> y aranceles complementarios son de carácter <strong>aproximado y referencial</strong> conforme al tarifario institucional vigente. Para conocer tu <strong>precio final exacto</strong>, validar la malla oficial y acceder a todos los beneficios exclusivos (incluyendo la <strong>Beca de Fidelidad PAD UIDE de hasta el 21% - 25%</strong> y la póliza fiduciaria), por favor <strong>completa tus datos en el formulario a continuación</strong>.
                    </p>
                  </div>
                </div>

                <div className="pt-1 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={scrollToSavingsForm}
                    className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-[#910048] to-[#B8005D] text-white text-xs font-black font-mono uppercase tracking-wider transition-all cursor-pointer shadow-lg active:scale-95 flex items-center justify-center space-x-2"
                  >
                    <span>Llenar Datos para Conocer Precio Final y Beneficios</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={scrollToSimulator}
                    className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase transition-colors cursor-pointer text-center"
                  >
                    Simular Plan de Ahorro para esta Carrera →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION: SIMULADOR (calcula tu ahorro ahora)
            MOTOR MATEMÁTICO EXACTO DE CALCULADORA EXCEL & BANCO DINERS
           ======================================================== */}
        <section
          id="cotizador"
          className="relative max-w-7xl mx-auto py-20 px-3 sm:px-6 lg:px-8 border-t border-white/10 w-full max-w-full overflow-hidden"
        >
          <div className="max-w-4xl mx-auto text-center space-y-2 mb-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#ffc72c]" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-300">
                SIMULADOR FINANCIERO FIDUCIARIO OFICIAL
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-mono drop-shadow">
              calcula tu ahorro ahora
            </h2>
            <p className="text-xs text-slate-300 font-mono font-medium max-w-2xl mx-auto">
              (FORMATO COTIZADOR CORREO ADJUNTO • TASA NOMINAL 3.40% ANUAL • RETENCIÓN SRI 2% • SEGURO RCB $25/MES)
            </p>
          </div>

          <div className="max-w-4xl mx-auto glass-panel bg-[#0a0d16]/95 rounded-3xl p-6 sm:p-8 border border-white/20 space-y-7 shadow-2xl">
            {/* Selector de Meta de Ahorro: Carrera o Personalizada */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-[#ffc72c]" />
                  <span>Meta de Ahorro para Educación Superior:</span>
                </label>

                <div className="flex items-center space-x-2 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomGoal(false);
                      setTargetGoal(selectedCareer.totalTuitionRef);
                    }}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      !isCustomGoal
                        ? "bg-[#910048] text-white font-bold"
                        : "bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    Por Carrera UIDE
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCustomGoal(true)}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      isCustomGoal
                        ? "bg-[#002D72] text-white font-bold border border-blue-400/40"
                        : "bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    Monto Personalizado
                  </button>
                </div>
              </div>

              {isCustomGoal ? (
                <div className="space-y-2 pt-1">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-300">Ajusta la meta de capital:</span>
                    <span className="text-2xl font-black font-mono text-[#ffc72c]">
                      ${targetGoal.toLocaleString("en-US")} USD
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="60000"
                    step="1000"
                    value={targetGoal}
                    onChange={(e) => setTargetGoal(parseInt(e.target.value))}
                    className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#ffc72c]"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>$10,000 USD</span>
                    <span>$30,000 USD (Ref. Promedio)</span>
                    <span>$60,000 USD</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="text-xs">
                      <span className="text-slate-400 block text-[10px] font-mono uppercase">
                        Carrera y Sede Seleccionada:
                      </span>
                      <span className="text-white font-bold text-sm block">
                        {selectedCareer.name}
                      </span>
                      <span className="text-[11px] text-slate-300 font-mono">
                        Campus {selectedCareer.campus || selectedCampus} • {selectedCareer.semesters} semestres
                      </span>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-slate-400 block text-[10px] font-mono uppercase">
                        {applyPadScholarship ? "Meta con Beca Fidelidad PAD (-21%):" : "Meta Colegiatura Total (Sin Beca):"}
                      </span>
                      <span className="text-xl sm:text-2xl font-black font-mono text-[#ffc72c]">
                        ${targetGoal.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
                      </span>
                    </div>
                  </div>

                  {/* Toggle Beca Fidelidad PAD UIDE */}
                  {selectedCareer.totalConBeca && (
                    <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                      <div className="flex items-center space-x-2 text-emerald-300">
                        <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>
                          ¿Aplicar Beca Fidelidad PAD UIDE?{" "}
                          <strong className="text-white">
                            Ahorras ${selectedCareer.ahorroBeca?.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
                          </strong>
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleScholarship(!applyPadScholarship)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase transition-all cursor-pointer ${
                          applyPadScholarship
                            ? "bg-emerald-500 text-black shadow-md font-black"
                            : "bg-white/10 text-slate-300 hover:text-white border border-white/10"
                        }`}
                      >
                        {applyPadScholarship ? "✓ Beca PAD Activada" : "+ Activar Beca PAD"}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Slider Edad del hijo/a */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-100 font-medium flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span>Edad actual del hijo/a:</span>
                </span>
                <span className="text-white font-black text-sm bg-white/10 px-3 py-1 rounded-xl font-mono">
                  {childAge} {childAge === 1 ? "año" : "años"}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="16"
                value={childAge}
                onChange={(e) => setChildAge(parseInt(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#ff3377]"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-300">
                <span>Recién nacido (0 años)</span>
                <span className="text-blue-300 font-bold">
                  {padResult.plazoAnos} años restantes ({padResult.plazoMeses} meses)
                </span>
                <span>16 años</span>
              </div>
            </div>

            {/* CALLOUT PRINCIPAL: CUOTA TOTAL MENSUAL & ESFUERZO DIARIO */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#910048]/30 via-[#002D72]/40 to-[#EAAA00]/25 border border-white/20 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                {/* Cuota Total Mensual */}
                <div className="md:col-span-7 space-y-1">
                  <div className="inline-flex items-center space-x-1.5 text-[10px] font-mono uppercase tracking-widest text-slate-300 font-bold">
                    <span>CUOTA TOTAL MENSUAL (AHORRO PAD + SEGURO RCB)</span>
                  </div>
                  <div className="text-3xl sm:text-5xl font-black text-[#ffc72c] font-mono drop-shadow">
                    ${padResult.cuotaTotal.toFixed(2)}
                    <span className="text-sm font-normal text-slate-200"> USD/mes</span>
                  </div>
                  <div className="text-xs text-slate-300 font-mono pt-1">
                    Composición:{" "}
                    <span className="text-white font-bold">${padResult.aportePad.toFixed(2)}</span> Ahorro PAD +{" "}
                    <span className="text-[#ffc72c] font-bold">${padResult.seguroRcb.toFixed(2)}</span> Seguro Estudiantil RCB
                  </div>
                </div>

                {/* Esfuerzo Diario */}
                <div className="md:col-span-5 p-4 rounded-xl bg-black/50 border border-white/10 text-center md:text-right">
                  <span className="text-[10px] font-mono text-slate-300 uppercase tracking-wider block font-semibold">
                    Esfuerzo Diario Equivalente
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-0.5">
                    ${padResult.esfuerzoDiario.toFixed(2)}
                    <span className="text-xs font-normal text-slate-300"> USD/día</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Calculado sobre base mensual de 30 días
                  </div>
                </div>
              </div>
            </div>

            {/* DESGLOSE TÉCNICO FINANCIERO OFICIAL EXCEL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Total Aportado */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">
                  Total Aportado en el Tiempo
                </span>
                <div className="text-xl sm:text-2xl font-black text-slate-200 font-mono">
                  ${padResult.totalAportadoAhorro.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  {padResult.plazoMeses} aportes de ${padResult.aportePad.toFixed(2)}
                </div>
              </div>

              {/* Intereses Netos Ganados */}
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 uppercase block font-semibold flex items-center space-x-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Intereses Netos Ganados</span>
                </span>
                <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                  +${padResult.interesesNetos.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </div>
                <div className="text-[10px] font-mono text-emerald-300/80">
                  Tasa 3.40% nominal • Ret. SRI 2% deducida
                </div>
              </div>

              {/* Suma Asegurada RCB */}
              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-1 sm:col-span-2 lg:col-span-1">
                <span className="text-[10px] font-mono text-amber-400 uppercase block font-semibold flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Suma Asegurada RCB</span>
                </span>
                <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                  ${padResult.sumaAsegurada.toLocaleString("en-US")} USD
                </div>
                <div className="text-[10px] font-mono text-amber-300/80">
                  100% colegiatura garantizada ante imprevistos
                </div>
              </div>
            </div>

            {/* ClubMiles & Fondo al Vencimiento */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-xs font-mono">
              <div className="flex items-center space-x-2 text-blue-300">
                <Plane className="w-4 h-4 text-blue-400 shrink-0" />
                <span>
                  Millas Diners generadas:{" "}
                  <strong className="text-white">+{padResult.clubMiles.toLocaleString("en-US")} ClubMiles</strong> (1:1 en cada aporte)
                </span>
              </div>
              <div className="text-slate-300 text-[11px]">
                Fondo acumulado al vencimiento:{" "}
                <strong className="text-emerald-400">${padResult.saldoFinal.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD</strong> (100% de la meta)
              </div>
            </div>

            {/* Alerta de Límite Bancario Diners Club ($4,999 USD/mes) */}
            {padResult.excedeLimiteBancario && (
              <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/50 flex items-start space-x-3 text-rose-200 text-xs">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-mono uppercase">
                    Aviso Operativo Banco Diners Club:
                  </strong>
                  La cuota mensual de ${padResult.cuotaTotal.toFixed(2)} USD excede el límite máximo de cargo recurrente permitido ($4,999.00 USD/mes). Te sugerimos seleccionar una meta menor o iniciar el ahorro con mayor anticipación.
                </div>
              </div>
            )}

            {/* BOTÓN DESPLEGABLE: TABLA DE AMORTIZACIÓN OFICIAL */}
            <div className="pt-1 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowAmortization(!showAmortization)}
                className="w-full py-3 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 flex items-center justify-between text-xs font-mono font-bold text-slate-200 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <TableIcon className="w-4 h-4 text-[#ffc72c]" />
                  <span>
                    {showAmortization ? "Ocultar Tabla de Amortización" : "Ver Tabla de Amortización Oficial (Modelo Excel)"}
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 text-slate-400 text-[11px]">
                  <span>{amortizationData.totalRows} meses de proyección</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAmortization ? "rotate-180" : ""}`} />
                </div>
              </button>

              {showAmortization && (
                <div className="mt-4 p-4 rounded-2xl bg-black/70 border border-white/15 overflow-x-auto text-[11px] font-mono space-y-3">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Cronograma de Capitalización y Seguro (Primeros meses e hitos anuales)</span>
                    <span className="text-[#ffc72c]">Tasa Nominal 3.40% • Ret. 2%</span>
                  </div>

                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="border-b border-white/20 text-slate-300 text-[10px] uppercase">
                        <th className="py-2 pr-2">Mes</th>
                        <th className="py-2 px-2">Saldo Inicial</th>
                        <th className="py-2 px-2">Aporte PAD</th>
                        <th className="py-2 px-2">Interés Mes</th>
                        <th className="py-2 px-2">Ret. SRI (2%)</th>
                        <th className="py-2 px-2">Saldo Final</th>
                        <th className="py-2 px-2">Seguro RCB</th>
                        <th className="py-2 pl-2 text-right">Cuota Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {amortizationData.rows.map((row) => (
                        <tr key={row.mes} className="hover:bg-white/[0.03]">
                          <td className="py-2 pr-2 font-bold text-white">Mes {row.mes}</td>
                          <td className="py-2 px-2 text-slate-300">${row.saldoInicial.toFixed(2)}</td>
                          <td className="py-2 px-2 text-blue-300 font-bold">${row.aportePad.toFixed(2)}</td>
                          <td className="py-2 px-2 text-emerald-400">+${row.interesMes.toFixed(2)}</td>
                          <td className="py-2 px-2 text-rose-400">-${row.retencionMes.toFixed(2)}</td>
                          <td className="py-2 px-2 text-emerald-300 font-bold">${row.saldoFinal.toFixed(2)}</td>
                          <td className="py-2 px-2 text-amber-300">${row.seguroMensual.toFixed(2)}</td>
                          <td className="py-2 pl-2 text-right font-black text-[#ffc72c]">${row.cuotaTotalMes.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="text-[10px] text-slate-500 pt-2 border-t border-white/10 flex justify-between">
                    <span>* Plazo mínimo contractual: 12 meses.</span>
                    <span>Costo acumulado seguro al término: ${(SEGURO_RCB_MENSUAL * padResult.plazoMeses).toLocaleString("en-US")} USD</span>
                  </div>
                </div>
              )}
            </div>

            {/* DUAL ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={scrollToSavingsForm}
                className="flex-1 py-4 px-4 rounded-xl bg-gradient-to-r from-[#a80054] to-[#c70063] hover:from-[#c70063] hover:to-[#e60073] text-white text-xs sm:text-sm font-black font-mono uppercase tracking-wider transition-colors cursor-pointer text-center shadow-lg active:scale-95"
              >
                Quiero comenzar mi plan de ahorro
              </button>
              <button
                onClick={scrollToAdvisoryForm}
                className="flex-1 py-4 px-4 rounded-xl bg-gradient-to-r from-[#002D72] to-[#004A97] hover:from-[#004A97] hover:to-[#005bb5] text-white text-xs sm:text-sm font-black font-mono uppercase tracking-wider transition-colors cursor-pointer text-center shadow-lg active:scale-95 border border-blue-400/40"
              >
                Quiero asesoría personalizada
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION: REINVENTEMOS EL FUTURO & ONBOARDING FORM
            FLUJO COMERCIAL: SOCIOS Y NO SOCIOS (TARJETIZACIÓN)
           ======================================================== */}
        <section
          id="formulario"
          className="relative max-w-7xl mx-auto py-20 px-3 sm:px-6 lg:px-8 border-t border-white/10 w-full max-w-full overflow-hidden"
        >
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-2">
              <Lock className="w-3.5 h-3.5 text-[#ffc72c]" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-300">
                FORMALIZACIÓN & ONBOARDING SEGURO
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-mono drop-shadow">
              REINVENTEMOS EL FUTURO
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl mx-auto font-medium">
              &ldquo;Cada aporte realizado hoy acerca a tu hijo a la universidad de sus sueños y le abre la
              puerta a experiencias que transformarán su futuro.&rdquo;
            </p>
          </div>

          <div className="max-w-3xl mx-auto glass-panel bg-[#0a0d16]/95 rounded-3xl p-6 sm:p-10 border border-white/20 shadow-2xl">
            {/* Banner Resumen del Plan Cotizado */}
            <div className="mb-6 p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Plan Seleccionado:</span>
                <span className="text-white font-bold">{selectedCareer.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Meta Universitaria:</span>
                <span className="text-[#ffc72c] font-bold">${targetGoal.toLocaleString("en-US")} USD</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Plazo:</span>
                <span className="text-blue-300 font-bold">{padResult.plazoMeses} meses</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Cuota Mensual:</span>
                <span className="text-emerald-400 font-bold">${padResult.cuotaTotal.toFixed(2)} USD/mes</span>
              </div>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* SELECTOR SOCIO DINERS CLUB / NO SOCIO (Slide 7 & 8 Propuesta Comercial) */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-200 uppercase block font-bold">
                    ¿Ya eres socio Diners Club? *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setIsDinersMember(true)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        isDinersMember
                          ? "bg-[#002D72]/50 border-blue-400 shadow-[0_0_20px_rgba(0,45,114,0.4)] text-white"
                          : "bg-black/30 border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <CreditCard className="w-4 h-4 text-blue-400" />
                        <span className="font-bold text-xs uppercase font-mono">SÍ, ya soy socio Diners Club</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug">
                        Débito automático recurrente a tu tarjeta y acumulación 1:1 de ClubMiles.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsDinersMember(false)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        !isDinersMember
                          ? "bg-[#910048]/50 border-pink-400 shadow-[0_0_20px_rgba(145,0,72,0.4)] text-white"
                          : "bg-black/30 border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <UserCheck className="w-4 h-4 text-pink-400" />
                        <span className="font-bold text-xs uppercase font-mono">NO, quiero solicitar mi tarjeta</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug">
                        Evaluación crediticia inmediata para emisión de tarjeta Diners y vinculación al PAD.
                      </p>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-slate-200 uppercase block mb-1 font-semibold">
                      Nombre y Apellido del Titular *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Santiago Paredes"
                      className="w-full bg-[#08090C] text-white text-xs rounded-xl px-4 py-3 border border-white/20 focus:border-[#ff3377] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-200 uppercase block mb-1 font-semibold">
                      Cédula de Identidad (10 dígitos) *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={10}
                      value={formData.cedula}
                      onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                      placeholder="1719284751"
                      className="w-full bg-[#08090C] text-white text-xs rounded-xl px-4 py-3 border border-white/20 focus:border-[#ff3377] focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-200 uppercase block mb-1 font-semibold">
                      Teléfono Celular WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0998765432"
                      className="w-full bg-[#08090C] text-white text-xs rounded-xl px-4 py-3 border border-white/20 focus:border-[#ff3377] focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-200 uppercase block mb-1 font-semibold">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="correo@ejemplo.com"
                      className="w-full bg-[#08090C] text-white text-xs rounded-xl px-4 py-3 border border-white/20 focus:border-[#ff3377] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-mono text-slate-200 uppercase block mb-1 font-semibold">
                      Ciudad de Residencia
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#08090C] text-white text-xs rounded-xl px-4 py-3 border border-white/20 focus:border-[#ff3377] focus:outline-none cursor-pointer"
                    >
                      <option value="Quito">Quito (Campus Principal UIDE)</option>
                      <option value="Guayaquil">Guayaquil (Sede UIDE)</option>
                      <option value="Cuenca">Cuenca</option>
                      <option value="Loja">Loja (Sede UIDE)</option>
                      <option value="Ambato">Ambato</option>
                      <option value="Otra">Otra ciudad</option>
                    </select>
                  </div>
                </div>

                {/* CLÁUSULAS CONTRACTUALES Y TRATAMIENTO DE DATOS (Slide 7 & 8) */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-start space-x-3 cursor-pointer p-3.5 rounded-xl bg-black/40 border border-white/10">
                    <input
                      type="checkbox"
                      required
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-[#910048] accent-[#910048] cursor-pointer shrink-0"
                    />
                    <span className="text-[11px] text-slate-300 leading-snug">
                      Acepto las condiciones del <strong>Plan de Acumulación Diners (el PAD)</strong> de Banco Diners Club del Ecuador S.A. (plazo mínimo 12 meses a tasa nominal 3.40% anual con capitalización mensual, cargo recurrente mensual máximo de hasta $4,999 USD) y la contratación de la póliza de protección estudiantil de <strong>Raúl Coka Barriga</strong> ($25.00 USD/mes fija con cobertura del 100% de la colegiatura).
                    </span>
                  </label>

                  <label className="flex items-start space-x-3 cursor-pointer p-3.5 rounded-xl bg-black/40 border border-white/10">
                    <input
                      type="checkbox"
                      required
                      checked={dataConsent}
                      onChange={(e) => setDataConsent(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-[#910048] accent-[#910048] cursor-pointer shrink-0"
                    />
                    <span className="text-[11px] text-slate-300 leading-snug">
                      Autorizo expresamente a la <strong>UIDE, Diners Club del Ecuador y Raúl Coka Barriga</strong> al tratamiento de mis datos personales de conformidad con la <strong>Ley Orgánica de Protección de Datos Personales (LOPDP)</strong> y el acuerdo DPA suscrito con la universidad.
                    </span>
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#a80054] to-[#c70063] hover:from-[#c70063] hover:to-[#e60073] text-white text-xs sm:text-sm font-black font-mono uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(168,0,84,0.7)] cursor-pointer active:scale-95 flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {conversionType === "ahorro"
                        ? isDinersMember
                          ? "Confirmar Solicitud de Contratación PAD"
                          : "Solicitar Calificación y Tarjeta Diners Club"
                        : "Quiero Asesoría Personalizada Ahora"}
                    </span>
                  </button>
                </div>

                <div className="text-center text-[10px] font-mono text-slate-500">
                  CONEXIÓN ENCRIPTADA TLS 1.3 • INTEGRACIÓN DIRECTA VÍA SFTP DINERS CLUB
                </div>
              </form>
            ) : (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-950/90 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.5)]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-black text-white font-mono uppercase">
                  ¡Solicitud Formalizada con Éxito!
                </h4>
                <p className="text-xs text-slate-200 max-w-md mx-auto">
                  {isDinersMember
                    ? "Tus datos han sido registrados en la cola de activación fiduciaria de Banco Diners Club y Raúl Coka Barriga. Un asesor formalizará tu plan en menos de 24 horas."
                    : "Hemos recibido tu solicitud de evaluación para la emisión de tu tarjeta Diners Club vinculada al programa PAD. El equipo de admisiones y crédito te contactará de inmediato."}
                </p>

                <div className="p-4 rounded-2xl bg-black/60 border border-white/10 text-left max-w-lg mx-auto font-mono text-[10px] text-emerald-300 space-y-1 overflow-x-auto">
                  <div className="text-[10px] text-slate-500 uppercase pb-1 border-b border-white/10 flex justify-between">
                    <span>SFTP PAYLOAD DISPATCH QUEUE: OK</span>
                    <span className="text-emerald-400">STATUS: 200 PROCESSED</span>
                  </div>
                  <pre>{sftpPayload}</pre>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-blue-400 hover:underline font-mono cursor-pointer pt-2 inline-block"
                >
                  ← Modificar solicitud o cotizar otra carrera
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================
            SECTION: SECCIÓN FAQ
           ======================================================== */}
        <section
          id="faq"
          className="relative max-w-4xl mx-auto py-20 px-3 sm:px-6 lg:px-8 border-t border-white/10 w-full max-w-full overflow-hidden"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-mono drop-shadow">
              SECCIÓN FAQ
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Preguntas frecuentes y condiciones legales del programa REINVENTORS PAD
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_DATA.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/15 glass-panel bg-[#0a0d16]/95 overflow-hidden shadow-lg"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-white cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#ff3377]" : "text-slate-300"
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-slate-100 leading-relaxed border-t border-white/10">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================
            FOOTER: OPAQUE, HIGH-VISIBILITY OFFICIAL LOGOS CONTAINER
           ======================================================== */}
        <footer className="relative z-10 max-w-7xl mx-auto mt-12 mb-8 px-3 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
          <div className="w-full rounded-3xl bg-[#06080e] border-2 border-white/20 p-4 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logos Tri-Brand Solid High-Contrast Presentation */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 max-w-full">
              {/* Logo UIDE */}
              <div className="h-12 sm:h-16 px-3.5 sm:px-5 py-2 rounded-2xl bg-white flex items-center justify-center shadow-xl border border-slate-200 shrink-0">
                <img
                  src={getAssetPath("/logos/uide-logo-opt.webp")}
                  alt="UIDE Powered by Arizona State University"
                  className="h-full w-auto object-contain max-h-8 sm:max-h-11"
                />
              </div>

              <span className="text-white/40 hidden sm:inline text-2xl font-light">|</span>

              {/* Logo Diners Club (100% visible on white card) */}
              <div className="h-12 sm:h-16 px-4 sm:px-6 py-2 rounded-2xl bg-white flex items-center justify-center shadow-xl border border-slate-200 shrink-0">
                <img
                  src={getAssetPath("/logos/diners-logo-opt.png")}
                  alt="Diners Club"
                  className="h-full w-auto object-contain max-h-8 sm:max-h-11"
                />
              </div>

              <span className="text-white/40 hidden sm:inline text-2xl font-light">|</span>

              {/* Logo Raúl Coka Barriga */}
              <div className="h-12 sm:h-16 px-3.5 sm:px-5 py-2 rounded-2xl bg-white flex items-center justify-center shadow-xl border border-slate-200 shrink-0">
                <img
                  src={getAssetPath("/logos/rcb-logo-opt.webp")}
                  alt="Raúl Coka Barriga"
                  className="h-full w-auto object-contain max-h-8 sm:max-h-11"
                />
              </div>
            </div>

            {/* Copyright Statement */}
            <div className="text-center md:text-right space-y-1">
              <div className="text-xs sm:text-sm font-mono font-bold text-white tracking-wider">
                REINVENTORS PAD © {new Date().getFullYear()}
              </div>
              <div className="text-[11px] font-mono text-slate-300">
                UIDE × DINERS CLUB DEL ECUADOR × RAÚL COKA BARRIGA
              </div>
            </div>
          </div>
        </footer>

        {/* ========================================================
            VIDEO EXPLICATIVO MODAL
           ======================================================== */}
        {videoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl">
            <div className="relative w-full max-w-2xl glass-panel bg-[#0a0d16] rounded-3xl p-6 border border-white/25 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono font-bold uppercase text-white">
                  VIDEO EXPLICATIVO • REINVENTORS PAD
                </span>
                <button
                  onClick={() => setVideoModalOpen(false)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 aspect-video rounded-2xl bg-[#090c12] border border-white/10 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-[#a80054] flex items-center justify-center mb-3 shadow-[0_0_25px_rgba(255,51,119,0.8)]">
                  <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                </div>
                <h4 className="text-base font-bold text-white uppercase font-mono">
                  El futuro de tus hijos lo reinventas desde hoy
                </h4>
                <p className="text-xs text-slate-300 max-w-md mt-1">
                  Reinventors PAD es un programa de ahorro educativo en alianza entre UIDE, Diners Club y RCB.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </SmoothScrollProvider>
  );
}
