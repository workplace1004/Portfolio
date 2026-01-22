'use client';

import { SpaceBackground } from '@/components/canvas';
import {
  AnimatedText,
  FloatingElement,
} from '@/components/ui/AnimatedText';
import { AudioToggle } from '@/components/ui/AudioToggle';
import { SoundManager } from '@/components/ui/SoundManager';
import BackgroundParallax from '@/components/ui/BackgroundParallax';
import {
  Smartphone, Globe, Brain, Zap, Building2,
  Code2, Cpu, GitBranch, Layers, Rocket,
  Mail, Phone, Linkedin, MapPin, Briefcase, GraduationCap,
  Award, CheckCircle2, ArrowRight, Github, ExternalLink,
  Star, Users, Clock, Sparkles, Download, MessageSquare,
  Shield, Palette, Database, Terminal
} from 'lucide-react';

// ==========================================
// DATA - Projects, Skills, Experience
// ==========================================

const PROJECTS = [
  {
    title: "Healthcare Management Platform",
    description: "Full-stack healthcare application with patient management, booking system, and real-time dashboards. Handles 500+ daily active users.",
    technologies: ["Flutter", "React.js", "Node.js", "PostgreSQL"],
    category: "Mobile + Web",
    highlights: ["Real-time sync", "Offline support", "HIPAA compliant"],
    color: "cosmic-blue",
    metrics: { users: "500+", uptime: "99.9%" }
  },
  {
    title: "AI-Powered Document Assistant",
    description: "Intelligent document analysis tool using RAG architecture and local LLMs. Processes PDFs, extracts insights, and answers questions contextually.",
    technologies: ["Python", "LangChain", "FastAPI", "ChromaDB"],
    category: "AI / ML",
    highlights: ["RAG Pipeline", "Local LLM", "Vector Search"],
    color: "cosmic-purple",
    metrics: { accuracy: "95%", speed: "2s avg" }
  },
  {
    title: "Cross-Platform E-Commerce App",
    description: "Feature-rich shopping application with payment integration, real-time inventory, and push notifications. 50K+ downloads.",
    technologies: ["React Native", "Firebase", "Stripe", "Redux"],
    category: "Mobile",
    highlights: ["Payment Gateway", "Push Notifications", "Analytics"],
    color: "cosmic-teal",
    metrics: { downloads: "50K+", rating: "4.8★" }
  },
  {
    title: "Agentic Workflow Automation",
    description: "AI agent system that automates business processes using natural language instructions. Integrates with multiple APIs and services.",
    technologies: ["Python", "LangChain", "OpenAI", "Celery"],
    category: "AI / Automation",
    highlights: ["Multi-agent", "API Integration", "Auto-scaling"],
    color: "cosmic-orange",
    metrics: { tasks: "10K+/mo", efficiency: "80% faster" }
  }
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
      { name: "React Native", level: 90 },
      { name: "Flutter", level: 90 },
      { name: "Next.js", level: 90 },
      { name: "Swift", level: 85 },
      { name: "Kotlin", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Material UI", level: 90 },
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
      { name: "Python (FastAPI, Flask)", level: 90 },
      { name: "Django", level: 85 },
      { name: "PostgreSQL", level: 90 },
      { name: "MongoDB", level: 90 },
      { name: "GraphQL", level: 85 },
    ]
  },
  devops: {
    title: "DevOps & Cloud",
    icon: Terminal,
    color: "cosmic-orange",
    items: [
      { name: "AWS (Lambda, ECS, S3, RDS)", level: 90 },
      { name: "Azure", level: 85 },
      { name: "Docker", level: 90 },
      { name: "GitHub Actions", level: 90 },
      { name: "GitLab CI/CD", level: 85 },
      { name: "Jenkins", level: 80 },
      { name: "Nginx", level: 85 },
    ]
  },
  other: {
    title: "Other",
    icon: Brain,
    color: "cosmic-teal",
    items: [
      { name: "OpenAI", level: 90 },
      { name: "LangChain", level: 85 },
      { name: "Stripe", level: 90 },
      { name: "PayPal", level: 85 },
      { name: "Firebase", level: 90 },
      { name: "Redis", level: 85 },
      { name: "JWT Authentication", level: 95 },
    ]
  }
};

