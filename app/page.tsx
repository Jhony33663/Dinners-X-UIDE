"use client";

import React, { useState } from "react";
import SmoothScrollProvider from "@/components/smooth-scroll/SmoothScrollProvider";
import TopographyCanvas from "@/components/canvas/TopographyCanvas";
import PanoramicView from "@/components/dashboard/PanoramicView";
import { CAREERS_DATA, FAQ_DATA } from "@/lib/data";
import { Career } from "@/lib/types";
import {
  Play,
  X,
  Check,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { getAssetPath } from "@/lib/paths";

export default function Home() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<Career>(CAREERS_DATA[0]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Simulator State ("calcula tu ahorro ahora")
  const [childAge, setChildAge] = useState<number>(5);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(180);

  // Form State
  const [conversionType, setConversionType] = useState<"ahorro" | "asesoria">("ahorro");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    cedula: "",
    phone: "",
    email: "",
    city: "Quito",
    dataConsent: true,
  });

  const yearsRemaining = Math.max(1, 18 - childAge);
  const months = yearsRemaining * 12;
  const annualRate = 0.068;
  const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;
  const futureValue = Math.round(
    monthlyContribution *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate)
  );

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
    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
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

          {/* Menú desplegable carreras pregrado UIO & Valor promedio carrera */}
          <div className="max-w-3xl mx-auto glass-panel bg-[#0a0d16]/95 rounded-3xl p-6 sm:p-8 border border-white/20 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-100 flex items-center justify-between">
                <span>Menú despegable carreras pregrado UIO</span>
                <span className="text-[#ffc72c] font-bold">Quito</span>
              </label>

              <select
                value={selectedCareer.id}
                onChange={(e) => {
                  const career = CAREERS_DATA.find((c) => c.id === e.target.value);
                  if (career) setSelectedCareer(career);
                }}
                className="w-full bg-[#08090C] text-white text-sm sm:text-base font-medium rounded-2xl p-4 border border-white/25 focus:border-[#ff3377] focus:outline-none cursor-pointer"
              >
                {CAREERS_DATA.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#0c0f14]">
                    {c.name} — {c.faculty}
                  </option>
                ))}
              </select>
            </div>

            {/* Valor promedio carrera */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#910048]/30 via-[#002D72]/30 to-[#EAAA00]/25 border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-slate-300 uppercase tracking-wider block font-semibold">
                  Valor promedio carrera
                </span>
                <div className="text-3xl sm:text-4xl font-black text-[#ffc72c] font-mono mt-1 drop-shadow">
                  ${selectedCareer.totalTuitionRef.toLocaleString("en-US")}
                  <span className="text-sm font-normal text-slate-200"> USD</span>
                </div>
                <div className="text-[11px] text-slate-200 font-mono mt-0.5">
                  {selectedCareer.semesters} semestres • {selectedCareer.highlight}
                </div>
              </div>

              <button
                onClick={scrollToSimulator}
                className="py-3 px-5 rounded-xl bg-gradient-to-r from-[#a80054] to-[#c70063] hover:from-[#c70063] hover:to-[#e60073] text-white text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer shadow-lg active:scale-95"
              >
                Calcular Ahorro para esta Carrera
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION: SIMULADOR (calcula tu ahorro ahora)
           ======================================================== */}
        <section
          id="cotizador"
          className="relative max-w-7xl mx-auto py-20 px-3 sm:px-6 lg:px-8 border-t border-white/10 w-full max-w-full overflow-hidden"
        >
          <div className="max-w-4xl mx-auto text-center space-y-2 mb-12">
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-mono drop-shadow">
              calcula tu ahorro ahora
            </h2>
            <p className="text-xs text-slate-300 font-mono font-medium">
              (FORMATO COTIZADOR CORREO ADJUNTO)
            </p>
          </div>

          <div className="max-w-3xl mx-auto glass-panel bg-[#0a0d16]/95 rounded-3xl p-6 sm:p-8 border border-white/20 space-y-6 shadow-2xl">
            {/* Slider Edad */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-100 font-medium">Edad actual del hijo/a:</span>
                <span className="text-white font-bold text-sm">{childAge} años</span>
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
                <span>0 años</span>
                <span className="text-blue-300 font-semibold">{yearsRemaining} años hasta la universidad</span>
                <span>16 años</span>
              </div>
            </div>

            {/* Slider Aporte */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-100 font-medium">Aporte mensual estimado:</span>
                <span className="text-[#ffc72c] font-black font-mono text-base">
                  ${monthlyContribution} USD/mes
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="800"
                step="25"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(parseInt(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#EAAA00]"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-300">
                <span>$50 USD</span>
                <span>$800 USD</span>
              </div>
            </div>

            {/* Dynamic Results */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-black/60 border border-white/15">
              <div>
                <span className="text-[10px] font-mono text-slate-300 uppercase block font-semibold">
                  Fondo total proyectado a los 18 años
                </span>
                <div className="text-2xl sm:text-3xl font-black text-[#ffc72c] font-mono mt-1">
                  ${futureValue.toLocaleString("en-US")} USD
                </div>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-300 uppercase block font-semibold">
                  Cobertura estimada ({selectedCareer.name})
                </span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1">
                  {Math.min(100, Math.round((futureValue / selectedCareer.totalTuitionRef) * 100))}%
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={scrollToSavingsForm}
                className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#a80054] to-[#c70063] hover:from-[#c70063] hover:to-[#e60073] text-white text-xs font-black font-mono uppercase tracking-wider transition-colors cursor-pointer text-center shadow-lg active:scale-95"
              >
                Quiero comenzar mi plan de ahorro
              </button>
              <button
                onClick={scrollToAdvisoryForm}
                className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#a80054] to-[#c70063] hover:from-[#c70063] hover:to-[#e60073] text-white text-xs font-black font-mono uppercase tracking-wider transition-colors cursor-pointer text-center shadow-lg active:scale-95"
              >
                Quiero asesoría personalizada
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION: REINVENTEMOS EL FUTURO & ONBOARDING FORM
           ======================================================== */}
        <section
          id="formulario"
          className="relative max-w-7xl mx-auto py-20 px-3 sm:px-6 lg:px-8 border-t border-white/10 w-full max-w-full overflow-hidden"
        >
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-mono drop-shadow">
              REINVENTEMOS EL FUTURO
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl mx-auto font-medium">
              &ldquo;Cada aporte realizado hoy acerca a tu hijo a la universidad de sus sueños y le abre la
              puerta a experiencias que transformarán su futuro.&rdquo;
            </p>
          </div>

          <div className="max-w-2xl mx-auto glass-panel bg-[#0a0d16]/95 rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-slate-200 uppercase block mb-1 font-semibold">
                      Nombre y Apellido *
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
                      Cédula de Identidad *
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
                      Teléfono WhatsApp *
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
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#a80054] to-[#c70063] hover:from-[#c70063] hover:to-[#e60073] text-white text-xs sm:text-sm font-black font-mono uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(168,0,84,0.7)] cursor-pointer active:scale-95"
                  >
                    {conversionType === "ahorro"
                      ? "Quiero comenzar mi plan de ahorro"
                      : "Quiero asesoría personalizada"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-950/90 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-black text-white font-mono uppercase">
                  Solicitud Enviada con Éxito
                </h4>
                <p className="text-xs text-slate-200">
                  Un asesor se comunicará contigo para formalizar tu registro.
                </p>
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
                UIDE × DINERS CLUB × RAÚL COKA BARRIGA
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
