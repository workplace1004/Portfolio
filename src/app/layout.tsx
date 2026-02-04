import type { Metadata } from "next";
import { Space_Grotesk, Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SpaceCursor from "@/components/ui/SpaceCursor";
import ClarityAnalytics from "@/components/analytics/ClarityAnalytics";
import Script from "next/script";

// Primary font - Clean, modern, slightly futuristic
const spaceGrotesk = Space_Grotesk({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Display font - For headings, space-themed
const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Mono font - For code and technical text
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Comprehensive SEO Metadata
export const metadata: Metadata = {
  // Primary Meta Tags
  title: {
    default: "Yurii Kravchuk | Senior Full-Stack Developer - Web, Mobile & AI Solutions",
    template: "%s | Yurii Kravchuk",
  },
  description:
    "Yurii Kravchuk is a Senior Full-Stack Developer with 10+ years of experience building web, mobile, and cloud applications. Specializes in AI systems, LLM integrations, automation tools, React, Next.js, Node.js, Python, React Native, Flutter, and cloud infrastructure. Based in Lviv, Ukraine.",
  keywords: [
    "Yurii Kravchuk",
    "Senior Full-Stack Developer",
    "Full Stack Developer",
    "React Developer",
    "React Native Developer",
    "Flutter Developer",
    "Node.js Developer",
    "Python Developer",
    "Next.js Developer",
    "Express.js Developer",
    "NestJS Developer",
    "Mobile Developer",
    "Web Developer",
    "AI Developer",
    "LLM Integration",
    "Ukraine Software Engineer",
    "Lviv Software Engineer",
    "Cross-Platform Mobile Apps",
  ],
  authors: [{ name: "Yurii Kravchuk", url: "https://hugomarangao.dev" }],
  creator: "Yurii Kravchuk",
  publisher: "Yurii Kravchuk",

  // Open Graph Meta Tags (for social sharing)
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://hugomarangao.dev",
    siteName: "Yurii Kravchuk Portfolio",
    title: "Yurii Kravchuk | Senior Full-Stack Developer - Web, Mobile & AI Solutions",
  description:
    "Senior Full-Stack Developer with 10+ years of experience building web, mobile, and cloud applications. Specializes in AI systems, LLM integrations, automation tools, and full-stack development.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yurii Kravchuk - Senior Full-Stack Developer Portfolio",
      },
    ],
  },

  // Twitter Card Meta Tags
  twitter: {
    card: "summary_large_image",
    title: "Yurii Kravchuk | Senior Full-Stack Developer",
    description:
      "Senior Full-Stack Developer | React, Next.js, Node.js, Python, AI/LLM, Mobile Apps Expert",
    images: ["/og-image.png"],
    creator: "@yuriikravchuk",
  },

  // Robots and Crawling
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification (add your verification codes)
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },

  // Additional
  category: "technology",
  classification: "Portfolio",

  // Alternate languages (if applicable)
  alternates: {
    canonical: "https://hugomarangao.dev",
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon" }
    ],
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // Manifest for PWA
  manifest: "/site.webmanifest",

  // Theme
  metadataBase: new URL("https://hugomarangao.dev"),
};

// JSON-LD Structured Data for SEO
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yurii Kravchuk",
  jobTitle: "Senior Full-Stack Developer",
  description:
    "Senior Full-Stack Developer with 10+ years of experience building web, mobile, and cloud applications. Specializes in AI systems, LLM integrations, automation tools, React, Next.js, Node.js, Python, React Native, Flutter, and cloud infrastructure.",
  url: "https://hugomarangao.dev",
  email: "yurii.kravchuk@example.com",
  telephone: "+380XXXXXXXXX",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lviv",
    addressCountry: "Ukraine",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "Angular",
    "Vue.js",
    "React Native",
    "Flutter",
    "Swift",
    "Kotlin",
    "Node.js",
    "Express.js",
    "NestJS",
    "Python",
    "FastAPI",
    "PHP",
    "Laravel",
    "GraphQL",
    "REST APIs",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Firebase",
    "Supabase",
    "AWS",
    "AI/LLM Integration",
    "OpenAI",
    "Automation",
    "D3.js",
    "Jest",
    "Cypress",
    "Unity",
    "Mobile App Development",
    "Web Development",
    "Full Stack Development",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Yurii Kravchuk Portfolio",
  url: "https://hugomarangao.dev",
  description:
    "Portfolio website of Yurii Kravchuk, a Senior Full-Stack Developer specializing in web, mobile, cloud applications, and AI/LLM integrations.",
  author: {
    "@type": "Person",
    name: "Yurii Kravchuk",
  },
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Yurii Kravchuk - Full-Stack Development Services",
  description:
    "Professional full-stack development services specializing in web, mobile, cloud applications, AI/LLM integrations, automation tools, and scalable solutions.",
  provider: {
    "@type": "Person",
    name: "Yurii Kravchuk",
  },
  areaServed: {
    "@type": "Country",
    name: "Ukraine",
  },
  serviceType: [
    "Mobile App Development",
    "Web Development",
    "Full Stack Development",
    "Cross-Platform Development",
    "Cloud Solutions",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data */}
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          id="service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceSchema),
          }}
        />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://hugomarangao.dev" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${orbitron.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ClarityAnalytics />
        <SpaceCursor />
        {children}
      </body>
    </html>
  );
}
