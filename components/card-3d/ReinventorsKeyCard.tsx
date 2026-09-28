"use client";

import React, { useRef, useState } from "react";
import { Shield, Sparkles, Globe, Cpu } from "lucide-react";

export type CardStage =
  | "hero"
  | "pillars"
  | "asu"
  | "simulator"
  | "benefits"
  | "docked";

interface ReinventorsKeyCardProps {
  stage?: CardStage;
  glowIntensity?: number; // 0 to 1
  projectedFund?: number;
  coveragePercent?: number;
  interactiveTilt?: boolean;
}

export default function ReinventorsKeyCard({
  stage = "hero",
  glowIntensity = 0.5,
  projectedFund = 38500,
  coveragePercent = 95,
  interactiveTilt = true,
}: ReinventorsKeyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });

  // Pointer tilt physics
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactiveTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * 14;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, glareX, glareY });
  };

  const handlePointerLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  // Stage-based transformation calculations
  const getStageTransform = () => {
    switch (stage) {
      case "hero":
        return "rotateY(-24deg) rotateX(12deg) translateZ(40px)";
      case "pillars":
        return "rotateY(-14deg) rotateX(8deg) scale(0.95)";
      case "asu":
        // 180° flip to reveal ASU engraved chip
        return "rotateY(180deg) rotateX(4deg) scale(1.02)";
      case "simulator":
        return "rotateY(-18deg) rotateX(10deg) scale(1.04)";
      case "benefits":
        return "rotateY(-8deg) rotateX(8deg) scale(0.96)";
      case "docked":
        return "rotateY(0deg) rotateX(28deg) scale(0.88) translateY(24px)";
      default:
        return "rotateY(0deg) rotateX(0deg)";
    }
  };

  const currentGlow = Math.max(0.2, Math.min(1.0, glowIntensity));
  const glowShadow = `0 25px 60px rgba(0, 45, 114, ${0.4 * currentGlow}), 0 0 ${
    45 * currentGlow
  }px rgba(145, 0, 72, ${0.35 * currentGlow}), 0 0 ${
    30 * currentGlow
  }px rgba(234, 170, 0, ${0.35 * currentGlow})`;

  return (
    <div
      className="relative flex flex-col items-center justify-center perspective-2000 py-4 select-none w-full max-w-full overflow-hidden"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Volumetric ambient back-glow */}
      <div
        className="absolute w-72 sm:w-96 h-60 sm:h-80 max-w-full rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-65"
        style={{
          background:
            stage === "asu"
              ? "radial-gradient(circle, rgba(145, 0, 72, 0.45) 0%, rgba(234, 170, 0, 0.25) 50%, transparent 80%)"
              : "radial-gradient(circle, rgba(0, 45, 114, 0.55) 0%, rgba(145, 0, 72, 0.35) 45%, transparent 80%)",
          transform: `scale(${1 + currentGlow * 0.25})`,
        }}
      />

      {/* Card 3D Object (Aspect Ratio matching physical executive bank card: 1.58 : 1) */}
      <div
        ref={cardRef}
        className="relative w-[290px] min-[360px]:w-[320px] min-[400px]:w-[360px] sm:w-[410px] md:w-[440px] xl:w-[460px] h-[185px] min-[360px]:h-[205px] min-[400px]:h-[230px] sm:h-[260px] md:h-[280px] xl:h-[290px] rounded-3xl preserve-3d transition-transform duration-700 ease-out cursor-grab active:cursor-grabbing max-w-[90vw]"
        style={{
          transform: `${getStageTransform()} rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          boxShadow: glowShadow,
          willChange: "transform, box-shadow",
        }}
      >
        {/* ========================================================
            CARD FRONT: The Reinventors Key (A2IV Brushed Metal Card)
           ======================================================== */}
        <div className="absolute inset-0 w-full h-full rounded-3xl backface-hidden overflow-hidden p-4 min-[360px]:p-5 sm:p-7 flex flex-col justify-between border border-white/20 bg-gradient-to-br from-[#2a303d] via-[#161a22] to-[#0c0f14]">
          {/* Authentic Brushed Titanium Metal Texture */}
          <div
            className="absolute inset-0 opacity-45 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                rgba(255, 255, 255, 0.05) 0px,
                rgba(255, 255, 255, 0.05) 1px,
                transparent 1px,
                transparent 3px
              )`,
            }}
          />

          {/* Beveled Metal Edge Highlight */}
          <div className="absolute inset-0 rounded-3xl border border-white/25 pointer-events-none shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-1px_3px_rgba(0,0,0,0.8)]" />

          {/* Dynamic Glare Foil */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300 opacity-60"
            style={{
              background: `radial-gradient(
                circle at ${tilt.glareX}% ${tilt.glareY}%,
                rgba(255, 255, 255, 0.28) 0%,
                rgba(0, 114, 206, 0.16) 30%,
                rgba(234, 170, 0, 0.14) 50%,
                rgba(145, 0, 72, 0.18) 70%,
                transparent 90%
              )`,
            }}
          />

          {/* CARD TOP ROW: "A2IV" & Tri-Brand Logos */}
          <div className="relative z-10 flex items-start justify-between">
            {/* Top Left: Monolithic Engraved "A2IV" as in Reference Image 2 */}
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-widest text-slate-100 font-mono drop-shadow-md">
                A2IV
              </span>
              <span className="text-[8px] font-mono tracking-wider text-slate-400 uppercase">
                EXECUTIVE FIDUCIARY KEY
              </span>
            </div>

            {/* Top Right: Tri-Brand Seals */}
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded-full bg-[#910048]/80 border border-pink-400/40 text-[9px] font-bold text-white tracking-wider font-mono">
                UIDE
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#002D72]/90 border border-blue-400/40 text-[9px] font-bold text-blue-200 tracking-wider font-mono">
                DINERS
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#EAAA00]/80 border border-amber-300/40 text-[9px] font-bold text-black tracking-wider font-mono">
                RCB
              </span>
            </div>
          </div>

          {/* CARD MIDDLE: Gold EMV Chip & NFC */}
          <div className="relative z-10 flex items-center justify-between my-auto">
            {/* Authentic Gold EMV Chip */}
            <div className="relative w-12 sm:w-14 h-9 sm:h-11 rounded-lg bg-gradient-to-br from-[#FFF1C5] via-[#EAAA00] to-[#8C6400] p-0.5 shadow-lg border border-amber-200/60">
              <div className="w-full h-full rounded-[6px] relative overflow-hidden bg-black/30 border border-black/20">
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 gap-[1px] opacity-40 bg-black/40">
                  <div className="border-r border-b border-black/60" />
                  <div className="border-b border-black/60" />
                  <div className="border-r border-b border-black/60" />
                  <div className="border-b border-black/60" />
                  <div className="border-r border-b border-black/60" />
                  <div />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border border-amber-900/50" />
              </div>
            </div>

            {/* Contactless waves & Shield */}
            <div className="flex items-center space-x-2">
              <svg
                className="w-6 h-6 text-slate-400 -rotate-90"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M8.5 16.5a5 5 0 0 1 0-9" />
                <path d="M12 19a8.5 8.5 0 0 1 0-14" />
                <path d="M15.5 21.5a12 12 0 0 1 0-19" />
              </svg>
              <Shield className="w-5 h-5 text-amber-400/80" />
            </div>
          </div>

          {/* CARD BOTTOM: "REINVENTORS PAD" Engraved Title & Global Spending Tag */}
          <div className="relative z-10 flex items-end justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-wider text-white font-mono uppercase drop-shadow whitespace-nowrap">
                REINVENTORS PAD
              </h3>
              <div className="text-[8px] sm:text-[9px] font-mono text-slate-400 tracking-wider uppercase mt-0.5 whitespace-nowrap">
                GLOBAL SPENDING REINVENTORS PAD KEY
              </div>
            </div>

            <div className="text-right">
              <span className="text-[8px] font-mono text-slate-400 uppercase block">
                COBERTURA UIDE
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#EAAA00] font-mono">
                ${projectedFund.toLocaleString("en-US")} USD
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================
            CARD BACK: The Arizona State University (ASU) Chip Reveal
           ======================================================== */}
        <div
          className="absolute inset-0 w-full h-full rounded-3xl backface-hidden overflow-hidden p-6 sm:p-7 flex flex-col justify-between border border-amber-500/40 bg-gradient-to-br from-[#1c0810] via-[#12080a] to-[#08090C]"
          style={{ transform: "rotateY(180deg)" }}
        >
          {/* Magnetic Stripe Top */}
          <div className="relative -mx-7 -mt-2 h-10 sm:h-12 bg-gradient-to-r from-[#0c0e14] via-[#1b202c] to-[#080a0e] border-y border-white/10 flex items-center px-7">
            <span className="text-[8px] font-mono tracking-widest text-slate-500 uppercase">
              HIGH COERCIVITY SECURITY ENCRYPTION • ASU GLOBAL KEY
            </span>
          </div>

          {/* ASU Innovation Seal Showcase */}
          <div className="relative z-10 flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#910048] to-[#EAAA00] p-0.5 shadow-xl">
                <div className="w-full h-full rounded-[10px] bg-[#220710] flex items-center justify-center border border-amber-300/40">
                  <Globe className="w-6 h-6 text-[#FFC72C]" />
                </div>
              </div>
              <div>
                <span className="text-[9px] font-mono font-bold text-amber-300 uppercase tracking-wider block">
                  ALIANZA INTERNACIONAL ASU
                </span>
                <h4 className="text-sm sm:text-base font-black text-white tracking-tight">
                  ARIZONA STATE UNIVERSITY
                </h4>
                <p className="text-[9px] text-slate-300">
                  #1 en Innovación en Estados Unidos por 9 años consecutivos.
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="px-2.5 py-1 rounded-full bg-red-950/70 border border-red-500/40 text-[9px] font-mono font-bold text-red-200">
                DOBLE TITULACIÓN
              </span>
            </div>
          </div>

          {/* Card Back Credentials */}
          <div className="relative z-10 flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-slate-400 pt-2 border-t border-white/10">
            <span>VALID THRU: CAMPUS 2038</span>
            <span className="text-amber-400 font-semibold">ASU.EDU × UIDE.EDU.EC</span>
          </div>
        </div>
      </div>

      {/* Subtext below card matching Image 2 */}
      <div className="mt-4 text-center w-full max-w-full px-2 pointer-events-none">
        <div className="text-[9px] min-[360px]:text-[10px] sm:text-[11px] font-mono font-semibold text-slate-400 tracking-wider uppercase">
          GLOBAL SPENDING REINVENTORS PAD KEY
        </div>
        <div className="text-[8px] min-[360px]:text-[9px] text-slate-500 font-mono mt-0.5">
          Acceso al ecosistema UIDE y titulación internacional
        </div>
      </div>
    </div>
  );
}
