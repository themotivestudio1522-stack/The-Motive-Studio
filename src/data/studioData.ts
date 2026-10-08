export interface ServiceItem {
  id: string;
  number: string;
  symbol: string;
  title: string;
  category: 'animation' | 'video' | 'design' | 'web' | 'growth';
  description: string;
  deliverables: string[];
  timeline: string;
  keyMetric: string;
}

export interface ReviewItem {
  id: string;
  clientName: string;
  clientRole: string;
  company: string;
  rating: number;
  reviewText: string;
  projectDelivered: string;
  date: string;
  avatarUrl?: string;
  verified: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Brand Identity' | 'Website Design' | 'UI/UX Design' | 'Motion Design';
  client: string;
  year: string;
  image: string;
  summary: string;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[];
  deliverables: string[];
  technologies: string[];
  driveUrl?: string;
  driveFolderTitle?: string;
}

export interface StudioDrivePortfolio {
  id: string;
  title: string;
  category: string;
  url: string;
  description: string;
  fileTypes: string;
}

export const STUDIO_DRIVE_PORTFOLIOS: StudioDrivePortfolio[] = [
  {
    id: 'master-archive',
    title: 'Master Studio Archive',
    category: 'All 50+ Design Categories',
    url: 'https://drive.google.com/drive/folders/1lQRNikZqauoSauelA4HnizeuOJos5RET?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto',
    description: 'Comprehensive repository including Brand Guidelines, Packaging, Posters, Ebooks, Social Suites, and full client deliveries.',
    fileTypes: 'Figma, Vector AI, 4K Renders, PDFs, Production Files'
  },
  {
    id: 'animations-video',
    title: 'Animations & Video Motion',
    category: 'Motion Design & CGI',
    url: 'https://drive.google.com/drive/folders/17MhPKC28xcSzgSNxKmtlUx-7G4sSxwLC?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto',
    description: '3D CGI product renders, dynamic camera loops, 2D kinetic typography, Reels, and high-impact commercial video cuts.',
    fileTypes: '4K MP4, ProRes, Blender/Octane Renders, Lottie JSON'
  },
  {
    id: 'ui-ux-digital',
    title: 'UI/UX, SaaS & Mobile Apps',
    category: 'Digital Products & Web',
    url: 'https://drive.google.com/drive/folders/1oNbT1oDarigVI8ct_0-N_CgYilWREhtU?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto',
    description: 'Figma design systems, mobile app iOS/Android screens, SaaS dashboard wireframes, and conversion-focused web layouts.',
    fileTypes: 'Figma Files, Interactive Prototypes, Design Tokens'
  },
  {
    id: 'graphics-brand',
    title: 'Graphics, Identity & Print',
    category: 'Brand Identity & Visuals',
    url: 'https://drive.google.com/drive/folders/1QW5eBu9DmLPwA94n4a71E9x4OWTTGqgX?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto',
    description: 'Brand identity manuals, vector logomarks, typography rules, luxury packaging specs, and collateral production suites.',
    fileTypes: 'Vector SVG/EPS, High-Res Print PDFs, Styleguides'
  }
];

export interface LeaderItem {
  id: string;
  name: string;
  role: string;
  title: string;
  bio: string;
  responsibilities: string[];
  initials: string;
  email: string;
  quote: string;
}

export const LEADERSHIP_DATA: LeaderItem[] = [
  {
    id: 'eman-tariq',
    name: 'Eman Tariq',
    role: 'CEO',
    title: 'Chief Executive Officer',
    bio: 'Directs strategic vision, global venture partnerships, and high-impact commercial growth for The Motive Studio. Spearheading brand positioning and enterprise digital transformations across international markets.',
    responsibilities: ['Executive Studio Direction', 'Commercial Strategy & Growth', 'Client Partnerships & M&A', 'Enterprise Brand Positioning'],
    initials: 'ET',
    email: 'eman@themotivestudio.com',
    quote: 'True creative excellence isn’t decorative—it is the ultimate commercial differentiator.'
  },
  {
    id: 'zara-amin-khan',
    name: 'Zara Amin Khan',
    role: 'Co-Founder',
    title: 'Co-Founder & Creative Director',
    bio: 'Leads aesthetic architecture, design systems, cinematic 3D motion, and full-stack digital product design. Curating every typography choice, visual rhythm, and immersive user experience with surgical precision.',
    responsibilities: ['Brand Architecture & Systems', '3D Motion & Video Direction', 'UI/UX & Product Design', 'Creative Quality Assurance'],
    initials: 'ZK',
    email: 'zara@themotivestudio.com',
    quote: 'We engineer digital artifacts and visual languages built to be remembered for decades.'
  }
];

