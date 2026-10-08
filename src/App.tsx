import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { StudioContentProvider, useStudioContent } from './context/StudioContentContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { StatementSection } from './components/StatementSection';
import { WorkSection } from './components/WorkSection';
import { AboutSection } from './components/AboutSection';
import { ProcessSection } from './components/ProcessSection';
import { EbookSection } from './components/EbookSection';
import { ReviewsSection } from './components/ReviewsSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { StudioEditDrawer } from './components/StudioEditDrawer';
import { StudioChatbot } from './components/StudioChatbot';

import { CaseStudyModal } from './components/CaseStudyModal';
import { ArticleModal } from './components/ArticleModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { EbookModal } from './components/EbookModal';
import { SubmitReviewModal } from './components/SubmitReviewModal';
import { OwnerAuthModal } from './components/OwnerAuthModal';

import { ProjectItem, ArticleItem, ServiceItem, EbookChapter } from './data/studioData';

// Framer Motion animation variants for major studio sections
const heroSectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const majorSectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function StudioApp() {
  const { content, setIsDrawerOpen } = useStudioContent();

  const [activeCaseStudy, setActiveCaseStudy] = useState<ProjectItem | null>(null);
  const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(null);
  const [activeServiceModal, setActiveServiceModal] = useState<ServiceItem | null>(null);

  const [isEbookModalOpen, setIsEbookModalOpen] = useState<boolean>(false);
  const [previewChapter, setPreviewChapter] = useState<EbookChapter | null>(null);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [isOwnerAuthOpen, setIsOwnerAuthOpen] = useState<boolean>(false);

  const [contactInitialService, setContactInitialService] = useState<string>('');
  const [contactInitialMessage, setContactInitialMessage] = useState<string>('');

  // Scroll Progress Bar state
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const handleRequestAdminAccess = () => {
    if (sessionStorage.getItem('motive_owner_authenticated') === 'true') {
      setIsDrawerOpen(true);
    } else {
      setIsOwnerAuthOpen(true);
    }
  };

  useEffect(() => {
    // Secret Founder Shortcut: Ctrl + Shift + E or Cmd + Shift + E
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        if (sessionStorage.getItem('motive_owner_authenticated') === 'true') {
          setIsDrawerOpen(true);
        } else {
          setIsOwnerAuthOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Support URL path (/admin or /edit), hash (#admin or #edit), or query (?admin=1) for direct owner login prompt
    const checkUrlForAdmin = () => {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();
      if (
        hash === '#admin' ||
        hash === '#edit' ||
        search.includes('admin') ||
        pathname.endsWith('/admin') ||
        pathname.endsWith('/edit')
      ) {
        if (sessionStorage.getItem('motive_owner_authenticated') === 'true') {
          setIsDrawerOpen(true);
        } else {
          setIsOwnerAuthOpen(true);
        }
      }
    };
    checkUrlForAdmin();
    window.addEventListener('hashchange', checkUrlForAdmin);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', checkUrlForAdmin);
    };
  }, [setIsDrawerOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollHeight > 0) {
        const progress = (window.scrollY / totalScrollHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquireService = (serviceTitle: string) => {
    setContactInitialService(serviceTitle);
    setContactInitialMessage(`Hello! We would like to explore partnering with The Motive Studio for ${serviceTitle}.`);
    scrollToContact();
  };

  const handleInquireSimilarProject = (projectName: string) => {
    setContactInitialMessage(`Hi The Motive Studio, we saw your work on "${projectName}" and are interested in creating a similar high-caliber project for our brand.`);
    scrollToContact();
  };

  const handleOpenChapterPreview = (ch: EbookChapter) => {
    setPreviewChapter(ch);
    setIsEbookModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#111111] antialiased selection:bg-[#0066ff] selection:text-white relative">
      {/* Thin Animated Viewport Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-black/10 pointer-events-none"
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full transition-[width] duration-150 ease-out shadow-[0_0_10px_rgba(0,102,255,0.7)]"
          style={{
            width: `${scrollProgress}%`,
            backgroundColor: content.branding.accentColor || '#0066ff',
          }}
        />
      </div>

      {/* Top Bar Navigation */}
      <Header onStartProject={scrollToContact} />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroSectionVariants}
        >
          <Hero
            onStartProject={scrollToContact}
            onOpenEbook={() => {
              const el = document.getElementById('ebook');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                setPreviewChapter(null);
                setIsEbookModalOpen(true);
              }
            }}
          />
        </motion.div>

        {/* 12 Services Grid with 2D/3D Animation, Video Editing, Reels & E-Books */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
          variants={majorSectionVariants}
        >
          <ServicesSection
            onSelectService={(svc) => setActiveServiceModal(svc)}
            onInquireService={handleInquireService}
          />
        </motion.div>

        {/* Studio Philosophy Statement */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1, margin: '0px 0px -50px 0px' }}
          variants={majorSectionVariants}
        >
          <StatementSection />
        </motion.div>

        {/* Selected Work Portfolio with Filters & Metrics */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
          variants={majorSectionVariants}
        >
          <WorkSection
            onOpenCaseStudy={(proj) => setActiveCaseStudy(proj)}
          />
        </motion.div>

        {/* About The Studio & 3 Pillars */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1, margin: '0px 0px -50px 0px' }}
          variants={majorSectionVariants}
        >
          <AboutSection />
        </motion.div>

        {/* 4-Step Process Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
          variants={majorSectionVariants}
        >
          <ProcessSection />
        </motion.div>

        {/* Studio Publication / Executive eBook Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
          variants={majorSectionVariants}
        >
          <EbookSection
            onOpenEbookModal={() => {
              setPreviewChapter(null);
              setIsEbookModalOpen(true);
            }}
            onOpenChapterPreview={handleOpenChapterPreview}
          />
        </motion.div>

        {/* Verified Client Reviews & Ratings Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
          variants={majorSectionVariants}
        >
          <ReviewsSection
            onOpenSubmitModal={() => setIsReviewModalOpen(true)}
          />
        </motion.div>

        {/* Insights / Blog Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
          variants={majorSectionVariants}
        >
          <BlogSection
            onOpenArticle={(art) => setActiveArticle(art)}
          />
        </motion.div>

        {/* Interactive Contact & Project Inquiry */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
          variants={majorSectionVariants}
        >
          <ContactSection
            initialService={contactInitialService}
            initialMessage={contactInitialMessage}
            onClearInitialService={() => {
              setContactInitialService('');
              setContactInitialMessage('');
            }}
          />
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Official Studio Client Desk (Floating Bottom-Left) */}
      <StudioChatbot onStartProject={scrollToContact} />

      {/* Full Live Studio Content Management Drawer (Restricted Founder Access) */}
      <StudioEditDrawer />

      {/* Founder Passcode Protection Modal */}
      <OwnerAuthModal
        isOpen={isOwnerAuthOpen}
        onClose={() => setIsOwnerAuthOpen(false)}
        onSuccess={() => setIsDrawerOpen(true)}
      />

      {/* Overlays / Modals */}
      <CaseStudyModal
        project={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
        onInquireSimilar={handleInquireSimilarProject}
      />

      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        onStartConversation={scrollToContact}
      />

      <ServiceDetailModal
        service={activeServiceModal}
        onClose={() => setActiveServiceModal(null)}
        onInquire={handleInquireService}
      />

      {/* Executive eBook Download & Chapter Reader Modal */}
      <EbookModal
        isOpen={isEbookModalOpen}
        onClose={() => {
          setIsEbookModalOpen(false);
          setPreviewChapter(null);
        }}
        previewChapter={previewChapter}
      />

      {/* Submit Review Modal */}
      <SubmitReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <StudioContentProvider>
      <StudioApp />
    </StudioContentProvider>
  );
}
