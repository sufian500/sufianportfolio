import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "./globals.css";

const title = "SUFIAN. | Hire to unlock";
const description = "Sufian Sayed, Business & Technology Analyst in Perth. Explore projects in business analysis, data analytics, systems and cloud AI.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: { title, description, type: "website", locale: "en_AU", siteName: "SUFIAN." },
  twitter: { card: "summary", title, description },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#070708", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body>{children}</body>
    </html>
  );
}
