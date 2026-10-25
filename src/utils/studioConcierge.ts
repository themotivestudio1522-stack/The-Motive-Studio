/**
 * The Motive Studio Intelligent Concierge Engine
 * Grounded in official studio offerings, leadership, pricing, deliverables, and portfolio archives.
 */

export interface ConciergeAction {
  label: string;
  action: string;
  href?: string;
}

export interface ConciergeResponse {
  reply: string;
  actions?: ConciergeAction[];
}

export interface ConversationHistoryItem {
  sender: 'user' | 'bot';
  text: string;
}

export function generateStudioConciergeResponse(
  userQuery: string,
  history: ConversationHistoryItem[] = []
): ConciergeResponse {
  const q = userQuery.toLowerCase().trim();

  // Inspect recent user context from previous messages
  const recentUserTexts = history
    .filter((h) => h.sender === 'user')
    .slice(-3)
    .map((h) => h.text.toLowerCase())
    .join(' ');

  // 1. GREETINGS & HELLOS
  if (
    q === 'hi' ||
    q === 'hello' ||
    q === 'hey' ||
    q === 'salam' ||
    q === 'assalam o alaikum' ||
    q.startsWith('good morning') ||
    q.startsWith('good evening') ||
    q.startsWith('good afternoon') ||
    q === 'anyone there' ||
    q === 'start'
  ) {
    return {
      reply: `Hello and welcome to The Motive Studio Client Desk! We are directed by Eman Tariq (CEO) and Zara Amin Khan (Co-Founder). We craft 2D & 3D Animation, Video Editing, Viral Reels, Executive E-Books, Brand Identity, and Full-Stack Web Builds. What kind of project are you planning?`,
      actions: [
        { label: '🎬 2D & 3D Animation', action: 'animation' },
        { label: '⚡ Viral Reels & Editing', action: 'video' },
        { label: '📖 Executive E-Book', action: 'ebook' },
        { label: '💼 Start a Project Brief', action: 'contact' },
      ],
    };
  }

  // 2. 3D ANIMATION & CGI PRODUCT RENDERS
  if (
    q.includes('3d') ||
    q.includes('cgi') ||
    q.includes('render') ||
    q.includes('octane') ||
    q.includes('blender') ||
    q.includes('cinema 4d') ||
    q.includes('spatial') ||
    q.includes('cad')
  ) {
    return {
      reply: `Our 3D Animation & CGI pipeline delivers photorealistic product renders, spatial camera fly-throughs, lighting simulations, and 4K commercial motion using Blender, Octane, and Cinema 4D. Turnaround is typically 3 to 5 weeks. All 3D project source files remain 100% your property.`,
      actions: [
        { label: '📂 View 3D Drive Archive', action: 'drive_3d' },
        { label: 'Request 3D Scope & Quote', action: 'contact' },
        { label: 'See Pricing Tiers', action: 'pricing' },
      ],
    };
  }

  // 3. 2D ANIMATION & MOTION GRAPHICS / LOTTIE
  if (
    q.includes('2d') ||
    q.includes('kinetic') ||
    q.includes('typography') ||
    q.includes('lottie') ||
    q.includes('explainer') ||
    q.includes('character animation') ||
    (q.includes('motion') && !q.includes('drive'))
  ) {
    return {
      reply: `Our 2D Animation & Motion team crafts bespoke character sequences, kinetic typography, dynamic product explainers, and sub-second 60 FPS Lottie/JSON web micro-interactions. Typical turnaround is 2 to 3 weeks with full storyboard and sonic scoring included.`,
      actions: [
        { label: '📂 Open Animation Drive', action: 'drive_3d' },
        { label: 'Inquire for 2D Animation', action: 'contact' },
        { label: 'Explore All 12 Services', action: 'services' },
      ],
    };
  }

  // 4. VIRAL REELS, SHORTS & TIKTOK
  if (
    q.includes('reel') ||
    q.includes('short') ||
    q.includes('tiktok') ||
    q.includes('vertical') ||
    q.includes('9:16') ||
    q.includes('instagram reel')
  ) {
    return {
      reply: `We produce high-retention 9:16 vertical Reels and Shorts designed for explosive algorithmic distribution. Our process includes 1.8-second kinetic hooks, dynamic subtitles, rhythmic sound effects, and batch delivery (5, 10, or 20 reels/month). Our clients average 3.8x organic reach uplifts within 30 days!`,
      actions: [
        { label: 'Book a Batch of Reels', action: 'contact' },
        { label: 'Read Client Reviews', action: 'reviews' },
        { label: 'Pricing for Reels', action: 'pricing' },
      ],
    };
  }

  // 5. VIDEO EDITING & COMMERCIAL POST-PRODUCTION
  if (
    q.includes('video') ||
    q.includes('editing') ||
    q.includes('post-production') ||
    q.includes('post production') ||
    q.includes('cut') ||
    q.includes('color grade') ||
    q.includes('sound design')
  ) {
    return {
      reply: `Our Video Editing & Post-Production services cover commercial cuts, brand documentaries, YouTube episodic series, and high-energy ads. We handle multi-cam synchronization, DaVinci Resolve color grading, motion graphics callouts, and audio mixing with a fast 1 to 3 week delivery window.`,
      actions: [
        { label: 'Get Video Editing Quote', action: 'contact' },
        { label: 'See Client Portfolio', action: 'work' },
      ],
    };
  }

  // 6. EXECUTIVE E-BOOK DESIGN & PUBLISHING ("THE MOTIVE PLAYBOOK")
  if (
    q.includes('ebook') ||
    q.includes('e-book') ||
    q.includes('book') ||
    q.includes('playbook') ||
    q.includes('pdf') ||
    q.includes('publishing') ||
    q.includes('whitepaper') ||
    q.includes('lead magnet')
  ) {
    return {
      reply: `We build authoritative 48-page executive publication systems! This includes custom 3D hardcover mockups, Swiss grid editorial typesetting, clickable interactive PDFs with embedded CTAs, and distribution carousels. You can also read or download our free masterclass book, "The Motive Playbook", directly right here on this page!`,
      actions: [
        { label: '📖 Open The Motive Playbook', action: 'ebook_modal' },
        { label: 'Order Custom E-Book Design', action: 'contact' },
        { label: 'View E-Book Section', action: 'ebook_section' },
      ],
    };
  }

  // 7. PRICING, COSTS, RATES & BUDGET
  if (
    q.includes('price') ||
    q.includes('pricing') ||
    q.includes('cost') ||
    q.includes('rate') ||
    q.includes('budget') ||
    q.includes('quote') ||
    q.includes('how much') ||
    q.includes('fee') ||
    q.includes('package')
  ) {
    // If context was previously specific
    let contextNote = '';
    if (recentUserTexts.includes('reel') || recentUserTexts.includes('short')) {
      contextNote = ' For viral reels & shorts batches, packages typically range from $1,200 to $3,500 depending on volume and motion VFX.';
    } else if (recentUserTexts.includes('3d') || recentUserTexts.includes('render')) {
      contextNote = ' For commercial 3D animation and product CGI, projects typically range from $3,500 to $9,000+.';
    } else if (recentUserTexts.includes('ebook') || recentUserTexts.includes('book')) {
      contextNote = ' Executive E-Book design and publishing packages range between $1,500 and $3,800.';
    }

    return {
      reply: `We offer transparent, value-based pricing tailored to your scope:${contextNote}
• Focused Sprints ($1,500 – $3,500): Batch Reels, E-Book publication design, or 2D kinetic micro-animations.
• Growth Packages ($4,000 – $9,000): 3D product CGI commercials, full brand identity systems, or custom web designs.
• Enterprise Deployments ($10,000 – $25,000+): End-to-end rebrands, multi-channel video production, and custom web applications.
All code and visual source assets are 100% client-owned.`,
      actions: [
        { label: 'Request Bespoke Proposal', action: 'contact' },
        { label: 'WhatsApp Founders', action: 'whatsapp' },
      ],
    };
  }

  // 8. TURNAROUND, TIMELINE & DELIVERY
  if (
    q.includes('timeline') ||
    q.includes('turnaround') ||
    q.includes('how long') ||
    q.includes('time') ||
    q.includes('deadline') ||
    q.includes('delivery') ||
    q.includes('fast')
  ) {
    return {
      reply: `Our turnaround times are engineered for high sprint velocity:
• Viral Reels & Shorts: 3 to 5 business days per batch
• Video Editing & Commercial Cuts: 1 to 2 weeks
• 2D Motion Graphics & Explainer Videos: 2 to 3 weeks
• Executive E-Book Design: 1 to 2 weeks
• 3D Animation & CGI: 3 to 5 weeks
• Full-Stack Web Development: 3 to 6 weeks
Need an expedited rush delivery? Our team can accommodate sprint priority schedules upon request.`,
      actions: [
        { label: 'Schedule Priority Sprint', action: 'contact' },
        { label: 'Explore Process Steps', action: 'process' },
      ],
    };
  }

  // 9. LEADERSHIP, FOUNDERS & TEAM
  if (
    q.includes('founder') ||
    q.includes('eman') ||
    q.includes('tariq') ||
    q.includes('zara') ||
    q.includes('amin') ||
    q.includes('who') ||
    q.includes('ceo') ||
    q.includes('team') ||
    q.includes('leadership')
  ) {
    return {
      reply: `The Motive Studio is led directly by our founders:
• Eman Tariq – Chief Executive Officer (Strategy, Technology & Full-Stack Systems)
• Zara Amin Khan – Co-Founder & Creative Director (Brand Identity, 2D/3D Kinetic Craft & Visual Direction)
Unlike traditional agencies, we do not pass your work to junior account managers. You collaborate directly with Eman and Zara from kickoff to deployment.`,
      actions: [
        { label: 'Read Studio Creed & Pillars', action: 'about' },
        { label: 'Connect on LinkedIn', action: 'linkedin' },
        { label: 'Start Project with Founders', action: 'contact' },
      ],
    };
  }

  // 10. DIRECT CONTACT, PHONE, WHATSAPP & EMAIL
  if (
    q.includes('contact') ||
    q.includes('email') ||
    q.includes('phone') ||
    q.includes('whatsapp') ||
    q.includes('call') ||
    q.includes('hire') ||
    q.includes('reach') ||
    q.includes('location') ||
    q.includes('address')
  ) {
    return {
      reply: `You can reach our leadership directly through multiple instant channels:
• Direct Email: themotivestudio1522@gmail.com
• Phone / WhatsApp: 03141025918 / 0317 3150998
• Location: Remote Worldwide with 24/7 global client availability
• Socials: Active on LinkedIn, Instagram (@themotivestudio1522), and Facebook.
Click below to open our interactive brief desk or text us on WhatsApp right away!`,
      actions: [
        { label: 'Open Project Inquiry Form', action: 'contact' },
        { label: 'WhatsApp Message Now', action: 'whatsapp' },
        { label: 'Copy Studio Email', action: 'copy_email' },
      ],
    };
  }

  // 11. BRAND IDENTITY & PACKAGING
  if (
    q.includes('brand') ||
    q.includes('identity') ||
    q.includes('logo') ||
    q.includes('packaging') ||
    q.includes('guidelines') ||
    q.includes('palette')
  ) {
    return {
      reply: `Our Brand Strategy & Identity practice constructs iconic visual moats. We design monolithic geometric logomarks, comprehensive typography hierarchies, design token systems, and physical packaging architecture with foil/emboss manufacturing specs. 100% trademark-ready and defensible.`,
      actions: [
        { label: '📂 Open Brand & Packaging Drive', action: 'drive_brand' },
        { label: 'Request Brand Identity Scope', action: 'contact' },
      ],
    };
  }

  // 12. UI/UX & WEB DEVELOPMENT
  if (
    q.includes('web') ||
    q.includes('website') ||
    q.includes('frontend') ||
    q.includes('fullstack') ||
    q.includes('ui') ||
    q.includes('ux') ||
    q.includes('figma') ||
    q.includes('code') ||
    q.includes('speed')
  ) {
    return {
      reply: `We engineer sub-second web applications and Figma design systems (140+ components). Our architectures feature sub-400ms global load speeds, dark-mode brutalist aesthetics, and seamless responsive performance across mobile and 4K displays.`,
      actions: [
        { label: '📂 Open UI/UX & Web Drive', action: 'drive_uiux' },
        { label: 'Request Web Build Scope', action: 'contact' },
        { label: 'Explore Portfolio Cases', action: 'work' },
      ],
    };
  }

  // 13. PORTFOLIO & WORK SAMPLES
  if (
    q.includes('portfolio') ||
    q.includes('work') ||
    q.includes('sample') ||
    q.includes('case study') ||
    q.includes('examples') ||
    q.includes('show') ||
    q.includes('drive')
  ) {
    return {
      reply: `We maintain live Google Drive archives across all our creative practices:
• Master Studio Drive (All Categories)
• 3D Animation & Motion Drive
• UI/UX & Website Design Drive
• Graphics, Brand Identity & Packaging Drive
You can also inspect our featured client case studies on this page!`,
      actions: [
        { label: '📂 Master Studio Google Drive', action: 'drive_master' },
        { label: 'Explore Featured Cases', action: 'work' },
        { label: 'Client Reviews & Proof', action: 'reviews' },
      ],
    };
  }

  // 14. CLIENT REVIEWS & VERIFICATION
  if (
    q.includes('review') ||
    q.includes('rating') ||
    q.includes('testimonial') ||
    q.includes('client') ||
    q.includes('trust') ||
    q.includes('reputation')
  ) {
    return {
      reply: `The Motive Studio maintains a 98% client retention rate and a 4.98/5 verified satisfaction score across 65+ commercial builds. Clients like Kinesis Robotics ($14.5M Series A raised), Luminary Media (3.8x organic reach uplift), and Aetheria Maison ($185 AOV increase) endorse our studio craft.`,
      actions: [
        { label: 'Read All Verified Reviews', action: 'reviews' },
        { label: 'Submit Your Project Brief', action: 'contact' },
      ],
    };
  }

  // 15. DEFAULT DYNAMIC CONCIERGE (Multi-category smart answer)
  return {
    reply: `Thank you for your inquiry! At The Motive Studio, our directors Eman Tariq & Zara Amin Khan provide high-impact 2D/3D Animation, Video Editing, Viral Reels, Executive E-Books, Brand Identity, and Full-Stack Web Development. 

Could you share a bit more about your project goals or the specific service you'd like to explore?`,
    actions: [
      { label: '🎬 Animation & 3D CGI', action: 'animation' },
      { label: '⚡ Video Editing & Reels', action: 'video' },
      { label: '📖 The Motive Playbook E-Book', action: 'ebook' },
      { label: '💬 Start Project Inquiry', action: 'contact' },
    ],
  };
}
