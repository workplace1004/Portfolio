import { Metadata } from 'next';
import { siteConfig, pages } from './config';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string[];
    canonical?: string;
    ogImage?: string;
    noindex?: boolean;
}

/**
 * Generate metadata for Next.js pages
 * Following Google SEO best practices
 */
export function generateMetadata({
    title,
    description,
    keywords = [],
    canonical,
    ogImage,
    noindex = false
}: SEOProps = {}): Metadata {
    const metaTitle = title || siteConfig.title;
    const metaDescription = description || siteConfig.description;
    const metaKeywords = [...siteConfig.keywords, ...keywords].join(', ');
    const canonicalUrl = canonical ? `${siteConfig.url}${canonical}` : siteConfig.url;
    const imageUrl = ogImage ? `${siteConfig.url}${ogImage}` : `${siteConfig.url}${siteConfig.ogImage}`;

    return {
        title: metaTitle,
        description: metaDescription,
        keywords: metaKeywords,
        authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
        creator: siteConfig.author.name,
        publisher: siteConfig.author.name,

        // Robots
        robots: {
            index: !noindex,
            follow: !noindex,
            googleBot: {
                index: !noindex,
                follow: !noindex,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },

        // Open Graph
        openGraph: {
            type: 'website',
            locale: 'en_US',
            url: canonicalUrl,
            title: metaTitle,
            description: metaDescription,
            siteName: siteConfig.name,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: metaTitle,
                },
            ],
        },

        // Verification
        verification: {
            google: 'your-google-verification-code', // Add your Google Search Console verification
        },

        // Alternates
        alternates: {
            canonical: canonicalUrl,
        },

        // Icons
        icons: {
            icon: '/favicon.ico',
            apple: '/apple-touch-icon.png',
        },

        // Manifest
        manifest: '/site.webmanifest',
    };
}

/**
 * Generate JSON-LD structured data script
 */
export function generateStructuredData(data: object): string {
    return JSON.stringify(data);
}

/**
 * Predefined metadata for common pages
 */
export const homeMetadata = generateMetadata({
    title: pages.home.title,
    description: pages.home.description,
    keywords: pages.home.keywords,
    canonical: pages.home.canonical,
    ogImage: pages.home.ogImage,
});

export const cricketMetadata = generateMetadata({
    title: pages.cricket.title,
    description: pages.cricket.description,
    keywords: pages.cricket.keywords,
    canonical: pages.cricket.canonical,
    ogImage: pages.cricket.ogImage,
});

export const vectorLabMetadata = generateMetadata({
    title: pages.vectorLab.title,
    description: pages.vectorLab.description,
    keywords: pages.vectorLab.keywords,
    canonical: pages.vectorLab.canonical,
    ogImage: pages.vectorLab.ogImage,
});
