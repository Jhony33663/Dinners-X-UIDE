"use client";

import React, { useState } from "react";
import ReinventorsKeyCard from "../card-3d/ReinventorsKeyCard";
import { Shield, Sparkles, GraduationCap, TrendingUp, Compass, Award, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Scene2ThreePillars() {
  const [activePillarIndex, setActivePillarIndex] = useState(0);

  const pillars = [
    {
      id: "seguridad",
      title: "SEGURIDAD FINANCIERA",
      subtitle: "Un fondo para educación superior de tus hijos",
      partner: "Diners Club × Raúl Coka Barriga",
      badge: "Fondo Garantizado 100%",
      accentColor: "#002D72",
      description:
        "Tu plan de ahorro educativo está blindado bajo un fideicomiso mercantil administrado con los más altos estándares fiduciarios. En caso de imprevistos, la póliza de protección estudiantil de Raúl Coka Barriga asume la totalidad de la colegiatura restante.",
      stats: [
        { label: "Cobertura de Contingencia", value: "100%" },
        { label: "Respaldo Fiduciario", value: "Calificación AAA" },
        { label: "Millas en Aportes", value: "1:1 ClubMiles" },
      ],
    },
    {
      id: "desarrollo",
      title: "DESARROLLO INTEGRAL",
      subtitle: "Actividades, talleres y experiencias para potenciar su talento",
      partner: "UIDE Experience Hub",
      badge: "Ecosistema de Talento",
      accentColor: "#EAAA00",
      description:
        "No es solo un fondo bancario: es una comunidad de aprendizaje activo. Tus hijos acceden a bootcamps tecnológicos, orientación vocacional neurocientífica, mentorías con líderes de industria y talleres de innovación.",
      stats: [
        { label: "Talleres Tempranos / Año", value: "+12 Exclusivos" },
        { label: "Test Vocacional Predictivo", value: "100% Incluido" },
        { label: "Mentorías con Graduados", value: "1 a 1" },
      ],
    },
    {
      id: "vinculacion",
      title: "VINCULACIÓN UNIVERSITARIA TEMPRANA",
      subtitle: "Acceso progresivo al ecosistema de la universidad #1 en innovación de Ecuador",
      partner: "UIDE × Arizona State University",
      badge: "Alianza Internacional ASU",
      accentColor: "#910048",
      description:
        "Matrícula preferencial, pase directo sin examen de admisión regular y la posibilidad única de obtener una doble titulación norteamericana con Arizona State University, clasificada por 9 años consecutivos como la #1 en Innovación en Estados Unidos (U.S. News & World Report).",
      stats: [
        { label: "Innovación en EE.UU.", value: "#1 ASU (9 años)" },
        { label: "Doble Titulación Oficial", value: "100% Homologada" },
        { label: "Beca de Fidelidad PAD", value: "Hasta 25%" },
      ],
    },
  ];

  const activePillar = pillars[activePillarIndex];

  return (
    <section
      id="pilares"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-300">
              ARQUITECTURA DEL PROGRAMA
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            Los Tres Pilares <span className="text-gradient-uide">Fundamentales</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Una estructura fiduciaria y formativa diseñada para asegurar el destino universitario de tus hijos.
          </p>

          {/* Pillar Selector Buttons */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {pillars.map((pillar, idx) => (
              <button
                key={pillar.id}
                onClick={() => setActivePillarIndex(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center space-x-2 border ${
                  activePillarIndex === idx
                    ? "bg-white/10 text-white border-white/40 shadow-lg scale-105"
                    : "bg-white/[0.02] text-slate-400 hover:text-white border-white/5"
                }`}
              >
                <span>0{idx + 1}.</span>
                <span>{pillar.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dual Layout: Card as Light Prism + Pillar Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: 3D Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <ReinventorsKeyCard
              stage={activePillarIndex === 2 ? "asu" : activePillarIndex === 1 ? "simulator" : "pillars"}
              glowIntensity={0.8}
            />
          </div>

          {/* Right Column: Active Pillar Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.id}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 relative overflow-hidden"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-slate-500">
                      PILAR 0{activePillarIndex + 1} / 03
                    </span>
                    <span className="text-white/20">•</span>
                    <span className="text-xs font-mono font-semibold text-blue-300">
                      {activePillar.partner}
                    </span>
                  </div>

                  <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider font-mono uppercase bg-white/5 border border-white/15 text-white">
                    {activePillar.badge}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">
                  {activePillar.title}
                </h3>
                <h4 className="text-sm sm:text-base font-medium text-[#EAAA00] mb-4">
                  {activePillar.subtitle}
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {activePillar.description}
                </p>

                {/* Visual Chart / Activities Feature */}
                {activePillarIndex === 0 && (
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 mb-6 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-300 flex items-center space-x-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Fondo Acumulado Garantizado por Diners Club & RCB</span>
                      </span>
                      <span className="text-emerald-400 font-bold">+42% Rendimiento Compuesto</span>
                    </div>

                    <div className="h-24 w-full relative">
                      <svg className="w-full h-full" viewBox="0 0 400 90" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="dinersGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#002D72" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#002D72" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0,80 C80,75 160,60 240,35 C320,15 360,8 400,5 L400,90 L0,90 Z"
                          fill="url(#dinersGrad)"
                        />
                        <path
                          d="M0,80 C80,75 160,60 240,35 C320,15 360,8 400,5"
                          fill="none"
                          stroke="#60A5FA"
                          strokeWidth="3"
                        />
                      </svg>
                    </div>
                  </div>
                )}

                {activePillarIndex === 1 && (
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <Compass className="w-5 h-5 text-[#EAAA00] mb-2" />
                      <div className="text-xs font-bold text-white">Bootcamps Tech</div>
                      <div className="text-[10px] text-slate-400">Robótica e Inteligencia Artificial</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <Sparkles className="w-5 h-5 text-[#EAAA00] mb-2" />
                      <div className="text-xs font-bold text-white">Test Vocacional</div>
                      <div className="text-[10px] text-slate-400">Mapeo neurocientífico UIDE</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <Award className="w-5 h-5 text-[#EAAA00] mb-2" />
                      <div className="text-xs font-bold text-white">Mentorías Globales</div>
                      <div className="text-[10px] text-slate-400">Líderes de industria y ASU</div>
                    </div>
                  </div>
                )}

                {activePillarIndex === 2 && (
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 mb-6 space-y-3">
                    <div className="p-3.5 rounded-xl bg-[#910048]/20 border border-[#910048]/40 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <GraduationCap className="w-6 h-6 text-pink-300" />
                        <div>
                          <div className="text-xs font-bold text-white">Arizona State University (ASU)</div>
                          <div className="text-[10px] text-pink-200">#1 en Innovación en EE.UU.</div>
                        </div>
                      </div>
                      <span className="text-xs font-black font-mono text-[#EAAA00] bg-black/50 px-2 py-1 rounded border border-amber-500/30">
                        DOBLE TITULACIÓN
                      </span>
                    </div>
                  </div>
                )}

                {/* Stats row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-white/10">
                  {activePillar.stats.map((stat, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">
                        {stat.label}
                      </span>
                      <span className="text-base font-black text-white font-mono mt-0.5 block">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
