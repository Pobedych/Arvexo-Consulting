import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Arvexo AI Consulting";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#EEEBE3",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#E5402C",
            }}
          />
          <span style={{ fontSize: 20, fontWeight: 600, color: "#14130F", letterSpacing: "-0.02em" }}>
            Arvexo AI
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 62,
              fontWeight: 700,
              color: "#14130F",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            AI-консалтинг<br />
            <span style={{ color: "#57534B" }}>и автоматизация</span>
          </div>
          <div style={{ fontSize: 24, color: "#57534B", fontWeight: 400 }}>
            Внедряем AI-решения для продаж, поддержки и автоматизации бизнеса
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: 12 }}>
          {["AI-аудит", "Telegram-боты", "AI-ассистенты", "Интеграции"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                border: "1px solid rgba(20,19,15,0.12)",
                backgroundColor: "#FBFAF7",
                fontSize: 16,
                color: "#57534B",
                fontWeight: 500,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
