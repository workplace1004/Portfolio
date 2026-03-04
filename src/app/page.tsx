'use client';

import { SpaceBackground } from '@/components/canvas';
import {
  AnimatedText,
  FloatingElement,
} from '@/components/ui/AnimatedText';
import { AudioToggle } from '@/components/ui/AudioToggle';
import { SoundManager } from '@/components/ui/SoundManager';
import BackgroundParallax from '@/components/ui/BackgroundParallax';
import Image from 'next/image';
import {
  Smartphone, Globe, Brain, Zap, Building2,
  Code2, Cpu, GitBranch, Layers, Rocket,
  Mail, Phone, Send, MapPin, Briefcase, GraduationCap,
  Award, CheckCircle2, ArrowRight, Github, ExternalLink,
  Star, Users, Clock, Sparkles, Download, MessageSquare,
  Shield, Palette, Database, Terminal
} from 'lucide-react';

// ==========================================
// DATA - Projects, Skills, Experience
// ==========================================

type ProjectItem = {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  category: string;
  highlights: string[];
  color: string;
  metrics?: Record<string, string | number>;
};

const PROJECTS: ProjectItem[] = [

  {
    title: "B2B E-commerce Platform",
    description: "HAZEL refers to a cloud-based online B2B e-commerce platform that helps businesses sell products and services to other businesses through a digital portal. In this setup, business buyers can log in, browse catalogs, place orders, and manage purchases directly online - similar to how a typical online store works for consumers, but tailored to the needs of professional buyers and sellers.",
    image: "/images/project/b2b.png",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js", "Docker", "CI/CD"],
    liveUrl: "https://github.com/workplace1004/B2B-react-frontend",
    category: "Web / B2B E-commerce",
    highlights: ["B2B E-commerce", "Inventory management", "Order taking", "Real-time analytics"],
    color: "cosmic-yellow",
  },
  {
    title: "Astar",
    description: "Astar is a digital ecosystem that blends symbolic insights and personal reflections with automated tools and real human support to provide meaningful guidance and interactive experiences in one unified platform.",
    image: "/images/project/astar.png",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js", "OpenAI", "Python", "FastAPI"],
    // liveUrl: "https://github.com/workplace1004/Assistant-AI",
    category: "Web / Assistant",
    highlights: ["Symbolic insights", "Personal reflections", "Automated tools", "Real human support"],
    color: "cosmic-green",
  },
  {
    title: "Statxt",
    description: "Statxt is a business texting platform for teams.The goal is to let businesses message customers reliably over SMS/MMS. with a fast inbo for daily conversations and support for campaigns and automation, while keeping compliance and deliverability central (opt-out, consent, auditing, guardrails).",
    image: "/images/project/statxt.png",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js", "Docker", "CI/CD", "Python", "FastAPI", "Vonage"],
    liveUrl: "https://statxt.com/",
    category: "Web / Business Texting",
    highlights: ["Business texting", "Campaigns", "Automation", "Compliance", "Deliverability"],
    color: "cosmic-orange",
  },
  {
    title: "Healthcare Management Platform",
    description: "Healthcare website for the Center of Modern Urology in Kyiv, providing information about doctors, diagnostics, treatments, and clinic locations for patients.",
    image: "/images/project/healthcare.png",
    technologies: ["Healthcare", "React", "Next.js", "SEO", "Responsive UI", "TypeScript", ".NET", "Tailwind CSS", "Python", "PostgreSQL", "Docker", "CI/CD"],
    category: "Web / Healthcare",
    highlights: ["Doctors directory", "Diagnostics & treatments", "Multilingual content", "Clinic locations & contacts"],
    color: "cosmic-blue",
    liveUrl: "https://urology.net.ua/"
  },
  {
    title: "Cross-Platform E-Commerce App",
    description: "Family fashion marketplace app for iPhone, built around Shafa.ua. Browse discounted branded clothing, follow favorite brands, use powerful filters, and buy & sell safely with secure payments.",
    image: "/images/project/ecommerce-mobile.png",
    technologies: ["React Native", "iOS", "Shopping", "Secure Payments", "Push Notifications"],
    liveUrl: "https://apps.apple.com/us/app/shafa-ua-online-shopping/id1402020028",
    category: "Mobile / Shopping",
    highlights: ["Brand subscriptions", "Advanced search & filters", "Safe payments", "Order tracking"],
    color: "cosmic-teal",
  },
  {
    title: "Ecommerce / Marketplace",
    description: "Online marketplace focused on fashion and lifestyle: browsing categories, discounts, new arrivals, brand discovery, and a feed-style shopping experience.",
    image: "/images/project/ecommerce.png",
    technologies: ["E-commerce", "React", "Marketplace", "Catalog", "Emotion", "Cloudflare", "TypeScript", ".NET", "Tailwind CSS", "Python", "CI/CD"],
    liveUrl: "https://shafa.ua/",
    category: "Marketplace / E-commerce",
    highlights: ["Catalog & categories", "Discounts", "New arrivals", "Brand pages", "User listings"],
    color: "cosmic-purple",
  },
  {
    title: "Health24 for Patients",
    description: "Medical online service app for booking doctor appointments and managing personal medical records. Integrates with e-Health Ukraine system, allowing patients to access electronic medical cards, prescriptions, vaccination data, and lab results directly from their smartphone.",
    image: "/images/project/healthcare-mobile.png",
    technologies: ["React Native", "iOS", "Medical", "e-Health", "Appointments"],
    liveUrl: "https://apps.apple.com/ua/app/health24-%D0%B4%D0%BB%D1%8F-%D0%BF%D0%B0%D1%86%D1%96%D1%94%D0%BD%D1%82%D1%96%D0%B2/id1609634265",
    category: "Mobile / Medical",
    highlights: ["Doctor booking", "Medical records", "e-Health integration", "Family accounts"],
    color: "cosmic-orange",
  },
  {
    title: "LUN Real Estate Platform",
    description: "Ukrainian real estate platform for finding new builds, apartments, houses, and commercial properties for sale or rent across major cities. Provides detailed project info, developer profiles, and market statistics to help users make informed decisions.",
    image: "/images/project/realestate.png",
    technologies: ["React", "Next.js", "Maps", "Analytics", "Search", "TypeScript", ".NET", "Tailwind CSS", "Python", "PostgreSQL", "Docker", "CI/CD", "FastAPI"],
    liveUrl: "https://lun.ua/",
    category: "Web / Real Estate",
    highlights: ["New builds & resale", "Rent & sale", "Developer catalog", "Market analytics"],
    color: "cosmic-teal",
  },
  {
    title: "Restaurant POS System",
    description: "Restaurant POS system for managing restaurant operations, including inventory, orders, payments, and reporting. Features include table management, order taking, payment processing, and real-time analytics.",
    image: "/images/project/restaurant_pos_system.png",
    technologies: ["React", "TypeScript", "Tailwind CSS", "SQlite", "Socket.io", "Electron", "Node.js"],
    liveUrl: "https://github.com/workplace1004/Restaurant-POS-System-Electron",
    category: "Desktop Application / Restaurant",
    highlights: ["Inventory management", "Order taking", "Payment processing", "Real-time analytics"],
    color: "cosmic-purple",
  },
];

