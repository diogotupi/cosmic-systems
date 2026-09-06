import React from "react";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/IBMPlexSans";
import { HexBadge } from "../components/HexBadge";
import { colors, FPS } from "../theme";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const achievements = [
  { id: "pe-de-coelho", name: "Pé de Coelho", requirement: "3 fours ou mais", symbol: "3x" },
  { id: "veterano", name: "Veterano", requirement: "10+ mesas", symbol: "★" },
  { id: "doyle-brunson", name: "Doyle Brunson", requirement: "3x com 10-2", symbol: "10" },
  { id: "the-magician", name: "The Magician", requirement: "Royal flush", symbol: "✦" },
];

const insignias = [
  { id: "pro-player", name: "Pro Player", requirement: "Win rate > 70%", symbol: "↑" },
  { id: "lenda", name: "Lenda", requirement: "5 mesas no topo", symbol: "L" },
  { id: "o-fregues", name: "O Freguês", requirement: "Perdeu R$ 100+", symbol: "!" },
];

export const InsigniasDemo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 70% 10%, rgba(167,139,250,0.22), transparent 40%), radial-gradient(circle at 20% 80%, rgba(251,191,36,0.12), transparent 36%), linear-gradient(180deg, #0c1020 0%, ${colors.bg} 50%, #05070c 100%)`,
        fontFamily,
        color: colors.text,
      }}
    >
      <Interactive.Div
        name="Header"
        style={{
          position: "absolute",
          top: 64,
          left: 70,
          right: 70,
          textAlign: "center",
        }}
      >
        <HeaderBlock />
      </Interactive.Div>

      <Interactive.Div
        name="AchievementsScene"
        from={45}
        durationInFrames={200}
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          top: 280,
        }}
      >
        <AchievementsScene />
      </Interactive.Div>

      <Interactive.Div
        name="InsigniasScene"
        from={230}
        durationInFrames={200}
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          top: 280,
        }}
      >
        <InsigniasScene />
      </Interactive.Div>

      <Interactive.Div
        name="PlayerCard"
        from={410}
        style={{
          position: "absolute",
          left: "50%",
          top: 300,
          width: 640,
          marginLeft: -320,
        }}
      >
        <PlayerShowcase />
      </Interactive.Div>
    </AbsoluteFill>
  );
};

