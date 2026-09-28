"use client";

import React, { useState, useRef } from "react";
import { Check, X, Clock, ArrowRight, TrendingUp, AlertTriangle } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";

export default function Scene4TimeCostComparison() {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = () => {
    isDragging.current = true;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pos = Math.max(15, Math.min(85, (x / rect.width) * 100));
    setSliderPos(pos);
  };

  const scrollToSimulator = () => {
    const el = document.getElementById("cotizador");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="comparativa"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header exact copy from user reference */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-300">
              COMPARATIVA: EL COSTO DEL TIEMPO
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            ¿Por qué <span className="text-gradient-uide">empezar hoy?</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Descubre la diferencia tangible entre iniciar la planificación universitaria en la infancia
            versus postergar el ahorro para los últimos años de secundaria.
          </p>

          <div className="inline-flex items-center space-x-2 text-xs font-mono text-slate-400 bg-white/[0.02] border border-white/5 px-4 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Desliza para contrastar ambos escenarios</span>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          </div>
        </div>

        {/* Dual Split Screen Container */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerMove={handlePointerMove}
          className="relative w-full rounded-3xl overflow-hidden border border-white/15 min-h-[580px] select-none shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
        >
          {/* LADO DERECHO: "Si esperas" (Crimson/Hazard) */}
          <div className="absolute inset-0 bg-[#0e070a] p-6 sm:p-10 flex flex-col justify-between overflow-y-auto">
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, #910048 0px, #910048 10px, transparent 10px, transparent 20px)",
              }}
            />

            <div className="relative z-10 max-w-md ml-auto space-y-6">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-rose-950/80 border border-rose-500/40 animate-micro-shake">
                  <AlertTriangle className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider block">
                    ESCENARIO DESFAVORABLE
                  </span>
                  <h3 className="text-2xl font-black text-rose-100 uppercase tracking-tight">
                    Si esperas
                  </h3>
                </div>
              </div>

              {/* Exact points from user reference */}
              <div className="space-y-4 pt-2">
                {[
                  "Mayor esfuerzo financiero",
                  "Menos beneficios acumulados",
                  "Menor tiempo de planificación",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 backdrop-blur-md flex items-center space-x-3.5"
                  >
                    <div className="p-1 rounded bg-rose-900/80 text-rose-300 shrink-0">
                      <X className="w-4 h-4 text-rose-400" />
                    </div>
                    <span className="text-sm sm:text-base font-bold text-rose-200">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 flex justify-end pt-4">
              <div className="text-[10px] font-mono text-rose-400/80 bg-rose-950/70 px-4 py-1.5 rounded-full border border-rose-500/30">
                SOBRECARGA FINANCIERA SIN INTERÉS COMPUESTO
              </div>
            </div>
          </div>

          {/* LADO IZQUIERDO: "Si empiezas temprano" (Emerald/Teal) */}
          <div
            className="absolute inset-0 bg-[#061019] p-6 sm:p-10 flex flex-col justify-between overflow-y-auto border-r border-emerald-500/40"
            style={{
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
            }}
          >
            <div className="absolute inset-0 tech-grid-pattern opacity-25 pointer-events-none" />

            <div className="relative z-10 max-w-md space-y-6">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                    ESCENARIO FIDUCIARIO ÓPTIMO
                  </span>
                  <h3 className="text-2xl font-black text-emerald-100 uppercase tracking-tight">
                    Si empiezas temprano
                  </h3>
                </div>
              </div>

              {/* Exact points from user reference */}
              <div className="space-y-4 pt-2">
                {[
                  "Menor aporte mensual",
                  "Mayor fondo acumulado",
                  "Más años de beneficios",
                  "Más oportunidades para tu hijo",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 backdrop-blur-md flex items-center space-x-3.5"
                  >
                    <div className="p-1 rounded bg-emerald-900/80 text-emerald-300 shrink-0">
                      <Check className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-sm sm:text-base font-bold text-emerald-200">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 flex justify-start pt-4">
              <div className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-4 py-1.5 rounded-full border border-emerald-500/40">
                MÁXIMA TRANQUILIDAD: 100% BLINDADO POR FIDUCIA Y RCB
              </div>
            </div>
          </div>

          {/* Draggable Divider Bar */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-30 transition-shadow duration-300 hover:shadow-[0_0_25px_#fff]"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-gradient-to-r from-emerald-500 to-rose-600 p-0.5 shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing border border-white">
              <div className="w-full h-full rounded-full bg-[#08090C] flex items-center justify-center text-white text-[10px] font-black font-mono">
                VS
              </div>
            </div>
          </div>
        </div>

        {/* Center Floating Switch: "Calcula tu plan en vivo" / "calcula tu ahorro ahora" */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="p-1.5 rounded-full glass-panel border border-white/20 flex items-center space-x-3 shadow-2xl">
            <span className="pl-5 pr-2 py-2 text-xs font-mono font-bold text-[#EAAA00] uppercase tracking-wider">
              Calcula tu plan en vivo
            </span>
            <div className="w-8 h-4 rounded-full bg-emerald-500/40 border border-emerald-400 flex items-center p-0.5">
              <div className="w-3 h-3 rounded-full bg-emerald-400 ml-auto animate-pulse" />
            </div>
            <MagneticButton
              variant="primary"
              onClick={scrollToSimulator}
              className="text-xs py-2 px-6"
            >
              <span>Calcula tu Ahorro Ahora</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
