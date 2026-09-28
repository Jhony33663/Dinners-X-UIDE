"use client";

import React, { useState } from "react";
import ReinventorsKeyCard from "../card-3d/ReinventorsKeyCard";
import MagneticButton from "../ui/MagneticButton";
import { FAQ_DATA } from "@/lib/data";
import {
  ShieldCheck,
  CreditCard,
  UserCheck,
  Lock,
  ChevronDown,
  CheckCircle2,
  Send,
  HelpCircle,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function Scene7ConversionOnboarding() {
  const [conversionType, setConversionType] = useState<"ahorro" | "asesoria">("ahorro");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sftpPayload, setSftpPayload] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    cedula: "",
    phone: "",
    email: "",
    city: "Quito",
    isDinersMember: true,
    dataConsent: true,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      record_id: `PAD-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toISOString(),
      action_type:
        conversionType === "ahorro"
          ? "START_SAVINGS_PLAN_CONTRACT"
          : "PERSONALIZED_ADVISORY_REQUEST",
      client_data: {
        full_name: formData.fullName || "Santiago Paredes",
        national_id: formData.cedula || "1719284751",
        phone_number: formData.phone || "0998765432",
        email_address: formData.email || "santiago.paredes@example.com",
        city: formData.city,
        is_diners_club_member: formData.isDinersMember,
        lopdp_consent_granted: formData.dataConsent,
        sftp_delivery_target: "sftp://secure-leads.dinersclub.com.ec/pad/inbound/",
      },
    };

    setSftpPayload(JSON.stringify(payload, null, 2));
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#910048", "#002D72", "#EAAA00", "#FFFFFF"],
      });
    } catch {
      // Fallback
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section
      id="conversion"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-r from-[#002D72]/15 via-[#910048]/15 to-[#EAAA00]/15 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* ========================================================
            REINVENTEMOS EL FUTURO — Exact copy & Digital Vault Docking
           ======================================================== */}
        <div className="flex flex-col items-center justify-center mb-12 relative text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-4">
            <Lock className="w-3.5 h-3.5 text-[#EAAA00]" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-300">
              ACTIVACIÓN & CONVERSIÓN SEGURA
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase mb-3">
            REINVENTEMOS <span className="text-gradient-uide">EL FUTURO</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            &ldquo;Cada aporte realizado hoy acerca a tu hijo a la universidad de sus sueños y le abre la
            puerta a experiencias que transformarán su futuro.&rdquo;
          </p>

          {/* Digital Vault Dropzone */}
          <div className="relative mt-8 flex flex-col items-center">
            <div className="relative z-10">
              <ReinventorsKeyCard stage="docked" glowIntensity={0.85} />
            </div>

            {/* Glowing Slot */}
            <div className="relative -mt-16 w-80 sm:w-96 h-16 rounded-2xl glass-panel-glow-blue border border-blue-400/40 flex items-center justify-center shadow-[0_15px_45px_rgba(0,45,114,0.6)]">
              <div className="w-64 h-1.5 rounded-full bg-gradient-to-r from-[#002D72] via-[#EAAA00] to-[#910048] animate-pulse shadow-[0_0_15px_#910048]" />
              <span className="absolute -bottom-6 text-[9px] font-mono tracking-widest uppercase text-blue-300">
                DROPZONE DIGITAL LOCK: AUTENTICACIÓN FIDUCIARIA
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================
            DUAL PRIMARY ACTIONS: Exact buttons from user reference
           ======================================================== */}
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 pt-4">
          <button
            type="button"
            onClick={() => setConversionType("ahorro")}
            className={`w-full sm:w-auto flex-1 py-4 px-6 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-lg border ${
              conversionType === "ahorro"
                ? "bg-gradient-to-r from-[#910048] to-[#B8005D] text-white border-pink-400/50 shadow-[0_0_30px_rgba(145,0,72,0.5)] scale-105"
                : "bg-white/5 text-slate-300 border-white/10 hover:text-white"
            }`}
          >
            Quiero comenzar mi plan de ahorro
          </button>

          <button
            type="button"
            onClick={() => setConversionType("asesoria")}
            className={`w-full sm:w-auto flex-1 py-4 px-6 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-lg border ${
              conversionType === "asesoria"
                ? "bg-gradient-to-r from-[#910048] to-[#B8005D] text-white border-pink-400/50 shadow-[0_0_30px_rgba(145,0,72,0.5)] scale-105"
                : "bg-white/5 text-slate-300 border-white/10 hover:text-white"
            }`}
          >
            Quiero asesoría personalizada
          </button>
        </div>

        {/* ========================================================
            LEAD & CONTRACT FORM WITH SFTP READY PAYLOAD
           ======================================================== */}
        <div className="max-w-3xl mx-auto glass-panel rounded-3xl p-6 sm:p-10 border border-white/15 mb-24 relative overflow-hidden">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs">
                <span className="text-slate-300">
                  {conversionType === "ahorro"
                    ? "Inicia tu contratación PAD con débito fiduciario automático."
                    : "Un asesor educativo te contactará para evaluar tu plan personalizado."}
                </span>
                <span className="text-[#EAAA00] font-mono font-bold">
                  Respaldo Diners & RCB
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                    Nombre Completo del Titular *
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Ej. Santiago Paredes"
                    className="w-full bg-[#08090C] text-white text-sm rounded-xl px-4 py-3 border border-white/10 focus:border-[#910048] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                    Cédula de Identidad (10 dígitos) *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={10}
                    name="cedula"
                    value={formData.cedula}
                    onChange={handleInputChange}
                    placeholder="1719284751"
                    className="w-full bg-[#08090C] text-white text-sm rounded-xl px-4 py-3 border border-white/10 focus:border-[#910048] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                    Teléfono Celular WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="0998765432"
                    className="w-full bg-[#08090C] text-white text-sm rounded-xl px-4 py-3 border border-white/10 focus:border-[#910048] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="correo@ejemplo.com"
                    className="w-full bg-[#08090C] text-white text-sm rounded-xl px-4 py-3 border border-white/10 focus:border-[#910048] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                    Ciudad de Residencia
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-[#08090C] text-white text-sm rounded-xl px-4 py-3 border border-white/10 focus:border-[#910048] focus:outline-none"
                  >
                    <option value="Quito">Quito (Campus Principal UIDE)</option>
                    <option value="Guayaquil">Guayaquil (Sede UIDE)</option>
                    <option value="Cuenca">Cuenca</option>
                    <option value="Loja">Loja (Sede UIDE)</option>
                    <option value="Ambato">Ambato</option>
                    <option value="Otra">Otra ciudad</option>
                  </select>
                </div>
              </div>

              {/* Data Privacy Consent (Ley Orgánica de Protección de Datos Personales de Ecuador) */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    name="dataConsent"
                    checked={formData.dataConsent}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 rounded text-[#910048] accent-[#910048] cursor-pointer"
                  />
                  <span className="text-xs text-slate-300 leading-snug">
                    Autorizo expresamente a la UIDE, Diners Club del Ecuador y Raúl Coka Barriga a
                    tratar mis datos personales conforme a la <strong>Ley Orgánica de Protección de Datos Personales (LOPDP)</strong> con
                    fines de validación y formalización del programa PAD.
                  </span>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#910048] to-[#B8005D] text-white font-black text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(145,0,72,0.6)] hover:shadow-[0_0_45px_rgba(145,0,72,0.8)] transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {conversionType === "ahorro"
                      ? "Confirmar Solicitud de Plan de Ahorro"
                      : "Solicitar Asesoría Personalizada Ahora"}
                  </span>
                </button>
              </div>

              <div className="text-center text-[10px] font-mono text-slate-500">
                SEGURIDAD ENCRIPTADA TLS 1.3 • INTEGRACIÓN DIRECTA SFTP DINERS CLUB
              </div>
            </form>
          ) : (
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                  ¡Solicitud Procesada Exitosamente!
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Tus datos han sido registrados en la cola de asignación de asesores fiduciarios.
                  Recibirás contacto en menos de 24 horas.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 text-left max-w-lg mx-auto font-mono text-[11px] text-emerald-300 space-y-1 overflow-x-auto">
                <div className="text-[10px] text-slate-500 uppercase pb-1 border-b border-white/10">
                  SFTP PAYLOAD DISPATCH QUEUE: OK
                </div>
                <pre>{sftpPayload}</pre>
              </div>

              <button
                onClick={() => setIsSubmitted(false)}
                className="text-xs text-blue-400 hover:underline font-mono cursor-pointer"
              >
                ← Modificar solicitud
              </button>
            </div>
          )}
        </div>

        {/* ========================================================
            SECCIÓN FAQ — Exact section from wireframe
           ======================================================== */}
        <div id="faq" className="max-w-4xl mx-auto mb-24">
          <div className="text-center mb-10 space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-slate-400 text-xs font-mono">
              <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
              <span>TRANSPARENCIA TOTAL</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight font-mono">
              SECCIÓN FAQ
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Preguntas frecuentes sobre el programa Reinventors PAD
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_DATA.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-white/[0.04] border-white/20 shadow-lg"
                      : "bg-white/[0.01] border-white/5 hover:border-white/10"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between space-x-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                      {faq.question}
                    </span>
                    <div
                      className={`p-1.5 rounded-full bg-white/5 border border-white/10 text-white transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180 bg-[#910048]/70 border-pink-500/40 text-pink-200" : ""
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            INSTITUTIONAL FOOTER: logo uide | logo diners | logo raul coka barriga
           ======================================================== */}
        <footer className="pt-12 border-t border-white/10 space-y-8">
          {/* Exact Brand Row from user wireframe */}
          <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-white/10">
            {/* Logo UIDE */}
            <div className="flex items-center space-x-3">
              <div className="h-10 px-3.5 rounded-xl bg-[#910048] flex items-center justify-center font-black text-white text-sm font-mono tracking-tighter shadow-[0_0_20px_rgba(145,0,72,0.4)] border border-pink-400/40">
                UIDE
              </div>
              <div>
                <span className="text-xs font-black tracking-wider text-white uppercase block font-sans">
                  UNIVERSIDAD INTERNACIONAL DEL ECUADOR
                </span>
                <span className="text-[10px] text-pink-300 font-mono tracking-widest block">
                  POWERED BY ARIZONA STATE UNIVERSITY
                </span>
              </div>
            </div>

            {/* Logo Diners Club */}
            <div className="flex items-center space-x-3">
              <div className="h-10 px-3.5 rounded-xl bg-[#002D72] flex items-center justify-center font-black text-white text-sm font-mono tracking-wider shadow-[0_0_20px_rgba(0,45,114,0.4)] border border-blue-400/40">
                DINERS CLUB
              </div>
              <div>
                <span className="text-xs font-black tracking-wider text-white uppercase block font-sans">
                  DINERS CLUB DEL ECUADOR
                </span>
                <span className="text-[10px] text-blue-300 font-mono tracking-widest block">
                  FIDUCIA & SERVICIOS FINANCIEROS
                </span>
              </div>
            </div>

            {/* Logo Raúl Coka Barriga */}
            <div className="flex items-center space-x-3">
              <div className="h-10 px-3.5 rounded-xl bg-[#EAAA00] flex items-center justify-center font-black text-black text-sm font-mono tracking-wider shadow-[0_0_20px_rgba(234,170,0,0.4)] border border-amber-200">
                RCB
              </div>
              <div>
                <span className="text-xs font-black tracking-wider text-white uppercase block font-sans">
                  RAÚL COKA BARRIGA
                </span>
                <span className="text-[10px] text-[#EAAA00] font-mono tracking-widest block">
                  AGENCIA ASESORA PRODUCTORA DE SEGUROS
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-3">
            <div>
              © {new Date().getFullYear()} REINVENTORS PAD. UIDE × Diners Club × Raúl Coka Barriga.
            </div>
            <div className="flex items-center space-x-4">
              <span>Fideicomiso Educativo Calificado AAA</span>
              <span>•</span>
              <span className="text-[#EAAA00]">Quito — Guayaquil — Loja</span>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
