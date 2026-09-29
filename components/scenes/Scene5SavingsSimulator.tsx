"use client";

import React, { useState, useMemo } from "react";
import { CAREERS_DATA } from "@/lib/data";
import { Career } from "@/lib/types";
import { calculatePadFutureValue, SEGURO_RCB_MENSUAL } from "@/lib/calculator";
import ReinventorsKeyCard from "../card-3d/ReinventorsKeyCard";
import MagneticButton from "../ui/MagneticButton";
import { Shield, Sparkles, Sliders, TrendingUp, Award, CheckCircle2, ChevronRight, DollarSign, Plane } from "lucide-react";

interface Scene5SavingsSimulatorProps {
  onPlanConfigured?: (plan: {
    childAge: number;
    monthly: number;
    careerId: string;
    projectedFund: number;
  }) => void;
}

export default function Scene5SavingsSimulator({ onPlanConfigured }: Scene5SavingsSimulatorProps) {
  // Simulator State
  const [childAge, setChildAge] = useState<number>(5);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(180);
  const [selectedCareerId, setSelectedCareerId] = useState<string>(CAREERS_DATA[0].id);

  // Selected Career Object
  const selectedCareer = useMemo(
    () => CAREERS_DATA.find((c) => c.id === selectedCareerId) || CAREERS_DATA[0],
    [selectedCareerId]
  );

  // Financial Calculations via official engine
  const calculations = useMemo(() => {
    const pad = calculatePadFutureValue(monthlyContribution, childAge);
    const yearsRemaining = pad.plazoAnos;
    const months = pad.plazoMeses;

    const coveragePercent = Math.min(
      100,
      Math.round((pad.saldoFinal / selectedCareer.totalTuitionRef) * 100)
    );

    // Glow intensity normalized between 0.35 and 1.0
    const glowNormalized = Math.min(1.0, 0.35 + (pad.saldoFinal / 60000) * 0.65);

    return {
      yearsRemaining,
      months,
      totalDeposited: Math.round(pad.totalAportadoAhorro),
      futureValue: Math.round(pad.saldoFinal),
      compoundEarnings: Math.round(pad.interesesNetos),
      coveragePercent,
      clubMiles: pad.clubMiles,
      glowNormalized,
      cuotaTotal: pad.cuotaTotal,
      esfuerzoDiario: pad.esfuerzoDiario,
    };
  }, [childAge, monthlyContribution, selectedCareer]);

  const handleStartOnboarding = () => {
    if (onPlanConfigured) {
      onPlanConfigured({
        childAge,
        monthly: monthlyContribution,
        careerId: selectedCareerId,
        projectedFund: calculations.futureValue,
      });
    }
    const el = document.getElementById("conversion");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="cotizador"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 overflow-hidden"
    >
      {/* Background Volumetric Gold Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30">
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300">
              ESCENA 5: COTIZADOR INTEGRADO EN TIEMPO REAL
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            Simulador de <span className="text-gradient-gold">Ahorro Educativo</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Ajusta la edad actual de tu hijo/a y el aporte mensual estimado. Observa en tiempo real
            cómo la tarjeta reacciona con mayor luminiscencia ante la capitalización del fondo fiduciario.
          </p>
        </div>

        {/* Interactive Layout: Controls Sliders (Left) + 3D Reactive Card & HUD (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Virtual Haptic Sliders */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-7">
              {/* SLIDER 1: Edad del hijo/a */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span>Edad actual de tu hijo/a</span>
                  </label>
                  <span className="text-lg font-black font-mono text-white bg-white/5 px-3 py-1 rounded-xl border border-white/10">
                    {childAge} {childAge === 1 ? "año" : "años"}
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="16"
                  step="1"
                  value={childAge}
                  onChange={(e) => setChildAge(parseInt(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#E31837]"
                />

                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>Recién nacido (0 años)</span>
                  <span className="text-blue-400">
                    {calculations.yearsRemaining} años hasta la universidad
                  </span>
                  <span>16 años</span>
                </div>
              </div>

              {/* SLIDER 2: Aporte mensual estimado */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Aporte mensual programado</span>
                  </label>
                  <span className="text-lg font-black font-mono text-amber-400 bg-amber-950/40 px-3 py-1 rounded-xl border border-amber-500/30">
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
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />

                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>$50 USD</span>
                  <span className="text-amber-400">
                    Equivalente a ${(monthlyContribution / 30).toFixed(1)} / día
                  </span>
                  <span>$800 USD</span>
                </div>
              </div>

              {/* SELECTOR: Carrera proyectada */}
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span>Carrera proyectada en UIDE</span>
                </label>

                <select
                  value={selectedCareerId}
                  onChange={(e) => setSelectedCareerId(e.target.value)}
                  className="w-full bg-[#0d1117] text-white text-xs sm:text-sm font-medium rounded-xl p-3.5 border border-white/15 focus:outline-none focus:border-red-500 cursor-pointer"
                >
                  {CAREERS_DATA.map((career) => (
                    <option key={career.id} value={career.id} className="bg-[#08090C] py-2">
                      {career.name} — ${career.totalTuitionRef.toLocaleString("en-US")} USD ({career.semesters} semestres)
                    </option>
                  ))}
                </select>
              </div>

              {/* Protection Badge (Raúl Coka Barriga) */}
              <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-center space-x-3">
                <Shield className="w-6 h-6 text-amber-400 shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-amber-300">
                    Póliza de Protección RCB Incorporada
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Si faltas o sufres invalidez, el 100% de la meta universitaria está garantizada.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Reactive Card + Technical Financial HUD */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* Card reacting to projection */}
            <div className="w-full flex justify-center">
              <ReinventorsKeyCard
                stage="simulator"
                glowIntensity={calculations.glowNormalized}
                projectedFund={calculations.futureValue}
                coveragePercent={calculations.coveragePercent}
              />
            </div>

            {/* Technical HUD Metrics Panel */}
            <div className="w-full max-w-lg mt-4 glass-panel rounded-2xl p-5 border border-white/10 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">
                    Total Aportado en el tiempo
                  </span>
                  <span className="text-lg font-bold text-slate-200 font-mono">
                    ${calculations.totalDeposited.toLocaleString("en-US")} USD
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase block flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>Interés Compuesto Ganado</span>
                  </span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">
                    +${calculations.compoundEarnings.toLocaleString("en-US")} USD
                  </span>
                </div>
              </div>

              {/* Progress Bar of Tuition Coverage */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">
                    Cobertura de Carrera ({selectedCareer.name})
                  </span>
                  <span className="font-bold text-emerald-400 font-mono">
                    {calculations.coveragePercent}%
                  </span>
                </div>
                <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 via-amber-400 to-emerald-400 transition-all duration-500"
                    style={{ width: `${calculations.coveragePercent}%` }}
                  />
                </div>
              </div>

              {/* Diners ClubMiles Accumulated */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-white/10">
                <span className="flex items-center space-x-1.5">
                  <Plane className="w-3.5 h-3.5 text-blue-400" />
                  <span>Millas Diners generadas:</span>
                </span>
                <span className="font-bold text-blue-400 font-mono">
                  +{calculations.clubMiles.toLocaleString("en-US")} ClubMiles
                </span>
              </div>

              {/* Primary Action Button */}
              <div className="pt-2">
                <MagneticButton
                  variant="primary"
                  onClick={handleStartOnboarding}
                  className="w-full justify-center py-3 text-sm"
                >
                  <span>Bloquear esta Cotización y Afiliarme</span>
                  <ChevronRight className="w-4 h-4" />
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
