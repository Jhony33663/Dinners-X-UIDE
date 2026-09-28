"use client";

import React, { useState } from "react";
import { PARTNERS_BENEFITS } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Plane,
  GraduationCap,
  Sparkles,
  Umbrella,
  HeartHandshake,
  UserCheck,
  Coins,
  Crown,
  CreditCard,
  Award,
  Compass,
  CheckCircle2,
} from "lucide-react";

export default function Scene6BenefitsTabs() {
  const [activeTabId, setActiveTabId] = useState<"rcb" | "diners" | "uide">("rcb");
  const activePartner = PARTNERS_BENEFITS.find((p) => p.partnerId === activeTabId)!;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-[#EAAA00]" />;
      case "Umbrella":
        return <Umbrella className="w-5 h-5 text-[#EAAA00]" />;
      case "HeartHandshake":
        return <HeartHandshake className="w-5 h-5 text-[#EAAA00]" />;
      case "UserCheck":
        return <UserCheck className="w-5 h-5 text-[#EAAA00]" />;
      case "Plane":
        return <Plane className="w-5 h-5 text-blue-300" />;
      case "Coins":
        return <Coins className="w-5 h-5 text-blue-300" />;
      case "Crown":
        return <Crown className="w-5 h-5 text-blue-300" />;
      case "CreditCard":
        return <CreditCard className="w-5 h-5 text-blue-300" />;
      case "GraduationCap":
        return <GraduationCap className="w-5 h-5 text-pink-300" />;
      case "Award":
        return <Award className="w-5 h-5 text-pink-300" />;
      case "Compass":
        return <Compass className="w-5 h-5 text-pink-300" />;
      case "CheckCircle2":
        return <CheckCircle2 className="w-5 h-5 text-pink-300" />;
      default:
        return <Sparkles className="w-5 h-5 text-white" />;
    }
  };

  const getTabLabel = (id: "rcb" | "diners" | "uide") => {
    switch (id) {
      case "rcb":
        return "PESTAÑA RAUL COKA BARRIGA";
      case "diners":
        return "PESTAÑA DINERS CLUB";
      case "uide":
        return "PESTAÑA UIDE";
    }
  };

  return (
    <section
      id="beneficios"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 overflow-hidden"
    >
      <div className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-[#002D72]/20 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header exact copy from user reference */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-[#EAAA00]" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-300">
              VALOR AGREGADO TRIPARTITO
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            Paquete beneficios <span className="text-gradient-diners">socios diners</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Explora las ventajas exclusivas que cada institución aliada activa para tu familia
            durante toda la vigencia del fondo universitario.
          </p>

          {/* Framer Motion Exact 3 Tabs */}
          <div className="flex justify-center pt-6">
            <div className="relative p-1.5 rounded-2xl glass-panel border border-white/15 inline-flex flex-wrap items-center justify-center gap-1">
              {(["rcb", "diners", "uide"] as const).map((tabId) => {
                const isActive = activeTabId === tabId;
                return (
                  <button
                    key={tabId}
                    onClick={() => setActiveTabId(tabId)}
                    className={`relative z-10 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold tracking-wider uppercase transition-colors duration-300 cursor-pointer ${
                      isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/10 via-white/15 to-white/10 border border-white/25 shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{getTabLabel(tabId)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Partner Role Subheading */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-1">
            {activePartner.partnerName} • {activePartner.partnerRole}
          </div>
          <p className="text-sm sm:text-base font-medium text-slate-200 italic">
            &ldquo;{activePartner.tagline}&rdquo;
          </p>
        </div>

        {/* Benefits Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePartner.partnerId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {activePartner.benefits.map((benefit) => (
              <div
                key={benefit.id}
                className="group relative glass-panel rounded-3xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 group-hover:scale-110 transition-transform">
                      {getIcon(benefit.icon)}
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                      {benefit.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mb-2 group-hover:text-[#EAAA00] transition-colors">
                    {benefit.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Beneficio:</span>
                  <span className="font-bold text-slate-200">{benefit.highlight}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
