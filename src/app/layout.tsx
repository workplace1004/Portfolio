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
    default: "Andriy Zherukha | Senior Software Engineer - Full Stack Developer",
    template: "%s | Andriy Zherukha",
  },
  description:
    "Andriy Zherukha is a Senior Software Engineer with over 7 years of expertise delivering scalable web and mobile solutions across fintech, edtech, SaaS, and AI-driven platforms. Proven track record of enhancing system performance by up to 45% and building high-throughput APIs and data dashboards managing millions of records. Skilled in React, React Native, Flutter, TypeScript, Node.js, Express, and Python, with extensive experience deploying cloud-native applications on AWS and GCP. Based in Lviv, Ukraine.",
  keywords: [
    "Andriy Zherukha",
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
    "Lviv Software Engineer",
    "Ukraine Software Engineer",
    "Cross-Platform Mobile Apps",
  ],
  authors: [{ name: "Andriy Zherukha", url: "https://hugomarangao.dev" }],
  creator: "Andriy Zherukha",
  publisher: "Andriy Zherukha",

  // Open Graph Meta Tags (for social sharing)
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://hugomarangao.dev",
    siteName: "Andriy Zherukha Portfolio",
    title: "Andriy Zherukha | Senior Software Engineer - Full Stack Developer",
  description:
    "Senior Software Engineer with over 7 years of expertise delivering scalable web and mobile solutions across fintech, edtech, SaaS, and AI-driven platforms. Proven track record of enhancing system performance by up to 45% and building high-throughput APIs and data dashboards managing millions of records.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Andriy Zherukha - Senior Software Engineer Portfolio",
      },
    ],
  },

  // Twitter Card Meta Tags
  twitter: {
    card: "summary_large_image",
    title: "Andriy Zherukha | Senior Software Engineer",
    description:
      "Senior Software Engineer | React, React Native, Flutter, Node.js, Python Expert",
    images: ["/og-image.png"],
    creator: "@andriy1004",
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
  name: "Andriy Zherukha",
  jobTitle: "Senior Software Engineer",
  description:
    "Senior Software Engineer with over 7 years of expertise delivering scalable web and mobile solutions across fintech, edtech, SaaS, and AI-driven platforms. Proven track record of enhancing system performance by up to 45% and building high-throughput APIs and data dashboards managing millions of records. Skilled in React, React Native, Flutter, TypeScript, Node.js, Express, and Python, with extensive experience deploying cloud-native applications on AWS and GCP.",
  url: "https://hugomarangao.dev",
  email: "freelancer.zherukha@gmail.com",
  telephone: "+380999081714",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lviv",
    addressCountry: "Ukraine",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "CCT College Dublin",
    },
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
  sameAs: ["https://www.linkedin.com/in/hugo-marangao-17ab44219/"],
  worksFor: {
    "@type": "Organization",
    name: "AUTOMATION S.R.L.",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Andriy Zherukha Portfolio",
  url: "https://hugomarangao.dev",
  description:
    "Portfolio website of Andriy Zherukha, a Senior Software Engineer specializing in full stack web and mobile development.",
  author: {
    "@type": "Person",
    name: "Andriy Zherukha",
  },
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Andriy Zherukha - Software Engineering Services",
  description:
    "Professional software engineering services specializing in full stack web and mobile development, scalable applications, and cloud-native solutions.",
  provider: {
    "@type": "Person",
    name: "Andriy Zherukha",
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