export interface ProcessItem {
  number: string;
  title: string;
  tagline: string;
  description: string;
  activities: string[];
  duration: string;
}

export interface ArticleItem {
  id: string;
  category: string;
  title: string;
  readTime: string;
  date: string;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
}

export interface EbookChapter {
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  highlights: string[];
}

export interface EbookData {
  title: string;
  subtitle: string;
  badge: string;
  coverImage: string;
  description: string;
  pageCount: string;
  format: string;
  downloadCount: string;
  rating: string;
  chapters: EbookChapter[];
  authorNote: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'branding',
    number: '01',
    symbol: '◈',
    title: 'Brand Strategy & Identity',
    category: 'design',
    description: 'Distinctive visual identities, logo architecture, typography, color palettes, and comprehensive brand guidelines.',
    deliverables: ['Primary & Secondary Logomarks', 'Brand Architecture & Voice', 'Design Tokens & Styleguide', 'Stationery & Collateral Suite'],
    timeline: '3 - 5 weeks',
    keyMetric: '100% Trademark Ready'
  },
  {
    id: 'website-design',
    number: '02',
    symbol: '↗',
    title: 'Website Design',
    category: 'web',
    description: 'Modern, conversion-focused websites meticulously designed around your target audience and commercial goals.',
    deliverables: ['Wireframing & IA Planning', 'High-Fidelity UI Layouts', 'Interactive Prototypes', 'Responsive Layout Systems'],
    timeline: '3 - 6 weeks',
    keyMetric: '+140% Conversion Uplift'
  },
  {
    id: 'web-development',
    number: '03',
    symbol: '◉',
    title: 'Web Engineering & Full-Stack',
    category: 'web',
    description: 'Fast, secure, and responsive web applications built with clean modern architecture and headless CMS.',
    deliverables: ['Full-Stack Web Engineering', 'Headless CMS Integration', 'Next-Gen Speed (99+ Lighthouse)', 'API & Database Integration'],
    timeline: '4 - 8 weeks',
    keyMetric: '<0.8s Load Time'
  },
  {
    id: 'ui-ux-design',
    number: '04',
    symbol: '⌘',
    title: 'UI/UX Product Design',
    category: 'design',
    description: 'Clean interfaces and intuitive customer experiences engineered for modern SaaS, mobile apps, and dashboards.',
    deliverables: ['User Flow & Journey Mapping', 'Figma Design System (100+ Components)', 'Usability Auditing', 'Dev Handoff Specifications'],
    timeline: '4 - 8 weeks',
    keyMetric: '3.4x Task Efficiency'
  },
  {
    id: 'animation-2d',
    number: '05',
    symbol: '◎',
    title: '2D Animation & Motion Graphics',
    category: 'animation',
    description: 'Bespoke 2D character animation, kinetic typography, explainer videos, and smooth Lottie web assets.',
    deliverables: ['2D Character Animation', 'Kinetic Typography & Storyboards', 'Lottie / JSON Web Optimizations', 'Product Explainer Sequences'],
    timeline: '2 - 3 weeks',
    keyMetric: '60 FPS Smooth Playback'
  },
  {
    id: 'animation-3d',
    number: '06',
    symbol: '◬',
    title: '3D Animation & CGI',
    category: 'animation',
    description: 'Photorealistic 3D product renders, dynamic spatial CGI loops, lighting simulations, and broadcast assets.',
    deliverables: ['3D Product Photoreal Renders', 'Cinematic Camera Loops', 'CGI Lighting & Shading', 'Octane / Blender Web Assets'],
    timeline: '3 - 5 weeks',
    keyMetric: '4K Ultra HD Precision'
  },
  {
    id: 'video-editing',
    number: '07',
    symbol: '▶',
    title: 'Video Editing & Post-Production',
    category: 'video',
    description: 'High-impact commercial video cuts, brand documentaries, color grading, sound design, and rhythm pacing.',
    deliverables: ['Commercial & Brand Cuts', 'Color Grading & Audio Master', 'Multi-Cam Editing & Pacing', 'Sound Effects & Score Sync'],
    timeline: '1 - 3 weeks',
    keyMetric: '+220% Viewer Retention'
  },
  {
    id: 'reels-shorts',
    number: '08',
    symbol: '⚡',
    title: 'Reels & Viral Short-Form Content',
    category: 'video',
    description: 'High-retention vertical videos engineered for Instagram Reels, TikTok, and YouTube Shorts with dynamic captions.',
    deliverables: ['Viral Hook Scripting & Pacing', 'Dynamic Captions & Sound FX', 'Vertical 9:16 Visual Edits', 'Batch Content Production'],
    timeline: '3 - 5 days turnaround',
    keyMetric: '3.8x Organic Reach'
  },
  {
    id: 'ebook-publishing',
    number: '09',
    symbol: '📖',
    title: 'Ebook Design & Publishing Systems',
    category: 'design',
    description: 'Executive publication design, 3D digital book mockups, typesetting, interactive PDFs, and lead-magnet funnels.',
    deliverables: ['Custom 3D Cover Design', 'Editorial Typesetting & Grid', 'Interactive Clickable PDFs', 'Promotional Social Graphics'],
    timeline: '1 - 2 weeks',
    keyMetric: '+185% Download Rate'
  },
  {
    id: 'digital-marketing',
    number: '10',
    symbol: '✦',
    title: 'Digital Marketing & Growth',
    category: 'growth',
    description: 'Multi-channel acquisition strategies, paid media funnels, SEO authority, and customer retention systems.',
    deliverables: ['Performance Ad Campaigns', 'Multi-Channel Strategy', 'SEO & Search Engine Domination', 'Conversion Rate Optimization (CRO)'],
    timeline: 'Ongoing or 4-week sprints',
    keyMetric: '+165% Average ROAS'
  },
  {
    id: 'brand-identity',
    number: '11',
    symbol: 'M',
    title: 'Brand Collateral & Packaging',
    category: 'design',
    description: 'Physical packaging architecture, luxury print finishes, business suites, and tangible unboxing experiences.',
    deliverables: ['Packaging Box Architecture', 'Print & Foil Finish Specs', 'Merchandise & Apparel Systems', 'Retail Display Guidelines'],
    timeline: '3 - 5 weeks',
    keyMetric: 'Zero Manufacturing Defects'
  },
  {
    id: 'data-solutions',
    number: '12',
    symbol: '▦',
    title: 'Data Solutions & Pipeline Cleansing',
    category: 'growth',
    description: 'Accurate data organization, pipeline normalization, CRM cleansing, and structured analytics dashboards.',
    deliverables: ['Data Ingestion & Normalization', 'CRM & Catalog Cleansing', 'Automated Verification Workflows', 'Structured Business Intelligence'],
    timeline: '2 - 4 weeks',
    keyMetric: '99.9% Data Precision'
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'project-one',
    title: 'Aetheria Luxury Goods',
    category: 'Brand Identity',
    client: 'Aetheria Maison Ltd.',
    year: '2025',
    image: '/src/assets/images/work_brand_identity_1791206325232.jpg',
    summary: 'A refined brand identity and luxury tactile packaging system for a global artisanal atelier.',
    challenge: 'Aetheria needed to shift from boutique regional artisan to an international luxury contender without sacrificing its heritage craftsmanship.',
    solution: 'We engineered a monolithic geometric monogram, warm limestone packaging palette, bespoke typography hierarchy, and a strict 120-page brand governance system.',
    metrics: [
      { label: 'International Retail Expansion', value: '+210%' },
      { label: 'Average Order Value', value: '+$185' },
      { label: 'Editorial Brand Recognition', value: '94%' }
    ],
    deliverables: ['Primary Brand Identity', 'Packaging & Box Architecture', 'Brand Standards Book', 'E-Commerce Visual System'],
    technologies: ['Figma', 'Illustrator', 'Cinema 4D', 'Custom Typography'],
    driveUrl: 'https://drive.google.com/drive/folders/1QW5eBu9DmLPwA94n4a71E9x4OWTTGqgX?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto',
    driveFolderTitle: 'Graphics, Brand Identity & Packaging Drive Portfolio'
  },
  {
    id: 'project-two',
    title: 'Vanguard Architecture Platform',
    category: 'Website Design',
    client: 'Vanguard Spatial Studio',
    year: '2025',
    image: '/src/assets/images/work_web_design_1791206342441.jpg',
    summary: 'A high-performance digital portfolio showcasing architectural monuments with micro-interactions.',
    challenge: 'Architectural imagery was loading slowly, and previous site architecture failed to convey the monumental scale of Vanguard commercial builds.',
    solution: 'Engineered an ultra-fast web presence featuring spatial grid transitions, high-fidelity responsive imagery, dark brutalist layouts, and automated project inquiry funnels.',
    metrics: [
      { label: 'Commercial RFPs Received', value: '+142%' },
      { label: 'Page Load Speed', value: '0.68s' },
      { label: 'Average Session Duration', value: '4m 12s' }
    ],
    deliverables: ['Information Architecture', 'Desktop & Mobile UI Design', 'Interactive Prototype', 'Full-Stack Deployment'],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Three.js'],
    driveUrl: 'https://drive.google.com/drive/folders/1oNbT1oDarigVI8ct_0-N_CgYilWREhtU?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto',
    driveFolderTitle: 'UI/UX, SaaS & Website Design Drive Portfolio'
  },
  {
    id: 'project-three',
    title: 'Pulse Capital Operating System',
    category: 'UI/UX Design',
    client: 'Pulse Financial Technologies',
    year: '2026',
    image: '/src/assets/images/work_mobile_ux_1791206356005.jpg',
    summary: 'A frictionless mobile and tablet treasury management dashboard for high-growth venture founders.',
    challenge: 'Institutional treasury workflows were fragmented across multiple slow banking legacy portals with poor mobile visibility.',
    solution: 'Constructed an intuitive single-pane cockpit with instant liquidity switching, biometric approvals, tabular numeric telemetry, and zero latency.',
    metrics: [
      { label: 'Transaction Speed', value: '3.2x Faster' },
      { label: 'App Store Rating', value: '4.9 / 5' },
      { label: 'Assets Administered', value: '$840M+' }
    ],
    deliverables: ['Design System (140+ components)', 'Mobile iOS/Android App UX', 'Tablet Cockpit Wireframes', 'Design Tokens'],
    technologies: ['Figma', 'Design Tokens', 'SwiftUI Spec', 'React Native'],
    driveUrl: 'https://drive.google.com/drive/folders/1oNbT1oDarigVI8ct_0-N_CgYilWREhtU?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto',
    driveFolderTitle: 'UI/UX, SaaS & Mobile Apps Drive Portfolio'
  },
  {
    id: 'project-four',
    title: 'Kinesis Motion & Brand Narrative',
    category: 'Motion Design',
    client: 'Kinesis Robotics Lab',
    year: '2026',
    image: '/src/assets/images/work_motion_3d_1791206372762.jpg',
    summary: 'A cinematic 3D motion package and interactive kinetic identity for autonomous robotics systems.',
    challenge: 'Explaining complex robotic kinematic joints and proprietary sensors to enterprise buyers required arresting visual metaphors.',
    solution: 'Crafted fluid 3D geometric visual loops with dynamic cobalt lighting, sound-designed product teasers, and web-ready 60fps Lottie animations.',
    metrics: [
      { label: 'Series A Capital Raised', value: '$14.5M' },
      { label: 'Social Showreel Views', value: '1.2M+' },
      { label: 'Enterprise Inbound Leads', value: '+88%' }
    ],
    deliverables: ['3D Hero Motion Loop', 'Kinetic Brand Guidelines', 'Lottie Web Assets', 'Keynote & Investor Showreel'],
    technologies: ['Blender 3D', 'After Effects', 'Lottie', 'Octane Render'],
    driveUrl: 'https://drive.google.com/drive/folders/17MhPKC28xcSzgSNxKmtlUx-7G4sSxwLC?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto',
    driveFolderTitle: 'Animations & Video Motion Drive Portfolio'
  },
  {
    id: 'project-five',
    title: 'Aura Haute Parfumerie & Packaging',
    category: 'Brand Identity',
    client: 'Aura Fragrance House',
    year: '2025',
    image: '/src/assets/images/work_brand_identity_1791206325232.jpg',
    summary: 'End-to-end luxury identity, custom debossed flacon packaging, retail boutique signage, and unboxing guidelines.',
    challenge: 'Emerging fragrance brand needed to compete with Parisian heritage houses in luxury department stores.',
    solution: 'Developed a gold-leaf foil monogram system, sustainable weighted bottle boxes, and tactile retail POS materials.',
    metrics: [
      { label: 'Department Store Distribution', value: '38 Doors' },
      { label: 'Packaging Award', value: 'Gold Winner' },
      { label: 'Unboxing Engagement', value: '+340%' }
    ],
    deliverables: ['Debossed Box Architecture', 'Foil Stamp Specifications', 'Retail POS Signage', 'Typography Standards'],
    technologies: ['Adobe Illustrator', 'InDesign', 'Cinema 4D Renders'],
    driveUrl: 'https://drive.google.com/drive/folders/1QW5eBu9DmLPwA94n4a71E9x4OWTTGqgX?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto',
    driveFolderTitle: 'Graphics, Brand Identity & Packaging Drive Portfolio'
  },
  {
    id: 'project-six',
    title: 'Synapse 3D Commercial Motion Reel',
    category: 'Motion Design',
    client: 'Synapse Hardware Systems',
    year: '2026',
    image: '/src/assets/images/work_motion_3d_1791206372762.jpg',
    summary: 'Commercial 3D product explosion animations, dynamic camera fly-throughs, and multi-format short video reels.',
    challenge: 'Demonstrating internal thermal dissipation in consumer electronic hardware during launch keynotes.',
    solution: 'Engineered photorealistic volumetric particle simulations and precision CAD-to-Octane renders timed to custom sonic scoring.',
    metrics: [
      { label: 'Video CTR on Social Ads', value: '4.8%' },
      { label: 'Launch Day Units Sold', value: '18,500+' },
      { label: 'Audience Retention Rate', value: '82%' }
    ],
    deliverables: ['4K Product Commercial', 'Exploded Axonometric Renders', 'Social Reels & Shorts', 'Exhibition Video Loops'],
    technologies: ['Octane Render', 'Blender', 'DaVinci Resolve', 'After Effects'],
    driveUrl: 'https://drive.google.com/drive/folders/17MhPKC28xcSzgSNxKmtlUx-7G4sSxwLC?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto',
    driveFolderTitle: 'Animations & Video Motion Drive Portfolio'
  },
  {
    id: 'project-seven',
    title: 'Apex Cloud Developer Console',
    category: 'Website Design',
    client: 'Apex Distributed Cloud',
    year: '2026',
    image: '/src/assets/images/work_web_design_1791206342441.jpg',
    summary: 'Dark-mode marketing site and interactive documentation hub built for developers and infrastructure leads.',
    challenge: 'Developers were bouncing off dense text documentation without discovering the core cloud orchestration features.',
    solution: 'Built interactive code sandboxes, live terminal demos, syntax-highlighted guides, and instant deploy buttons.',
    metrics: [
      { label: 'Developer Signups', value: '+195%' },
      { label: 'Time to First API Call', value: '2.4 mins' },
      { label: 'Lighthouse Performance', value: '99/100' }
    ],
    deliverables: ['Interactive Code Demos', 'Documentation Architecture', 'Tailwind Design System', 'Responsive Marketing Pages'],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    driveUrl: 'https://drive.google.com/drive/folders/1oNbT1oDarigVI8ct_0-N_CgYilWREhtU?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto',
    driveFolderTitle: 'UI/UX, SaaS & Website Design Drive Portfolio'
  },
  {
    id: 'project-eight',
    title: 'Nova Mobile Banking Experience',
    category: 'UI/UX Design',
    client: 'Nova Neo-Bank',
    year: '2025',
    image: '/src/assets/images/work_mobile_ux_1791206356005.jpg',
    summary: 'Next-gen iOS and Android consumer mobile banking application with instant peer-to-peer transfers.',
    challenge: 'Gen-Z and millennial users found traditional banking apps clinical, intimidating, and tedious to navigate.',
    solution: 'Designed fluid gesture navigation, haptic confirmation feedback, personalized card themes, and gamified savings pockets.',
    metrics: [
      { label: 'Daily Active Users (DAU)', value: '340K+' },
      { label: 'Onboarding Completion', value: '96.4%' },
      { label: 'App Store Rating', value: '4.9 ★' }
    ],
    deliverables: ['iOS / Android Figma Screens', 'Micro-interaction Prototypes', 'Full Design Token Library', 'User Testing Research'],
    technologies: ['Figma', 'Protopie', 'Design Tokens', 'iOS Human Interface Guidelines'],
    driveUrl: 'https://drive.google.com/drive/folders/1oNbT1oDarigVI8ct_0-N_CgYilWREhtU?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto',
    driveFolderTitle: 'UI/UX, SaaS & Mobile Apps Drive Portfolio'
  }
];

