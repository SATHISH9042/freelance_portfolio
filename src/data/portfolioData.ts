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
  blogUrl?: string;
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
    name: "Sathish Rao S",
    role: "Full Stack Developer & AI Engineer",
    status: "Available for Software Engineering & Full Stack Roles",
    isAvailable: true,
    location: "Kumbakonam, Tamil Nadu, India",
    email: "sathishrao158@gmail.com",
    phone: "+91 9360142996",
    github: "https://github.com/SATHISH9042",
    linkedin: "https://www.linkedin.com/in/sathish-rao-50150b292",
    fiverr: "https://www.fiverr.com",
    shortBio: "B.Tech CSE (AI & ML) student and Full Stack Developer crafting responsive web applications, Django REST APIs, and production-oriented AI agents.",
    fullBio: [
      "I am a B.Tech Computer Science and Engineering (Artificial Intelligence & Machine Learning) student at Periyar Maniammai Institute of Science and Technology, Tamil Nadu, with hands-on experience in Python, Django, REST APIs, SQL, JavaScript, Git/GitHub, and AI-powered application development.",
      "During my Full Stack Development internship at VDart Pvt. Ltd., I developed and integrated REST APIs using Django, implemented server-side logic, connected backend components with relational databases, and debugged production workflows. At NxtWave, as a Teaching Assistant, I guided students through programming problems and clarified implementation approaches.",
      "My development focus combines solid software engineering fundamentals (OOP, Data Structures & Algorithms, SQL) with modern AI capabilities—including end-to-end RAG pipelines, Model Context Protocol (MCP) workflows with ElevenLabs and Twilio, and human-centered UI/UX design."
    ],
    values: [
      {
        title: "Clean, Maintainable Code",
        description: "Object-oriented programming, typed contracts, modular architecture, and structured backend services that scale reliably."
      },
      {
        title: "Responsive & Accessible Interfaces",
        description: "Mobile-first layouts, semantic DOM structure, and predictable user flows that reduce cognitive load across devices."
      },
      {
        title: "Intuitive User Journeys",
        description: "Applying cognitive psychology (Jakob's Law, Hick's Law, Miller's Law) to streamline navigation and simplify decision-making."
      },
      {
        title: "Clear Communication & Reliable Delivery",
        description: "Proven technical mentoring, clear documentation, Git collaboration, and proactive problem solving."
      },
      {
        title: "Continuous Learning & AI Integration",
        description: "Building production-oriented AI agents with LLMs, RAG, vector embeddings, and Model Context Protocol (MCP) integrations."
      }
    ]
  },

  projects: [
    {
      id: "college-chatbot",
      title: "RAG-Based College Information Assistant",
      subtitle: "Retrieval-augmented Q&A assistant for academic resources, circulars & regulations",
      category: "AI & LLMs",
      badge: "Featured AI Project",
      summary: "An AI-powered information assistant capable of answering student queries from college documents, FAQs, notices, and academic resources with grounded citations.",
      problem: "Students and applicants struggle to navigate fragmented college circulars, syllabus handbooks, and policy PDFs, creating repetitive administrative queries.",
      objective: "Build an end-to-end application combining information retrieval, backend processing, chunking, and LLM-based response generation with verified source grounding.",
      features: [
        "Implemented document processing, text extraction, chunking, embedding generation, and semantic retrieval",
        "Integrated retrieved context with an LLM to generate responses grounded in relevant source documents",
        "Implemented source/reference display and handling for unknown questions to improve response transparency",
        "Developed end-to-end application combining information retrieval, backend processing, and LLM-based generation",
        "Built responsive interactive UI with preset academic inquiries for immediate validation"
      ],
      techStack: [
        { name: "Python", category: "backend" },
        { name: "RAG", category: "ai" },
        { name: "Embeddings", category: "ai" },
        { name: "Semantic Search", category: "ai" },
        { name: "LLMs", category: "ai" }
      ],
      myContribution: "Engineered document extraction and chunking pipelines, implemented semantic similarity search with vector embeddings, integrated LLM context grounding, and designed response transparency cards.",
      liveUrl: "https://rag-college-chatbot-jade.vercel.app/",
      githubUrl: "https://github.com/SATHISH9042",
      isPersonalProject: true,
      accentColor: "#8B5CF6"
    },
    {
      id: "customer-support-agent",
      title: "Tech News Update Voice Agent",
      subtitle: "AI-powered voice agent workflow with ElevenLabs MCP, Twilio & outbound calling",
      category: "AI & LLMs",
      badge: "MCP & Automation Project",
      summary: "An AI-powered Tech News Update Voice Agent built using ElevenLabs, Model Context Protocol (MCP), and Twilio to deliver technology news updates through automated voice calls.",
      problem: "Traditional text feeds require manual reading and lack conversational immediacy for high-priority tech alerts and workflow notifications.",
      objective: "Implement an MCP-based workflow connecting AI models with external communication tools to generate and deliver technology news updates through voice calls.",
      features: [
        "Built an AI-powered Tech News Update Voice Agent using ElevenLabs MCP and Twilio",
        "Integrated AI-driven workflow components to generate and deliver technology news updates through voice calls",
        "Implemented an MCP-based workflow connecting AI models with external communication tools",
        "Successfully tested outbound AI-driven phone calls as part of the workflow automation project",
        "Explored multi-channel integrations involving email, LinkedIn automation, voice calls, and AI workflows"
      ],
      techStack: [
        { name: "MCP (Model Context Protocol)", category: "ai" },
        { name: "Python / AI Workflow", category: "backend" },
        { name: "ElevenLabs", category: "ai" },
        { name: "Twilio", category: "tool" },
        { name: "AI Agents", category: "ai" }
      ],
      myContribution: "Architected the MCP server integration, configured ElevenLabs speech synthesis and voice calling with Twilio webhooks, and implemented outbound calling pipeline orchestration.",
      liveUrl: "https://sathish9042.github.io/Voice_agent/",
      githubUrl: "https://github.com/SATHISH9042",
      isPersonalProject: true,
      accentColor: "#0066FF"
    },
    {
      id: "saffron-leaf",
      title: "Mobile Train-Booking Interface",
      subtitle: "High-usability mobile booking interface with cognitive-load reduction principles",
      category: "Frontend & UI/UX",
      badge: "UI/UX & Interaction Design",
      summary: "A mobile train-booking interface designed with strict focus on usability, information hierarchy, simplified navigation, and frictionless user flows.",
      problem: "Existing transport and booking systems suffer from confusing navigation, visual clutter, and overwhelming choices that lead to booking errors and cognitive fatigue.",
      objective: "Design a mobile train-booking interface applying UX psychology laws to reduce cognitive load and create predictable, pleasant user booking journeys.",
      features: [
        "Designed a mobile train-booking interface focused on usability, information hierarchy, and simplified navigation",
        "Created low-fidelity wireframes and a high-fidelity prototype in Figma",
        "Applied Jakob's Law, Hick's Law, and Miller's Law to improve navigation and reduce cognitive load",
        "Designed predictable user flows for a simplified booking experience with clear visual cues",
        "Structured step-by-step seat selection and ticket review interfaces with thumb-zone touch targets"
      ],
      techStack: [
        { name: "Figma", category: "tool" },
        { name: "UI/UX Design", category: "frontend" },
        { name: "Interaction Design", category: "frontend" },
        { name: "Wireframing", category: "tool" },
        { name: "Prototyping", category: "frontend" }
      ],
      myContribution: "Conducted usability research, designed low-fidelity wireframes and interactive high-fidelity prototypes in Figma, and applied cognitive psychology laws to optimize user flows.",
      blogUrl: "https://medium.com/@raos83421/designing-a-mobile-train-booking-interface-using-jakobs-hick-s-and-miller-s-laws-5853a325a8ef?sharedUserId=raos83421",
      githubUrl: "https://github.com/SATHISH9042",
      isPersonalProject: true,
      accentColor: "#F59E0B"
    },
    {
      id: "finance-tracker",
      title: "Personal Finance Tracker",
      subtitle: "Full-stack financial interface with transaction management & localStorage",
      category: "Full-Stack",
      badge: "Web Application Project",
      summary: "A responsive, privacy-first personal financial interface with transaction management, analytics, and instant client-side data persistence.",
      problem: "Users require lightweight, private tools to record expenditures and visualize month-over-month cash flow without clunky external server dependencies.",
      objective: "Build a responsive web application providing instant balance computation, categorized logging, and local data persistence.",
      features: [
        "Real-time balance computation showing total net worth, monthly income, and expense breakdown",
        "Quick transaction logger with customizable tags (Housing, Food, Investment, Utilities)",
        "Instant visual category distribution and breakdown pills",
        "Robust localStorage persistence layer ensuring privacy and offline availability",
        "Optimized responsive layouts with clean typographical hierarchy"
      ],
      techStack: [
        { name: "JavaScript", category: "frontend" },
        { name: "HTML5 & CSS3", category: "frontend" },
        { name: "Bootstrap / Tailwind", category: "frontend" },
        { name: "Web Storage API", category: "tool" },
        { name: "Responsive Design", category: "frontend" }
      ],
      myContribution: "Engineered the calculation engine, implemented input sanitation and localStorage state sync, and designed a responsive, accessible dashboard.",
      liveUrl: "https://sathish9042.github.io/Finance-Tracker/",
      githubUrl: "https://github.com/SATHISH9042",
      isPersonalProject: true,
      accentColor: "#10B981"
    },
    {
      id: "restaurant-website",
      title: "Saffron Leaf Contemporary Restaurant Website",
      subtitle: "High-conversion culinary website with interactive menus, filtering & table reservation",
      category: "Full-Stack",
      badge: "Full-Stack Web Application",
      summary: "A high-performance, full-stack restaurant web application featuring interactive culinary menus with dietary filters, dynamic order basket calculation, and an intuitive online reservation booking system.",
      problem: "Conventional restaurant websites suffer from static PDF menus, sluggish mobile experiences, and convoluted booking funnels that lose potential diners.",
      objective: "Create an ultra-responsive, visually rich full-stack dining application offering instantaneous menu browsing, real-time diet filtering, and a frictionless reservation flow.",
      features: [
        "Interactive culinary menu categorized into Starters, Mains, and Desserts with dietary filtering (Veg, Gluten-Free)",
        "Responsive, touch-friendly mobile layouts with optimized high-resolution culinary media",
        "Integrated online reservation booking system with instant time-slot, party-size, and date selection",
        "Dynamic order review basket displaying real-time bill calculations",
        "Fast initial page loads with 100% Core Web Vitals compliance and WCAG accessibility"
      ],
      techStack: [
        { name: "React", category: "frontend" },
        { name: "Node.js / Express", category: "backend" },
        { name: "REST APIs", category: "backend" },
        { name: "Tailwind CSS", category: "frontend" },
        { name: "Vercel", category: "tool" }
      ],
      myContribution: "Designed the visual hierarchy and interaction models, implemented the categorized menu with dynamic state filtering and full-stack reservation forms, and deployed the production release on Vercel.",
      liveUrl: "https://restaurant-website-chi-eosin.vercel.app/",
      githubUrl: "https://github.com/SATHISH9042",
      isPersonalProject: true,
      accentColor: "#E11D48"
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
      title: "Languages",
      description: "Core programming and querying languages for full-stack and analytical engineering.",
      skills: [
        { name: "Python", purpose: "Backend logic, AI workflows, scripting, automation", highlight: true },
        { name: "JavaScript", purpose: "Modern asynchronous DOM manipulation, event loop, dynamic UI", highlight: true },
        { name: "SQL", purpose: "Relational data querying, joins, schema operations", highlight: true }
      ]
    },
    {
      title: "Backend & APIs",
      description: "Developing robust server-side application logic and structured API layers.",
      skills: [
        { name: "Django", purpose: "REST framework, ORM models, authentication, backend services", highlight: true },
        { name: "REST APIs", purpose: "API design, endpoint integration, payload validation", highlight: true },
        { name: "API Integration", purpose: "Connecting external SaaS, communication & AI services", highlight: true },
        { name: "Server-Side Development", purpose: "Routing, database connectivity, error handling", highlight: true }
      ]
    },
    {
      title: "Frontend Engineering",
      description: "Crafting responsive, user-centered web interfaces with pixel precision.",
      skills: [
        { name: "HTML5 & CSS3", purpose: "Semantic structure, responsive styling, accessibility", highlight: true },
        { name: "DOM Manipulation", purpose: "Interactive client behaviors and dynamic state updates", highlight: true },
        { name: "Bootstrap", purpose: "Rapid responsive grid scaffolding and layout management" },
        { name: "Responsive Web Design", purpose: "Cross-device fluid breakpoints from mobile to desktop", highlight: true },
        { name: "React.js & Tailwind CSS", purpose: "Component-based architecture and utility design system" }
      ]
    },
    {
      title: "Databases & Storage",
      description: "Database modeling, data integrity, and high-performance querying.",
      skills: [
        { name: "MySQL", purpose: "Relational schema design, tables, queries, transactions", highlight: true },
        { name: "SQL", purpose: "Structured data operations and optimization", highlight: true },
        { name: "Relational Database Concepts", purpose: "Normalization, primary/foreign keys, ACID compliance", highlight: true }
      ]
    },
    {
      title: "AI / GenAI & Automation",
      description: "Building production-oriented AI agents and retrieval-augmented pipelines.",
      skills: [
        { name: "LLMs & Prompting", purpose: "Context orchestration, structured outputs, prompt engineering", highlight: true },
        { name: "RAG Architecture", purpose: "Document processing, chunking, grounded retrieval", highlight: true },
        { name: "Embeddings & Semantic Search", purpose: "Vector similarity matching, cosine distance, indexing", highlight: true },
        { name: "AI Agents", purpose: "Autonomous goal execution, tool use, conversational agents", highlight: true },
        { name: "Model Context Protocol (MCP)", purpose: "Standardized tool integration connecting models to tools (ElevenLabs, Twilio)", highlight: true }
      ]
    },
    {
      title: "Software Engineering & Tools",
      description: "Engineering methodologies, algorithms, and professional developer tooling.",
      skills: [
        { name: "OOP (Object-Oriented Programming)", purpose: "Modular class design, encapsulation, reusability", highlight: true },
        { name: "Data Structures & Algorithms", purpose: "Problem solving, computational complexity, clean logic", highlight: true },
        { name: "Debugging & Problem Solving", purpose: "Root-cause diagnosis, error tracing, fix verification", highlight: true },
        { name: "Git & GitHub", purpose: "Branching workflows, pull requests, version control", highlight: true },
        { name: "VS Code", purpose: "Integrated development, linting, debugging environment", highlight: true },
        { name: "Figma", purpose: "UI/UX wireframing, high-fidelity prototypes, design systems", highlight: true }
      ]
    }
  ] as SkillCategory[],

  timeline: [
    {
      id: "vdart-intern",
      role: "Full Stack Developer",
      organization: "VDart pvt.Ltd.",
      location: "Kumbakonam, Tamil Nadu, India",
      period: "Jun 2025 – Jul 2025",
      type: "Experience",
      description: [
        "Developed and integrated REST APIs using Django for web-based applications and backend services.",
        "Implemented server-side application logic and connected backend components with relational databases.",
        "Performed SQL-based data operations for database-driven application functionality.",
        "Debugged backend and application issues by identifying root causes and implementing fixes.",
        "Worked with Git for version control during frontend and backend development.",
        "Collaborated on application development tasks and translated functional requirements into working software components."
      ],
      skills: ["Django", "REST APIs", "SQL", "MySQL", "Git", "Python", "Backend Development"]
    },
    {
      id: "nxtwave-ta",
      role: "Teaching Assistant",
      organization: "Nxtwave",
      location: "Remote, India",
      period: "Aug 2025 – Jan 2026",
      type: "Experience",
      description: [
        "Assisted learners in understanding programming and software development concepts through practical explanations.",
        "Guided students through programming problems and debugging-related questions.",
        "Strengthened technical communication by explaining programming concepts clearly to learners with different levels of understanding.",
        "Collaborated with learners and peers to troubleshoot technical issues and clarify implementation approaches."
      ],
      skills: ["Python", "JavaScript", "Data Structures", "Debugging", "Technical Mentorship"]
    },
    {
      id: "pmist-btech",
      role: "B.Tech in Computer Science and Engineering (Artificial Intelligence & Machine Learning)",
      organization: "Periyar Maniammai Institute of Science and Technology",
      location: "Tamil Nadu, India",
      period: "Jul 2023 – Dec 2027",
      type: "Education",
      description: [
        "Pursuing B.Tech in CSE specializing in AI & Machine Learning with an 8.0 GPA academic standing.",
        "Core study in Object-Oriented Programming, Data Structures & Algorithms, Relational Database Concepts, and AI/GenAI architectures.",
        "Built academic and research applications including retrieval-augmented generation systems and voice-driven workflow automation."
      ],
      skills: ["AI & ML", "Python", "Data Structures & Algorithms", "SQL & DBMS", "8.0 GPA"]
    },
    {
      id: "cert-mcp",
      role: "Model Context Protocol (MCP) & MCP Project Certificate",
      organization: "NxtWave / CCBP 4.0 Academy",
      location: "Verified Credential",
      period: "Aug 2025 – 2025",
      type: "Certification",
      description: [
        "Certified in Anthropic's Model Context Protocol (MCP), connecting AI models with external tools, APIs, and voice systems.",
        "Built and successfully tested an end-to-end voice agent with ElevenLabs MCP and Twilio."
      ],
      skills: ["Model Context Protocol (MCP)", "AI Agents", "ElevenLabs", "Twilio", "Automation"]
    },
    {
      id: "cert-genai",
      role: "GenAI Buildathon",
      organization: "NxtWave × OpenAI Academy",
      location: "Academy Certification",
      period: "2025",
      type: "Certification",
      description: [
        "Hands-on building of generative AI applications utilizing modern LLMs, embeddings, and prompt orchestration in intensive academy sprint."
      ],
      skills: ["GenAI", "LLMs", "Embeddings", "Semantic Search", "Prompt Engineering"]
    },
    {
      id: "cert-dynamic-web",
      role: "Build Your Dynamic Web Application (JavaScript)",
      organization: "NxtWave",
      location: "Verified Credential",
      period: "Sep 2025",
      type: "Certification",
      description: [
        "Engineered dynamic web interfaces manipulating the DOM, asynchronous event handling, and API integrations with JavaScript."
      ],
      skills: ["JavaScript", "DOM Manipulation", "REST APIs", "Dynamic Web Apps"]
    },
    {
      id: "cert-python",
      role: "Programming Foundations with Python",
      organization: "NxtWave / CCBP 4.0 Academy",
      location: "Verified Credential",
      period: "2025",
      type: "Certification",
      description: [
        "Mastered foundational programming paradigms, algorithmic problem solving, functions, and structured data handling in Python."
      ],
      skills: ["Python", "Algorithms", "Problem Solving", "Data Structures"]
    },
    {
      id: "cert-sql",
      role: "Introduction to Database (SQL)",
      organization: "NxtWave",
      location: "Verified Credential",
      period: "Apr 2026",
      type: "Certification",
      description: [
        "Relational database design, querying, joins, transactions, and relational database concepts."
      ],
      skills: ["SQL", "MySQL", "Relational Database Concepts"]
    }
  ] as ExperienceItem[],

  services: [
    {
      title: "Full-Stack Web Applications",
      badge: "Python & Django",
      description: "End-to-end web apps with scalable Django REST APIs, relational SQL database architecture, and responsive frontends.",
      deliverables: ["Custom REST API architecture", "Relational database modeling & optimization", "Clean component state management"]
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

