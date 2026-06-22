import type { Metadata } from "next";
import { Cormorant, JetBrains_Mono, Onest } from "next/font/google";
import Script from "next/script";
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

const TITLE = "Arvexo AI Consulting — AI-консалтинг и автоматизация бизнеса";
const DESCRIPTION =
  "Внедряем AI-решения для продаж, поддержки, аналитики и автоматизации бизнес-процессов: AI-аудит, Telegram-боты, ассистенты и CRM-интеграции.";
const SITE_URL = "https://ai.arvexo.ru";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: SITE_URL,
    locale: "ru_RU",
    siteName: "Arvexo AI Consulting",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: SITE_URL,
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
        {process.env.NODE_ENV === "production" && (
          <Script
            defer
            data-domain="ai.arvexo.ru"
            src="https://plausible.io/js/script.js"
          />
        )}
      </body>
    </html>
  );
}
