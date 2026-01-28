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
    github: "https://github.com/andriy1004",
    linkedin: "https://www.linkedin.com/in/hugo-marangao-17ab44219/",

    // Contact
    email: "freelancer.zherukha@gmail.com",
    emailHref: "mailto:freelancer.zherukha@gmail.com",

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
        username: "@andriy1004",
        color: "#333",
    },
    {
        name: "LinkedIn",
        url: links.linkedin,
        icon: "linkedin",
        username: "Andriy Zherukha",
        color: "#0077B5",
    },
];

// Contact Information
export const contact = {
    email: links.email,
    emailHref: links.emailHref,
    phone: "+380 99 908 1714", // Add your phone number if you want
    phoneHref: "tel:+380999081714",
    location: "Lviv, Ukraine", // Your location
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
