/**
 * Centralized Links Configuration
 * 
 * Use this file to manage all external and internal links across the portfolio
 * Import and use these links in any component to maintain consistency
 */

// Personal & Professional Links
export const links = {
    // Website
    website: "https://hugomarangao.dev",

    // Social Media
    github: "https://github.com/eduardo3071",
    linkedin: "https://www.linkedin.com/in/eduardo-oliveira",

    // Contact
    email: "eduardooliveiira3077@gmail.com",
    emailHref: "mailto:eduardooliveiira3077@gmail.com",

    // Internal Pages
    home: "/",
    cricket: "/cricket",
    vectorLab: "/vector-lab",

    // Resume/CV
    resume: "/resume/Hugo_Marangao_Souza_Resume.pdf", // Update filename as needed

    // Optional: Other platforms
    // instagram: "https://instagram.com/yourusername",
    // youtube: "https://youtube.com/@yourchannel",
    // medium: "https://medium.com/@yourusername",
    // dev: "https://dev.to/yourusername",
};

// Social Media Display Info
export const socialMedia = [
    {
        name: "GitHub",
        url: links.github,
        icon: "github", // For icon components
        username: "@eduardo3071",
        color: "#333",
    },
    {
        name: "LinkedIn",
        url: links.linkedin,
        icon: "linkedin",
        username: "Eduardo Oliveira",
        color: "#0077B5",
    },
];

// Contact Information
export const contact = {
    email: links.email,
    emailHref: links.emailHref,
    phone: "+55 11 93484 3013", // Add your phone number if you want
    phoneHref: "tel:+5511934843013",
    location: "Suzano, Brazil", // Your location
};

// Navigation Links
export const navigation = [
    { name: "Home", href: links.home },
    { name: "Cricket Calculator", href: links.cricket },
    { name: "Vector Lab", href: links.vectorLab },
];

// Footer Links
export const footerLinks = {
    social: socialMedia,
    legal: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
    ],
    resources: [
        { name: "Resume", href: links.resume },
        { name: "Contact", href: "#contact" },
    ],
};

/**
 * Usage Examples:
 * 
 * // In any component:
 * import { links, socialMedia } from '@/lib/config/links';
 * 
 * // Use links
 * <a href={links.github}>GitHub</a>
 * <a href={links.emailHref}>Email Me</a>
 * 
 * // Map social media
 * {socialMedia.map(social => (
 *   <a key={social.name} href={social.url}>{social.name}</a>
 * ))}
 */
