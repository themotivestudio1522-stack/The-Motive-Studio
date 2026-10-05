import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SERVICES_DATA,
  PROJECTS_DATA,
  PROCESS_DATA,
  ARTICLES_DATA,
  EBOOK_DEFAULT_DATA,
  REVIEWS_DATA,
  ServiceItem,
  ProjectItem,
  ProcessItem,
  ArticleItem,
  EbookData,
  ReviewItem,
} from '../data/studioData';

export interface StudioContent {
  branding: {
    studioName: string;
    studioTagline: string;
    customLogoUrl: string;
    useOfficialVectorLogo: boolean;
    fontFamily: 'Montserrat' | 'Plus Jakarta Sans' | 'Inter' | 'Outfit';
    accentColor: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
  };
  statement: {
    titleLine1: string;
    titleLine2: string;
  };
  about: {
    label: string;
    headline: string;
    subheadline: string;
    p1: string;
    p2: string;
    pillNotice: string;
  };
  contact: {
    label: string;
    headline: string;
    accentWord: string;
    description: string;
    email: string;
    phone: string;
    location: string;
  };
  socials: {
    instagram: string;
    linkedin: string;
    twitter: string;
    fiverr: string;
    upwork: string;
  };
  services: ServiceItem[];
  projects: ProjectItem[];
  ebook: EbookData;
  reviews: ReviewItem[];
}

const DEFAULT_CONTENT: StudioContent = {
  branding: {
    studioName: 'THE MOTIVE STUDIO',
    studioTagline: 'WE CREATE. YOU GROW.',
    customLogoUrl: '',
    useOfficialVectorLogo: true,
    fontFamily: 'Montserrat',
    accentColor: '#0066ff',
  },
  socials: {
    instagram: 'https://www.instagram.com/themotivestudio1522/',
    linkedin: 'https://lnkd.in/p/dTYBV-Z8',
    twitter: 'https://twitter.com',
    fiverr: 'https://fiverr.com',
    upwork: 'https://upwork.com',
  },
  hero: {
    eyebrow: 'Creative Digital Studio',
    titleLine1: 'WE CREATE.',
    titleLine2: 'YOU GROW.',
    description: 'We build brands, digital experiences and creative solutions that help ambitious businesses stand out, connect and grow.',
    primaryCtaText: 'Explore Our Work',
    secondaryCtaText: 'Start a Project',
    stat1Value: '65+',
    stat1Label: 'Completed Brand & Web Builds',
    stat2Value: '98%',
    stat2Label: 'Client Satisfaction & Retention',
    stat3Value: '$42M+',
    stat3Label: 'Client Capital & Revenue Driven',
  },
  statement: {
    titleLine1: 'Ideas are easy.',
    titleLine2: 'Execution wins.',
  },
  about: {
    label: 'About The Studio',
    headline: 'We turn ideas into',
    subheadline: 'brands people remember.',
    p1: 'The Motive Studio is an independent creative digital studio focused on branding, design, technology and growth.',
    p2: 'We combine strategic thinking with strong visual design and digital execution to create meaningful experiences for modern businesses.',
    pillNotice: 'Direct Senior-Level Collaboration: At The Motive Studio, you work directly with our principal design directors and lead engineers. No account managers, no bureaucratic handoffs.',
  },
  contact: {
    label: 'Start a Project',
    headline: "Let's create",
    accentWord: 'something great.',
    description: "Have a project, idea or business challenge? Tell us about your goals and let's schedule an initial discovery conversation.",
    email: 'themotivestudio1522@gmail.com',
    phone: '03141025918 / 0317 3150998',
    location: 'Remote Globally',
  },
  services: SERVICES_DATA,
  projects: PROJECTS_DATA,
  ebook: EBOOK_DEFAULT_DATA,
  reviews: REVIEWS_DATA,
};

