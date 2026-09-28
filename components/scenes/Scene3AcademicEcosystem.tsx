"use client";

import React, { useState, useEffect } from "react";
import { CAREERS_DATA } from "@/lib/data";
import { Career } from "@/lib/types";
import ReinventorsKeyCard from "../card-3d/ReinventorsKeyCard";
import { Globe, Sparkles, Check, DollarSign, Clock, BookOpen, ChevronRight } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";

export default function Scene3AcademicEcosystem() {
  const [selectedCareer, setSelectedCareer] = useState<Career>(CAREERS_DATA[0]);
  const [displayedTuition, setDisplayedTuition] = useState<number>(CAREERS_DATA[0].totalTuitionRef);

  // Animated counter effect when career changes
  useEffect(() => {
    let start = displayedTuition;
    const end = selectedCareer.totalTuitionRef;
    const duration = 600;
    const startTime = performance.now();

    const animateNumber = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(start + (end - start) * ease);
      setDisplayedTuition(current);

      if (progress < 1) {
        requestAnimationFrame(animateNumber);
      }
    };

    requestAnimationFrame(animateNumber);
  }, [selectedCareer]);

  return (
    <section
      id="asu"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 overflow-hidden"
    >
      {/* Background Volumetric UIDE Magenta & Gold Glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#910048]/15 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#EAAA00]/15 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header exact copy from user reference */}
        <div className="text-center max-w-4xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#910048]/20 border border-[#910048]/40">
            <Globe className="w-3.5 h-3.5 text-[#EAAA00]" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-pink-200">
              ALIANZA GLOBAL UIDE × ARIZONA STATE UNIVERSITY (ASU)
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            Nuestras Carreras:{" "}
            <span className="text-gradient-uide">
              Una experiencia universitaria que transforma el futuro de tu hijo/a
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed pt-2">
            &ldquo;En la UIDE, no solo eliges una carrera, eliges una formación con visión global. 
            Tu hijo/a accederá a programas académicos conectados con las tendencias del mundo, 
            experiencias internacionales, certificaciones de valor profesional y oportunidades únicas a través 
            de alianzas estratégicas como <strong>Arizona State University (ASU)</strong>. Porque en la UIDE 
            no nos preparamos para el futuro: lo reinventamos.&rdquo;
          </p>
        </div>

        {/* 5 Official Checkmarks Grid from user reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-14">
          {[
            "Titulación internacional",
            "Alianzas globales y experiencia ASU",
            "Certificaciones profesionales durante la carrera",
            "Aprendizaje práctico y conexión con la industria",
            "Formación para liderar, innovar y transformar",
          ].map((point, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl glass-panel-subtle border border-white/10 flex items-start space-x-2.5"
            >
              <div className="p-1 rounded-md bg-[#910048]/50 mt-0.5 shrink-0 text-white">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-semibold text-slate-200 leading-snug">
                {point}
              </span>
            </div>
          ))}
        </div>

        {/* Grid: 3D Flipped Card + Menú Desplegable Carreras Pregrado UIO & Valor Promedio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: 3D Card (Flipped to ASU Seal & Chip) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <ReinventorsKeyCard
              stage="asu"
              glowIntensity={0.85}
              projectedFund={displayedTuition}
              coveragePercent={100}
            />
          </div>

          {/* Right Column: Menú Desplegable Carreras Pregrado UIO + Valor Promedio Carrera */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#910048]" />
                  <span>Menú desplegable carreras pregrado UIO</span>
                </span>
                <span className="text-[10px] text-[#EAAA00] font-mono">
                  Sede Quito • Campus Matriz
                </span>
              </label>

              {/* Menú Desplegable Dropdown */}
              <select
                value={selectedCareer.id}
                onChange={(e) => {
                  const career = CAREERS_DATA.find((c) => c.id === e.target.value);
                  if (career) setSelectedCareer(career);
                }}
                className="w-full bg-[#08090C] text-white text-sm sm:text-base font-medium rounded-2xl p-4 border border-white/20 focus:outline-none focus:border-[#910048] cursor-pointer shadow-inner"
              >
                {CAREERS_DATA.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#0c0f14] py-2">
                    {c.name} — {c.faculty}
                  </option>
                ))}
              </select>
            </div>

            {/* Career Details & Pathway */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">FACULTAD:</span>
                <span className="text-slate-200">{selectedCareer.faculty}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {selectedCareer.description}
              </p>
              <div className="text-[11px] font-mono text-[#EAAA00] pt-1">
                ★ {selectedCareer.highlight}
              </div>
            </div>

            {/* Valor Promedio Carrera Display */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#910048]/20 via-[#002D72]/20 to-[#EAAA00]/20 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block tracking-wider">
                  Valor Promedio Carrera Referencial
                </span>
                <div className="text-3xl sm:text-4xl font-black text-[#EAAA00] font-mono mt-1">
                  ${displayedTuition.toLocaleString("en-US")}
                  <span className="text-sm font-normal text-slate-400"> USD</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  Estimación para {selectedCareer.semesters} semestres • Malla articulada con ASU
                </div>
              </div>

              <MagneticButton
                variant="primary"
                onClick={() => {
                  const el = document.getElementById("cotizador");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-xs py-3 px-5 shrink-0"
              >
                <span>Calcular Ahorro para esta Carrera</span>
                <ChevronRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
