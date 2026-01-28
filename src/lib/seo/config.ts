// SEO Configuration for Portfolio Website
// Following Google's SEO Starter Guide best practices

export const siteConfig = {
    name: "Andriy Zherukha - Senior Software Engineer Portfolio",
    title: "Andriy Zherukha | Senior Software Engineer | Full Stack Developer | Mobile & Web Apps",
    description: "Senior Software Engineer with over 7 years of expertise delivering scalable web and mobile solutions across fintech, edtech, SaaS, and AI-driven platforms. Proven track record of enhancing system performance by up to 45% and building high-throughput APIs and data dashboards managing millions of records. Skilled in React, React Native, Flutter, TypeScript, Node.js, Express, and Python, with extensive experience deploying cloud-native applications on AWS and GCP.",
    url: "https://hugomarangao.dev",
    ogImage: "/images/seo/og-image.png",
    keywords: [
        "Senior Software Engineer",
        "Full Stack Developer",
        "React Developer",
        "React Native Developer",
        "Flutter Developer",
        "Next.js Developer",
        "Node.js Developer",
        "Python Developer",
        "Mobile App Developer",
        "Web Developer",
        "Portfolio",
        "Andriy Zherukha",
        "Lviv Software Engineer"
    ],
    author: {
        name: "Andriy Zherukha",
        email: "freelancer.zherukha@gmail.com",
        url: "https://hugomarangao.dev"
    },
    social: {
        github: "https://github.com/andriy1004",
        linkedin: "https://www.linkedin.com/in/hugo-marangao-17ab44219/"
    }
};

export const pages = {
    home: {
        title: "Andriy Zherukha | Senior Software Engineer | Full Stack Developer | Mobile & Web Apps",
        description: "Senior Software Engineer with over 7 years of expertise delivering scalable web and mobile solutions across fintech, edtech, SaaS, and AI-driven platforms. Proven track record of enhancing system performance by up to 45% and building high-throughput APIs and data dashboards managing millions of records. View my portfolio of successful projects.",
        keywords: [
            "senior software engineer portfolio",
            "full stack developer",
            "react developer",
            "react native developer",
            "flutter developer",
            "mobile app development",
            "web development",
            "node.js developer",
            "python developer",
            "andriy zherukha",
            "dublin software engineer"
        ],
        canonical: "/",
        ogImage: "/images/seo/home-og.png"
    },
    cricket: {
        title: "Cricket Match Calculator | Live Ball-by-Ball Scoring & Analytics",
        description: "Interactive cricket match calculator with live ball-by-ball counter, real-time run rate graphs, win probability predictions, and match analytics. Track scores, wickets, and overs with instant calculations for T20, ODI, and custom formats.",
        keywords: [
            "cricket calculator",
            "live cricket scoring",
            "ball by ball counter",
            "cricket run rate calculator",
            "win probability cricket",
            "cricket match tracker",
            "cricket analytics tool",
            "T20 calculator",
            "ODI calculator",
            "cricket statistics"
        ],
        canonical: "/cricket",
        ogImage: "/images/seo/cricket-og.png"
    },
    vectorLab: {
        title: "Vector Space Lab | 2D & 3D Vector Visualization | Linear Algebra Tool",
        description: "Interactive vector visualization tool for learning linear algebra and AI/ML mathematics. Visualize vectors in 2D and 3D space, perform vector operations, and understand transformations with real-time rendering.",
        keywords: [
            "vector visualization",
            "linear algebra tool",
            "3D vector space",
            "2D vector graphics",
            "vector operations",
            "AI ML mathematics",
            "vector calculator",
            "math visualization",
            "interactive learning"
        ],
        canonical: "/vector-lab",
        ogImage: "/images/seo/vector-lab-og.png"
    }
};

// Structured Data (JSON-LD) for rich snippets
export const structuredData = {
    person: {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Andriy Zherukha",
        jobTitle: "Senior Software Engineer",
        description: "Senior Software Engineer with over 7 years of expertise delivering scalable web and mobile solutions across fintech, edtech, SaaS, and AI-driven platforms",
        url: siteConfig.url,
        image: `${siteConfig.url}/images/seo/profile.png`,
        sameAs: [
            siteConfig.social.github,
            siteConfig.social.linkedin
        ],
        knowsAbout: [
            "React",
            "React Native",
            "Next.js",
            "Flutter",
            "Node.js",
            "Express.js",
            "NestJS",
            "Python",
            "FastAPI",
            "Django",
            "PostgreSQL",
            "MongoDB",
            "AWS",
            "Mobile Development",
            "Web Development",
            "Full Stack Development"
        ]
    },
    website: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        author: {
            "@type": "Person",
            name: siteConfig.author.name
        }
    },
    portfolio: {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: "Developer Portfolio",
        description: "Portfolio showcasing full stack development projects",
        creator: {
            "@type": "Person",
            name: siteConfig.author.name
        }
    }
};
