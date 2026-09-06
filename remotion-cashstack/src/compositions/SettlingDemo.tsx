import React from "react";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/IBMPlexSans";
import { colors, FPS } from "../theme";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const transfers = [
  { from: "Bruno", to: "Lucas", amount: "R$ 120,00" },
  { from: "Carolina", to: "Rafael", amount: "R$ 85,00" },
  { from: "Pedro", to: "Bruno", amount: "R$ 45,00" },
];

export const SettlingDemo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 18%, rgba(34,197,94,0.18), transparent 42%), linear-gradient(180deg, #0b1220 0%, ${colors.bg} 55%, #05070c 100%)`,
        fontFamily,
        color: colors.text,
      }}
    >
      <Interactive.Div
        name="Brand"
        style={{
          position: "absolute",
          top: 72,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <BrandHeader />
      </Interactive.Div>

      <Interactive.Div
        name="Card"
        from={18}
        style={{
          position: "absolute",
          left: "50%",
          top: 210,
          width: 620,
          marginLeft: -310,
        }}
      >
        <SettlingCard />
      </Interactive.Div>

      <Interactive.Div
        name="Caption"
        from={280}
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          bottom: 110,
          textAlign: "center",
        }}
      >
        <ClosingLine />
      </Interactive.Div>
    </AbsoluteFill>
  );
};

const BrandHeader: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <>
      <Interactive.Div
        name="Logo"
        style={{
          fontSize: 42,
          fontWeight: 700,
          letterSpacing: 2,
          opacity: interpolate(frame, [0, 18], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(frame, [0, 18], ["0px 16px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        CASH <span style={{ color: colors.accent }}>STACK</span>
      </Interactive.Div>
      <Interactive.Div
        name="Subtitle"
        style={{
          marginTop: 14,
          fontSize: 36,
          fontWeight: 600,
          opacity: interpolate(frame, [10, 28], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Settling automático
      </Interactive.Div>
      <Interactive.Div
        name="Pitch"
        style={{
          marginTop: 10,
          fontSize: 24,
          color: colors.muted,
          opacity: interpolate(frame, [18, 36], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Feche a mesa sem confusão
      </Interactive.Div>
    </>
  );
};

const SettlingCard: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Interactive.Div
      name="Surface"
      style={{
        background: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: 28,
        padding: "34px 32px 28px",
        boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
        opacity: interpolate(frame, [0, 16], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        scale: interpolate(frame, [0, 18], [0.94, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({ damping: 200 }),
          output: "perceptual-scale",
        }),
      }}
    >
      <div style={{ color: colors.muted, fontSize: 20 }}>Mesa de 08/03</div>
      <div style={{ fontSize: 40, fontWeight: 700, marginTop: 6 }}>
        Transferências
      </div>
      <div style={{ color: colors.muted, fontSize: 22, marginTop: 6 }}>
        Mínimo de pagamentos entre jogadores
      </div>

      <div
        style={{
          marginTop: 28,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {transfers.map((t, i) => (
          <Interactive.Div
            key={t.from + t.to}
            name={`Transfer-${i + 1}`}
            from={24 + i * 28}
            style={{ width: "100%" }}
          >
            <TransferRow from={t.from} to={t.to} amount={t.amount} />
          </Interactive.Div>
        ))}
      </div>

      <Interactive.Div name="Efficiency" from={120} style={{ marginTop: 24 }}>
        <EfficiencyBanner />
      </Interactive.Div>
    </Interactive.Div>
  );
};

const TransferRow: React.FC<{ from: string; to: string; amount: string }> = ({
  from,
  to,
  amount,
}) => {
  const frame = useCurrentFrame();
  return (
    <Interactive.Div
      name="Row"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        borderRadius: 16,
        border: `1px solid ${colors.border}`,
        background: colors.surface,
        padding: "18px 20px",
        opacity: interpolate(frame, [0, 14], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: interpolate(frame, [0, 14], ["0px 18px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 26,
        }}
      >
        <span style={{ color: colors.danger, fontWeight: 600 }}>{from}</span>
        <span style={{ color: colors.muted }}>→</span>
        <span style={{ color: colors.accent, fontWeight: 600 }}>{to}</span>
      </div>
      <div style={{ fontSize: 26, fontWeight: 700 }}>{amount}</div>
    </Interactive.Div>
  );
};

const EfficiencyBanner: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Interactive.Div
      name="Banner"
      style={{
        borderRadius: 18,
        background: colors.accentSoft,
        border: "1px solid rgba(34,197,94,0.35)",
        padding: "20px 22px",
        textAlign: "center",
        opacity: interpolate(frame, [0, 16], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        scale: interpolate(frame, [0, 16], [0.92, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({ damping: 180 }),
          output: "perceptual-scale",
        }),
      }}
    >
      <div style={{ fontSize: 28, fontWeight: 700, color: colors.accent }}>
        3 transferências
      </div>
      <div style={{ marginTop: 4, fontSize: 22, color: colors.text }}>
        em vez de 6 pagamentos
      </div>
    </Interactive.Div>
  );
};

const ClosingLine: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Interactive.Div
      name="Line"
      style={{
        fontSize: 30,
        color: colors.muted,
        opacity: interpolate(frame, [0, 20], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      Quem paga quem — sem planilha, sem discussão.
    </Interactive.Div>
  );
};

export const SETTLING_DURATION = 14 * FPS;