const SERVICES = [
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Cross-platform iOS & Android apps with Flutter and React Native. Native performance, beautiful UI, offline-first architecture.",
    features: ["Flutter / React Native", "iOS & Android", "Offline Support", "App Store Deployment"],
    color: "cosmic-blue"
  },
  {
    icon: Code2,
    title: "Native Android Development",
    description: "High-performance native Android applications with modern architecture patterns and Material Design principles.",
    features: ["Kotlin / Java", "Jetpack Compose", "Material Design", "Play Store Ready"],
    color: "cosmic-teal"
  },
  {
    icon: Globe,
    title: "Web Application Development",
    description: "Fast, responsive web apps with React and Next.js. SEO optimized, mobile-friendly, and built for scale.",
    features: ["React / Next.js", "TypeScript", "SEO Optimized", "Responsive Design"],
    color: "cosmic-purple"
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Intelligent systems using LangChain, RAG pipelines, and local LLMs. Turn your data into actionable insights.",
    features: ["LangChain / RAG", "Local LLMs", "Custom AI Agents", "API Integration"],
    color: "cosmic-orange"
  },
  {
    icon: Zap,
    title: "Agentic AI Solutions",
    description: "Autonomous AI agents that automate complex workflows, handle multi-step tasks, and integrate with your existing systems.",
    features: ["Workflow Automation", "Multi-Agent Systems", "Business Process AI", "Custom Integrations"],
    color: "cosmic-pink"
  },
  {
    icon: Layers,
    title: "System Architecture",
    description: "Scalable, maintainable system design. Clean architecture, microservices, and best practices for long-term success.",
    features: ["Clean Architecture", "Scalable Design", "API Design", "Code Reviews"],
    color: "cosmic-cyan"
  }
];

const SKILLS = {
  frontend: {
    title: "Frontend",
    icon: Globe,
    color: "cosmic-blue",
    items: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 95 },
      { name: "Angular", level: 85 },
      { name: "Vue.js", level: 85 },
      { name: "TypeScript", level: 95 },
      { name: "JavaScript", level: 95 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Bootstrap", level: 90 },
      { name: "D3.js", level: 85 },
      { name: "GraphQL", level: 85 },
      { name: "Apollo", level: 85 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 95 },
      { name: "Material UI", level: 85 },
      { name: "Three.js", level: 85 },
    ]
  },
  backend: {
    title: "Backend",
    icon: Database,
    color: "cosmic-purple",
    items: [
      { name: "Node.js", level: 95 },
      { name: "Express.js", level: 95 },
      { name: "NestJS", level: 90 },
      { name: "Python", level: 90 },
      { name: "FastAPI", level: 90 },
      { name: "Django", level: 85 },
      { name: "PHP", level: 85 },
      { name: "Laravel", level: 85 },
      { name: ".NET", level: 90 },
      { name: "ASP.NET Core", level: 90 },
      { name: "C#", level: 90 },
      { name: "REST APIs", level: 95 },
      { name: "GraphQL APIs", level: 85 },
      { name: "JWT Authentication", level: 95 },
      { name: "Socket.io", level: 85 },
    ]
  },
  mobile: {
    title: "Mobile",
    icon: Smartphone,
    color: "cosmic-teal",
    items: [
      { name: "React Native", level: 95 },
      { name: "Flutter", level: 90 },
      { name: "Swift", level: 85 },
      { name: "Kotlin", level: 85 },
      { name: "Java", level: 85 },
    ]
  },
  ai: {
    title: "AI & Automation",
    icon: Brain,
    color: "cosmic-pink",
    items: [
      { name: "OpenAI", level: 90 },
      { name: "LLM Integration", level: 90 },
      { name: "AI Chat Systems", level: 85 },
      { name: "Workflow Automation", level: 85 },
      { name: "LangChain", level: 85 },
    ]
  },
  databases: {
    title: "Databases",
    icon: Database,
    color: "cosmic-yellow",
    items: [
      { name: "PostgreSQL", level: 95 },
      { name: "MySQL", level: 90 },
      { name: "MongoDB", level: 95 },
      { name: "SQL Server", level: 90 },
      { name: "Firebase", level: 90 },
      { name: "Supabase", level: 85 },
      { name: "Redis", level: 85 },
      { name: "SQlite", level: 90 },
    ]
  },
  devops: {
    title: "DevOps & Cloud",
    icon: Terminal,
    color: "cosmic-orange",
    items: [
      { name: "AWS", level: 90 },
      { name: "CI/CD Pipelines", level: 90 },
      { name: "Docker", level: 90 },
      { name: "GitHub Actions", level: 90 },
      { name: "GitLab CI/CD", level: 85 },
      { name: "Nginx", level: 85 },
      { name: "Vercel", level: 90 },
      { name: "Cloudflare", level: 85 },
    ]
  }
};

