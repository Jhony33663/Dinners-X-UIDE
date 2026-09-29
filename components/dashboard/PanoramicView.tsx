"use client";

import React, { useState } from "react";
import ReinventorsKeyCard from "../card-3d/ReinventorsKeyCard";
import {
  Shield,
  Sprout,
  GraduationCap,
  Play,
  Check,
  X,
  Plane,
  ShieldCheck,
  Building,
  ChevronDown,
} from "lucide-react";
import { getAssetPath } from "@/lib/paths";

interface PanoramicViewProps {
  onOpenVideo: () => void;
  onOpenSimulator: () => void;
  onOpenSavingsForm: () => void;
  onOpenAdvisoryForm: () => void;
  onScrollToFaq: () => void;
}

export default function PanoramicView({
  onOpenVideo,
  onOpenSimulator,
  onOpenSavingsForm,
  onOpenAdvisoryForm,
  onScrollToFaq,
}: PanoramicViewProps) {
  const [activeTab, setActiveTab] = useState<"rcb" | "diners" | "uide">("diners");
  const [planEnVivoActive, setPlanEnVivoActive] = useState(false);

  const handleTogglePlan = () => {
    setPlanEnVivoActive(!planEnVivoActive);
    onOpenSimulator();
  };

  return (
    <section className="relative w-full min-h-screen py-6 sm:py-8 px-3 sm:px-6 lg:px-8 flex flex-col justify-between overflow-x-hidden max-w-full">
      {/* ========================================================
          PANORAMIC 3-COLUMN COMPOSITION (Responsive: Mobile -> Tablet -> Desktop)
         ======================================================== */}
      <div className="max-w-[1720px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 xl:gap-8 items-center pt-2 sm:pt-4 min-w-0">
        {/* ========================================================
            LEFT COLUMN: Headlines, Concept, Video Explicativo & 3 Pillars
           ======================================================== */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-4 min-w-0 w-full">
          {/* Header Exact from image (High Contrast WCAG AA/AAA) */}
          <div className="space-y-0.5">
            <h2 className="text-lg sm:text-xl font-black tracking-wider text-[#ff3377] uppercase font-mono drop-shadow">
              REINVENTORS PAD:
            </h2>
            <h1 className="text-2xl sm:text-4xl xl:text-5xl font-black tracking-tight leading-[1.05] text-white uppercase drop-shadow-md">
              EL FUTURO DE TUS HIJOS{" "}
              <span className="block">
                LO REINVENTAS{" "}
                <span className="text-[#ff3377] underline decoration-[#EAAA00] decoration-2 underline-offset-4">
                  DESDE HOY
                </span>
              </span>
            </h1>
          </div>

          {/* Sub-grid: Concept text + Video Explicativo (Left) & 3 Pillars (Right) */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-stretch">
            {/* Left Sub-column: Program Concept Box & Video Explicativo */}
            <div className="sm:col-span-5 flex flex-col justify-between space-y-2.5">
              {/* Concept Text Box (WCAG High Contrast Slate-100 on dark glass) */}
              <div className="glass-panel rounded-2xl p-3.5 border border-white/15 bg-[#0a0d16]/90 backdrop-blur-xl flex-1 flex items-center shadow-lg">
                <p className="text-xs text-slate-100 leading-relaxed font-sans font-medium">
                  Reinventors PAD es un programa de ahorro educativo en alianza entre UIDE, Diners Club y RCB que permite a las familias planificar el futuro universitario de sus hijos mientras acceden a experiencias de desarrollo personal, académico y familiar.
                </p>
              </div>

              {/* VIDEO EXPLICATIVO Brushed Metallic Card */}
              <div
                onClick={onOpenVideo}
                className="relative rounded-2xl p-3.5 border border-white/25 flex flex-col items-center justify-center text-center cursor-pointer group hover:border-[#ff3377]/90 transition-all duration-300 min-h-[125px] overflow-hidden select-none shadow-xl"
              >
                <div className="absolute inset-0 metal-brushed-radial opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-1px_3px_rgba(0,0,0,0.8)]" />

                <div className="relative z-10 w-10 h-10 rounded-full bg-[#a80054] flex items-center justify-center shadow-[0_0_20px_rgba(255,51,119,0.8)] group-hover:scale-110 group-hover:bg-[#c70063] transition-transform mb-2">
                  <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                </div>

                <span className="relative z-10 text-xs font-black font-mono tracking-wider text-white uppercase drop-shadow">
                  VIDEO EXPLICATIVO
                </span>
              </div>
            </div>

            {/* Right Sub-column: The 3 Pillars Cards */}
            <div className="sm:col-span-7 flex flex-col justify-between space-y-2">
              {/* Pillar 1: Seguridad Financiera */}
              <div className="glass-panel rounded-2xl p-2.5 sm:p-3 border border-white/15 bg-[#0a0d16]/90 backdrop-blur-xl flex items-center space-x-3 hover:border-blue-400/60 transition-colors shadow-md">
                <div className="p-2 rounded-xl bg-[#002D72]/70 border border-blue-400/40 text-blue-200 shrink-0">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-black text-white uppercase tracking-wider font-mono">
                    SEGURIDAD FINANCIERA
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-200 leading-snug mt-0.5">
                    Un fondo para educación superior de tus hijos
                  </p>
                </div>
              </div>

              {/* Pillar 2: Desarrollo Integral */}
              <div className="glass-panel rounded-2xl p-2.5 sm:p-3 border border-white/15 bg-[#0a0d16]/90 backdrop-blur-xl flex items-center space-x-3 hover:border-amber-400/60 transition-colors shadow-md">
                <div className="p-2 rounded-xl bg-[#EAAA00]/30 border border-amber-400/40 text-[#EAAA00] shrink-0">
                  <Sprout className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffc72c]" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-black text-white uppercase tracking-wider font-mono">
                    DESARROLLO INTEGRAL
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-200 leading-snug mt-0.5">
                    Actividades, talleres y experiencias para potenciar su talento
                  </p>
                </div>
              </div>

              {/* Pillar 3: Vinculación Universitaria Temprana */}
              <div className="glass-panel rounded-2xl p-2.5 sm:p-3 border border-white/15 bg-[#0a0d16]/90 backdrop-blur-xl flex items-center space-x-3 hover:border-[#ff3377]/60 transition-colors shadow-md">
                <div className="p-2 rounded-xl bg-[#910048]/50 border border-pink-400/40 text-pink-300 shrink-0">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-pink-200" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-black text-white uppercase tracking-wider font-mono">
                    VINCULACIÓN UNIVERSITARIA TEMPRANA
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-200 leading-snug mt-0.5">
                    Acceso progresivo al ecosistema de la universidad #1 en innovación de Ecuador
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            CENTER COLUMN: Rocky Crag Background + Floating Card A2IV
           ======================================================== */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center relative py-4 sm:py-6 min-w-0 w-full overflow-hidden">
          <ReinventorsKeyCard stage="hero" glowIntensity={0.85} />
        </div>

        {/* ========================================================
            RIGHT COLUMN: Comparativa, Tabs Beneficios, Dual Red Buttons
           ======================================================== */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-3.5 min-w-0 w-full">
          {/* Header Comparativa */}
          <div className="text-center">
            <h3 className="text-sm sm:text-base font-black tracking-widest text-white uppercase font-mono drop-shadow">
              ¿Por qué empezar hoy?
            </h3>
          </div>

          {/* Dual Comparison Cards side-by-side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Si empiezas temprano (Teal/Emerald) */}
            <div className="glass-panel rounded-2xl p-3 border border-emerald-400/50 bg-[#061514]/90 backdrop-blur-xl space-y-2 shadow-lg">
              <div className="flex items-center space-x-1.5 text-emerald-400">
                <Check className="w-4 h-4 shrink-0 font-black" />
                <h4 className="text-xs font-bold text-white tracking-tight">
                  Si empiezas temprano
                </h4>
              </div>
              <ul className="space-y-1 text-[11px] text-slate-100 leading-tight">
                <li className="flex items-start space-x-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Menor aporte mensual</span>
                </li>
                <li className="flex items-start space-x-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Mayor fondo acumulado</span>
                </li>
                <li className="flex items-start space-x-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Más años de beneficios</span>
                </li>
                <li className="flex items-start space-x-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Más oportunidades para tu hijo</span>
                </li>
              </ul>
            </div>

            {/* Si esperas (Crimson/Red) */}
            <div className="glass-panel rounded-2xl p-3 border border-rose-400/50 bg-[#16060c]/90 backdrop-blur-xl space-y-2 shadow-lg">
              <div className="flex items-center space-x-1.5 text-rose-400">
                <X className="w-4 h-4 shrink-0 font-black" />
                <h4 className="text-xs font-bold text-white tracking-tight">
                  Si esperas
                </h4>
              </div>
              <ul className="space-y-1 text-[11px] text-slate-100 leading-tight">
                <li className="flex items-start space-x-1.5">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Mayor esfuerzo financiero</span>
                </li>
                <li className="flex items-start space-x-1.5">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Menos beneficios acumulados</span>
                </li>
                <li className="flex items-start space-x-1.5">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Menor tiempo de planificación</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Switch: Calcula tu plan en vivo */}
          <div className="flex justify-center">
            <button
              onClick={handleTogglePlan}
              className="px-5 py-2 rounded-full glass-panel border border-white/25 bg-[#0a0d16]/90 backdrop-blur-xl flex items-center space-x-3 cursor-pointer hover:border-white/50 transition-all shadow-lg"
            >
              <span className="text-xs font-mono font-bold text-slate-100">
                Calcula tu plan en vivo
              </span>
              <div
                className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-300 flex items-center ${
                  planEnVivoActive ? "bg-emerald-500 justify-end" : "bg-slate-700 justify-start"
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md" />
              </div>
            </button>
          </div>

          {/* PAQUETE DE BENEFICIOS SOCIOS DINERS */}
          <div id="beneficios" className="space-y-2 scroll-mt-20">
            <div className="text-center">
              <span className="text-[11px] font-mono font-black text-slate-200 uppercase tracking-wider block">
                Paquete beneficios socios diners
              </span>
            </div>

            {/* 3 Tabs */}
            <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-[#08090C]/90 border border-white/15">
              <button
                onClick={() => setActiveTab("rcb")}
                className={`py-2 px-1 rounded-xl text-[9px] min-[380px]:text-[10px] font-mono font-bold uppercase transition-all cursor-pointer text-center leading-tight flex items-center justify-center ${
                  activeTab === "rcb"
                    ? "bg-[#EAAA00] text-black shadow-lg"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                RAUL COKA BARRIGA
              </button>

              <button
                onClick={() => setActiveTab("diners")}
                className={`py-2 px-1 rounded-xl text-[9px] min-[380px]:text-[10px] font-mono font-bold uppercase transition-all cursor-pointer text-center leading-tight flex items-center justify-center ${
                  activeTab === "diners"
                    ? "bg-[#002D72] text-white border border-blue-400/50 shadow-lg"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                DINERS CLUB
              </button>

              <button
                onClick={() => setActiveTab("uide")}
                className={`py-2 px-1 rounded-xl text-[9px] min-[380px]:text-[10px] font-mono font-bold uppercase transition-all cursor-pointer text-center leading-tight flex items-center justify-center ${
                  activeTab === "uide"
                    ? "bg-[#910048] text-white shadow-lg"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                UIDE
              </button>
            </div>

            {/* Active Tab Preview Card */}
            <div className="glass-panel rounded-2xl p-3 border border-white/15 bg-[#0a0d16]/90 backdrop-blur-xl min-h-[70px] flex items-center justify-between shadow-md">
              {activeTab === "rcb" && (
                <div className="flex items-center space-x-3 w-full">
                  <ShieldCheck className="w-5 h-5 text-[#ffc72c] shrink-0" />
                  <div className="text-[11px] text-slate-100">
                    <span className="font-bold text-white block">Póliza de Protección RCB ($25/mes):</span>
                    100% de la colegiatura asegurada ante fallecimiento, invalidez o desempleo involuntario.
                  </div>
                </div>
              )}

              {activeTab === "diners" && (
                <div className="flex items-center space-x-3 w-full">
                  <Plane className="w-5 h-5 text-blue-300 shrink-0" />
                  <div className="text-[11px] text-slate-100">
                    <span className="font-bold text-white block">ClubMiles & Débito Diners (3.40% anual):</span>
                    Rendimiento con capitalización mensual, 1 ClubMile por dólar y débito automático recurrente.
                  </div>
                </div>
              )}

              {activeTab === "uide" && (
                <div className="flex items-center space-x-3 w-full">
                  <Building className="w-5 h-5 text-pink-300 shrink-0" />
                  <div className="text-[11px] text-slate-100">
                    <span className="font-bold text-white block">Red ASU & Campus UIDE:</span>
                    Doble titulación en EE.UU., beca de fidelidad PAD y admisión preferencial garantizada.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* DUAL RED ACTION BUTTONS (WCAG AA Compliant High Contrast) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <button
              onClick={onOpenSavingsForm}
              className="py-3 px-3 rounded-xl bg-gradient-to-r from-[#a80054] to-[#c70063] hover:from-[#c70063] hover:to-[#e60073] text-white text-[11px] font-black font-mono uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(168,0,84,0.6)] border border-pink-400/50 text-center cursor-pointer active:scale-95"
            >
              Quiero comenzar mi plan de ahorro
            </button>

            <button
              onClick={onOpenAdvisoryForm}
              className="py-3 px-3 rounded-xl bg-gradient-to-r from-[#a80054] to-[#c70063] hover:from-[#c70063] hover:to-[#e60073] text-white text-[11px] font-black font-mono uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(168,0,84,0.6)] border border-pink-400/50 text-center cursor-pointer active:scale-95"
            >
              Quiero asesoría personalizada
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          ELEVATED LOGO BAR (SUBIDO Y NÍTIDO: UIDE × DINERS × RCB)
         ======================================================== */}
      <div className="max-w-[1720px] w-full mx-auto mt-6 mb-2 p-3 sm:p-4 rounded-2xl glass-panel bg-[#080b12]/95 backdrop-blur-2xl border border-white/20 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logos with Clean White Badges for Maximum Contrast */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-6">
          {/* Logo UIDE Powered by ASU */}
          <div className="h-11 sm:h-12 px-3 sm:px-4 py-1.5 rounded-xl bg-white flex items-center justify-center shadow-lg border border-slate-200">
            <img
              src={getAssetPath("/logos/uide-logo-opt.webp")}
              alt="UIDE Powered by Arizona State University"
              className="h-full w-auto object-contain max-h-7 sm:max-h-8"
            />
          </div>

          <span className="text-white/30 hidden sm:inline text-lg">|</span>

          {/* Logo Diners Club (Crisp White Badge so blue circle & black serif text pop 100%) */}
          <div className="h-11 sm:h-12 px-4 py-1.5 rounded-xl bg-white flex items-center justify-center shadow-lg border border-slate-200">
            <img
              src={getAssetPath("/logos/diners-logo-opt.png")}
              alt="Diners Club"
              className="h-full w-auto object-contain max-h-7 sm:max-h-8"
            />
          </div>

          <span className="text-white/30 hidden sm:inline text-lg">|</span>

          {/* Logo Raúl Coka Barriga */}
          <div className="h-11 sm:h-12 px-3 sm:px-4 py-1.5 rounded-xl bg-white flex items-center justify-center shadow-lg border border-slate-200">
            <img
              src={getAssetPath("/logos/rcb-logo-opt.webp")}
              alt="Raúl Coka Barriga"
              className="h-full w-auto object-contain max-h-7 sm:max-h-8"
            />
          </div>
        </div>

        {/* Right side: REINVENTEMOS EL FUTURO & FAQ Accordion Trigger */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <span className="text-xs font-mono text-slate-200 font-bold tracking-wider hidden md:inline">
            REINVENTEMOS EL FUTURO
          </span>
          <button
            onClick={onScrollToFaq}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-xs font-mono font-bold text-white flex items-center space-x-1.5 cursor-pointer shadow-lg transition-colors"
          >
            <span>SECCIÓN FAQ</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#ff3377]" />
          </button>
        </div>
      </div>
    </section>
  );
}
