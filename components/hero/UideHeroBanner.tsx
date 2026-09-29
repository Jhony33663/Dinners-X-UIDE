"use client";

import React from "react";
import { ArrowRight, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";
import { getAssetPath } from "@/lib/paths";

interface UideHeroBannerProps {
  onOpenSimulator: () => void;
  onOpenSavingsForm: () => void;
}

export default function UideHeroBanner({
  onOpenSimulator,
  onOpenSavingsForm,
}: UideHeroBannerProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#0d070b] text-white select-none border-b border-white/10">
      {/* ========================================================
          VISUAL COLLAGE CONTAINER (Exact 5 photographic scenes from reference)
          Desktop: Maintains 1862/644 aspect ratio.
          Mobile/Tablet: Responsive height with centered focus.
         ======================================================== */}
      <div className="relative w-full min-h-[460px] sm:min-h-[520px] md:min-h-[580px] lg:aspect-[1862/644] flex items-center justify-center p-3 sm:p-6 lg:p-8">
        {/* Background HD Collage */}
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.95] contrast-[1.02]"
          style={{
            backgroundImage: `url(${getAssetPath("/images/hero/hero_clean_hd.jpg")})`,
          }}
        />

        {/* Subtle vignette around edges for cinematic polish */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090C]/60 via-transparent to-[#08090C]/40 pointer-events-none" />

        {/* ========================================================
            CENTRAL FLOATING HERO CARD (Matching Reference Layout & Style)
            Floating horizontally in the center over the photographic mosaic
           ======================================================== */}
        <div className="relative z-10 max-w-2xl sm:max-w-3xl w-full mx-auto px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-8 rounded-2xl bg-gradient-to-r from-[#2c1d22]/95 via-[#3b272d]/95 to-[#5a3e36]/95 border border-[#d4af37]/50 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_40px_rgba(212,175,55,0.2)] backdrop-blur-xl text-center space-y-3 sm:space-y-4">
          {/* Brand Eyebrow with Poppins */}
          <div className="flex items-center justify-center space-x-2">
            <span className="h-px w-6 sm:w-10 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <span className="font-poppins text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-[#d4af37] uppercase">
              MÁS QUE UNA UNIVERSIDAD,
            </span>
            <span className="h-px w-6 sm:w-10 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>

          {/* Main Headline with Brachial / Poppins bold */}
          <h1 className="font-brachial text-2xl sm:text-4xl lg:text-5xl font-black uppercase text-[#fceda2] tracking-[0.14em] sm:tracking-[0.18em] leading-tight drop-shadow-lg">
            EL FUTURO NO ESPERA.{" "}
            <span className="block text-white mt-1">EMPIEZA HOY.</span>
          </h1>

          {/* Persuasion Body with Cialdini Principles (Urgencia + Autoridad + Prueba Social) */}
          <p className="font-poppins text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl mx-auto font-normal">
            <strong className="text-[#fceda2] font-semibold">El tiempo es el factor decisivo:</strong> cada año que postergas multiplica el costo de la colegiatura. Asegura hoy el cupo universitario de tus hijos en la universidad <strong className="text-white">#1 en innovación de Ecuador</strong>, con el respaldo fiduciario de <strong className="text-white">Diners Club</strong> y la póliza 100% garantizada de <strong className="text-white">Raúl Coka Barriga</strong>.
          </p>

          {/* Golden CTA Button (Matching Reference "DISCOVER PRIVATE CLIENT") */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenSimulator}
              className="w-full sm:w-auto px-7 sm:px-9 py-3 sm:py-3.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#c5a059] hover:from-[#e5bf48] hover:via-[#fff3bd] hover:to-[#d6b16a] text-[#1a1200] font-poppins text-xs sm:text-sm font-black uppercase tracking-[0.12em] transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.6)] hover:shadow-[0_0_35px_rgba(212,175,55,0.85)] hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center space-x-2.5 border border-yellow-200"
            >
              <GraduationCap className="w-4 h-4 text-[#1a1200]" />
              <span>COMENZAR MI PLAN DE AHORRO</span>
              <ArrowRight className="w-4 h-4 text-[#1a1200]" />
            </button>

            <button
              onClick={onOpenSavingsForm}
              className="w-full sm:w-auto px-5 py-3 sm:py-3.5 rounded-lg bg-black/50 hover:bg-black/70 text-slate-200 hover:text-white border border-[#d4af37]/40 font-poppins text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>Conocer Beca PAD 25%</span>
            </button>
          </div>

          {/* Tri-brand Subtle Accreditation */}
          <div className="pt-2 text-[10px] sm:text-[11px] font-poppins text-slate-300 tracking-wider flex items-center justify-center space-x-3 opacity-90">
            <span>UIDE Powered by ASU</span>
            <span className="text-[#d4af37]">•</span>
            <span>Banco Diners Club</span>
            <span className="text-[#d4af37]">•</span>
            <span>Raúl Coka Barriga</span>
          </div>
        </div>
      </div>
    </section>
  );
}
