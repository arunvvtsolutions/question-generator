import "./globals.css";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import Providers from "@/context/Providers";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import SchemaScript from "@/components/common/Schema";
import { BASE_URL } from "@/config";
import { Viewport } from "next";

const GtagScript = dynamic(() => import("@/components/common/Gtag"));

const inter = Inter({ subsets: ["latin"], display: "swap" });

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NEET Guide",
  url: BASE_URL,
  logo: `${BASE_URL}/_next/static/media/Neet Guid Logo.2697825d.png`,
};

const websiteJsonLd: any = {
  "@context": "https://schema.org/",
  "@type": "WebSite",
  name: "NEET Guide",
  url: BASE_URL,
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width" />
         <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/tex.css"
        />
      </head>
      <body className={inter.className}>
        <NextTopLoader />
        <Providers>{children}</Providers>
        <Toaster />
        <SchemaScript jsonLd={websiteJsonLd} id="website-schema" />
        <SchemaScript jsonLd={organizationJsonLd} id="organization-schema" />
        <GtagScript />
      </body>
    </html>
  );
}
