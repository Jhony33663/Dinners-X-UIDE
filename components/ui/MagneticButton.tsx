"use client";

import React, { useRef, useState } from "react";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "gold" | "ghost";
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  variant = "primary",
  className = "",
  onClick,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.35;
    const y = (e.clientY - (top + height / 2)) * 0.35;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-[#E31837] via-[#FF2E4D] to-[#E31837] text-white shadow-[0_0_30px_rgba(227,24,55,0.45)] hover:shadow-[0_0_45px_rgba(227,24,55,0.7)] border border-red-400/40";
      case "secondary":
        return "bg-gradient-to-r from-[#002D62] via-[#004A97] to-[#002D62] text-white shadow-[0_0_30px_rgba(0,74,151,0.4)] hover:shadow-[0_0_45px_rgba(0,74,151,0.65)] border border-blue-400/40";
      case "gold":
        return "bg-gradient-to-r from-[#8C6D1F] via-[#D4AF37] to-[#FFE79A] text-[#08090C] font-black shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_45px_rgba(212,175,55,0.7)] border border-amber-200";
      case "ghost":
        return "bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/10 hover:border-white/20";
    }
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
      className={`relative group px-7 py-3.5 rounded-full font-bold text-sm tracking-wide overflow-hidden cursor-pointer select-none transition-all duration-300 ${getVariantStyles()} ${className}`}
      {...props}
    >
      {/* Moving shimmer light highlight */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {children}
      </span>
    </button>
  );
}
