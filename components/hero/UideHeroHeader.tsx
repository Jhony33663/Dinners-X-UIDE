"use client";

import React from "react";
import {
  Phone,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Clock,
  Users,
  Award,
  Sparkles,
  Plane,
  ChevronDown,
} from "lucide-react";
import { getAssetPath } from "@/lib/paths";

interface UideHeroHeaderProps {
  onOpenSimulator: () => void;
  onOpenSavingsForm: () => void;
  onOpenAdvisoryForm: () => void;
  onScrollToCarreras: () => void;
  onScrollToBenefits: () => void;
  onScrollToFaq: () => void;
}

export default function UideHeroHeader({
  onOpenSimulator,
  onOpenSavingsForm,
  onOpenAdvisoryForm,
  onScrollToCarreras,
  onScrollToBenefits,
  onScrollToFaq,
}: UideHeroHeaderProps) {
  return (
    <header className="relative w-full bg-[#08090C] text-white overflow-hidden border-b border-white/10 select-none">
      {/* ========================================================
          1. TOP NAVIGATION BAR (Refined Luxury Aesthetic from Reference)
         ======================================================== */}
      <nav className="relative z-30 w-full bg-[#0a070c]/90 backdrop-blur-xl border-b border-[#D4AF37]/20 px-3 sm:px-6 lg:px-10 py-3">
        <div className="max-w-[1720px] mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Brand Identity */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Logos in clean high-contrast pill */}
            <div className="h-10 sm:h-11 px-3 py-1 bg-white rounded-xl flex items-center space-x-2 shadow-md border border-slate-200">
              <img
                src={getAssetPath("/logos/uide-logo-opt.webp")}
                alt="UIDE Powered by ASU"
                className="h-full w-auto object-contain max-h-7"
              />
              <span className="text-slate-300 font-light">|</span>
              <img
                src={getAssetPath("/logos/diners-logo-opt.png")}
                alt="Diners Club"
                className="h-full w-auto object-contain max-h-6"
              />
              <span className="text-slate-300 font-light">|</span>
              <img
                src={getAssetPath("/logos/rcb-logo-opt.webp")}
                alt="Raúl Coka Barriga"
                className="h-full w-auto object-contain max-h-6"
              />
            </div>

            {/* Typography brand title */}
            <div className="hidden md:block">
              <span className="text-xs font-mono font-black tracking-widest text-[#D4AF37] block uppercase">
                REINVENTORS PAD
              </span>
              <span className="text-[10px] text-slate-300 tracking-wider block font-sans">
                PROGRAMA DE ACUMULACIÓN EDUCATIVA FIDUCIARIA
              </span>
            </div>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6 text-xs font-mono font-semibold tracking-wider text-slate-200">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              INICIO
            </button>
            <button
              onClick={onScrollToCarreras}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              CARRERAS UIDE
            </button>
            <button
              onClick={onOpenSimulator}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              SIMULADOR
            </button>
            <button
              onClick={onScrollToBenefits}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              BENEFICIOS SOCIOS
            </button>
            <button
              onClick={onScrollToFaq}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </div>

          {/* Right: Contact Badge & Request Call Button (Exact like Reference) */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Phone pill */}
            <a
              href="tel:1800843372"
              className="px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8972E] text-slate-950 text-xs font-mono font-black flex items-center space-x-2 shadow-md hover:brightness-110 transition-all cursor-pointer"
              title="Llamada gratuita nacional"
            >
              <Phone className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
              <span className="hidden sm:inline">1800-UIDE-PAD</span>
              <span className="sm:hidden">1800</span>
            </a>

            {/* Request a Call / Asesoría button */}
            <button
              onClick={onOpenAdvisoryForm}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono font-bold text-white uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-1.5"
            >
              <span>SOLICITAR ASESORÍA</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ========================================================
          2. VISUAL MOSAIC COLLAGE HERO (5 Imagery Tiles + Floating Center Card)
         ======================================================== */}
      <div className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center justify-center py-8 sm:py-12 px-3 sm:px-6 lg:px-10 overflow-hidden">
        {/* Background Visual Collage: 3-column mosaic matching Reference Image */}
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-12 gap-1.5 sm:gap-2 opacity-50 lg:opacity-60 scale-[1.02] filter saturate-[1.1] pointer-events-none">
          {/* Column 1 (Left): Foliage (Top) + Doctor (Bottom) */}
          <div className="md:col-span-3 grid grid-rows-2 gap-1.5 sm:gap-2 h-full">
            <div className="relative overflow-hidden rounded-lg group">
              <img
                src={getAssetPath("/images/hero/foliage.jpg")}
                alt="Campus UIDE Naturaleza y Sostenibilidad"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
              <div className="absolute bottom-2 left-2 text-[10px] font-mono text-emerald-300 font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-emerald-500/30">
                Ecosistema Campus UIDE
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg group">
              <img
                src={getAssetPath("/images/hero/doctor.jpg")}
                alt="Facultad de Medicina y Ciencias de la Salud UIDE"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
              <div className="absolute bottom-2 left-2 text-[10px] font-mono text-blue-300 font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-blue-500/30">
                Excelencia Médica & STEM
              </div>
            </div>
          </div>

          {/* Column 2 (Center): Visionary Eye (Top) + Modern Skyline (Bottom) */}
          <div className="md:col-span-5 grid grid-rows-2 gap-1.5 sm:gap-2 h-full">
            <div className="relative overflow-hidden rounded-lg group">
              <img
                src={getAssetPath("/images/hero/eye.jpg")}
                alt="Mirada visionaria al futuro"
                className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
              <div className="absolute top-2 right-2 text-[10px] font-mono text-[#D4AF37] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-[#D4AF37]/30">
                Visión de Futuro 2030+
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg group">
              <img
                src={getAssetPath("/images/hero/skyline.jpg")}
                alt="Centros financieros globales y red ASU"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
              <div className="absolute bottom-2 left-2 text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-amber-500/30">
                Proyección Global Arizona State University
              </div>
            </div>
          </div>

          {/* Column 3 (Right): Lifestyle / Swimming / Tranquilidad (Full Height) */}
          <div className="md:col-span-4 h-full relative overflow-hidden rounded-lg group">
            <img
              src={getAssetPath("/images/hero/lifestyle.jpg")}
              alt="Tranquilidad familiar y plenitud de vida"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
            <div className="absolute bottom-2 right-2 text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-cyan-500/30">
              Tranquilidad Patrimonial Diners Club
            </div>
          </div>
        </div>

        {/* Darkening & vignette overlay to give maximum contrast to central card */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/75 to-[#08090C]/60 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(145,0,72,0.25)_0%,rgba(0,0,0,0.85)_75%)] pointer-events-none" />

        {/* ========================================================
            3. CENTRAL FLOATING HERO CARD (Matching Reference Image)
           ======================================================== */}
        <div className="relative z-20 max-w-4xl w-full mx-auto p-6 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-[#1c0a1a]/95 via-[#290d23]/95 to-[#160815]/95 border-2 border-[#D4AF37]/50 shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_60px_rgba(212,175,55,0.25)] backdrop-blur-2xl text-center space-y-6 animate-fade-in">
          {/* Eyebrow: Tri-brand Authority & Innovation */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] sm:text-xs font-mono font-black tracking-widest text-[#F3E5AB] uppercase">
              UIDE POWERED BY ARIZONA STATE UNIVERSITY × DINERS CLUB × RAÚL COKA BARRIGA
            </span>
          </div>

          {/* Main Headline (Gold & Crisp White like Reference: "MORE THAN HEALTHCARE, THIS IS LIFECARE") */}
          <div className="space-y-2">
            <h2 className="text-sm sm:text-base font-mono font-bold tracking-widest text-[#D4AF37] uppercase">
              MÁS QUE UNA UNIVERSIDAD, ES EL FUTURO ASEGURADO DE TUS HIJOS
            </h2>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.08] drop-shadow-2xl">
              EL FUTURO NO ESPERA.{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF2B2] to-[#E5A823]">
                EMPIEZA HOY.
              </span>
            </h1>
          </div>

          {/* Persuasion Body Copy integrating Cialdini's Principles:
              1. Scarcity & Urgency (El tiempo se agota, cada año de espera triplica el costo)
              2. Authority (UIDE #1 en innovación, ASU #1 en USA, Banco Diners Club, RCB)
              3. Social Proof (+3,200 familias visionarias ya garantizan su cupo)
              4. Reciprocity (Diagnóstico y simulación sin costo)
          */}
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl mx-auto font-medium">
            <strong className="text-white">Cada año que postergas multiplica el esfuerzo financiero</strong>: comenzar a los 8 años representa un ahorro de apenas{" "}
            <span className="text-[#D4AF37] font-bold">$7.87 USD al día</span>, mientras que esperar a los 16 años exige cuotas hasta 4 veces superiores.{" "}
            Más de <span className="text-[#FFF2B2] font-bold">+3,200 familias visionarias</span> ya protegen la carrera universitaria de sus hijos en la universidad{" "}
            <strong className="text-white">#1 en innovación de Ecuador</strong>, con el respaldo fiduciario fiduciario de <strong className="text-white">Diners Club</strong> y la póliza 100% garantizada de <strong className="text-white">Raúl Coka Barriga</strong>.
          </p>

          {/* High-Impact Gold CTA Button (Exact Reference Styling: Discover Private Client style) */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenSimulator}
              className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] hover:from-[#E5BF48] hover:via-[#FFF3BD] hover:to-[#D6B16A] text-slate-950 text-xs sm:text-sm font-black font-mono uppercase tracking-wider transition-all duration-300 shadow-[0_0_35px_rgba(212,175,55,0.65)] hover:shadow-[0_0_50px_rgba(212,175,55,0.9)] hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center space-x-3 border border-yellow-200"
            >
              <GraduationCap className="w-5 h-5 text-slate-950" />
              <span>SIMULAR MI PLAN DE AHORRO EDUCATIVO</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={onOpenSavingsForm}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-black/60 hover:bg-black/80 text-white border border-[#D4AF37]/50 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Asegurar Beca PAD 25%</span>
            </button>
          </div>

          {/* Cialdini Trust Badges Grid (Social Proof + Authority + Safety + Urgency) */}
          <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            {/* Badge 1: Urgency / High Return */}
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center space-x-2.5">
              <div className="p-1.5 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-mono uppercase">Desde</span>
                <span className="text-xs font-black text-white font-mono">$7.87 USD / día</span>
              </div>
            </div>

            {/* Badge 2: Authority ASU */}
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center space-x-2.5">
              <div className="p-1.5 rounded-lg bg-red-500/20 text-red-300 shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-mono uppercase">Red Internacional</span>
                <span className="text-xs font-black text-white font-mono">Doble Título ASU</span>
              </div>
            </div>

            {/* Badge 3: Social Proof */}
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center space-x-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-mono uppercase">Prueba Social</span>
                <span className="text-xs font-black text-white font-mono">+3,200 Familias</span>
              </div>
            </div>

            {/* Badge 4: Guaranteed Insurance RCB */}
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center space-x-2.5">
              <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-300 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-mono uppercase">Póliza Fiduciaria</span>
                <span className="text-xs font-black text-white font-mono">100% Protegido RCB</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          4. SLEEK LOWER BANNER TRANSITION (Like Reference Bottom Subtitle)
         ======================================================== */}
      <div className="w-full bg-[#0d070e] border-t border-white/10 px-3 sm:px-6 lg:px-10 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3 text-xs text-slate-300 font-mono">
          <span className="text-[#D4AF37] font-bold">ALIANZA ESTRATÉGICA:</span>
          <span>UIDE Powered by ASU</span>
          <span className="text-slate-600">•</span>
          <span>Diners Club del Ecuador</span>
          <span className="text-slate-600">•</span>
          <span>Raúl Coka Barriga</span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={onScrollToCarreras}
            className="text-xs font-mono text-[#D4AF37] hover:underline flex items-center space-x-1 cursor-pointer"
          >
            <span>Ver Carreras Disponibles</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
