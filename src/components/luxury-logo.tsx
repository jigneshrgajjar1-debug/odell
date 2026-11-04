import React from "react";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
  variant?: "full" | "minimal";
}

export default function LuxuryLogo({
  className = "",
  width = 240,
  height = 70,
  color = "gold",
  variant = "full",
}: LogoProps) {
  const getColors = () => {
    switch (color) {
      case "gold":
        return {
          primary: "#B8956F",
          secondary: "#CFA77E",
          text: "#F4F1EA",
        };
      case "white":
        return {
          primary: "#FFFFFF",
          secondary: "#FFFFFF",
          text: "#FFFFFF",
        };
      default:
        return {
          primary: "currentColor",
          secondary: "currentColor",
          text: "currentColor",
        };
    }
  };

  const colors = getColors();

  if (variant === "minimal") {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <span
          className="text-2xl font-serif tracking-[0.25em] font-normal leading-none"
          style={{ color: colors.text }}
        >
          ODELL
        </span>
        <span
          className="text-[9px] font-serif italic tracking-[0.15em] mt-1"
          style={{ color: colors.primary }}
        >
          Elegance like luxury
        </span>
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-col text-left select-none ${className}`}>
      <div className="flex items-center gap-2.5">
        <span
          className="text-2xl sm:text-3xl font-serif tracking-[0.22em] font-normal text-white uppercase"
        >
          ODELL
        </span>
      </div>
      <span
        className="text-[10px] font-serif italic tracking-[0.2em] -mt-0.5"
        style={{ color: colors.primary }}
      >
        Elegance like luxury
      </span>
    </div>
  );
}