const EXPERIENCES = [
  {
    role: "Full Stack Engineer",
    company: "NovaTech Solutions",
    location: "Lviv, Ukraine | Remote",
    period: "01/2021 – 01/2024",
    duration: "4+ years",
    type: "Full-time",
    isCurrent: true,
    description: "Delivered scalable web applications and end to end product features, collaborating with cross functional teams to turn business needs into reliable software.",
    achievements: [
      "Built full stack platforms using modern frontend frameworks and backend services",
      "Designed REST APIs and optimized database performance for high traffic systems",
      "Improved application performance and maintainability through clean architecture practices",
      "Contributed to product planning, technical decisions, and mentoring developers"
    ],
    technologies: ["React", "Next.js", "Vue.js", "Angular", "Tailwind CSS", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "MongoDB"]
  },
  {
    role: "Mobile | Backend Developer",
    company: "DigitalCore Systems",
    location: "Lviv, Ukraine",
    period: "03/2018 – 12/2020",
    duration: "2+ years",
    type: "Full-time",
    isCurrent: false,
    description: "Focused on mobile integrations and backend services development using Microsoft technologies.",
    achievements: [
      "Developed secure backend APIs in .NET supporting mobile applications",
      "Implemented authentication, data synchronization, and scalable cloud services",
      "Collaborated with mobile teams to deliver stable and performant app features",
      "Optimized backend logic improving response time and reliability"
    ],
    technologies: [".NET", "ASP.NET Core", "C#", "REST APIs", "SQL Server", "Mobile Integrations"]
  },
  {
    role: "Mobile | Frontend Developer",
    company: "ByteWave Studio",
    location: "Lviv, Ukraine",
    period: "06/2015 – 02/2018",
    duration: "2+ years",
    type: "Full-time",
    isCurrent: false,
    description: "Worked on mobile focused UI development and responsive frontend applications.",
    achievements: [
      "Built mobile friendly interfaces and reusable UI components",
      "Improved user experience through performance optimization and modern design practices",
      "Integrated frontend apps with backend APIs and third party services",
      "Collaborated closely with designers to ensure consistent UX across devices"
    ],
    technologies: ["React Native", 'Flutter', 'Kotlin', "JavaScript", "TypeScript", "HTML", "CSS", 'Firebase']
  },
  {
    role: "Backend Developer",
    company: "CodeBridge Technologies",
    location: "Lviv, Ukraine",
    period: "04/2013 – 05/2015",
    duration: "2 years",
    type: "Full-time",
    isCurrent: false,
    description: "Developed enterprise level backend systems using Microsoft .NET technologies.",
    achievements: [
      "Designed and maintained backend services using .NET and C#",
      "Built scalable APIs and business logic for internal platforms",
      "Improved system stability through refactoring and performance tuning",
      "Participated in architecture discussions and code quality initiatives"
    ],
    technologies: [".NET", "ASP.NET MVC", "C#", "SQL Server", "REST APIs", 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL']
  }
];

const STATS = [
  { label: "Years Experience", value: "10+", icon: Clock },
  { label: "Projects Delivered", value: "60+", icon: Rocket },
  { label: "Happy Clients", value: "50+", icon: Users },
  { label: "Healthcare Users", value: "500+", icon: Download },
];

const TESTIMONIALS = [
  {
    quote: "Andriy delivered our app ahead of schedule with exceptional quality. His React Native expertise and attention to detail made all the difference.",
    author: "Client Project Lead",
    role: "Healthcare Startup",
    rating: 5
  },
  {
    quote: "Excellent work on our system integration. He understood our requirements quickly and implemented a robust solution.",
    author: "Tech Director",
    role: "Enterprise Client",
    rating: 5
  }
];

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Static Background Image */}
      <div className="cosmic-background" />

      {/* Background Parallax Effect */}
      <BackgroundParallax />

      {/* 3D Canvas with Spaceship and Asteroids (no background elements) */}
      <SpaceBackground />

      {/* Sound Management - Must be inside a component tree */}
      <SoundManager />

      {/* Audio Toggle Button - Fixed position */}
      <AudioToggle />

      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cosmic-blue focus:text-white focus:rounded">
        Skip to main content
      </a>

      {/* Main Content */}
      <main id="main-content" className="relative z-10" role="main">

        {/* ============================================
            HERO SECTION
        ============================================ */}
        <section
          id="hero"
          className="relative flex min-h-screen flex-col items-center justify-center px-6 overflow-hidden"
          aria-label="Introduction"
        >
          <div className="relative z-10 w-full max-w-4xl text-center hero-float">

            {/* Status Badge - Minimal */}
            <AnimatedText animation="fade-in-up" delay={0}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cosmic-teal opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cosmic-teal"></span>
                </span>
                <p className="text-[10px] text-secondary font-bold tracking-[0.2em] uppercase">Ready for Innovation</p>
              </div>
            </AnimatedText>

            {/* Name */}
            <AnimatedText animation="scale-in-glow" delay={0.2}>
              <h1 className="font-display mb-2 text-6xl font-black tracking-tighter text-white md:text-8xl lg:text-9xl name-glow">
                YURII KRAVCHUK
              </h1>
            </AnimatedText>

            {/* Role / High-end Subtitle */}
            <AnimatedText animation="fade-in-up" delay={0.3}>
              <div className="mb-8 flex flex-col items-center gap-2">
                <p className="text-xl text-cosmic-cyan md:text-2xl font-medium tracking-tight">
                  Senior Full-Stack Developer
                </p>
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
            </AnimatedText>

            {/* Summary - Clean & Focused */}
            <AnimatedText animation="blur-in" delay={0.4}>
              <p className="mx-auto mb-12 max-w-2xl text-lg text-secondary/80 leading-relaxed font-light">
                I am a Senior Full-Stack Developer with 10+ years of experience building <span className="text-white font-medium">web, mobile, and cloud applications</span>. I also work with <span className="text-white font-medium">AI systems, LLM integrations, and automation tools</span> to help businesses work faster and smarter. I help startups and companies turn ideas into real products, building complete systems — frontend, backend, databases, cloud infrastructure, and AI-powered features.
              </p>
            </AnimatedText>

            {/* Actions - Clean Buttons */}
            <AnimatedText animation="fade-in-up" delay={0.5}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
                <a
                  href="#contact"
                  className="group relative overflow-hidden rounded-full bg-white px-10 py-4 text-sm font-black text-black transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                >
                  HIRE ME
                </a>
                <a
                  href="#projects"
                  className="group rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-10 py-4 text-sm font-bold text-white transition-all hover:bg-white/10 hover:border-white/30"
                >
                  VIEW WORK
                </a>
              </div>
            </AnimatedText>

            {/* Meta Info Bar */}
            <AnimatedText animation="fade-in-up" delay={0.6} className="mt-16">
              <div className="flex items-center justify-center gap-8 text-[10px] text-muted font-bold tracking-[0.2em] uppercase opacity-60">
                <span className="flex items-center gap-2"><MapPin className="h-3 w-3" /> Lviv, Ukraine</span>
                <span className="flex items-center gap-2"><Briefcase className="h-3 w-3" /> 10+ Years Experience</span>
              </div>
            </AnimatedText>
          </div>

          {/* Minimal Scroll Hint */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <FloatingElement speed="slow">
              <a href="#services" className="flex flex-col items-center gap-4 opacity-30 hover:opacity-100 transition-opacity">
                <div className="h-16 w-px bg-gradient-to-b from-white to-transparent" />
              </a>
            </FloatingElement>
          </div>
        </section>

        <div className="section-divider" />

        {/* ============================================
            SERVICES / WHAT I DO
        ============================================ */}
        <section
          id="services"
          className="relative px-6 py-20"
          aria-labelledby="services-heading"
        >
          <div className="mx-auto max-w-6xl">

            <AnimatedText animation="fade-in-up" className="mb-12 text-center">
              <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-blue">Services</p>
              <h2 id="services-heading" className="text-2xl font-semibold text-primary md:text-4xl mb-4 title-glow">
                What I Can Build For You
              </h2>
              <p className="mx-auto max-w-2xl text-secondary">
                From mobile apps to AI-powered solutions, I deliver end-to-end development
                services tailored to your business needs.
              </p>
            </AnimatedText>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((service, i) => (
                <AnimatedText key={service.title} animation="fade-in-up" delay={0.08 * i}>
                  <article className="group rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-6 transition-all hover:border-cosmic-blue/30 card-glow h-full flex flex-col">
                    <div className={`inline-flex p-3 rounded-lg bg-${service.color}/10 mb-4 w-fit`}>
                      <service.icon className={`h-6 w-6 text-${service.color} icon-glow`} aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-secondary leading-relaxed mb-4 flex-grow">
                      {service.description}
                    </p>
                    <ul className="flex flex-wrap gap-2" role="list">
                      {service.features.map((feature) => (
                        <li key={feature} className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-xs text-secondary">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </article>
                </AnimatedText>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ============================================
            ABOUT ME
        ============================================ */}
        <section
          id="about"
          className="relative px-6 py-20"
          aria-labelledby="about-heading"
        >
          <div className="mx-auto max-w-4xl">
            <AnimatedText animation="fade-in-up" className="mb-12 text-center">
              <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-cyan">About Me</p>
              <h2 id="about-heading" className="text-2xl font-semibold text-primary md:text-4xl mb-4 title-glow">
                Who I Am
              </h2>
            </AnimatedText>

            <AnimatedText animation="blur-in" delay={0.2}>
              <div className="rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-8 card-glow">
                <div className="prose prose-invert max-w-none text-secondary space-y-4">
                  <p className="text-base leading-relaxed">
                    I am a Senior Full-Stack Developer with 10+ years of experience building web, mobile, and cloud applications. I also work with AI systems, LLM integrations, and automation tools to help businesses work faster and smarter.
                  </p>
                  <p className="text-base leading-relaxed">
                    I help startups and companies turn ideas into real products. I build complete systems — frontend, backend, databases, cloud infrastructure, and AI-powered features.
                  </p>
                  <p className="text-base leading-relaxed">
                    I work with modern frontend technologies including React.js, Next.js, Angular, Vue.js, Tailwind CSS, and Bootstrap, and I build responsive, high-performance user interfaces. I also create data visualization features using D3.js and develop applications that use GraphQL and Apollo.
                  </p>
                  <p className="text-base leading-relaxed">
                    For mobile development, I build cross-platform and native apps using React Native, Flutter, Swift for iOS, and Java or Kotlin for Android.
                  </p>
                  <p className="text-base leading-relaxed">
                    On the backend, I develop scalable systems using Node.js with Express and Nest.js, Python with FastAPI, and PHP with Laravel. I design REST APIs and GraphQL APIs, and I implement authentication systems and application security.
                  </p>
                  <p className="text-base leading-relaxed">
                    I also have strong experience with AI, LLM, and automation. I integrate OpenAI and other LLM APIs, build AI chat features, create AI content generation systems, develop workflow automation, and add AI-powered features into SaaS products. I work with data processing pipelines, bots, and task automation systems.
                  </p>
                  <p className="text-base leading-relaxed">
                    For databases, I use PostgreSQL, MySQL, MongoDB, Firebase, and Supabase, depending on project needs.
                  </p>
                  <p className="text-base leading-relaxed">
                    In cloud and DevOps, I work with AWS, CI/CD pipelines, deployment processes, server setup, and performance optimization.
                  </p>
                  <p className="text-base leading-relaxed">
                    I also write tests using Jest and Cypress, design system architecture, and build real-time features. I have additional experience with Unity for interactive and 3D applications.
                  </p>
                </div>
              </div>
            </AnimatedText>
          </div>
        </section>

        <div className="section-divider" />

        {/* ============================================
            PROJECTS / PORTFOLIO
        ============================================ */}
        <section
          id="projects"
          className="relative px-6 py-20"
          aria-labelledby="projects-heading"
        >
          <div className="mx-auto max-w-7xl">

            <AnimatedText animation="fade-in-up" className="mb-12 text-center">
              <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-purple">Portfolio</p>
              <h2 id="projects-heading" className="text-2xl font-semibold text-primary md:text-4xl mb-4 title-glow">
                Featured Projects
              </h2>
              <p className="mx-auto max-w-2xl text-secondary">
                A selection of projects I've built that showcase my expertise in mobile development,
                web applications, and AI integration.
              </p>
            </AnimatedText>

            <div className="space-y-16 md:space-y-24">
              {PROJECTS.map((project, i) => {
                const isEven = i % 2 === 0;
                // Color mapping for dynamic classes
                const colorClasses: Record<string, { bg: string; text: string }> = {
                  "cosmic-blue": { bg: "bg-cosmic-blue/20", text: "text-cosmic-blue" },
                  "cosmic-teal": { bg: "bg-cosmic-teal/20", text: "text-cosmic-teal" },
                  "cosmic-purple": { bg: "bg-cosmic-purple/20", text: "text-cosmic-purple" },
                  "cosmic-orange": { bg: "bg-cosmic-orange/20", text: "text-cosmic-orange" },
                  "cosmic-pink": { bg: "bg-cosmic-pink/20", text: "text-cosmic-pink" },
                  "cosmic-cyan": { bg: "bg-cosmic-cyan/20", text: "text-cosmic-cyan" },
                };
                const colorClass = colorClasses[project.color] || colorClasses["cosmic-blue"];

                return (
                  <AnimatedText key={project.title} animation="fade-in-up" delay={0.1 * i}>
                    <article className="group relative overflow-hidden rounded-2xl border border-white/12 bg-black/40 backdrop-blur-2xl transition-all hover:border-cosmic-purple/30 hover:shadow-2xl hover:shadow-cosmic-purple/10 card-glow">
                      <div className={`grid gap-0 items-stretch ${isEven ? 'md:grid-cols-[60%_40%]' : 'md:grid-cols-[40%_60%]'}`}>
                        {/* Image Section */}
                        {project.image && (
                          <div className={`relative h-72 md:h-full overflow-hidden ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple/20 via-transparent to-cosmic-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                            {/* Image */}
                            <Image
                              src={project.image}
                              alt={`${project.title} preview`}
                              width={1200}
                              height={675}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              priority={i < 2}
                            />

                            {/* Gradient overlay for mobile readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent md:opacity-0 transition-opacity" />

                            {/* Live URL Badge on Image */}
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute top-4 right-4 z-20 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 hover:border-cosmic-cyan/50 hover:bg-black/90 transition-all group/link shadow-lg"
                                aria-label={`Open ${project.title} website`}
                              >
                                <ExternalLink className="h-4 w-4 text-white group-hover/link:text-cosmic-cyan transition-colors" />
                              </a>
                            )}

                            {/* Decorative corner accent */}
                            <div className={`absolute bottom-0 left-0 w-32 h-32 ${colorClass.bg} opacity-20 blur-3xl`} />
                          </div>
                        )}

                        {/* Content Section */}
                        <div className={`p-3 md:p-10 lg:p-6 flex flex-col justify-center h-full ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                          {/* Project Header */}
                          <div className="mb-4">
                            <span className={`inline-block rounded-full ${colorClass.bg} ${colorClass.text} px-3 py-1.5 text-xs font-semibold mb-4 tracking-wide`}>
                              {project.category}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-bold text-primary group-hover:text-cosmic-cyan transition-colors leading-tight">
                              {project.title}
                            </h3>
                          </div>

                          {/* Description */}
                          <p className="text-base md:text-lg text-secondary leading-relaxed mb-4">
                            {project.description}
                          </p>

                          {/* Highlights */}
                          <div className="space-y-3 mb-4 grid grid-cols-2 gap-2">
                            {project.highlights.map((highlight) => (
                              <div key={highlight} className="flex items-start gap-3 text-sm md:text-base text-secondary">
                                <CheckCircle2 className="h-5 w-5 text-cosmic-teal mt-0.5 flex-shrink-0" />
                                <span className="leading-relaxed">{highlight}</span>
                              </div>
                            ))}
                          </div>

                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2 border-t border-white/8 pt-5 items-center">
                            {project.technologies.map((tech) => (
                              <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-secondary hover:border-cosmic-blue/40 hover:text-cosmic-blue hover:bg-cosmic-blue/10 transition-all cursor-default">
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* Metrics (if available) */}
                          {project.metrics && (
                            <div className="border-t border-white/8 flex flex-wrap gap-6 text-sm">
                              {Object.entries(project.metrics).map(([key, value]) => (
                                <div key={key} className="flex items-center gap-2">
                                  <span className="text-cosmic-cyan font-semibold text-base">{value}</span>
                                  <span className="text-muted capitalize">{key}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  </AnimatedText>
                );
              })}
            </div>

            {/* View More */}
            {/* <AnimatedText animation="fade-in-up" delay={0.5} className="mt-10 text-center">
              <a
                href="https://github.com/yuriikravchuk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cosmic-blue hover:text-cosmic-cyan transition-colors"
              >
                <Github className="h-5 w-5" />
                View more on GitHub
                <ArrowRight className="h-4 w-4" />
              </a>
            </AnimatedText> */}
          </div>
        </section>

        <div className="section-divider" />

        {/* ============================================
            SKILLS
        ============================================ */}
        <section
          id="skills"
          className="relative px-6 py-20"
          aria-labelledby="skills-heading"
        >
          <div className="mx-auto max-w-5xl">

            <AnimatedText animation="fade-in-up" className="mb-12 text-center">
              <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-teal">Technical Skills</p>
              <h2 id="skills-heading" className="text-2xl font-semibold text-primary md:text-4xl mb-4 title-glow">
                Technologies I Work With
              </h2>
              <p className="mx-auto max-w-2xl text-secondary">
                My technical toolkit spans mobile development, web technologies, and AI/ML systems.
              </p>
            </AnimatedText>

            <div className="grid gap-6 md:grid-cols-2">
              {Object.values(SKILLS).map((category, i) => (
                <AnimatedText key={category.title} animation="fade-in-up" delay={0.1 * i}>
                  <div className="rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-6 card-glow">
                    <div className="flex items-center gap-3 mb-5">
                      <category.icon className={`h-5 w-5 text-${category.color}`} />
                      <h3 className={`text-base font-semibold text-${category.color}`}>{category.title}</h3>
                    </div>
                    <div className="space-y-4">
                      {category.items.map((skill) => {
                        // Color mapping for progress bars
                        const colorMap: Record<string, { from: string; to: string }> = {
                          "cosmic-blue": { from: "#3b82f6", to: "rgba(96, 165, 250, 0.95)" },
                          "cosmic-purple": { from: "#8b5cf6", to: "rgba(167, 139, 250, 0.95)" },
                          "cosmic-teal": { from: "#14b8a6", to: "rgba(45, 212, 191, 0.95)" },
                          "cosmic-pink": { from: "#ec4899", to: "rgba(244, 114, 182, 0.95)" },
                          "cosmic-cyan": { from: "#06b6d4", to: "rgba(34, 211, 238, 0.95)" },
                          "cosmic-orange": { from: "#f97316", to: "rgba(251, 146, 60, 0.95)" },
                          "cosmic-yellow": { from: "#10b981", to: "rgba(238, 255, 0, 0.98)" },
                        };
                        const colors = colorMap[category.color] || colorMap["cosmic-blue"];

                        return (
                          <div key={skill.name}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-secondary">{skill.name}</span>
                              <span className="text-xs text-muted">{skill.level}%</span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-1000"
                                style={{
                                  width: `${skill.level}%`,
                                  background: `linear-gradient(to right, ${colors.from}, ${colors.to})`,
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </AnimatedText>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ============================================
            EXPERIENCE
        ============================================ */}
        <section
          id="experience"
          className="relative px-6 py-20"
          aria-labelledby="experience-heading"
        >
          <div className="mx-auto max-w-4xl">

            <AnimatedText animation="fade-in-up" className="mb-12 text-center">
              <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-purple">Career</p>
              <h2 id="experience-heading" className="text-2xl font-semibold text-primary md:text-4xl mb-4 title-glow">
                Professional Experience
              </h2>
              <p className="mx-auto max-w-2xl text-secondary">
                My journey building software products and leading development teams.
              </p>
            </AnimatedText>

            <div className="space-y-6">
              {EXPERIENCES.map((exp, i) => (
                <AnimatedText key={exp.company} animation={i % 2 === 0 ? "fade-in-left" : "fade-in-right"} delay={0.1 * i}>
                  <article className="rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-6 hover:border-cosmic-cyan/30 transition-all card-glow">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        {exp.isCurrent && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-cosmic-teal/20 px-2.5 py-0.5 text-xs text-cosmic-teal font-medium mb-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-cosmic-teal animate-pulse" />
                            Current Position
                          </span>
                        )}
                        <h3 className="text-xl font-semibold text-primary">{exp.role}</h3>
                        <p className="text-cosmic-cyan flex items-center gap-1.5 mt-1">
                          <Building2 className="h-4 w-4" />
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-right text-sm text-muted">
                        <p className="font-medium">{exp.period}</p>
                        <p className="flex items-center gap-1 justify-end">
                          <MapPin className="h-3 w-3" />
                          {exp.location}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-secondary mb-4">{exp.description}</p>

                    {/* Achievements */}
                    <ul className="space-y-2 mb-4" role="list">
                      {exp.achievements.map((achievement) => (
                        <li key={achievement} className="flex items-start gap-2 text-sm text-secondary">
                          <CheckCircle2 className="h-4 w-4 text-cosmic-teal mt-0.5 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/8">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="rounded-full border border-cosmic-blue/20 bg-cosmic-blue/10 px-2.5 py-0.5 text-xs text-cosmic-blue">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </article>
                </AnimatedText>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ============================================
            CURRENT FOCUS / LEARNING
        ============================================ */}
        <section
          id="learning"
          className="relative px-6 py-20"
          aria-labelledby="learning-heading"
        >
          <div className="mx-auto max-w-4xl">

            <AnimatedText animation="fade-in-up" className="mb-10 text-center">
              <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-pink">Growth</p>
              <h2 id="learning-heading" className="text-2xl font-semibold text-primary md:text-3xl title-glow">
                Currently Exploring
              </h2>
            </AnimatedText>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Smartphone, title: "Mobile", desc: "React Native, Flutter", color: "cosmic-purple" },
                { icon: Rocket, title: "Cloud Architecture", desc: "AWS, GCP, Serverless", color: "cosmic-orange" },
                { icon: Zap, title: "Performance", desc: "System optimization", color: "cosmic-blue" },
                { icon: Layers, title: "Full Stack", desc: "React, Node.js, Python", color: "cosmic-teal" }
              ].map((item, i) => (
                <AnimatedText key={item.title} animation="scale-in-glow" delay={0.1 * i}>
                  <div className="rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-5 text-center hover:border-cosmic-pink/30 transition-all card-glow">
                    <item.icon className={`h-6 w-6 text-${item.color} mx-auto mb-2`} />
                    <h3 className="text-sm font-semibold text-primary mb-1">{item.title}</h3>
                    <p className="text-xs text-secondary">{item.desc}</p>
                  </div>
                </AnimatedText>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ============================================
            EDUCATION & CERTIFICATIONS
        ============================================ */}
        <section
          id="education"
          className="relative px-6 py-20"
          aria-labelledby="education-heading"
        >
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 lg:grid-cols-2">

              {/* Education */}
              <AnimatedText animation="fade-in-left">
                <div>
                  <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-purple">Education</p>
                  <h2 id="education-heading" className="text-xl font-semibold text-primary mb-4 title-glow">Academic Background</h2>
                  <div className="space-y-4">
                    {/* Master's Degree */}
                    <div className="rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-6">
                      <GraduationCap className="h-6 w-6 text-cosmic-purple mb-3" />
                      <h3 className="text-lg font-semibold text-primary mb-1">Master of Software Engineering</h3>
                      <p className="text-cosmic-cyan mb-1">Ivan Franko National University of Lviv</p>
                      <p className="text-secondary mb-2 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Lviv, Ukraine
                      </p>
                      <p className="text-sm text-muted flex items-center gap-2 mb-3">
                        <Clock className="h-4 w-4" />
                        09/2013 – 12/2015
                      </p>
                    </div>

                    {/* Bachelor's Degree */}
                    <div className="rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-6">
                      <GraduationCap className="h-6 w-6 text-cosmic-purple mb-3" />
                      <h3 className="text-lg font-semibold text-primary mb-1">Bachelor of Computer Science</h3>
                      <p className="text-cosmic-cyan mb-1">Lviv Polytechnic National University</p>
                      <p className="text-secondary mb-2 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Lviv, Ukraine
                      </p>
                      <p className="text-sm text-muted flex items-center gap-2 mb-3">
                        <Clock className="h-4 w-4" />
                        09/2009 – 06/2013
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedText>

              {/* Languages & Certifications */}
              <AnimatedText animation="fade-in-right" delay={0.1}>
                <div>
                  <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-teal">Languages & Certifications</p>
                  <h2 className="text-xl font-semibold text-primary mb-4 title-glow">Communication & Achievements</h2>
                  <div className="space-y-4">
                    <div className="rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-5">
                      {[
                        { lang: "Ukrainian", level: "Native", proficiency: 100 },
                        { lang: "English", level: "Fluent", proficiency: 95 }
                      ].map((l) => (
                        <div key={l.lang} className="flex justify-between items-center text-sm py-2 border-b border-white/5 last:border-0">
                          <span className="text-secondary font-medium">{l.lang}</span>
                          <span className="text-xs text-cosmic-cyan">{l.level}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      <div className="rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-4 flex items-start gap-3">
                        <Award className="h-5 w-5 text-cosmic-orange mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-secondary font-medium">.NET Development & ASP.NET Core</p>
                          <p className="text-xs text-muted mt-1">Skills: .NET, ASP.NET Core, C#, REST APIs, SQL Server</p>
                        </div>
                      </div>
                      <div className="rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-4 flex items-start gap-3">
                        <Award className="h-5 w-5 text-cosmic-orange mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-secondary font-medium">Node.js: Creating a REST API with Express and MongoDB</p>
                          <p className="text-xs text-muted mt-1">Skills: Back-End Development, Node.js, Express.js, MongoDB</p>
                        </div>
                      </div>
                      <div className="rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-4 flex items-start gap-3">
                        <Award className="h-5 w-5 text-cosmic-orange mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-secondary font-medium">Application Manufacturing - React Native</p>
                          <p className="text-xs text-muted mt-1">Skills: React, React Native, Node.js, TypeScript, Firebase, Git</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedText>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ============================================
            TESTIMONIALS
        ============================================ */}
        {/* <section
          id="testimonials"
          className="relative px-6 py-20"
          aria-labelledby="testimonials-heading"
        >
          <div className="mx-auto max-w-4xl">

            <AnimatedText animation="fade-in-up" className="mb-10 text-center">
              <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-orange">Feedback</p>
              <h2 id="testimonials-heading" className="text-2xl font-semibold text-primary md:text-3xl title-glow">
                What Clients Say
              </h2>
            </AnimatedText>

            <div className="grid gap-6 md:grid-cols-2">
              {TESTIMONIALS.map((testimonial, i) => (
                <AnimatedText key={i} animation="fade-in-up" delay={0.1 * i}>
                  <blockquote className="rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-6 h-full flex flex-col card-glow">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, j) => (
                        <Star key={j} className="h-4 w-4 text-cosmic-orange fill-cosmic-orange" />
                      ))}
                    </div>
                    <p className="text-secondary italic flex-grow mb-4">"{testimonial.quote}"</p>
                    <footer className="border-t border-white/8 pt-4">
                      <p className="text-primary font-medium">{testimonial.author}</p>
                      <p className="text-xs text-muted">{testimonial.role}</p>
                    </footer>
                  </blockquote>
                </AnimatedText>
              ))}
            </div>
          </div>
        </section> */}

        <div className="section-divider" />

        {/* ============================================
            PHILOSOPHY / WHY WORK WITH ME
        ============================================ */}
        <section
          id="philosophy"
          className="relative px-6 py-20"
          aria-labelledby="philosophy-heading"
        >
          <div className="mx-auto max-w-3xl text-center">

            <AnimatedText animation="scale-in-glow">
              <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-purple">Philosophy</p>
              <h2 id="philosophy-heading" className="text-2xl font-semibold text-primary mb-6 md:text-3xl title-glow">
                Why Work With Me?
              </h2>
            </AnimatedText>

            <AnimatedText animation="blur-in" delay={0.2}>
              <blockquote className="rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-8 mb-8">
                <p className="text-lg md:text-xl text-secondary italic leading-relaxed">
                  "I build software that is{' '}
                  <span className="text-cosmic-blue font-semibold">powerful inside</span>,{' '}
                  <span className="text-cosmic-purple font-semibold">delightful outside</span>, and{' '}
                  <span className="text-cosmic-pink font-semibold">purposeful always</span>."
                </p>
              </blockquote>
            </AnimatedText>

            <AnimatedText animation="fade-in-up" delay={0.3}>
              <div className="grid gap-4 sm:grid-cols-3 mb-8">
                {[
                  { icon: Shield, title: "Quality First", desc: "Clean code, tested thoroughly, built to last" },
                  { icon: Zap, title: "Fast Delivery", desc: "Efficient workflows, clear communication" },
                  { icon: Palette, title: "User-Centric", desc: "Beautiful UX that users actually enjoy" }
                ].map((item) => (
                  <div key={item.title} className="p-4 rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl">
                    <item.icon className="h-5 w-5 text-cosmic-cyan mx-auto mb-2" />
                    <h3 className="text-sm font-semibold text-primary mb-1">{item.title}</h3>
                    <p className="text-xs text-secondary">{item.desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedText>

            <AnimatedText animation="fade-in-up" delay={0.4}>
              <p className="text-xl font-semibold gradient-text">
                I build systems that scale and evolve with your business.
              </p>
            </AnimatedText>
          </div>
        </section>

        <div className="section-divider" />

        {/* ============================================
            CONTACT / CTA
        ============================================ */}
        <section
          id="contact"
          className="relative px-6 py-20"
          aria-labelledby="contact-heading"
        >
          <div className="mx-auto max-w-3xl text-center">

            {/* <AnimatedText animation="fade-in-up">
              <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-blue">Get in Touch</p>
              <h2 id="contact-heading" className="text-2xl font-semibold text-primary mb-3 md:text-4xl title-glow">
                Let's Build Something Amazing
              </h2>
              <p className="text-secondary mb-8 max-w-xl mx-auto">
                Have a project idea? Need a mobile app or AI solution?
                I'm always excited to discuss new opportunities and challenges.
              </p>
            </AnimatedText>

            <AnimatedText animation="fade-in-up" delay={0.2}>
              <div className="grid gap-4 sm:grid-cols-3 mb-10">
                <a
                  href="mailto:yuriy.upwork02@gmail.com"
                  className="group rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-5 hover:border-cosmic-blue/30 transition-all card-hover"
                  aria-label="Send email to Yurii"
                >
                  <Mail className="h-6 w-6 text-cosmic-blue mx-auto mb-3" />
                  <p className="text-xs text-muted mb-1">Email</p>
                  <p className="text-sm text-secondary group-hover:text-primary transition-colors">yuriy.upwork02@gmail.com</p>
                </a>
                <a
                  href="https://wa.me/380999081714"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-5 hover:border-cosmic-purple/30 transition-all card-hover"
                  aria-label="Contact on WhatsApp"
                >
                  <Phone className="h-6 w-6 text-cosmic-purple mx-auto mb-3" />
                  <p className="text-xs text-muted mb-1">WhatsApp</p>
                  <p className="text-sm text-secondary group-hover:text-primary transition-colors">+380 99 908 1714</p>
                </a>
                <a
                  href="https://t.me/yurii_kravchuk1004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-5 hover:border-cosmic-pink/30 transition-all card-glow"
                  aria-label="Contact on Telegram"
                >
                  <Send className="h-6 w-6 text-cosmic-pink mx-auto mb-3" />
                  <p className="text-xs text-muted mb-1">Telegram</p>
                  <p className="text-sm text-secondary group-hover:text-primary transition-colors">@yurii_kravchuk1004</p>
                </a>
              </div>
            </AnimatedText>

            <AnimatedText animation="scale-in-glow" delay={0.3}>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mb-12">
                <a
                  href="mailto:yuriy.upwork02@gmail.com?subject=Project%20Inquiry&body=Hi%20Yurii%2C%0A%0AI'm%20interested%20in%20discussing%20a%20project%20with%20you.%0A%0AProject%20Type%3A%20%0ABudget%3A%20%0ATimeline%3A%20%0A%0ALooking%20forward%20to%20hearing%20from%20you!"
                  className="group rounded-full bg-gradient-to-r from-cosmic-blue to-cosmic-purple px-8 py-4 text-base font-semibold text-white hover:shadow-xl hover:shadow-cosmic-purple/30 transition-all hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Start a Conversation
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
                <a
                  href="https://t.me/yurii_kravchuk1004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 px-8 py-4 text-base font-medium text-secondary hover:border-white/30 hover:text-primary transition-all flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  Connect on Telegram
                </a>
              </div>
            </AnimatedText> */}

            <AnimatedText animation="fade-in-up" delay={0.4}>
              <div className="flex flex-wrap justify-center gap-8 mb-12 py-6 border-y border-white/8">
                {STATS.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <stat.icon className="h-5 w-5 text-cosmic-cyan mx-auto mb-1" />
                    <p className="text-xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedText>

            <footer className="text-center">
              <p className="text-sm text-muted mb-2">
                © {new Date().getFullYear()} Yurii Kravchuk. Built with Next.js, Three.js & ❤️
              </p>
              <p className="text-xs text-muted">
                Lviv, Ukraine • Open to remote opportunities worldwide
              </p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