const HeaderBlock: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <>
      <Interactive.Div
        name="Logo"
        style={{
          fontSize: 40,
          fontWeight: 700,
          letterSpacing: 2,
          opacity: interpolate(frame, [0, 16], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        CASH <span style={{ color: colors.accent }}>STACK</span>
      </Interactive.Div>
      <Interactive.Div
        name="Title"
        style={{
          marginTop: 16,
          fontSize: 48,
          fontWeight: 700,
          lineHeight: 1.15,
          opacity: interpolate(frame, [10, 28], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [10, 28], ["0px 20px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        Achievements e insígnias
      </Interactive.Div>
      <Interactive.Div
        name="Subtitle"
        style={{
          marginTop: 12,
          fontSize: 24,
          color: colors.muted,
          opacity: interpolate(frame, [20, 38], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Deixe o grupo mais competitivo — e mais divertido
      </Interactive.Div>
    </>
  );
};

const AchievementsScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Interactive.Div
      name="AchievementsPanel"
      style={{
        background: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: 28,
        padding: 32,
        opacity: interpolate(frame, [0, 16], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        scale: interpolate(frame, [0, 16], [0.96, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({ damping: 200 }),
          output: "perceptual-scale",
        }),
      }}
    >
      <div
        style={{
          fontSize: 18,
          letterSpacing: 1.5,
          color: colors.gold,
          fontWeight: 600,
        }}
      >
        ACHIEVEMENTS
      </div>
      <div style={{ marginTop: 8, fontSize: 34, fontWeight: 700 }}>
        Conquistas eternas
      </div>
      <div style={{ marginTop: 8, fontSize: 22, color: colors.muted }}>
        Desbloqueou, é pra sempre.
      </div>
      <div
        style={{
          marginTop: 36,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 22,
        }}
      >
        {achievements.map((badge, i) => (
          <Interactive.Div
            key={badge.id}
            name={badge.name}
            from={18 + i * 20}
            style={{ width: "100%" }}
          >
            <UnlockRow
              kind="eternal"
              name={badge.name}
              requirement={badge.requirement}
              symbol={badge.symbol}
            />
          </Interactive.Div>
        ))}
      </div>
    </Interactive.Div>
  );
};

const InsigniasScene: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame / 8) * 0.5 + 0.5;

  return (
    <Interactive.Div
      name="InsigniasPanel"
      style={{
        background: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: 28,
        padding: 32,
        opacity: interpolate(frame, [0, 16], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: interpolate(frame, [0, 16], ["0px 28px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      <div
        style={{
          fontSize: 18,
          letterSpacing: 1.5,
          color: colors.violet,
          fontWeight: 600,
        }}
      >
        INSÍGNIAS
      </div>
      <div style={{ marginTop: 8, fontSize: 34, fontWeight: 700 }}>
        Carregue enquanto sustentar
      </div>
      <div style={{ marginTop: 8, fontSize: 22, color: colors.muted }}>
        Ganhou ou perdeu? A insígnia acompanha o momento.
      </div>
      <div
        style={{
          marginTop: 36,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {insignias.map((badge, i) => (
          <Interactive.Div
            key={badge.id}
            name={badge.name}
            from={14 + i * 18}
            style={{ width: "100%" }}
          >
            <UnlockRow
              kind="temporary"
              name={badge.name}
              requirement={badge.requirement}
              symbol={badge.symbol}
              glow={pulse}
            />
          </Interactive.Div>
        ))}
      </div>
    </Interactive.Div>
  );
};

const UnlockRow: React.FC<{
  kind: "eternal" | "temporary";
  name: string;
  requirement: string;
  symbol: string;
  glow?: number;
}> = ({ kind, name, requirement, symbol, glow = 0 }) => {
  const frame = useCurrentFrame();
  const unlocked = frame >= 6;

  return (
    <Interactive.Div
      name="BadgeRow"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        borderRadius: 18,
        border: `1px solid ${colors.border}`,
        background: colors.surface,
        padding: "16px 18px",
        opacity: interpolate(frame, [0, 12], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: interpolate(frame, [0, 12], ["0px 16px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [0, 14], [0.94, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({ damping: 160 }),
          output: "perceptual-scale",
        }),
      }}
    >
      <HexBadge
        size={64}
        earned={unlocked}
        kind={kind}
        glow={kind === "temporary" ? glow : 0}
      >
        {symbol}
      </HexBadge>
      <div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: kind === "eternal" ? colors.gold : colors.violet,
          }}
        >
          {name}
        </div>
        <div style={{ marginTop: 4, fontSize: 18, color: colors.muted }}>
          {requirement}
        </div>
      </div>
    </Interactive.Div>
  );
};

const PlayerShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Interactive.Div
      name="Showcase"
      style={{
        background: "linear-gradient(180deg, #1a2030 0%, #12161f 100%)",
        border: `1px solid ${colors.border}`,
        borderRadius: 28,
        padding: "28px 30px",
        boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
        opacity: interpolate(frame, [0, 16], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: interpolate(frame, [0, 16], ["0px 30px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontSize: 18, color: colors.muted }}>Poker da Sexta</div>
          <div style={{ fontSize: 40, fontWeight: 700 }}>Rafael</div>
          <div style={{ fontSize: 20, color: colors.muted }}>
            12 mesas · 58% win rate
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <HexBadge size={56} kind="eternal">
            ✦
          </HexBadge>
          <HexBadge size={56} kind="temporary" glow={0.85}>
            ↑
          </HexBadge>
        </div>
      </div>

      <div
        style={{
          marginTop: 22,
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        {[
          { label: "Four (1)", color: "#60a5fa" },
          { label: "Royal (2)", color: colors.violet },
          { label: "Doyle (10 e 2) (1)", color: colors.accent },
        ].map((tag) => (
          <span
            key={tag.label}
            style={{
              fontSize: 18,
              borderRadius: 999,
              padding: "8px 14px",
              border: `1px solid ${tag.color}55`,
              color: tag.color,
              background: `${tag.color}18`,
            }}
          >
            {tag.label}
          </span>
        ))}
      </div>

      <div
        style={{
          marginTop: 28,
          borderRadius: 16,
          background: colors.accentSoft,
          border: "1px solid rgba(34,197,94,0.3)",
          padding: "18px 16px",
          textAlign: "center",
          fontSize: 24,
          fontWeight: 700,
          color: colors.accent,
        }}
      >
        Badges nos planos Full e Royal
      </div>
    </Interactive.Div>
  );
};

export const INSIGNIAS_DURATION = 20 * FPS;
