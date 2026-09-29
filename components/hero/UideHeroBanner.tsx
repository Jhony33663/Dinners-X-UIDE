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
    <section className="relative w-full overflow-hidden bg-[#08090C] text-white select-none border-b border-white/10">
      {/* ========================================================
          HERO BACKGROUND CONTAINER (Foto oficial estudiantes UIDE x Diners Club)
         ======================================================== */}
      <div className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center justify-center lg:justify-end p-4 sm:p-8 lg:p-14">
        {/* Background HD Image with students */}
        <div
          className="absolute inset-0 bg-cover bg-center lg:bg-[center_left_20%] filter brightness-[0.9] contrast-[1.05]"
          style={{
            backgroundImage: `url(${getAssetPath("/images/hero/uide_students_clean_hd.jpg")})`,
          }}
        />

        {/* Cinematic Vignette Gradients for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/80 lg:to-black/85 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-transparent to-black/60 pointer-events-none" />

        {/* Top Floating Tri-Brand Pill */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-8 z-20 flex items-center space-x-2 sm:space-x-3 bg-white/95 px-3 sm:px-4 py-1.5 rounded-full shadow-xl border border-slate-200">
          <img
            src={getAssetPath("/logos/uide-logo-opt.webp")}
            alt="UIDE Powered by ASU"
            className="h-5 sm:h-6 w-auto object-contain"
          />
          <span className="text-slate-300 font-light text-xs">|</span>
          <img
            src={getAssetPath("/logos/diners-logo-opt.png")}
            alt="Diners Club"
            className="h-4 sm:h-5 w-auto object-contain"
          />
          <span className="text-slate-300 font-light text-xs">|</span>
          <img
            src={getAssetPath("/logos/rcb-logo-opt.webp")}
            alt="Raúl Coka Barriga"
            className="h-4 sm:h-5 w-auto object-contain"
          />
        </div>

        {/* ========================================================
            GLASSMORPHIC HERO CARD (Colorimetría Oficial UIDE: 221 C, 288 C, 124 C)
            Ubicada estratégicamente a la derecha para lucir la fotografía institucional a la izquierda
           ======================================================== */}
        <div className="relative z-10 max-w-xl lg:max-w-2xl w-full mx-auto lg:mr-4 lg:ml-auto px-6 py-8 sm:px-10 sm:py-10 rounded-3xl bg-gradient-to-br from-[#910048]/40 via-[#002D72]/45 to-[#08090C]/80 border border-white/20 hover:border-[#EAAA00]/50 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(145,0,72,0.35),inset_0_1px_1px_rgba(255,255,255,0.25)] backdrop-blur-2xl text-center space-y-6 transition-all duration-300">
          {/* Main Headline with Brachial (Syncopate) + Poppins:
              Line 1 & 2 in UIDE Gold (Pantone 124 C #EAAA00), Line 3 in crisp white
          */}
          <h1 className="font-brachial text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-[0.14em] sm:tracking-[0.18em] leading-tight drop-shadow-2xl">
            <span className="block text-[#EAAA00]">EL FUTURO NO</span>
            <span className="block text-[#EAAA00] mt-1 sm:mt-2">ESPERA.</span>
            <span className="block text-white mt-1 sm:mt-2">EMPIEZA HOY.</span>
          </h1>

          {/* Golden CTA Button (Pantone 124 C) + Secondary Glass Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenSimulator}
              className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#EAAA00] via-[#FFC72C] to-[#EAAA00] hover:brightness-110 text-[#08090C] font-poppins text-xs sm:text-sm font-black uppercase tracking-[0.12em] transition-all duration-300 shadow-[0_0_30px_rgba(234,170,0,0.65)] hover:shadow-[0_0_45px_rgba(234,170,0,0.9)] hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center space-x-2.5 border border-yellow-200"
            >
              <GraduationCap className="w-4 h-4 text-[#08090C]" />
              <span>COMENZAR MI PLAN DE AHORRO</span>
              <ArrowRight className="w-4 h-4 text-[#08090C]" />
            </button>

            <button
              onClick={onOpenSavingsForm}
              className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-[#EAAA00]/50 font-poppins text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2 backdrop-blur-md active:scale-95"
            >
              <ShieldCheck className="w-4 h-4 text-[#EAAA00]" />
              <span>Conocer Beca PAD 25%</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
