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
    logoStyle?: 'signature' | 'minimal' | 'crest';
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
    facebook: string;
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
    customLogoUrl: '/logo_dark_theme.png',
    useOfficialVectorLogo: false,
    fontFamily: 'Montserrat',
    accentColor: '#0066ff',
    logoStyle: 'signature',
  },
  socials: {
    instagram: 'https://www.instagram.com/themotivestudio1522/',
    linkedin: 'https://www.linkedin.com/public-profile/settings/?trk=d_flagship3_profile_self_view_public_profile&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B6nDsZNWyQherCT0HW%2B%2FclA%3D%3D',
    facebook: 'https://www.facebook.com/profile.php?id=61594971998869',
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

export function mergeStudioContent(
  base: StudioContent,
  incoming: Partial<StudioContent> | null | undefined
): StudioContent {
  if (!incoming || typeof incoming !== 'object') return base;
  return {
    ...base,
    ...incoming,
    branding: {
      ...base.branding,
      ...(incoming.branding || {}),
      logoStyle: incoming.branding?.logoStyle || base.branding.logoStyle || 'signature',
    },
    hero: {
      ...base.hero,
      ...(incoming.hero || {}),
    },
    statement: {
      ...base.statement,
      ...(incoming.statement || {}),
    },
    about: {
      ...base.about,
      ...(incoming.about || {}),
    },
    contact: {
      ...base.contact,
      ...(incoming.contact || {}),
    },
    socials: {
      ...base.socials,
      ...(incoming.socials || {}),
    },
    services:
      Array.isArray(incoming.services) && incoming.services.length > 0
        ? incoming.services
        : base.services,
    projects:
      Array.isArray(incoming.projects) && incoming.projects.length > 0
        ? incoming.projects
        : base.projects,
    ebook: {
      ...base.ebook,
      ...(incoming.ebook || {}),
      chapters:
        Array.isArray(incoming.ebook?.chapters) && incoming.ebook.chapters.length > 0
          ? incoming.ebook.chapters
          : base.ebook.chapters,
    },
    reviews:
      Array.isArray(incoming.reviews) && incoming.reviews.length > 0
        ? incoming.reviews
        : base.reviews,
  };
}

interface StudioContextType {
  content: StudioContent;
  updateContent: (newContent: Partial<StudioContent>) => void;
  updateField: <K extends keyof StudioContent>(section: K, field: Partial<StudioContent[K]>) => void;
  addReview: (review: Omit<ReviewItem, 'id' | 'date'>) => void;
  updateReview: (id: string, updated: Partial<ReviewItem>) => void;
  deleteReview: (id: string) => void;
  resetToDefaults: () => void;
  saveToServer: () => Promise<boolean>;
  isSaving: boolean;
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (val: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StudioContentContext = createContext<StudioContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'the_motive_studio_content_v11';

export const StudioContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<StudioContent>(() => {
    try {
      const saved =
        localStorage.getItem(LOCAL_STORAGE_KEY) ||
        localStorage.getItem('the_motive_studio_content_v10') ||
        localStorage.getItem('the_motive_studio_content_v9');
      if (saved) {
        const parsed = JSON.parse(saved);
        const merged = mergeStudioContent(DEFAULT_CONTENT, parsed);
        if (!merged.branding.customLogoUrl || merged.branding.customLogoUrl === '/official_logo.jpg') {
          merged.branding.customLogoUrl = '/logo_dark_theme.png';
          merged.branding.useOfficialVectorLogo = false;
        }
        return merged;
      }
    } catch (e) {
      console.error('Error loading saved content from localStorage:', e);
    }
    return DEFAULT_CONTENT;
  });

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Safely persist to browser localStorage with quota management
  const safeSaveLocal = (data: StudioContent) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent('studio-content-synced', { detail: data }));
    } catch (e: any) {
      console.warn('LocalStorage write warning (likely quota):', e);
      // If quota exceeded due to large data URL, try stripping the custom logo URL for local backup
      try {
        const fallback = {
          ...data,
          branding: { ...data.branding, customLogoUrl: '' },
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fallback));
      } catch (err) {}
    }
  };

  // Persist to server / API if running in fullstack or serverless
  const persistToServer = async (data: StudioContent): Promise<boolean> => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setIsSaving(false);
      return res.ok;
    } catch (e) {
      setIsSaving(false);
      return false;
    }
  };

  const saveToServer = async (): Promise<boolean> => {
    safeSaveLocal(content);
    const serverOk = await persistToServer(content);
    if (serverOk) {
      showToast('Published & Persisted Live to Website & Server!');
    } else {
      showToast('Saved to browser storage! (Export JSON to commit to repo)');
    }
    return serverOk;
  };

  // Fetch initial published content from /api/content or /content.json on mount
  useEffect(() => {
    let isMounted = true;

    const fetchInitialData = async () => {
      try {
        let res = await fetch('/api/content').catch(() => null);
        if (!res || !res.ok) {
          res = await fetch('/content.json').catch(() => null);
        }

        if (res && res.ok) {
          const remoteJson = await res.json();
          if (isMounted && remoteJson && typeof remoteJson === 'object') {
            setContent((prev) => {
              // Merge remote with current local changes
              const merged = mergeStudioContent(prev, remoteJson);
              safeSaveLocal(merged);
              return merged;
            });
          }
        }
      } catch (err) {
        // Fallback silently to client store
      }
    };

    fetchInitialData();

    // Cross-tab synchronization
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setContent((prev) => mergeStudioContent(prev, parsed));
        } catch (err) {}
      }
    };

    const handleCustomSync = (e: Event) => {
      const customEvt = e as CustomEvent<StudioContent>;
      if (customEvt.detail) {
        setContent(customEvt.detail);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('studio-content-synced', handleCustomSync);

    return () => {
      isMounted = false;
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('studio-content-synced', handleCustomSync);
    };
  }, []);

  const updateContent = (newContent: Partial<StudioContent>) => {
    setContent((prev) => {
      const updated = mergeStudioContent(prev, newContent);
      safeSaveLocal(updated);
      persistToServer(updated);
      return updated;
    });
    showToast('Changes saved and updated!');
  };

  const updateField = <K extends keyof StudioContent>(
    section: K,
    field: Partial<StudioContent[K]>
  ) => {
    setContent((prev) => {
      const updatedSection = Array.isArray(prev[section])
        ? (field as unknown as StudioContent[K])
        : { ...(prev[section] as object), ...(field as object) };

      const updated: StudioContent = {
        ...prev,
        [section]: updatedSection,
      };

      safeSaveLocal(updated);
      persistToServer(updated);
      return updated;
    });
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
        saveToServer,
        isSaving,
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
