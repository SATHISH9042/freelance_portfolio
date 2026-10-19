export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Full-Stack' | 'Frontend & UI/UX' | 'AI & LLMs' | 'Web Application';
  badge: string;
  summary: string;
  problem: string;
  objective: string;
  features: string[];
  techStack: {
    name: string;
    category: 'frontend' | 'backend' | 'database' | 'ai' | 'tool';
  }[];
  myContribution: string;
  liveUrl?: string;
  githubUrl?: string;
  isPersonalProject: boolean;
  accentColor: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    purpose: string;
    highlight?: boolean;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: 'Education' | 'Experience' | 'Certification';
  description: string[];
  skills: string[];
}

export interface UxPrinciple {
  id: string;
  name: string;
  tagline: string;
  lawOrigin: string;
  description: string;
  impactOnConversion: string;
  beforeLabel: string;
  afterLabel: string;
  keyTakeaway: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Sathish Rao",
    role: "Full-Stack MERN Developer & UI/UX Craftsman",
    status: "Available for Freelance & High-Impact Roles",
    isAvailable: true,
    location: "Bengaluru, India / Remote Worldwide",
    email: "sathishrao.dev@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    upwork: "https://www.upwork.com",
    fiverr: "https://www.fiverr.com",
    shortBio: "Full Stack Developer crafting responsive websites and web applications with modern technology and thoughtful UX.",
    fullBio: [
      "I am a MERN stack developer who bridges the gap between clean backend engineering and high-fidelity interface design. I don't just assemble components; I study how users read, decide, and interact.",
      "My development philosophy is rooted in engineering discipline: maintainable component architecture, accessible semantic code, optimized bundle sizes, and empathetic UX. Every design decision—from button padding to API response structures—serves a human purpose.",
      "Whether building full-stack MVPs, optimizing frontend responsiveness, or integrating intelligent LLM-powered interfaces, I deliver digital products that are dependable, fast, and effortless to use."
    ],
    values: [
      {
        title: "Clean, Maintainable Code",
        description: "Modular architecture, typed contracts with TypeScript, and reusable UI abstractions that scale without technical debt."
      },
      {
        title: "Responsive & Accessible Interfaces",
        description: "Mobile-first layouts tested across real viewports, high contrast ratios, and keyboard-first navigation patterns."
      },
      {
        title: "Intuitive User Journeys",
        description: "Applying cognitive psychology (Hick's Law, Fitts's Law) to reduce cognitive load and maximize user conversion."
      },
      {
        title: "Clear Communication & Reliable Delivery",
        description: "Transparent sprint progress, clean documentation, proactive problem solving, and zero surprise blockers."
      },
      {
        title: "Continuous Learning & AI Integration",
        description: "Actively combining traditional MERN stack resilience with modern AI workflows (RAG, LangChain, vector retrieval)."
      }
    ]
  },

  projects: [
    {
      id: "saffron-leaf",
      title: "Saffron Leaf Restaurant Website",
      subtitle: "Responsive dining concept with interactive menu filtering & real-time reservations",
      category: "Frontend & UI/UX",
      badge: "Featured Concept & Live Prototype",
      summary: "A modern, high-conversion culinary web experience featuring categorized interactive menus, dietary allergen filters, an ambient visual gallery, and an intuitive table reservation flow.",
      problem: "Traditional restaurant websites are frequently slow, cluttered with unreadable PDF menus on mobile, and force users through clunky external booking engines that cause high drop-off rates.",
      objective: "Design and implement a lightning-fast, mobile-first dining web application that provides instant menu search and a frictionless 3-step reservation experience.",
      features: [
        "Live interactive menu with category switching (Starters, Mains, Desserts, Signature Beverages)",
        "Instant dietary preference filters (Vegetarian, Vegan, Gluten-Free, Chef's Special)",
        "Zero-PDF mobile-first responsive layout with high-resolution visual dish previews",
        "Interactive table reservation system with dynamic party size selection and instant validation",
        "Optimized layout achieving 95+ performance metrics with zero layout shift"
      ],
      techStack: [
        { name: "React.js", category: "frontend" },
        { name: "Tailwind CSS", category: "frontend" },
        { name: "JavaScript (ES6+)", category: "frontend" },
        { name: "Figma UI/UX", category: "tool" },
        { name: "Responsive Design", category: "frontend" }
      ],
      myContribution: "Architected the component tree, designed the complete UI system in Figma, engineered responsive menu filtering with instant state transitions, and implemented accessible booking forms with keyboard navigation.",
      liveUrl: "https://saffron-leaf.demo.dev",
      githubUrl: "https://github.com/example/saffron-leaf-restaurant",
      isPersonalProject: true,
      accentColor: "#F59E0B"
    },
    {
      id: "finance-tracker",
      title: "Personal Finance Tracker",
      subtitle: "Client-side wealth management interface with real-time analytics & local storage",
      category: "Full-Stack",
      badge: "Core Web Application",
      summary: "A secure, privacy-first personal financial interface enabling users to monitor income, categorize expenditures, visualize month-over-month cash flow, and persist data client-side with zero latency.",
      problem: "Users often hesitate to use heavy budgeting tools that require banking logins or send private financial telemetry to third-party servers, yet basic spreadsheets lack intuitive mobile input and real-time visualization.",
      objective: "Build an accessible, private financial tracking web app that delivers instant financial metrics, clean expense categorization, and zero-latency data persistence in localStorage.",
      features: [
        "Real-time balance computation showing total net worth, monthly income, and expense breakdown",
        "Quick transaction logger with customizable tags (Housing, Food, Investment, Utilities)",
        "Instant visual category distribution and breakdown pills",
        "Robust localStorage persistence layer with backup export & import capability",
        "Zero tracking, offline-capable architecture guaranteeing total user privacy"
      ],
      techStack: [
        { name: "React.js", category: "frontend" },
        { name: "TypeScript", category: "frontend" },
        { name: "Tailwind CSS", category: "frontend" },
        { name: "Web Storage API", category: "tool" },
        { name: "Data Visualization", category: "frontend" }
      ],
      myContribution: "Designed the dashboard UI, wrote custom state hooks for transaction caching and balance calculations, implemented input sanitation, and built responsive data visualization charts.",
      liveUrl: "https://finance-tracker.demo.dev",
      githubUrl: "https://github.com/example/personal-finance-tracker",
      isPersonalProject: true,
      accentColor: "#10B981"
    },
    {
      id: "college-chatbot",
      title: "RAG-Based College Chatbot",
      subtitle: "Retrieval-augmented Q&A assistant for academic regulations & campus information",
      category: "AI & LLMs",
      badge: "AI Engineering & Prototype",
      summary: "An intelligent retrieval-augmented generation (RAG) assistant that indexes institutional knowledge (course syllabi, admissions criteria, hostel policies) to answer student questions with verified citations.",
      problem: "Students and prospective applicants struggle to navigate fragmented 100+ page college PDFs and outdated circulars, leading to overloaded administrative staff and repetitive inquiries.",
      objective: "Develop a domain-specific Q&A pipeline that accurately retrieves relevant handbook excerpts and synthesizes plain-language responses with verifiable source attribution.",
      features: [
        "Vector search pipeline indexing institutional PDFs and academic handbooks",
        "Source citation display linking answers to specific section numbers and pages",
        "Context-aware fallback when queries fall outside the institutional corpus",
        "Streamlined chat UI with preset frequently asked questions for immediate answers",
        "Optimized prompt templates preventing model hallucination on critical admission criteria"
      ],
      techStack: [
        { name: "Python", category: "backend" },
        { name: "LangChain", category: "ai" },
        { name: "Vector Database", category: "database" },
        { name: "React.js", category: "frontend" },
        { name: "REST APIs", category: "backend" }
      ],
      myContribution: "Configured document chunking and vector embeddings, implemented the semantic retrieval pipeline, and crafted a polished chat interface with streaming responses and citation expandable cards.",
      liveUrl: "https://college-rag-bot.demo.dev",
      githubUrl: "https://github.com/example/rag-college-chatbot",
      isPersonalProject: true,
      accentColor: "#8B5CF6"
    },
    {
      id: "customer-support-agent",
      title: "Persona-Adaptive Customer Support Agent",
      subtitle: "LLM-driven support system with dynamic empathy calibration & human escalation",
      category: "AI & LLMs",
      badge: "Advanced AI Concept",
      summary: "An LLM-driven customer support architecture that evaluates customer sentiment and intent, dynamically adapts its tone (technical, empathetic, or concise), and routes unresolved queries to human tier-2 agents.",
      problem: "Generic chatbots offer robotic, frustrating responses to distressed customers, while full human support desks face expensive ticket backlogs for routine inquiries.",
      objective: "Engineer an empathetic, intelligent support assistant that dynamically adjusts communication style based on sentiment analysis while maintaining strict safeguards for human agent handoff.",
      features: [
        "Real-time sentiment scoring and customer mood detection (Frustrated, Inquiring, VIP)",
        "Dynamic persona adaptation: calibrates tone from concise-technical to reassuringly empathetic",
        "Deterministic escalation triggers: detects anger spikes or refund keywords to summon human agent",
        "Knowledge retrieval integration for verified product specs and order status checks",
        "Agent debugging console displaying prompt context, sentiment score, and confidence rating"
      ],
      techStack: [
        { name: "Node.js", category: "backend" },
        { name: "Express.js", category: "backend" },
        { name: "LLM APIs", category: "ai" },
        { name: "React.js", category: "frontend" },
        { name: "Tailwind CSS", category: "frontend" }
      ],
      myContribution: "Created the multi-persona prompt orchestration engine, built the sentiment evaluation middleware, designed the customer-facing chat UI and the live supervisor escalation preview dashboard.",
      liveUrl: "https://support-agent.demo.dev",
      githubUrl: "https://github.com/example/persona-adaptive-support-agent",
      isPersonalProject: true,
      accentColor: "#0066FF"
    }
  ] as Project[],

  uxPrinciples: [
    {
      id: "hicks-law",
      name: "Hick's Law",
      tagline: "Time to make a decision increases logarithmically with the number of choices.",
      lawOrigin: "Discovered by British psychologist William Edmund Hick (1952).",
      description: "When users are confronted with too many competing options, cognitive paralysis sets in. By curating options, grouping information, and using progressive disclosure, we reduce cognitive friction and accelerate conversion.",
      impactOnConversion: "Streamlined pricing tiers and single-column checkouts reduce bounce rates by up to 34% compared to crowded multi-option forms.",
      beforeLabel: "Overwhelming Choices (12 Options)",
      afterLabel: "Optimized Selection (3 Curated Tiers)",
      keyTakeaway: "Limit primary decisions to 3–4 high-contrast options. Hide secondary features behind progressive disclosure."
    },
    {
      id: "fittss-law",
      name: "Fitts's Law",
      tagline: "The time required to reach a target is a function of distance and target size.",
      lawOrigin: "Formulated by Paul Fitts (1954), foundational to Human-Computer Interaction.",
      description: "Important controls must be physically large enough and positioned within natural reach zones—especially on mobile screens where thumbs dominate interaction. Small, edge-tucked buttons cause mis-taps and frustration.",
      impactOnConversion: "Enlarging touch targets to minimum 48x48px and placing checkout buttons in the lower thumb zone increases mobile completion rates by 22%.",
      beforeLabel: "Desktop-Biased / Awkward Reach",
      afterLabel: "Thumb-Zone Optimized (48px Target)",
      keyTakeaway: "Make primary action buttons generous, prominent, and anchored where fingers naturally rest."
    },
    {
      id: "jakobs-law",
      name: "Jakob's Law",
      tagline: "Users spend most of their time on other sites, and prefer your site to work like all the others.",
      lawOrigin: "Coined by Jakob Nielsen (2000), pioneer of user-friendly website usability.",
      description: "Reinventing fundamental interaction paradigms (like moving the shopping cart to the bottom left or hiding search inside an obscure icon) forces users to relearn your UI. Honoring mental models builds immediate trust.",
      impactOnConversion: "Familiar e-commerce and SaaS navigation patterns eliminate onboarding drop-offs and let users focus on the value proposition.",
      beforeLabel: "Unorthodox / Hidden Navigation",
      afterLabel: "Standard Recognized Pattern",
      keyTakeaway: "Innovate on your product's core value—not on standardized navigation or checkout patterns."
    },
    {
      id: "gestalt-principles",
      name: "Gestalt Principles",
      tagline: "Humans naturally perceive objects as organized patterns, chunks, and cohesive groups.",
      lawOrigin: "Established by Berlin School psychologists Max Wertheimer, Kurt Koffka, and Wolfgang Köhler.",
      description: "Through Proximity, Common Region, and Similarity, users intuitively understand which elements are related. Borderless forms with even spacing confuse users; visually grouped cards create effortless scanning.",
      impactOnConversion: "Visually chunked invoice tables and checkout forms reduce field completion errors by 40%.",
      beforeLabel: "Scattered / Ungrouped Inputs",
      afterLabel: "Chunked Cards & Visual Containers",
      keyTakeaway: "Use whitespace and subtle bounding boxes to group related fields into digestible micro-steps."
    },
    {
      id: "visual-hierarchy",
      name: "Visual Hierarchy",
      tagline: "Guiding the eye through disciplined scale, contrast, weight, and breathing room.",
      lawOrigin: "Core tenet of classic typography and cognitive reading psychology.",
      description: "When everything looks bold and important, nothing is important. Editorial hierarchy sculpts the scanning path: the eye captures the headline first, verifies supporting context second, and lands naturally on the CTA.",
      impactOnConversion: "A disciplined typographic hierarchy cuts cognitive reading time in half and doubles click-through on the primary call to action.",
      beforeLabel: "Uniform / Flat Monotony",
      afterLabel: "Sculpted Editorial Contrast",
      keyTakeaway: "Establish a clear 3-level typographical scale: Dominant Hook, Contextual Anchor, Focused Action."
    }
  ] as UxPrinciple[],

  skills: [
    {
      title: "Frontend Engineering",
      description: "Building responsive, component-driven interfaces with pixel precision and fluid responsiveness.",
      skills: [
        { name: "React.js", purpose: "Component lifecycle, custom hooks, context architecture", highlight: true },
        { name: "JavaScript (ES6+)", purpose: "Async/await, closures, functional programming, DOM performance", highlight: true },
        { name: "Tailwind CSS", purpose: "Utility-first design systems, custom configuration, responsive grids", highlight: true },
        { name: "HTML5 & CSS3", purpose: "Semantic markup, CSS Grid/Flexbox, accessibility (WCAG), CSS variables" },
        { name: "Bootstrap", purpose: "Rapid responsive scaffolding and grid management" },
        { name: "Framer Motion", purpose: "Physics-based micro-interactions, layout transitions, scroll triggers" }
      ]
    },
    {
      title: "Backend & APIs",
      description: "Architecting clean RESTful services, server middleware, and structured communication layers.",
      skills: [
        { name: "Node.js", purpose: "Event loop architecture, stream handling, server runtime", highlight: true },
        { name: "Express.js", purpose: "REST API routing, authentication middleware, error handling", highlight: true },
        { name: "RESTful APIs", purpose: "Resource design, status codes, payload optimization, CORS handling", highlight: true }
      ]
    },
    {
      title: "Databases & Storage",
      description: "Modeling structured and document schemas with data integrity and indexing.",
      skills: [
        { name: "MongoDB", purpose: "Document modeling, Mongoose schemas, aggregation pipelines", highlight: true },
        { name: "MySQL", purpose: "Relational schema design, foreign keys, normalized queries", highlight: true }
      ]
    },
    {
      title: "AI & Machine Learning",
      description: "Integrating intelligent pipelines, LLM APIs, and vector retrieval into practical web applications.",
      skills: [
        { name: "Python", purpose: "Data extraction, scripting, AI library orchestration", highlight: true },
        { name: "LLM APIs & Prompting", purpose: "System prompts, structured JSON outputs, context engineering", highlight: true },
        { name: "RAG Architecture", purpose: "Document indexing, chunking, similarity search", highlight: true },
        { name: "LangChain", purpose: "Prompt chaining, retrieval QA chains, memory management" }
      ]
    },
    {
      title: "Tools & Workflow",
      description: "Professional development tooling for clean version control, debugging, and UI design.",
      skills: [
        { name: "Git & GitHub", purpose: "Branching strategies, pull requests, semantic versioning", highlight: true },
        { name: "VS Code", purpose: "Debugging, linting setups, workspace efficiency", highlight: true },
        { name: "Figma", purpose: "Wireframing, UI prototyping, responsive layout systems", highlight: true }
      ]
    }
  ] as SkillCategory[],

  timeline: [
    {
      id: "edu-1",
      role: "Bachelor of Engineering (B.E.) in Computer Science",
      organization: "Visvesvaraya Technological University (VTU)",
      location: "Karnataka, India",
      period: "2021 – 2025",
      type: "Education",
      description: [
        "Core coursework in Data Structures, Algorithms, Database Management Systems, Web Technologies, and Software Engineering.",
        "Led multiple academic project teams delivering responsive web applications and full-stack prototypes."
      ],
      skills: ["Data Structures", "Algorithms", "Web Technologies", "DBMS", "Software Engineering"]
    },
    {
      id: "intern-1",
      role: "Full-Stack Web Development Intern",
      organization: "Technology Solutions Lab",
      location: "Bengaluru, India (Hybrid)",
      period: "2024",
      type: "Experience",
      description: [
        "Developed reusable React components for customer-facing dashboards, improving interface responsiveness and component reusability.",
        "Collaborated with backend engineers to integrate RESTful API endpoints and validate request payloads.",
        "Implemented responsive design fixes across mobile, tablet, and desktop breakpoints."
      ],
      skills: ["React.js", "REST APIs", "Tailwind CSS", "Git", "Responsive UI"]
    },
    {
      id: "cert-1",
      role: "Full-Stack MERN Specialization",
      organization: "Industry Certified Curriculum",
      location: "Online / Verified",
      period: "2024",
      type: "Certification",
      description: [
        "Comprehensive deep dive into React architecture, Node.js server design, Express middleware, and MongoDB document database design.",
        "Built and deployed end-to-end full-stack applications with user authentication and CRUD operations."
      ],
      skills: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT Auth"]
    }
  ] as ExperienceItem[],

  services: [
    {
      title: "Full-Stack Web Applications",
      badge: "MERN Stack",
      description: "End-to-end web apps with scalable Node/Express backends, resilient MongoDB data models, and reactive React frontends.",
      deliverables: ["Custom REST API architecture", "Authentication & database modeling", "Clean component state management"]
    },
    {
      title: "Responsive Websites & Landing Pages",
      badge: "High Conversion",
      description: "Fast-loading, mobile-first websites tailored to convert visitors into clients with editorial aesthetics and flawless UX.",
      deliverables: ["Sub-second load times & SEO tags", "Fluid cross-device breakpoints", "Accessible WCAG-compliant markup"]
    },
    {
      title: "UI/UX Redesign & Optimization",
      badge: "UX Psychology",
      description: "Transforming clunky, dated interfaces into intuitive digital journeys guided by Hick's, Fitts's, and Gestalt design laws.",
      deliverables: ["UX audit & usability friction fixes", "Modern design system implementation", "Streamlined conversion funnels"]
    },
    {
      title: "AI Integration & Intelligent Chatbots",
      badge: "RAG & LLMs",
      description: "Connecting your business knowledge to modern LLM APIs and RAG pipelines for verified, citation-backed customer interactions.",
      deliverables: ["Vector retrieval setup", "Custom prompt engineering", "Adaptive persona & fallback guardrails"]
    }
  ]
};

