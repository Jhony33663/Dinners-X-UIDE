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
  Sparkles,
  ArrowRight,
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

  return (
    <section className="relative w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-10 flex flex-col justify-between overflow-x-hidden max-w-full space-y-12">
      {/* ========================================================
          1. ECOSISTEMA & 3 PILARES ESTRATÉGICOS (Diseño Limpio y Espacioso)
         ======================================================== */}
      <div className="max-w-[1720px] w-full mx-auto space-y-8">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#910048]/15 border border-[#910048]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#ffc72c]" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#ffc72c] uppercase">
              ALIANZA OFICIAL: UIDE × DINERS CLUB × RAÚL COKA BARRIGA
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white drop-shadow-md">
            Ecosistema Integral de Educación Superior y Protección Fiduciaria
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium max-w-3xl mx-auto">
            &ldquo;Reinventors PAD es un programa de ahorro educativo en alianza entre UIDE, Diners Club y RCB que permite a las familias planificar el futuro universitario de sus hijos mientras acceden a experiencias de desarrollo personal, académico y familiar.&rdquo;
          </p>
        </div>

        {/* 2-Column Showcase: 3 Pillars + Video on Left, 3D KeyCard on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center pt-2">
          {/* Left Column (col-span-7): The 3 Pillars + Video Explicativo */}
          <div className="lg:col-span-7 space-y-4">
            {/* The 3 Pillars Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Pillar 1: Seguridad Financiera */}
              <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-blue-500/25 bg-[#0a1224]/90 backdrop-blur-xl space-y-2 hover:border-blue-400/60 transition-all shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-[#002D72]/80 border border-blue-400/40 text-blue-200 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-300" />
                </div>
                <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">
                  SEGURIDAD FINANCIERA
                </h4>
                <p className="text-[11px] text-slate-200 leading-relaxed">
                  Un fondo para educación superior de tus hijos blindado con patrimonio fiduciario y póliza de colegiatura 100% garantizada por Raúl Coka Barriga.
                </p>
              </div>

              {/* Pillar 2: Desarrollo Integral */}
              <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-amber-500/25 bg-[#1a1408]/90 backdrop-blur-xl space-y-2 hover:border-amber-400/60 transition-all shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-[#EAAA00]/30 border border-amber-400/40 text-[#EAAA00] flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-[#ffc72c]" />
                </div>
                <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">
                  DESARROLLO INTEGRAL
                </h4>
                <p className="text-[11px] text-slate-200 leading-relaxed">
                  Actividades, talleres, campamentos y experiencias para potenciar su talento desde la etapa escolar con acompañamiento vocacional.
                </p>
              </div>

              {/* Pillar 3: Vinculación Universitaria Temprana */}
              <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-pink-500/25 bg-[#1c0814]/90 backdrop-blur-xl space-y-2 hover:border-pink-400/60 transition-all shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-[#910048]/50 border border-pink-400/40 text-pink-300 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-pink-200" />
                </div>
                <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">
                  VINCULACIÓN TEMPRANA
                </h4>
                <p className="text-[11px] text-slate-200 leading-relaxed">
                  Acceso progresivo al ecosistema de la universidad #1 en innovación de Ecuador y la red internacional de Arizona State University (ASU).
                </p>
              </div>
            </div>

            {/* VIDEO EXPLICATIVO Brushed Banner */}
            <div
              onClick={onOpenVideo}
              className="relative rounded-2xl p-4 sm:p-5 border border-white/20 flex flex-col sm:flex-row items-center justify-between text-left cursor-pointer group hover:border-[#ff3377]/80 transition-all duration-300 overflow-hidden select-none shadow-xl bg-gradient-to-r from-black/80 via-[#1a0815]/90 to-black/80"
            >
              <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                <div className="w-11 h-11 rounded-full bg-[#a80054] flex items-center justify-center shadow-[0_0_20px_rgba(255,51,119,0.8)] group-hover:scale-110 group-hover:bg-[#c70063] transition-transform shrink-0">
                  <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                </div>
                <div>
                  <span className="text-xs font-black font-mono tracking-wider text-white uppercase block">
                    VIDEO EXPLICATIVO OFICIAL
                  </span>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    Descubre en 2 minutos cómo funciona el ahorro fiduciario y la protección estudiantil
                  </p>
                </div>
              </div>

              <div className="px-4 py-2 rounded-xl bg-white/10 group-hover:bg-white/20 border border-white/20 text-xs font-mono font-bold text-[#ffc72c] uppercase flex items-center space-x-1.5 transition-colors">
                <span>Reproducir Video</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Right Column (col-span-5): 3D Reinventors KeyCard Interactive Experience */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative py-4 min-w-0 w-full overflow-hidden">
            <ReinventorsKeyCard stage="hero" glowIntensity={0.85} />
          </div>
        </div>
      </div>

      {/* ========================================================
          2. ¿POR QUÉ EMPEZAR HOY? & PAQUETE DE BENEFICIOS SOCIOS
         ======================================================== */}
      <div className="max-w-[1720px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Left Side (col-span-6): Comparativa Si Empiezas Temprano vs Si Esperas */}
        <div className="lg:col-span-6 glass-panel rounded-3xl p-6 sm:p-7 border border-white/15 bg-[#0a0d16]/95 backdrop-blur-xl space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-black tracking-wide text-white uppercase font-mono drop-shadow">
              ¿Por qué empezar hoy?
            </h3>
            <p className="text-xs text-slate-300 font-sans">
              El tiempo y el interés compuesto marcan la diferencia en el presupuesto familiar.
            </p>
          </div>

          {/* Dual Comparison Cards side-by-side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Si empiezas temprano (Teal/Emerald) */}
            <div className="rounded-2xl p-4 border border-emerald-400/40 bg-[#061514]/90 space-y-2.5 shadow-md">
              <div className="flex items-center space-x-2 text-emerald-400">
                <Check className="w-4 h-4 shrink-0 font-black" />
                <h4 className="text-xs font-bold text-white tracking-tight">
                  Si empiezas temprano
                </h4>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-100 leading-tight">
                <li className="flex items-start space-x-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Menor aporte mensual (desde $7.87/día)</span>
                </li>
                <li className="flex items-start space-x-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Mayor fondo acumulado con interés compuesto</span>
                </li>
                <li className="flex items-start space-x-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Más años de beneficios y protección fiduciaria</span>
                </li>
                <li className="flex items-start space-x-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Más oportunidades y tranquilidad para tu hijo</span>
                </li>
              </ul>
            </div>

            {/* Si esperas (Crimson/Red) */}
            <div className="rounded-2xl p-4 border border-rose-400/40 bg-[#16060c]/90 space-y-2.5 shadow-md">
              <div className="flex items-center space-x-2 text-rose-400">
                <X className="w-4 h-4 shrink-0 font-black" />
                <h4 className="text-xs font-bold text-white tracking-tight">
                  Si esperas
                </h4>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-100 leading-tight">
                <li className="flex items-start space-x-1.5">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Mayor esfuerzo financiero (cuotas hasta 4x)</span>
                </li>
                <li className="flex items-start space-x-1.5">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Cero margen para rendimiento compuesto</span>
                </li>
                <li className="flex items-start space-x-1.5">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Menor tiempo de planificación fiduciaria</span>
                </li>
                <li className="flex items-start space-x-1.5">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Mayor estrés ante imprevistos de última hora</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Switch: Calcula tu plan en vivo */}
          <div className="pt-2">
            <button
              onClick={onOpenSimulator}
              className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-[#910048] to-[#B8005D] hover:brightness-110 text-white text-xs font-mono font-black uppercase tracking-wider transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
            >
              <span>Calcular Mi Plan en Vivo en el Simulador</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Side (col-span-6): Paquete de Beneficios Socios Diners Club */}
        <div id="beneficios" className="lg:col-span-6 glass-panel rounded-3xl p-6 sm:p-7 border border-white/15 bg-[#0a0d16]/95 backdrop-blur-xl space-y-4 shadow-xl flex flex-col justify-between scroll-mt-20">
          <div className="space-y-1">
            <span className="text-base sm:text-lg font-black tracking-wide text-white uppercase font-mono block drop-shadow">
              Paquete Beneficios Socios Diners Club
            </span>
            <p className="text-xs text-slate-300 font-sans">
              Accede a ventajas exclusivas fiduciarias, financieras y académicas según cada aliado.
            </p>
          </div>

          {/* 3 Tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-[#08090C]/90 border border-white/15">
            <button
              onClick={() => setActiveTab("rcb")}
              className={`py-2.5 px-1 rounded-xl text-[10px] sm:text-xs font-mono font-bold uppercase transition-all cursor-pointer text-center leading-tight flex items-center justify-center ${
                activeTab === "rcb"
                  ? "bg-[#EAAA00] text-black shadow-lg"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              RAÚL COKA BARRIGA
            </button>

            <button
              onClick={() => setActiveTab("diners")}
              className={`py-2.5 px-1 rounded-xl text-[10px] sm:text-xs font-mono font-bold uppercase transition-all cursor-pointer text-center leading-tight flex items-center justify-center ${
                activeTab === "diners"
                  ? "bg-[#002D72] text-white border border-blue-400/50 shadow-lg"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              DINERS CLUB
            </button>

            <button
              onClick={() => setActiveTab("uide")}
              className={`py-2.5 px-1 rounded-xl text-[10px] sm:text-xs font-mono font-bold uppercase transition-all cursor-pointer text-center leading-tight flex items-center justify-center ${
                activeTab === "uide"
                  ? "bg-[#910048] text-white shadow-lg"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              UIDE × ASU
            </button>
          </div>

          {/* Active Tab Preview Card */}
          <div className="glass-panel rounded-2xl p-4 border border-white/15 bg-[#08090C]/90 backdrop-blur-xl min-h-[90px] flex items-center justify-between shadow-md">
            {activeTab === "rcb" && (
              <div className="flex items-start space-x-3 w-full">
                <ShieldCheck className="w-6 h-6 text-[#ffc72c] shrink-0 mt-0.5" />
                <div className="text-xs text-slate-100 space-y-1">
                  <span className="font-bold text-white block">Póliza de Protección Estudiantil RCB ($25.00 USD/mes):</span>
                  <p className="text-slate-300 leading-relaxed">
                    100% de la colegiatura asegurada ante fallecimiento o invalidez total del aportante, más cobertura por desempleo involuntario de hasta 6 meses.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "diners" && (
              <div className="flex items-start space-x-3 w-full">
                <Plane className="w-6 h-6 text-blue-300 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-100 space-y-1">
                  <span className="font-bold text-white block">ClubMiles & Débito Automático Diners Club (3.40% anual):</span>
                  <p className="text-slate-300 leading-relaxed">
                    Rendimiento financiero con capitalización mensual de intereses, acumulación 1 ClubMile por cada dólar aportado y débito automático recurrente garantizado.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "uide" && (
              <div className="flex items-start space-x-3 w-full">
                <Building className="w-6 h-6 text-pink-300 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-100 space-y-1">
                  <span className="font-bold text-white block">Alianza Internacional Arizona State University (ASU):</span>
                  <p className="text-slate-300 leading-relaxed">
                    Doble titulación oficial en Estados Unidos, Beca de Fidelidad PAD UIDE de hasta el 25% en colegiatura y admisión directa preferencial sin examen regular.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* DUAL RED ACTION BUTTONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <button
              onClick={onOpenSavingsForm}
              className="py-3 px-3 rounded-xl bg-gradient-to-r from-[#a80054] to-[#c70063] hover:from-[#c70063] hover:to-[#e60073] text-white text-xs font-black font-mono uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(168,0,84,0.6)] border border-pink-400/50 text-center cursor-pointer active:scale-95"
            >
              Comenzar Mi Plan de Ahorro
            </button>

            <button
              onClick={onOpenAdvisoryForm}
              className="py-3 px-3 rounded-xl bg-gradient-to-r from-[#a80054] to-[#c70063] hover:from-[#c70063] hover:to-[#e60073] text-white text-xs font-black font-mono uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(168,0,84,0.6)] border border-pink-400/50 text-center cursor-pointer active:scale-95"
            >
              Solicitar Asesoría Personalizada
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          3. ELEVATED LOGO BAR (UIDE × DINERS × RCB)
         ======================================================== */}
      <div className="max-w-[1720px] w-full mx-auto p-4 sm:p-5 rounded-2xl glass-panel bg-[#080b12]/95 backdrop-blur-2xl border border-white/20 shadow-2xl flex flex-wrap items-center justify-between gap-4">
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

          {/* Logo Diners Club */}
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