export const PROCESS_DATA: ProcessItem[] = [
  {
    number: '01',
    title: 'Discover',
    tagline: 'Deep diagnosis before prescription',
    description: 'We immerse ourselves in your business ecosystem, interviewing stakeholders, auditing competitors, and analyzing audience frictions.',
    activities: ['Competitive positioning matrix', 'User persona & journey mapping', 'Technical stack audit', 'Scope & timeline alignment'],
    duration: 'Week 1'
  },
  {
    number: '02',
    title: 'Strategy',
    tagline: 'Formulating the unfair competitive advantage',
    description: 'We define the singular value proposition and creative thesis that will elevate your brand from noise to benchmark.',
    activities: ['Creative direction moodboards', 'Information architecture & wireframes', 'Design principles definition', 'Strategic milestone roadmapping'],
    duration: 'Week 2'
  },
  {
    number: '03',
    title: 'Create',
    tagline: 'Relentless craftsmanship in design and code',
    description: 'Our senior designers and engineers craft pixel-perfect interfaces, brand identities, and robust codebases iteratively.',
    activities: ['High-fidelity design sprints', 'Full-stack frontend development', 'Kinetic motion and micro-interactions', 'Continuous weekly preview staging'],
    duration: 'Weeks 3 - 6'
  },
  {
    number: '04',
    title: 'Launch',
    tagline: 'Flawless release and ongoing acceleration',
    description: 'We orchestrate end-to-end deployment, rigorous cross-device QA, speed optimization, and launch support.',
    activities: ['Cross-browser & mobile stress testing', 'Lighthouse 95+ speed tuning', 'SEO & DNS domain cutover', 'Post-launch 30-day warranty & growth plan'],
    duration: 'Weeks 7+'
  }
];

