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
    default: "Eduardo Oliveira | Senior Software Engineer - Full Stack Developer",
    template: "%s | Eduardo Oliveira",
  },
  description:
    "Eduardo Oliveira is an Experienced Software Engineer with over 5 years of expertise delivering scalable web and mobile solutions across fintech, edtech, SaaS, and AI-driven platforms. Proven track record of enhancing system performance by up to 45% and building high-throughput APIs and data dashboards managing millions of records. Skilled in React, React Native, Flutter, TypeScript, Node.js, Express, and Python, with extensive experience deploying cloud-native applications on AWS and GCP. Based in Suzano, Brazil.",
  keywords: [
    "Eduardo Oliveira",
    "Senior Software Engineer",
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
    "Brazil Software Engineer",
    "Suzano Software Engineer",
    "Cross-Platform Mobile Apps",
  ],
  authors: [{ name: "Eduardo Oliveira", url: "https://hugomarangao.dev" }],
  creator: "Eduardo Oliveira",
  publisher: "Eduardo Oliveira",

  // Open Graph Meta Tags (for social sharing)
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://hugomarangao.dev",
    siteName: "Eduardo Oliveira Portfolio",
    title: "Eduardo Oliveira | Senior Software Engineer - Full Stack Developer",
  description:
    "Experienced Software Engineer with over 5 years of expertise delivering scalable web and mobile solutions across fintech, edtech, SaaS, and AI-driven platforms. Proven track record of enhancing system performance by up to 45% and building high-throughput APIs and data dashboards managing millions of records.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Eduardo Oliveira - Senior Software Engineer Portfolio",
      },
    ],
  },

  // Twitter Card Meta Tags
  twitter: {
    card: "summary_large_image",
    title: "Eduardo Oliveira | Senior Software Engineer",
    description:
      "Senior Software Engineer | React, React Native, Flutter, Node.js, Python Expert",
    images: ["/og-image.png"],
    creator: "@eduardo3071",
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
  name: "Eduardo Oliveira",
  jobTitle: "Senior Software Engineer",
  description:
    "Experienced Software Engineer with over 5 years of expertise delivering scalable web and mobile solutions across fintech, edtech, SaaS, and AI-driven platforms. Proven track record of enhancing system performance by up to 45% and building high-throughput APIs and data dashboards managing millions of records. Skilled in React, React Native, Flutter, TypeScript, Node.js, Express, and Python, with extensive experience deploying cloud-native applications on AWS and GCP.",
  url: "https://hugomarangao.dev",
  email: "eduardooliveiira3077@gmail.com",
  telephone: "+5511934843013",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Suzano",
    addressCountry: "Brazil",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Grupo Educational UNIS",
    }
  ],
  knowsAbout: [
    "React",
    "React Native",
    "Flutter",
    "Next.js",
    "Node.js",
    "Express.js",
    "NestJS",
    "Python",
    "FastAPI",
    "Django",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Mobile App Development",
    "Web Development",
    "Full Stack Development",
  ],
  sameAs: ["https://www.linkedin.com/in/eduardo-oliveira"],
  worksFor: {
    "@type": "Organization",
    name: "Grupo Conque",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Eduardo Oliveira Portfolio",
  url: "https://hugomarangao.dev",
  description:
    "Portfolio website of Eduardo Oliveira, a Senior Software Engineer specializing in full stack web and mobile development.",
  author: {
    "@type": "Person",
    name: "Eduardo Oliveira",
  },
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Eduardo Oliveira - Software Engineering Services",
  description:
    "Professional software engineering services specializing in full stack web and mobile development, scalable applications, and cloud-native solutions.",
  provider: {
    "@type": "Person",
    name: "Eduardo Oliveira",
  },
  areaServed: {
    "@type": "Country",
    name: "Brazil",
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