const EXPERIENCES = [
  {
    role: "Senior Software Engineer",
    company: "AUTOMATION S.R.L.",
    location: "Remote",
    period: "04/2023 – Present",
    duration: "2+ years",
    type: "Full-time",
    isCurrent: true,
    description: "Spearheading the implementation of modern technology solutions, improving operational efficiency and enhancing user experience across web and mobile platforms.",
    achievements: [
      "Spearheaded the implementation of modern technology solutions, improving operational efficiency by 30% and enhancing overall user experience across web and mobile platforms",
      "Cooperated directly with clients to translate business objectives into application features, increasing customer satisfaction scores by 25% and reducing revision cycles",
      "Designed and executed privacy and consent workflows with role-based admin modules, ensuring regulatory compliance and reducing manual approval effort by 40%"
    ],
    technologies: ["React", "React Native", "Node.js", "Express.js", "PostgreSQL", "AWS"]
  },
  {
    role: "Software Engineer",
    company: "Gpi Group",
    location: "Remote",
    period: "04/2023 – 12/2025",
    duration: "2+ years",
    type: "Full-time",
    isCurrent: false,
    description: "Created and launched healthcare management solutions, working with clients to translate business goals into tailored application features.",
    achievements: [
      "Created and launched a hospital management portal used by 500+ healthcare staff and patients, reducing administrative processing time by 35% and streamlining appointment scheduling workflows",
      "Worked with clients to translate business goals into tailored application features, increasing customer satisfaction by 25% and shortening delivery cycles",
      "Implemented performance-focused technology upgrades that improved system speed by 40%, reduced operational costs, and drove higher user engagement"
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "MongoDB", "Express.js"]
  },
  {
    role: "Mobile Developer",
    company: "ViaShopModa",
    location: "Remote",
    period: "05/2019 – 03/2023",
    duration: "4 years",
    type: "Full-time",
    isCurrent: false,
    description: "Developed mobile applications for virtual stores, enhancing user engagement and accessibility while enforcing industry best practices.",
    achievements: [
      "Developed mobile applications for 60 virtual stores, enhancing user engagement and accessibility",
      "Partnered with clients to translate business requirements into tailored application features, increasing customer satisfaction scores by 20 percent and reducing rework cycles",
      "Enforced industry best practices in mobile development, with a focus on security and optimization for mobile devices"
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"]
  }
];

const STATS = [
  { label: "Years Experience", value: "7+", icon: Clock },
  { label: "Projects Delivered", value: "60+", icon: Rocket },
  { label: "Happy Clients", value: "50+", icon: Users },
  { label: "Healthcare Users", value: "500+", icon: Download },
];

const TESTIMONIALS = [
  {
    quote: "Hugo delivered our app ahead of schedule with exceptional quality. His React Native expertise and attention to detail made all the difference.",
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
                HUGO MARANGAO SOUZA
              </h1>
            </AnimatedText>

            {/* Role / High-end Subtitle */}
            <AnimatedText animation="fade-in-up" delay={0.3}>
              <div className="mb-8 flex flex-col items-center gap-2">
                <p className="text-xl text-cosmic-cyan md:text-2xl font-medium tracking-tight">
                  Senior Software Engineer
                </p>
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
            </AnimatedText>

            {/* Summary - Clean & Focused */}
            <AnimatedText animation="blur-in" delay={0.4}>
              <p className="mx-auto mb-12 max-w-2xl text-lg text-secondary/80 leading-relaxed font-light">
                Senior Software Engineer with over 7 years of expertise delivering scalable <span className="text-white font-medium">web and mobile solutions</span> across fintech, edtech, SaaS, and <span className="text-white font-medium">AI-driven platforms</span>. Proven track record of enhancing system performance by up to 45% and building high-throughput APIs and data dashboards managing millions of records.
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
                <span className="flex items-center gap-2"><MapPin className="h-3 w-3" /> Dublin, Ireland</span>
                <span className="flex items-center gap-2"><Briefcase className="h-3 w-3" /> 7+ Years Experience</span>
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
            PROJECTS / PORTFOLIO
        ============================================ */}
        <section
          id="projects"
          className="relative px-6 py-20"
          aria-labelledby="projects-heading"
        >
          <div className="mx-auto max-w-6xl">

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

            <div className="grid gap-6 md:grid-cols-2">
              {PROJECTS.map((project, i) => (
                <AnimatedText key={project.title} animation="fade-in-up" delay={0.1 * i}>
                  <article className="group rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-6 transition-all hover:border-cosmic-purple/30 card-glow h-full">
                    {/* Project Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className={`inline-block rounded-full bg-${project.color}/20 px-2.5 py-0.5 text-xs text-${project.color} font-medium mb-2`}>
                          {project.category}
                        </span>
                        <h3 className="text-lg font-semibold text-primary">
                          {project.title}
                        </h3>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 rounded-lg border border-white/10 hover:border-white/20 transition-colors" aria-label="View source code">
                          <Github className="h-4 w-4 text-muted" />
                        </button>
                        <button className="p-2 rounded-lg border border-white/10 hover:border-white/20 transition-colors" aria-label="View live demo">
                          <ExternalLink className="h-4 w-4 text-muted" />
                        </button>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-secondary leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Metrics */}
                    <div className="flex gap-4 mb-4">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <p className={`text-lg font-bold text-${project.color}`}>{value}</p>
                          <p className="text-xs text-muted capitalize">{key}</p>
                        </div>
                      ))}
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.highlights.map((highlight) => (
                        <span key={highlight} className="flex items-center gap-1 text-xs text-cosmic-teal">
                          <CheckCircle2 className="h-3 w-3" />
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/8">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-secondary">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </article>
                </AnimatedText>
              ))}
            </div>

            {/* View More */}
            <AnimatedText animation="fade-in-up" delay={0.5} className="mt-10 text-center">
              <a
                href="https://github.com/HugoMarangao"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cosmic-blue hover:text-cosmic-cyan transition-colors"
              >
                <Github className="h-5 w-5" />
                View more on GitHub
                <ArrowRight className="h-4 w-4" />
              </a>
            </AnimatedText>
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
                      {category.items.map((skill) => (
                        <div key={skill.name}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-secondary">{skill.name}</span>
                            <span className="text-xs text-muted">{skill.level}%</span>
                          </div>
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r from-${category.color} to-${category.color}/60 rounded-full transition-all duration-1000`}
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
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
                { icon: Cpu, title: "Local LLMs", desc: "Ollama, llama.cpp", color: "cosmic-blue" },
                { icon: Brain, title: "Agentic AI", desc: "Multi-agent systems", color: "cosmic-purple" },
                { icon: Rocket, title: "Next.js 15", desc: "Server components", color: "cosmic-orange" },
                { icon: Sparkles, title: "AI + UX", desc: "Intelligent interfaces", color: "cosmic-teal" }
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
                    <div className="rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-6">
                      <GraduationCap className="h-6 w-6 text-cosmic-purple mb-3" />
                      <h3 className="text-lg font-semibold text-primary mb-1">Diploma in AI and Working into the Future</h3>
                      <p className="text-cosmic-cyan mb-1">CCT College Dublin</p>
                      <p className="text-secondary mb-2">Dublin, Ireland</p>
                      <p className="text-sm text-muted flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        2025 – 2026
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-6">
                      <GraduationCap className="h-6 w-6 text-cosmic-purple mb-3" />
                      <h3 className="text-lg font-semibold text-primary mb-1">Bachelor's degree, Computer Science</h3>
                      <p className="text-cosmic-cyan mb-1">Grupo Educational UNIS</p>
                      <p className="text-secondary mb-2">Brazil</p>
                      <p className="text-sm text-muted flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        2018 – 2021
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
                        { lang: "Italian", level: "Native", proficiency: 100 },
                        { lang: "Portuguese", level: "Native", proficiency: 100 },
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
                          <p className="text-sm text-secondary font-medium">Node.js: Creating a REST API with Express and MongoDB</p>
                          <p className="text-xs text-muted mt-1">Skills: Back-End Web Development, Node.js, Express.js, MongoDB</p>
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

            <AnimatedText animation="fade-in-up">
              <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-blue">Get in Touch</p>
              <h2 id="contact-heading" className="text-2xl font-semibold text-primary mb-3 md:text-4xl title-glow">
                Let's Build Something Amazing
              </h2>
              <p className="text-secondary mb-8 max-w-xl mx-auto">
                Have a project idea? Need a mobile app or AI solution?
                I'm always excited to discuss new opportunities and challenges.
              </p>
            </AnimatedText>

            {/* Contact Cards */}
            <AnimatedText animation="fade-in-up" delay={0.2}>
              <div className="grid gap-4 sm:grid-cols-3 mb-10">
                <a
                  href="mailto:hugomarangao.in@hotmail.com"
                  className="group rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-5 hover:border-cosmic-blue/30 transition-all card-hover"
                  aria-label="Send email to Hugo"
                >
                  <Mail className="h-6 w-6 text-cosmic-blue mx-auto mb-3" />
                  <p className="text-xs text-muted mb-1">Email</p>
                  <p className="text-sm text-secondary group-hover:text-primary transition-colors">hugomarangao.in@hotmail.com</p>
                </a>
                <a
                  href="tel:+353830424512"
                  className="group rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-5 hover:border-cosmic-purple/30 transition-all card-hover"
                  aria-label="Call Hugo"
                >
                  <Phone className="h-6 w-6 text-cosmic-purple mx-auto mb-3" />
                  <p className="text-xs text-muted mb-1">Phone</p>
                  <p className="text-sm text-secondary group-hover:text-primary transition-colors">+353 83 042 4512</p>
                </a>
                <a
                  href="https://www.linkedin.com/in/hugo-marangao-17ab44219/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-5 hover:border-cosmic-pink/30 transition-all card-glow"
                  aria-label="Connect on LinkedIn"
                >
                  <Linkedin className="h-6 w-6 text-cosmic-pink mx-auto mb-3" />
                  <p className="text-xs text-muted mb-1">LinkedIn</p>
                  <p className="text-sm text-secondary group-hover:text-primary transition-colors">Let's Connect</p>
                </a>
              </div>
            </AnimatedText>

            {/* Primary CTA */}
            <AnimatedText animation="scale-in-glow" delay={0.3}>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mb-12">
                <a
                  href="mailto:hugomarangao.in@hotmail.com?subject=Project%20Inquiry&body=Hi%20Hugo%2C%0A%0AI'm%20interested%20in%20discussing%20a%20project%20with%20you.%0A%0AProject%20Type%3A%20%0ABudget%3A%20%0ATimeline%3A%20%0A%0ALooking%20forward%20to%20hearing%20from%20you!"
                  className="group rounded-full bg-gradient-to-r from-cosmic-blue to-cosmic-purple px-8 py-4 text-base font-semibold text-white hover:shadow-xl hover:shadow-cosmic-purple/30 transition-all hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Start a Conversation
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/hugo-marangao-17ab44219/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 px-8 py-4 text-base font-medium text-secondary hover:border-white/30 hover:text-primary transition-all flex items-center justify-center gap-2"
                >
                  <Linkedin className="h-5 w-5" />
                  Connect on LinkedIn
                </a>
              </div>
            </AnimatedText>

            {/* Stats Reminder */}
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

            {/* Footer */}
            <footer className="text-center">
              <p className="text-sm text-muted mb-2">
                © {new Date().getFullYear()} Hugo Marangao Souza. Built with Next.js, Three.js & ❤️
              </p>
              <p className="text-xs text-muted">
                Dublin, Ireland • Open to remote opportunities worldwide
              </p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
