import type { Metadata } from "next";
import { Cormorant, JetBrains_Mono, Onest } from "next/font/google";
import { AuthProvider } from "@/components/AuthProvider";
import "./globals.css";

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});

const cormorant = Cormorant({
  subsets: ["latin", "cyrillic"],
  variable: "--font-cormorant",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ai.arvexo.ru"),
  title: "Arvexo AI Consulting — AI-консалтинг и автоматизация бизнеса",
  description:
    "Внедряем AI-решения для продаж, поддержки, аналитики и автоматизации бизнес-процессов: AI-аудит, боты, ассистенты и интеграции.",
  openGraph: {
    title: "Arvexo AI Consulting",
    description: "AI-консалтинг и автоматизация бизнес-процессов",
    type: "website",
    url: "https://ai.arvexo.ru",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${onest.variable} ${cormorant.variable} ${jetbrainsMono.variable}`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
