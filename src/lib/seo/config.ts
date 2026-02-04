// SEO Configuration for Portfolio Website
// Following Google's SEO Starter Guide best practices

export const siteConfig = {
    name: "Yurii Kravchuk - Senior Full-Stack Developer Portfolio",
    title: "Yurii Kravchuk | Senior Full-Stack Developer | Web, Mobile & AI Solutions",
    description: "Senior Full-Stack Developer with 10+ years of experience building web, mobile, and cloud applications. Specializes in AI systems, LLM integrations, automation tools, React, Next.js, Node.js, Python, React Native, Flutter, and cloud infrastructure. Based in Lviv, Ukraine.",
    url: "https://hugomarangao.dev",
    ogImage: "/images/seo/og-image.png",
    keywords: [
        "Senior Full-Stack Developer",
        "Full Stack Developer",
        "React Developer",
        "Next.js Developer",
        "React Native Developer",
        "Flutter Developer",
        "Node.js Developer",
        "Python Developer",
        "AI Developer",
        "LLM Integration",
        "Mobile App Developer",
        "Web Developer",
        "Portfolio",
        "Yurii Kravchuk",
        "Ukraine Software Engineer",
        "Lviv Software Engineer"
    ],
    author: {
        name: "Yurii Kravchuk",
        email: "yurii.kravchuk@example.com",
        url: "https://hugomarangao.dev"
    },
    social: {
        github: "https://github.com/yuriikravchuk",
        linkedin: "https://www.linkedin.com/in/yurii-kravchuk"
    }
};

export const pages = {
    home: {
        title: "Yurii Kravchuk | Senior Full-Stack Developer | Web, Mobile & AI Solutions",
        description: "Senior Full-Stack Developer with 10+ years of experience building web, mobile, and cloud applications. Specializes in AI systems, LLM integrations, automation tools, and full-stack development. View my portfolio of successful projects.",
        keywords: [
            "senior full-stack developer portfolio",
            "full stack developer",
            "react developer",
            "next.js developer",
            "react native developer",
            "flutter developer",
            "mobile app development",
            "web development",
            "ai developer",
            "llm integration",
            "node.js developer",
            "python developer",
            "yurii kravchuk",
            "ukraine software engineer",
            "lviv software engineer"
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
        name: "Yurii Kravchuk",
        jobTitle: "Senior Full-Stack Developer",
        description: "Senior Full-Stack Developer with 10+ years of experience building web, mobile, and cloud applications. Specializes in AI systems, LLM integrations, automation tools, and full-stack development.",
        url: siteConfig.url,
        image: `${siteConfig.url}/images/seo/profile.png`,
        sameAs: [
            siteConfig.social.github,
            siteConfig.social.linkedin
        ],
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
        description: "Portfolio showcasing full stack development projects, AI/LLM integrations, and mobile applications",
        creator: {
            "@type": "Person",
            name: siteConfig.author.name
        }
    }
};
