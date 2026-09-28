"use client";

import React, { useState } from "react";
import ReinventorsKeyCard from "../card-3d/ReinventorsKeyCard";
import MagneticButton from "../ui/MagneticButton";
import { Shield, Sparkles, Play, GraduationCap, X, ChevronRight, CheckCircle2 } from "lucide-react";

export default function Scene1Hero() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const scrollToPillars = () => {
    const el = document.getElementById("pilares");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSimulator = () => {
    const el = document.getElementById("cotizador");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* ========================================================
            LEFT COLUMN: Monolithic Headline, Video Explicativo & 3 Pillars
           ======================================================== */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          {/* Main Headline exact copy from user reference */}
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black tracking-wider text-[#910048] uppercase font-mono">
              REINVENTORS PAD:
            </h2>
            <h1 className="text-3xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-[1.0] text-white uppercase font-sans">
              EL FUTURO DE TUS HIJOS{" "}
              <span className="block text-white">
                LO REINVENTAS{" "}
                <span className="text-[#910048] underline decoration-[#EAAA00] decoration-2 underline-offset-8">
                  DESDE HOY
                </span>
              </span>
            </h1>
          </div>

          {/* Core Concept Card */}
          <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-white/10">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              &ldquo;Reinventors PAD es un programa de ahorro educativo en alianza entre{" "}
              <strong className="text-white">UIDE</strong>,{" "}
              <strong className="text-white">Diners Club</strong> y{" "}
              <strong className="text-white">RCB</strong> que permite a las familias planificar el futuro
              universitario de sus hijos mientras acceden a experiencias de desarrollo personal, académico
              y familiar.&rdquo;
            </p>
          </div>

          {/* Sub-grid: Video Explicativo (Left) + 3 Pillars Mini Cards (Right) */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
            {/* VIDEO EXPLICATIVO WIDGET (Brushed Circular Aluminum texture) */}
            <div
              onClick={() => setVideoModalOpen(true)}
              className="sm:col-span-5 glass-panel rounded-2xl p-4 border border-white/15 flex flex-col items-center justify-center text-center cursor-pointer group hover:border-[#910048]/60 transition-all duration-300 min-h-[170px] relative overflow-hidden"
            >
              {/* Radial Brushed Metal background simulation */}
              <div className="absolute inset-0 metal-brushed-radial opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* Play Button Icon with glowing pulse */}
              <div className="relative z-10 w-12 h-12 rounded-full bg-[#910048] flex items-center justify-center shadow-[0_0_20px_rgba(145,0,72,0.6)] group-hover:scale-110 group-hover:bg-[#B8005D] transition-transform mb-2">
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              </div>

              <span className="relative z-10 text-xs sm:text-sm font-black font-mono tracking-wider text-white uppercase">
                VIDEO EXPLICATIVO
              </span>
              <span className="relative z-10 text-[9px] text-slate-400 font-mono mt-0.5">
                Ver recorrido institucional (1:45 min)
              </span>
            </div>

            {/* THE 3 PILLARS MINI CARDS (Vertical Stack) */}
            <div className="sm:col-span-7 space-y-2.5 flex flex-col justify-between">
              {/* Pillar 1 */}
              <div
                onClick={scrollToPillars}
                className="p-2.5 sm:p-3 rounded-xl glass-panel-subtle border border-white/10 hover:border-[#002D72]/80 transition-colors flex items-center space-x-3 cursor-pointer group"
              >
                <div className="p-2 rounded-lg bg-[#002D72]/40 border border-blue-500/30 shrink-0">
                  <Shield className="w-4 h-4 text-blue-300" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-black text-white uppercase tracking-wider group-hover:text-blue-300 transition-colors">
                    SEGURIDAD FINANCIERA
                  </h4>
                  <p className="text-[10px] text-slate-400 leading-snug">
                    Un fondo para educación superior de tus hijos
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div
                onClick={scrollToPillars}
                className="p-2.5 sm:p-3 rounded-xl glass-panel-subtle border border-white/10 hover:border-[#EAAA00]/80 transition-colors flex items-center space-x-3 cursor-pointer group"
              >
                <div className="p-2 rounded-lg bg-[#EAAA00]/20 border border-amber-500/30 shrink-0">
                  <Sparkles className="w-4 h-4 text-[#EAAA00]" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-black text-white uppercase tracking-wider group-hover:text-amber-300 transition-colors">
                    DESARROLLO INTEGRAL
                  </h4>
                  <p className="text-[10px] text-slate-400 leading-snug">
                    Actividades, talleres y experiencias para potenciar su talento
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div
                onClick={scrollToPillars}
                className="p-2.5 sm:p-3 rounded-xl glass-panel-subtle border border-white/10 hover:border-[#910048]/80 transition-colors flex items-center space-x-3 cursor-pointer group"
              >
                <div className="p-2 rounded-lg bg-[#910048]/30 border border-pink-500/30 shrink-0">
                  <GraduationCap className="w-4 h-4 text-pink-300" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-black text-white uppercase tracking-wider group-hover:text-pink-300 transition-colors">
                    VINCULACIÓN UNIVERSITARIA TEMPRANA
                  </h4>
                  <p className="text-[10px] text-slate-400 leading-snug">
                    Acceso progresivo al ecosistema de la universidad #1 en innovación de Ecuador
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <MagneticButton
              variant="primary"
              onClick={scrollToSimulator}
              className="text-xs sm:text-sm py-3 px-6"
            >
              <span>Calcula tu Ahorro Ahora</span>
              <ChevronRight className="w-4 h-4" />
            </MagneticButton>

            <MagneticButton
              variant="ghost"
              onClick={scrollToPillars}
              className="text-xs sm:text-sm py-3 px-5"
            >
              <span>Conoce Más del Fondo</span>
            </MagneticButton>
          </div>
        </div>

        {/* ========================================================
            RIGHT COLUMN: The Central 3D Card (A2IV Brushed Metal Key)
           ======================================================== */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative mt-6 lg:mt-0">
          <ReinventorsKeyCard stage="hero" glowIntensity={0.7} />
        </div>
      </div>

      {/* ========================================================
          VIDEO EXPLICATIVO MODAL
         ======================================================== */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
          <div className="relative w-full max-w-3xl glass-panel rounded-3xl p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#910048]" />
                <h3 className="text-sm font-bold font-mono uppercase text-white tracking-wider">
                  VIDEO EXPLICATIVO • REINVENTORS PAD
                </h3>
              </div>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player Placeholder with Interactive Tour Preview */}
            <div className="mt-4 aspect-video rounded-2xl bg-[#0d1117] border border-white/10 relative overflow-hidden flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#910048] flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(145,0,72,0.8)]">
                <Play className="w-7 h-7 text-white fill-white ml-1" />
              </div>
              <h4 className="text-lg font-black text-white uppercase tracking-tight">
                El futuro de tus hijos lo reinventas desde hoy
              </h4>
              <p className="text-xs text-slate-400 max-w-md mt-1">
                Conoce cómo funciona la alianza fiduciaria entre UIDE, Diners Club y Raúl Coka Barriga
                para blindar la carrera universitaria de tus hijos.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
                  ✓ Fideicomiso Mercantil AAA
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
                  ✓ Alianza Arizona State University
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
                  ✓ Respaldo 100% Raúl Coka Barriga
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