export const ARTICLES_DATA: ArticleItem[] = [
  {
    id: 'strong-branding',
    category: 'Branding',
    title: 'Why strong branding matters for modern businesses',
    readTime: '5 min read',
    date: 'February 2026',
    excerpt: 'A strong brand creates recognition, trust and long-term pricing power in crowded digital markets.',
    content: [
      'In a hyper-saturated digital economy where technology stacks are commoditized and competitors can replicate features overnight, your brand identity is your only defensible moat.',
      'Branding is not merely a logo or color palette; it is the emotional residual left in a customer\'s mind after every interaction with your business. Premium companies command 40% higher margins not because their underlying materials are vastly superior, but because their brand signals certainty and prestige.',
      'When you invest in cohesive typography, deliberate spatial design, and an authoritative voice, you eliminate consumer friction. Ambitious companies do not compete on price—they compete on perception and trust.'
    ],
    keyTakeaways: [
      'Visual consistency across touchpoints increases revenue up to 23%',
      'Distinctive brand codes create instant neurological shortcuts for buyers',
      'Strategic branding allows premium pricing without customer resistance'
    ]
  },
  {
    id: 'ui-ux-design',
    category: 'UI/UX',
    title: 'Designing digital experiences people actually enjoy',
    readTime: '4 min read',
    date: 'January 2026',
    excerpt: 'Great UX is about making complex things feel simple, respectful of attention, and effortlessly intuitive.',
    content: [
      'Every unnecessary click, ambiguous label, or sluggish micro-interaction is a micro-tax on your user’s cognitive load. The best interfaces feel almost invisible—the user accomplishes their objective without consciously deciphering the UI.',
      'Modern UX design balances visual restraint with tactile feedback. By maintaining strict typographic scales, tabular numerals for financial data, and compositor-only micro-animations under 200ms, products feel fast, trustworthy, and pleasant.',
      'Respecting user attention means eliminating deceptive dark patterns, aggressive popups, and nested card clutter. Clean whitespace and intentional hierarchy always outperform decorative noise.'
    ],
    keyTakeaways: [
      'Sub-200ms interaction feedback makes interfaces feel natively responsive',
      'Zero-pill metadata discipline keeps focus strictly on actionable data',
      'Information architecture must mirror the user’s mental model, not your org chart'
    ]
  },
  {
    id: 'creative-growth',
    category: 'Growth',
    title: 'Creative design as an unfair growth strategy',
    readTime: '6 min read',
    date: 'March 2026',
    excerpt: 'Design is not cosmetic decoration—it is a quantitative lever for conversion, customer lifetime value, and brand equity.',
    content: [
      'Marketing teams frequently spend six figures on performance ad spend while sending traffic to underperforming, generic landing pages that bleed high-intent prospects.',
      'Creative direction and engineering are direct growth levers. When a landing page communicates value in under 3 seconds with undeniable aesthetic authority, your cost per acquisition plummets.',
      'At The Motive Studio, we bridge the gap between artistic ambition and commercial execution. Every animation, headline balance, and layout structure is engineered to guide the visitor towards a definitive high-value conversion.'
    ],
    keyTakeaways: [
      'High-credibility aesthetic directly reduces paid customer acquisition costs',
      'Clear, unencumbered value propositions double above-the-fold engagement',
      'Conversion optimization must be baked into typography and contrast from day one'
    ]
  }
];

