"use client";

import React, { useState, useEffect } from "react";
import MagneticButton from "../ui/MagneticButton";
import { Shield, Sparkles, Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#08090C]/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Tri-Brand Lockup */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Brand Monogram */}
          <div className="flex items-center space-x-2">
            <div className="h-8 px-2.5 rounded-lg bg-gradient-to-r from-red-600 to-rose-700 flex items-center justify-center font-black text-xs tracking-tighter text-white border border-red-400/40">
              UIDE
            </div>
            <span className="text-white/30 text-xs font-mono">×</span>
            <div className="h-8 px-2.5 rounded-lg bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center font-black text-[11px] tracking-wider text-white border border-blue-400/40">
              DINERS
            </div>
            <span className="text-white/30 text-xs font-mono hidden sm:inline">×</span>
            <div className="h-8 px-2.5 rounded-lg bg-gradient-to-r from-amber-700 to-amber-900 hidden sm:flex items-center justify-center font-black text-[11px] tracking-wider text-amber-200 border border-amber-500/40">
              RCB
            </div>
          </div>

          <div className="h-4 w-[1px] bg-white/20 hidden md:block" />

          <div className="hidden md:flex flex-col">
            <span className="text-[11px] font-black tracking-widest text-white uppercase font-mono">
              REINVENTORS PAD
            </span>
            <span className="text-[9px] text-slate-400 tracking-wider">
              Ahorro Universitario Fiduciario
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-medium text-slate-300">
          <button
            onClick={() => scrollTo("pilares")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Tres Pilares
          </button>
          <button
            onClick={() => scrollTo("asu")}
            className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1"
          >
            <span>Alianza ASU</span>
            <span className="px-1.5 py-0.5 rounded text-[9px] bg-red-950 text-red-300 border border-red-500/30">
              #1 USA
            </span>
          </button>
          <button
            onClick={() => scrollTo("comparativa")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            El Costo del Tiempo
          </button>
          <button
            onClick={() => scrollTo("cotizador")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Cotizador en Vivo
          </button>
          <button
            onClick={() => scrollTo("beneficios")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Beneficios Partners
          </button>
          <button
            onClick={() => scrollTo("faq")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            FAQ
          </button>
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center space-x-3">
          <MagneticButton
            variant="primary"
            onClick={() => scrollTo("cotizador")}
            className="text-xs py-2 px-5"
          >
            <span>Simular Mi Ahorro</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </MagneticButton>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 px-4 pt-3 pb-6 bg-[#08090C]/95 backdrop-blur-2xl border-b border-white/10 space-y-3">
          <button
            onClick={() => scrollTo("pilares")}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-white"
          >
            Los Tres Pilares
          </button>
          <button
            onClick={() => scrollTo("asu")}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-white"
          >
            Alianza Arizona State University
          </button>
          <button
            onClick={() => scrollTo("comparativa")}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-white"
          >
            El Costo del Tiempo (Comparativa)
          </button>
          <button
            onClick={() => scrollTo("cotizador")}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-white"
          >
            Simulador de Cotización
          </button>
          <button
            onClick={() => scrollTo("beneficios")}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-white"
          >
            Ecosistema de Beneficios
          </button>
          <button
            onClick={() => scrollTo("faq")}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-white"
          >
            Preguntas Frecuentes
          </button>
          <div className="pt-2">
            <MagneticButton
              variant="primary"
              onClick={() => scrollTo("cotizador")}
              className="w-full text-center justify-center py-2.5"
            >
              <span>Simular Ahorro Ahora</span>
            </MagneticButton>
          </div>
        </div>
      )}
    </header>
  );
}
