import React from "react";
import { colors } from "../theme";

type Kind = "eternal" | "temporary";

type HexBadgeProps = {
  size?: number;
  earned?: boolean;
  kind?: Kind;
  glow?: number;
  label?: string;
  children?: React.ReactNode;
};

export const HexBadge: React.FC<HexBadgeProps> = ({
  size = 72,
  earned = true,
  kind = "eternal",
  glow = 0,
  label,
  children,
}) => {
  const stroke = !earned
    ? "#374151"
    : kind === "eternal"
      ? colors.gold
      : colors.violet;
  const fill = !earned
    ? "#111827"
    : kind === "eternal"
      ? "rgba(251,191,36,0.18)"
      : "rgba(167,139,250,0.22)";

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        filter:
          earned && kind === "temporary" && glow > 0
            ? `drop-shadow(0 0 ${10 + glow * 18}px ${colors.violetGlow})`
            : earned
              ? `drop-shadow(0 8px 16px rgba(0,0,0,0.35))`
              : "none",
      }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100">
        <polygon
          points="50,4 93,27 93,73 50,96 7,73 7,27"
          fill={fill}
          stroke={stroke}
          strokeWidth="5"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          color: earned ? (kind === "eternal" ? colors.gold : colors.violet) : "#4b5563",
          fontSize: size * 0.34,
          fontWeight: 700,
        }}
      >
        {children ?? (label ? label.slice(0, 1) : "★")}
      </div>
    </div>
  );
};