export const EBOOK_DEFAULT_DATA: EbookData = {
  title: 'THE MOTIVE PLAYBOOK',
  subtitle: 'Brand & Digital Mastery for Ambitious Teams',
  badge: 'Free Comprehensive Guide · 2026 Edition',
  coverImage: '/src/assets/images/motive_ebook_cover_1791222239342.jpg',
  description: 'The definitive executive field guide on how high-growth businesses turn strategic positioning, sub-second UI/UX performance, and kinetic brand systems into durable market leadership.',
  pageCount: '48 Pages',
  format: 'PDF + Interactive Notion Checklist',
  downloadCount: '2,400+ Founders & CMOs',
  rating: '4.95 / 5',
  authorNote: 'Curated by The Motive Studio principal directors based on 65+ deployed brand and web ecosystems.',
  chapters: [
    {
      number: '01',
      title: 'The Neurological Brand Moat',
      subtitle: 'Why positioning beats price wars every time',
      summary: 'How to build unmistakable visual and verbal brand codes that command 30-40% pricing premiums and build defensibility against commoditization.',
      highlights: [
        'The 4 components of defensible brand architecture',
        'Typography and chromatic psychology for B2B & Luxury',
        'How to conduct an internal positioning stress test'
      ]
    },
    {
      number: '02',
      title: 'Sub-Second UI/UX Engineering',
      subtitle: 'Eliminating the invisible micro-taxes on cognitive load',
      summary: 'Detailed interaction formulas, zero-pill metadata discipline, and typography hierarchies that elevate conversion rates above industry baselines.',
      highlights: [
        'The 200ms interaction latency threshold rule',
        'Information architecture designed around mental models',
        'Avoiding AI-slop design pitfalls and generic card clutter'
      ]
    },
    {
      number: '03',
      title: 'Kinetic Identity & 3D Brand Systems',
      subtitle: 'Moving visuals that communicate enterprise credibility',
      summary: 'Deploying micro-animations, 3D product narratives, and Lottie assets to captivate investors and enterprise buyers in under 3 seconds.',
      highlights: [
        'Compositor-only animation performance benchmarks',
        '60 FPS web optimization for complex 3D assets',
        'Bridging the gap between cinema-grade craft and load speed'
      ]
    },
    {
      number: '04',
      title: 'Full-Funnel Conversion Architecture',
      subtitle: 'Turning cold organic and paid traffic into retained accounts',
      summary: 'Engineering seamless lead-capture funnels, transparent scope calculators, and onboarding journeys that compound lifetime value.',
      highlights: [
        'Above-the-fold value proposition formulas',
        'Dynamic qualification and frictionless contact desks',
        'Post-launch CRO analytics and continuous testing matrix'
      ]
    }
  ]
};

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    clientName: 'Marcus Vance',
    clientRole: 'Co-Founder & CEO',
    company: 'Kinesis Robotics Lab',
    rating: 5,
    projectDelivered: '3D CGI Product Animation & Showreel',
    date: 'February 2026',
    reviewText: 'The Motive Studio transformed our robotic hardware into cinema-grade 3D kinetic visuals. Their 3D animation loop directly helped us close our $14.5M Series A round. Unbelievable attention to lighting, physics, and pacing.',
    verified: true
  },
  {
    id: 'rev-2',
    clientName: 'Elena Rostova',
    clientRole: 'Head of Growth & Creative',
    company: 'Luminary Media Group',
    rating: 5,
    projectDelivered: 'Viral Reels & Short-Form Production',
    date: 'January 2026',
    reviewText: 'We contracted The Motive for batch Instagram Reels and TikTok video editing. Our organic reach surged 3.8x within 30 days. The hook pacing, kinetic captions, and sound design are in a league of their own.',
    verified: true
  },
  {
    id: 'rev-3',
    clientName: 'Julian Sterling',
    clientRole: 'Managing Director',
    company: 'Aetheria Maison Ltd.',
    rating: 5,
    projectDelivered: 'Brand Identity & Luxury Ebook Design',
    date: 'March 2026',
    reviewText: 'From our primary brand identity to the 48-page executive publication, The Motive Studio delivered immaculate craftsmanship. Our average order value rose by $185 following the brand relaunch.',
    verified: true
  },
  {
    id: 'rev-4',
    clientName: 'Sarah Lin',
    clientRole: 'VP of Product',
    company: 'Pulse Financial Technologies',
    rating: 5,
    projectDelivered: 'UI/UX Design System & 2D Motion Graphics',
    date: 'January 2026',
    reviewText: 'Their 2D animation explainer and Figma design system eliminated months of engineering rework. The interactions feel native, fast, and utterly premium. Highly recommended.',
    verified: true
  },
  {
    id: 'rev-5',
    clientName: 'David Kelling',
    clientRole: 'Creative Director',
    company: 'Vanguard Spatial Studio',
    rating: 5,
    projectDelivered: 'Commercial Video Editing & Web Experience',
    date: 'December 2025',
    reviewText: 'Fast turnaround, zero corporate fluff, and direct collaboration with their lead creative director. Our architectural commercial cuts received multiple industry accolades.',
    verified: true
  }
];


