import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ai.arvexo.ru"),
  title: "Arvexo AI Consulting — AI-консалтинг и автоматизация бизнеса",
  description:
    "Внедряем AI-решения для продаж, поддержки, аналитики и автоматизации бизнес-процессов: AI-аудит, боты, ассистенты и интеграции.",
  openGraph: {
    title: "Arvexo AI Consulting",
    description: "AI-консалтинг и автоматизация бизнес-процессов",
    type: "website",
    url: "https://ai.arvexo.ru"
  },
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