interface StudioContextType {
  content: StudioContent;
  updateContent: (newContent: Partial<StudioContent>) => void;
  updateField: <K extends keyof StudioContent>(section: K, field: Partial<StudioContent[K]>) => void;
  addReview: (review: Omit<ReviewItem, 'id' | 'date'>) => void;
  updateReview: (id: string, updated: Partial<ReviewItem>) => void;
  deleteReview: (id: string) => void;
  resetToDefaults: () => void;
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (val: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StudioContentContext = createContext<StudioContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'the_motive_studio_content_v8';

export const StudioContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<StudioContent>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const savedLogo = parsed.branding?.customLogoUrl;
        return {
          ...DEFAULT_CONTENT,
          ...parsed,
          branding: {
            ...DEFAULT_CONTENT.branding,
            ...parsed.branding,
            customLogoUrl:
              savedLogo && savedLogo !== '/official_logo.jpg' ? savedLogo : '',
          },
          services: parsed.services?.length ? parsed.services : DEFAULT_CONTENT.services,
          reviews: parsed.reviews?.length ? parsed.reviews : DEFAULT_CONTENT.reviews,
        };
      }
    } catch (e) {
      console.error('Error loading saved content:', e);
    }
    return DEFAULT_CONTENT;
  });

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const updateContent = (newContent: Partial<StudioContent>) => {
    setContent((prev) => {
      const updated = { ...prev, ...newContent };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save to localStorage:', e);
      }
      return updated;
    });
    showToast('Changes saved successfully!');
  };

  const updateField = <K extends keyof StudioContent>(
    section: K,
    field: Partial<StudioContent[K]>
  ) => {
    setContent((prev) => {
      const updatedSection = Array.isArray(prev[section])
        ? (field as unknown as StudioContent[K])
        : { ...(prev[section] as object), ...(field as object) };

      const updated = {
        ...prev,
        [section]: updatedSection,
      };

      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save to localStorage:', e);
      }
      return updated;
    });
    showToast('Updated and saved!');
  };

  const addReview = (reviewData: Omit<ReviewItem, 'id' | 'date'>) => {
    const newRev: ReviewItem = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
    };
    setContent((prev) => {
      const updated = {
        ...prev,
        reviews: [newRev, ...prev.reviews],
      };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    showToast('Review added successfully!');
  };

  const updateReview = (id: string, updated: Partial<ReviewItem>) => {
    setContent((prev) => {
      const newReviews = prev.reviews.map((r) => (r.id === id ? { ...r, ...updated } : r));
      const updatedContent = { ...prev, reviews: newReviews };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedContent));
      } catch (e) {}
      return updatedContent;
    });
    showToast('Review updated!');
  };

  const deleteReview = (id: string) => {
    setContent((prev) => {
      const newReviews = prev.reviews.filter((r) => r.id !== id);
      const updatedContent = { ...prev, reviews: newReviews };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedContent));
      } catch (e) {}
      return updatedContent;
    });
    showToast('Review removed.');
  };

  const resetToDefaults = () => {
    setContent(DEFAULT_CONTENT);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {}
    showToast('Reset to default studio layout.');
  };

  // Sync font family & accent color dynamically to DOM
  useEffect(() => {
    const root = document.documentElement;
    const font = content.branding.fontFamily || 'Montserrat';
    root.style.setProperty('--font-display', `'${font}', sans-serif`);
    root.style.setProperty('--font-body', `'${font}', -apple-system, BlinkMacSystemFont, sans-serif`);

    if (content.branding.accentColor) {
      root.style.setProperty('--color-studio-blue', content.branding.accentColor);
    }
  }, [content.branding.fontFamily, content.branding.accentColor]);

  return (
    <StudioContentContext.Provider
      value={{
        content,
        updateContent,
        updateField,
        addReview,
        updateReview,
        deleteReview,
        resetToDefaults,
        isEditMode,
        setIsEditMode,
        isDrawerOpen,
        setIsDrawerOpen,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StudioContentContext.Provider>
  );
};

export const useStudioContent = () => {
  const ctx = useContext(StudioContentContext);
  if (!ctx) throw new Error('useStudioContent must be used within StudioContentProvider');
  return ctx;
};
