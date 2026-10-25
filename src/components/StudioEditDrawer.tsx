import React, { useState, useRef } from 'react';
import { useStudioContent } from '../context/StudioContentContext';
import {
  X,
  Settings,
  Type,
  Palette,
  Layout,
  Briefcase,
  Layers,
  PhoneCall,
  Save,
  RotateCcw,
  Download,
  Upload,
  Check,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Eye,
  Image as ImageIcon,
  BookOpen,
  Star,
  Trash2,
  Plus,
  MessageSquare,
  Lock,
  ShieldCheck,
  Wand2,
  Globe,
  RefreshCw,
  FileText,
} from 'lucide-react';
import { MotiveLogo } from './MotiveLogo';
import { removeBackground } from '../utils/imageUtils';

export const StudioEditDrawer: React.FC = () => {
  const {
    content,
    updateContent,
    updateField,
    addReview,
    updateReview,
    deleteReview,
    resetToDefaults,
    saveToServer,
    isSaving,
    isDrawerOpen,
    setIsDrawerOpen,
    toastMessage,
    showToast,
  } = useStudioContent();

  const [activeTab, setActiveTab] = useState<
    'branding' | 'typography' | 'hero' | 'services' | 'work' | 'ebook' | 'reviews' | 'about' | 'contact' | 'security'
  >('branding');

  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [expandedReview, setExpandedReview] = useState<number | null>(null);

  const [newReviewOpen, setNewReviewOpen] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientRole, setNewClientRole] = useState('Founder & CEO');
  const [newCompany, setNewCompany] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newProject, setNewProject] = useState('3D Animation & CGI');
  const [newText, setNewText] = useState('');

  const [currentPasscode, setCurrentPasscode] = useState('');
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  // Auto Background Remover state
  const [isRemovingBg, setIsRemovingBg] = useState(false);
  const [bgRemoveMode, setBgRemoveMode] = useState<'white' | 'black' | 'auto'>('white');
  const [bgTolerance, setBgTolerance] = useState<number>(32);
  const [autoRemoveOnUpload, setAutoRemoveOnUpload] = useState<boolean>(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fontOptions: { id: 'Montserrat' | 'Plus Jakarta Sans' | 'Inter' | 'Outfit'; label: string; desc: string }[] = [
    { id: 'Montserrat', label: 'Montserrat (Geometric)', desc: 'Clean, bold geometric letterforms matching The Motive Studio logo' },
    { id: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans', desc: 'Ultra-clean, modern tech and design agency aesthetic' },
    { id: 'Inter', label: 'Inter', desc: 'Neutral, highly readable international Swiss typography' },
    { id: 'Outfit', label: 'Outfit', desc: 'Contemporary, sleek curves and refined display presence' },
  ];

  const colorPresets = [
    { name: 'Official Motive Cobalt', hex: '#0066ff' },
    { name: 'Vivid Sky', hex: '#0284c7' },
    { name: 'Electric Cyan', hex: '#06b6d4' },
    { name: 'Royal Indigo', hex: '#4f46e5' },
    { name: 'Emerald Growth', hex: '#10b981' },
    { name: 'Warm Amber', hex: '#f59e0b' },
  ];

  // Upload custom logo from user's local disk with optional Auto Background Remover
  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert('File size exceeds 8MB. Please upload a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onload = async (event) => {
        let dataUrl = event.target?.result as string;

        if (autoRemoveOnUpload) {
          setIsRemovingBg(true);
          try {
            dataUrl = await removeBackground(dataUrl, {
              mode: bgRemoveMode,
              tolerance: bgTolerance,
            });
            showToast('Logo uploaded and white background automatically removed!');
          } catch (err) {
            console.warn('Auto bg removal skipped:', err);
          } finally {
            setIsRemovingBg(false);
          }
        } else {
          showToast('Custom logo uploaded!');
        }

        updateField('branding', {
          customLogoUrl: dataUrl,
          useOfficialVectorLogo: false,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Run Auto Background Remover on the active custom logo URL
  const handleRunAutoBgRemover = async () => {
    const targetUrl = content.branding.customLogoUrl;
    if (!targetUrl || targetUrl.trim() === '') {
      alert('Please upload or enter a logo image first.');
      return;
    }

    setIsRemovingBg(true);
    try {
      const transparentDataUrl = await removeBackground(targetUrl, {
        mode: bgRemoveMode,
        tolerance: bgTolerance,
      });
      updateField('branding', { customLogoUrl: transparentDataUrl });
      showToast('Magic BG Remover finished! Background removed cleanly.');
    } catch (err: any) {
      alert('Failed to remove background: ' + (err.message || 'Make sure the image is accessible'));
    } finally {
      setIsRemovingBg(false);
    }
  };

  // Export content.json for repository / Vercel permanent deployment
  const handleDownloadContentJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'content.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Downloaded content.json! Commit to public/content.json for permanent live deployment.');
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'the_motive_studio_config.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          updateContent(parsed);
          showToast('Configuration loaded successfully!');
        } catch (err) {
          alert('Invalid JSON configuration file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#111111] border border-emerald-500/40 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Slide-out CMS Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full max-w-xl h-full bg-[#181818] border-l border-white/15 text-white flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#111111]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#0066ff]/20 text-[#0066ff] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-white flex items-center gap-2">
                    <span>Founder Management CMS</span>
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    Restricted Access · Eman Tariq (CEO) &amp; Zara Amin Khan (Co-Founder)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={saveToServer}
                  disabled={isSaving}
                  className="px-3 py-1.5 rounded-lg bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-[#0066ff]/25"
                  title="Save and publish directly to live site & server"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSaving ? 'animate-spin' : ''}`} />
                  <span>{isSaving ? 'Publishing...' : 'Publish Live'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sessionStorage.removeItem('motive_owner_authenticated');
                    localStorage.removeItem('motive_owner_authenticated');
                    setIsDrawerOpen(false);
                    showToast('Studio CMS Locked');
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  title="Lock CMS and exit session"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Lock &amp; Exit</span>
                </button>

                <button
                  type="button"
                  onClick={resetToDefaults}
                  className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 text-xs flex items-center gap-1 cursor-pointer"
                  title="Reset to default content"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
                  aria-label="Close CMS drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 p-2 bg-[#141414] border-b border-white/10 overflow-x-auto no-scrollbar">
              {[
                { id: 'branding', label: 'Logo & Brand', icon: Palette },
                { id: 'typography', label: 'Fonts & Color', icon: Type },
                { id: 'hero', label: 'Hero', icon: Layout },
                { id: 'services', label: 'Services', icon: Layers },
                { id: 'work', label: 'Work', icon: Briefcase },
                { id: 'ebook', label: 'Ebook', icon: BookOpen },
                { id: 'reviews', label: 'Reviews', icon: Star },
                { id: 'about', label: 'About', icon: Sparkles },
                { id: 'contact', label: 'Contact Info', icon: PhoneCall },
                { id: 'security', label: 'Password & Security', icon: Lock },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                      isActive
                        ? 'bg-[#0066ff] text-white shadow-sm'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 custom-scrollbar">
              {/* BRANDING & LOGO TAB */}
              {activeTab === 'branding' && (
                <div className="space-y-6">
                  {/* Official Vector Logo Styles Switcher */}
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#7fb0ff]">
                        Official Vector Logo Mark Style
                      </label>
                      <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        Adaptive High Contrast
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { id: 'signature', label: 'Signature M', desc: 'Electric 3D wing facet' },
                        { id: 'minimal', label: 'Modern Hex M', desc: 'Dual-stroke keystone' },
                        { id: 'crest', label: 'Luxury Crest', desc: 'Architectural shield' },
                      ].map((styleOpt) => (
                        <button
                          key={styleOpt.id}
                          type="button"
                          onClick={() => {
                            updateField('branding', {
                              logoStyle: styleOpt.id as any,
                              useOfficialVectorLogo: true,
                            });
                            showToast(`Logo style updated to ${styleOpt.label}!`);
                          }}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                            (content.branding.logoStyle || 'signature') === styleOpt.id
                              ? 'border-[#0066ff] bg-[#0066ff]/20 text-white shadow-sm'
                              : 'border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10'
                          }`}
                        >
                          <div className="font-bold text-xs">{styleOpt.label}</div>
                          <div className="text-[10px] text-neutral-400 mt-0.5">{styleOpt.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Logo Preview */}
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#7fb0ff]">
                        Live Navbar &amp; Presentation Previews
                      </label>
                      <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                        Both Black &amp; White Themes Supported
                      </span>
                    </div>

                    {/* Smoked Slate Titanium Navbar Capsule Preview */}
                    <div>
                      <div className="text-[11px] text-neutral-400 mb-1.5 font-medium">New Smoked Titanium Slate Navbar (Adaptive):</div>
                      <div className="p-4 rounded-xl bg-[#181c24] border border-white/15 flex items-center justify-center min-h-[75px]">
                        <div className="px-3.5 py-1.5 rounded-2xl bg-white/[0.08] border border-white/15 shadow-sm backdrop-blur-md">
                          <MotiveLogo
                            variant="horizontal"
                            customLogoUrl={content.branding.customLogoUrl}
                            logoStyle={content.branding.logoStyle || 'signature'}
                            theme="dark"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Light Plaque Card */}
                    <div>
                      <div className="text-[11px] text-neutral-400 mb-1.5 font-medium">Official Light Presentation Plaque:</div>
                      <div className="p-4 rounded-xl bg-white border border-black/10 flex items-center justify-center">
                        <MotiveLogo
                          variant="horizontal"
                          customLogoUrl={content.branding.customLogoUrl}
                          logoStyle={content.branding.logoStyle || 'signature'}
                          theme="light"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Auto Background Remover & Upload */}
                  <div className="p-5 rounded-2xl bg-[#0066ff]/10 border border-[#0066ff]/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wand2 className="w-4 h-4 text-[#7fb0ff]" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          Auto Background Remover (Magic Transparent)
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded-full border border-cyan-400/30">
                        Client-Side Engine
                      </span>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Upload your logo file or paste a URL. Our background remover automatically detects and removes solid white or black boxes, outputting a crisp transparent PNG with anti-aliased edge smoothing.
                    </p>

                    {/* Mode & Sensitivity Controls */}
                    <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-black/40 border border-white/10">
                      <div>
                        <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                          Background Color:
                        </label>
                        <select
                          value={bgRemoveMode}
                          onChange={(e) => setBgRemoveMode(e.target.value as any)}
                          className="w-full bg-[#1c202a] border border-white/20 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                        >
                          <option value="white">Remove White (#FFFFFF)</option>
                          <option value="black">Remove Black (#000000)</option>
                          <option value="auto">Auto-Detect Corner Color</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                          Sensitivity ({bgTolerance}%):
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="80"
                          value={bgTolerance}
                          onChange={(e) => setBgTolerance(Number(e.target.value))}
                          className="w-full accent-[#0066ff] cursor-pointer mt-1"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="inline-flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={autoRemoveOnUpload}
                          onChange={(e) => setAutoRemoveOnUpload(e.target.checked)}
                          className="rounded accent-[#0066ff]"
                        />
                        <span>Auto-remove background when selecting a new logo file</span>
                      </label>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 pt-1">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleLogoFileUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isRemovingBg}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isRemovingBg ? 'Processing...' : 'Choose Logo File...'}</span>
                      </button>

                      {content.branding.customLogoUrl && (
                        <button
                          type="button"
                          onClick={handleRunAutoBgRemover}
                          disabled={isRemovingBg}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
                        >
                          <Wand2 className="w-3.5 h-3.5" />
                          <span>{isRemovingBg ? 'Removing...' : 'Auto-Remove BG Now'}</span>
                        </button>
                      )}

                      {content.branding.customLogoUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            updateField('branding', {
                              customLogoUrl: '',
                              useOfficialVectorLogo: true,
                            });
                            showToast('Restored default official vector logo');
                          }}
                          className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-neutral-300 font-semibold cursor-pointer"
                        >
                          Reset to Vector
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-300 mb-1.5">
                      Or Paste Logo Image URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://example.com/logo.png"
                      value={content.branding.customLogoUrl}
                      onChange={(e) =>
                        updateField('branding', { customLogoUrl: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/15 focus:border-[#0066ff] rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                    />
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      <span className="text-[10px] font-mono text-neutral-400 mr-1">Presets:</span>
                      <button
                        type="button"
                        onClick={() => {
                          updateField('branding', {
                            customLogoUrl: '/logo_dark_theme.png',
                            useOfficialVectorLogo: false,
                          });
                          showToast('Switched to Dark Theme Official Logo (White Text + Blue Wing)');
                        }}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border cursor-pointer transition-all ${
                          content.branding.customLogoUrl === '/logo_dark_theme.png'
                            ? 'bg-[#0066ff]/25 border-[#0066ff] text-white font-bold'
                            : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                        }`}
                      >
                        Official Dark (White Text)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          updateField('branding', {
                            customLogoUrl: '/logo_light_theme.png',
                            useOfficialVectorLogo: false,
                          });
                          showToast('Switched to Light Theme Official Logo (Black Text + Blue Wing)');
                        }}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border cursor-pointer transition-all ${
                          content.branding.customLogoUrl === '/logo_light_theme.png'
                            ? 'bg-[#0066ff]/25 border-[#0066ff] text-white font-bold'
                            : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                        }`}
                      >
                        Official Light (Black Text)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          updateField('branding', {
                            customLogoUrl: '/public/assets/aistudio/WhatsApp_Image_2026-10-05_at_1.50.00_PM-removebg-preview_5adf7cc5.png',
                            useOfficialVectorLogo: false,
                          });
                          showToast('Switched to Uploaded WhatsApp Asset');
                        }}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border cursor-pointer transition-all ${
                          content.branding.customLogoUrl?.includes('WhatsApp_Image')
                            ? 'bg-[#0066ff]/25 border-[#0066ff] text-white font-bold'
                            : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                        }`}
                      >
                        Original Uploaded File
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-300 mb-1.5">
                      Studio Name
                    </label>
                    <input
                      type="text"
                      value={content.branding.studioName}
                      onChange={(e) =>
                        updateField('branding', { studioName: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/15 focus:border-[#0066ff] rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-300 mb-1.5">
                      Studio Tagline / Slogan
                    </label>
                    <input
                      type="text"
                      value={content.branding.studioTagline}
                      onChange={(e) =>
                        updateField('branding', { studioTagline: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/15 focus:border-[#0066ff] rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TYPOGRAPHY & COLOR TAB */}
              {activeTab === 'typography' && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#7fb0ff]">
                        Select Clean Typography Style
                      </label>
                      <span className="text-[11px] text-neutral-400">
                        Current: <strong className="text-white">{content.branding.fontFamily}</strong>
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {fontOptions.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            updateField('branding', { fontFamily: opt.id });
                            showToast(`Font updated to ${opt.label}!`);
                          }}
                          className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                            content.branding.fontFamily === opt.id
                              ? 'border-[#0066ff] bg-[#0066ff]/20 text-white'
                              : 'border-white/10 bg-white/5 text-neutral-300 hover:border-white/25'
                          }`}
                        >
                          <div>
                            <div className="font-bold text-sm text-white flex items-center gap-2">
                              <span>{opt.label}</span>
                              {opt.id === 'Montserrat' && (
                                <span className="text-[10px] bg-[#0066ff] text-white px-2 py-0.5 rounded font-mono">
                                  Default
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-neutral-400 mt-1">{opt.desc}</div>
                          </div>
                          {content.branding.fontFamily === opt.id && (
                            <Check className="w-5 h-5 text-[#0066ff]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#7fb0ff] mb-3">
                      Studio Accent Color
                    </label>
                    <div className="grid grid-cols-2 gap-2.5 mb-3">
                      {colorPresets.map((preset) => (
                        <button
                          key={preset.hex}
                          type="button"
                          onClick={() => {
                            updateField('branding', { accentColor: preset.hex });
                            showToast(`Accent color changed to ${preset.name}!`);
                          }}
                          className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left cursor-pointer ${
                            content.branding.accentColor.toLowerCase() ===
                            preset.hex.toLowerCase()
                              ? 'border-white bg-white/10'
                              : 'border-white/10 bg-white/5'
                          }`}
                        >
                          <span
                            className="w-5 h-5 rounded-full border border-white/20 shrink-0"
                            style={{ backgroundColor: preset.hex }}
                          />
                          <span className="text-xs font-semibold text-neutral-200 truncate">
                            {preset.name}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-neutral-400">Custom Hex:</span>
                      <input
                        type="text"
                        value={content.branding.accentColor}
                        onChange={(e) =>
                          updateField('branding', { accentColor: e.target.value })
                        }
                        className="bg-white/5 border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white font-mono w-28 uppercase"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* HERO SECTION TAB */}
              {activeTab === 'hero' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                      Eyebrow Tag
                    </label>
                    <input
                      type="text"
                      value={content.hero.eyebrow}
                      onChange={(e) =>
                        updateField('hero', { eyebrow: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                        Title Line 1
                      </label>
                      <input
                        type="text"
                        value={content.hero.titleLine1}
                        onChange={(e) =>
                          updateField('hero', { titleLine1: e.target.value })
                        }
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                        Title Line 2 (Accent)
                      </label>
                      <input
                        type="text"
                        value={content.hero.titleLine2}
                        onChange={(e) =>
                          updateField('hero', { titleLine2: e.target.value })
                        }
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                      Hero Subtitle / Description
                    </label>
                    <textarea
                      rows={3}
                      value={content.hero.description}
                      onChange={(e) =>
                        updateField('hero', { description: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white resize-none"
                    />
                  </div>

                  <div className="pt-3 border-t border-white/10 space-y-3">
                    <span className="text-xs font-bold text-[#7fb0ff] uppercase tracking-wider block">
                      3 Hero Proof Metrics
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <input
                          type="text"
                          value={content.hero.stat1Value}
                          onChange={(e) =>
                            updateField('hero', { stat1Value: e.target.value })
                          }
                          placeholder="65+"
                          className="w-full bg-white/5 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                        />
                        <input
                          type="text"
                          value={content.hero.stat1Label}
                          onChange={(e) =>
                            updateField('hero', { stat1Label: e.target.value })
                          }
                          className="w-full bg-white/5 border border-white/15 rounded-lg px-2.5 py-1 text-[10px] text-neutral-400 mt-1"
                        />
                      </div>

                      <div>
                        <input
                          type="text"
                          value={content.hero.stat2Value}
                          onChange={(e) =>
                            updateField('hero', { stat2Value: e.target.value })
                          }
                          placeholder="98%"
                          className="w-full bg-white/5 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                        />
                        <input
                          type="text"
                          value={content.hero.stat2Label}
                          onChange={(e) =>
                            updateField('hero', { stat2Label: e.target.value })
                          }
                          className="w-full bg-white/5 border border-white/15 rounded-lg px-2.5 py-1 text-[10px] text-neutral-400 mt-1"
                        />
                      </div>

                      <div>
                        <input
                          type="text"
                          value={content.hero.stat3Value}
                          onChange={(e) =>
                            updateField('hero', { stat3Value: e.target.value })
                          }
                          placeholder="$42M+"
                          className="w-full bg-white/5 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                        />
                        <input
                          type="text"
                          value={content.hero.stat3Label}
                          onChange={(e) =>
                            updateField('hero', { stat3Label: e.target.value })
                          }
                          className="w-full bg-white/5 border border-white/15 rounded-lg px-2.5 py-1 text-[10px] text-neutral-400 mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SERVICES TAB */}
              {activeTab === 'services' && (
                <div className="space-y-4">
                  <div className="text-xs text-neutral-400 mb-2">
                    Edit any of the 8 studio services directly:
                  </div>

                  <div className="space-y-2.5">
                    {content.services.map((svc, idx) => {
                      const isExpanded = expandedService === idx;
                      return (
                        <div
                          key={svc.id}
                          className="border border-white/10 rounded-xl bg-white/5 overflow-hidden"
                        >
                          <div
                            onClick={() =>
                              setExpandedService(isExpanded ? null : idx)
                            }
                            className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-white/5"
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-xs text-[#0066ff] font-bold">
                                {svc.number}
                              </span>
                              <span className="text-sm font-bold text-white">
                                {svc.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-neutral-400">
                              <span>{svc.symbol}</span>
                              {isExpanded ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </div>
                          </div>

                          {isExpanded && (
                            <div className="p-4 pt-2 border-t border-white/10 space-y-3 text-xs bg-black/30">
                              <div>
                                <label className="text-neutral-400 block mb-1">Title</label>
                                <input
                                  type="text"
                                  value={svc.title}
                                  onChange={(e) => {
                                    const next = [...content.services];
                                    next[idx] = { ...next[idx], title: e.target.value };
                                    updateField('services', next as any);
                                  }}
                                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-1.5 text-white"
                                />
                              </div>

                              <div>
                                <label className="text-neutral-400 block mb-1">Description</label>
                                <textarea
                                  rows={2}
                                  value={svc.description}
                                  onChange={(e) => {
                                    const next = [...content.services];
                                    next[idx] = { ...next[idx], description: e.target.value };
                                    updateField('services', next as any);
                                  }}
                                  className="w-full bg-white/5 border border-white/15 rounded-lg p-2.5 text-white resize-none"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="text-neutral-400 block mb-1">Timeline</label>
                                  <input
                                    type="text"
                                    value={svc.timeline}
                                    onChange={(e) => {
                                      const next = [...content.services];
                                      next[idx] = { ...next[idx], timeline: e.target.value };
                                      updateField('services', next as any);
                                    }}
                                    className="w-full bg-white/5 border border-white/15 rounded-lg px-2.5 py-1 text-white"
                                  />
                                </div>
                                <div>
                                  <label className="text-neutral-400 block mb-1">Benchmark Metric</label>
                                  <input
                                    type="text"
                                    value={svc.keyMetric}
                                    onChange={(e) => {
                                      const next = [...content.services];
                                      next[idx] = { ...next[idx], keyMetric: e.target.value };
                                      updateField('services', next as any);
                                    }}
                                    className="w-full bg-white/5 border border-white/15 rounded-lg px-2.5 py-1 text-white"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* WORK / PROJECTS TAB */}
              {activeTab === 'work' && (
                <div className="space-y-4">
                  <div className="text-xs text-neutral-400 mb-2">
                    Modify client case studies and metrics:
                  </div>

                  <div className="space-y-3">
                    {content.projects.map((proj, pIdx) => {
                      const isExpanded = expandedProject === pIdx;
                      return (
                        <div
                          key={proj.id}
                          className="border border-white/10 rounded-xl bg-white/5 overflow-hidden"
                        >
                          <div
                            onClick={() =>
                              setExpandedProject(isExpanded ? null : pIdx)
                            }
                            className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-white/5"
                          >
                            <div>
                              <div className="text-xs font-mono text-[#8bb5ff]">
                                {proj.category}
                              </div>
                              <div className="text-sm font-bold text-white">
                                {proj.title}
                              </div>
                            </div>
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-neutral-400" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-neutral-400" />
                            )}
                          </div>

                          {isExpanded && (
                            <div className="p-4 pt-2 border-t border-white/10 space-y-3 text-xs bg-black/30">
                              <div>
                                <label className="text-neutral-400 block mb-1">Project Name</label>
                                <input
                                  type="text"
                                  value={proj.title}
                                  onChange={(e) => {
                                    const next = [...content.projects];
                                    next[pIdx] = { ...next[pIdx], title: e.target.value };
                                    updateField('projects', next as any);
                                  }}
                                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-1.5 text-white"
                                />
                              </div>

                              <div>
                                <label className="text-neutral-400 block mb-1">Client Name</label>
                                <input
                                  type="text"
                                  value={proj.client}
                                  onChange={(e) => {
                                    const next = [...content.projects];
                                    next[pIdx] = { ...next[pIdx], client: e.target.value };
                                    updateField('projects', next as any);
                                  }}
                                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-1.5 text-white"
                                />
                              </div>

                              <div>
                                <label className="text-neutral-400 block mb-1">Summary Description</label>
                                <textarea
                                  rows={2}
                                  value={proj.summary}
                                  onChange={(e) => {
                                    const next = [...content.projects];
                                    next[pIdx] = { ...next[pIdx], summary: e.target.value };
                                    updateField('projects', next as any);
                                  }}
                                  className="w-full bg-white/5 border border-white/15 rounded-lg p-2 text-white resize-none"
                                />
                              </div>

                              <div>
                                <label className="text-neutral-400 block mb-1">Project Image URL</label>
                                <input
                                  type="text"
                                  value={proj.image}
                                  onChange={(e) => {
                                    const next = [...content.projects];
                                    next[pIdx] = { ...next[pIdx], image: e.target.value };
                                    updateField('projects', next as any);
                                  }}
                                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-1.5 text-white font-mono text-[11px]"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* E-BOOK / GUIDE TAB */}
              {activeTab === 'ebook' && (
                <div className="space-y-4">
                  <div className="text-xs text-neutral-400 mb-2">
                    Manage the studio's executive eBook publication:
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                      Publication Title
                    </label>
                    <input
                      type="text"
                      value={content.ebook.title}
                      onChange={(e) =>
                        updateField('ebook', { ...content.ebook, title: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                      Subtitle / Hook
                    </label>
                    <input
                      type="text"
                      value={content.ebook.subtitle}
                      onChange={(e) =>
                        updateField('ebook', { ...content.ebook, subtitle: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      value={content.ebook.badge}
                      onChange={(e) =>
                        updateField('ebook', { ...content.ebook, badge: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                      Overview Description
                    </label>
                    <textarea
                      rows={3}
                      value={content.ebook.description}
                      onChange={(e) =>
                        updateField('ebook', { ...content.ebook, description: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                        Page Count
                      </label>
                      <input
                        type="text"
                        value={content.ebook.pageCount}
                        onChange={(e) =>
                          updateField('ebook', { ...content.ebook, pageCount: e.target.value })
                        }
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                        Download Count
                      </label>
                      <input
                        type="text"
                        value={content.ebook.downloadCount}
                        onChange={(e) =>
                          updateField('ebook', { ...content.ebook, downloadCount: e.target.value })
                        }
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                      Cover Image URL
                    </label>
                    <input
                      type="text"
                      value={content.ebook.coverImage}
                      onChange={(e) =>
                        updateField('ebook', { ...content.ebook, coverImage: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white font-mono text-xs"
                    />
                  </div>
                </div>
              )}

              {/* REVIEWS & TESTIMONIALS TAB */}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white uppercase tracking-wider">
                        Client Testimonials & Ratings
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        {content.reviews.length} verified reviews live on the website
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setNewReviewOpen(!newReviewOpen)}
                      className="px-3 py-1.5 rounded-lg bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{newReviewOpen ? 'Close Form' : 'Add Review'}</span>
                    </button>
                  </div>

                  {/* Add New Review Form */}
                  {newReviewOpen && (
                    <div className="p-4 rounded-xl bg-black/40 border border-[#0066ff]/40 space-y-3 text-xs animate-in fade-in duration-150">
                      <div className="font-bold text-[#7fb0ff] uppercase text-[11px]">
                        Add New Client Review
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-neutral-400 block mb-1">Client Name *</label>
                          <input
                            type="text"
                            placeholder="Alex Morgan"
                            value={newClientName}
                            onChange={(e) => setNewClientName(e.target.value)}
                            className="w-full bg-white/5 border border-white/15 rounded-lg px-2.5 py-1.5 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-neutral-400 block mb-1">Company *</label>
                          <input
                            type="text"
                            placeholder="Vanguard Robotics"
                            value={newCompany}
                            onChange={(e) => setNewCompany(e.target.value)}
                            className="w-full bg-white/5 border border-white/15 rounded-lg px-2.5 py-1.5 text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-neutral-400 block mb-1">Client Role</label>
                          <input
                            type="text"
                            placeholder="Founder & CEO"
                            value={newClientRole}
                            onChange={(e) => setNewClientRole(e.target.value)}
                            className="w-full bg-white/5 border border-white/15 rounded-lg px-2.5 py-1.5 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-neutral-400 block mb-1">Rating (1-5)</label>
                          <select
                            value={newRating}
                            onChange={(e) => setNewRating(Number(e.target.value))}
                            className="w-full bg-[#181818] border border-white/15 rounded-lg px-2.5 py-1.5 text-white"
                          >
                            <option value={5}>5 Stars (Exceptional)</option>
                            <option value={4}>4 Stars (Very Good)</option>
                            <option value={3}>3 Stars (Average)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-neutral-400 block mb-1">Service Delivered</label>
                        <input
                          type="text"
                          placeholder="3D Animation / Viral Reels"
                          value={newProject}
                          onChange={(e) => setNewProject(e.target.value)}
                          className="w-full bg-white/5 border border-white/15 rounded-lg px-2.5 py-1.5 text-white"
                        />
                      </div>

                      <div>
                        <label className="text-neutral-400 block mb-1">Review Text *</label>
                        <textarea
                          rows={2}
                          placeholder="What did the client say about The Motive Studio?"
                          value={newText}
                          onChange={(e) => setNewText(e.target.value)}
                          className="w-full bg-white/5 border border-white/15 rounded-lg p-2 text-white resize-none"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (!newClientName || !newText || !newCompany) {
                            alert('Please fill out client name, company, and review text.');
                            return;
                          }
                          addReview({
                            clientName: newClientName,
                            clientRole: newClientRole,
                            company: newCompany,
                            rating: newRating,
                            projectDelivered: newProject,
                            reviewText: newText,
                            verified: true,
                          });
                          setNewClientName('');
                          setNewCompany('');
                          setNewText('');
                          setNewReviewOpen(false);
                        }}
                        className="w-full py-2 bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
                      >
                        Publish Review to Website
                      </button>
                    </div>
                  )}

                  {/* Reviews List */}
                  <div className="space-y-2.5">
                    {content.reviews.map((rev, rIdx) => {
                      const isExpanded = expandedReview === rIdx;
                      return (
                        <div
                          key={rev.id}
                          className="border border-white/10 rounded-xl bg-white/5 overflow-hidden"
                        >
                          <div
                            onClick={() =>
                              setExpandedReview(isExpanded ? null : rIdx)
                            }
                            className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-white/5"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex text-amber-400">
                                {[...Array(rev.rating)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-amber-400" />
                                ))}
                              </div>
                              <span className="text-xs font-bold text-white">
                                {rev.clientName}
                              </span>
                              <span className="text-[11px] text-neutral-400">
                                ({rev.company})
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteReview(rev.id);
                                }}
                                className="p-1 text-neutral-400 hover:text-red-400 transition-colors"
                                title="Delete review"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                              {isExpanded ? (
                                <ChevronDown className="w-4 h-4 text-neutral-400" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-neutral-400" />
                              )}
                            </div>
                          </div>

                          {isExpanded && (
                            <div className="p-4 pt-2 border-t border-white/10 space-y-2.5 text-xs bg-black/30">
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="text-neutral-400 block mb-1">Name</label>
                                  <input
                                    type="text"
                                    value={rev.clientName}
                                    onChange={(e) =>
                                      updateReview(rev.id, { clientName: e.target.value })
                                    }
                                    className="w-full bg-white/5 border border-white/15 rounded-lg px-2.5 py-1 text-white"
                                  />
                                </div>
                                <div>
                                  <label className="text-neutral-400 block mb-1">Company</label>
                                  <input
                                    type="text"
                                    value={rev.company}
                                    onChange={(e) =>
                                      updateReview(rev.id, { company: e.target.value })
                                    }
                                    className="w-full bg-white/5 border border-white/15 rounded-lg px-2.5 py-1 text-white"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="text-neutral-400 block mb-1">Project Delivered</label>
                                <input
                                  type="text"
                                  value={rev.projectDelivered}
                                  onChange={(e) =>
                                    updateReview(rev.id, { projectDelivered: e.target.value })
                                  }
                                  className="w-full bg-white/5 border border-white/15 rounded-lg px-2.5 py-1 text-white"
                                />
                              </div>

                              <div>
                                <label className="text-neutral-400 block mb-1">Review Text</label>
                                <textarea
                                  rows={3}
                                  value={rev.reviewText}
                                  onChange={(e) =>
                                    updateReview(rev.id, { reviewText: e.target.value })
                                  }
                                  className="w-full bg-white/5 border border-white/15 rounded-lg p-2 text-white resize-none"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ABOUT SECTION TAB */}
              {activeTab === 'about' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                      Headline
                    </label>
                    <input
                      type="text"
                      value={content.about.headline}
                      onChange={(e) =>
                        updateField('about', { headline: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                      Subheadline (Accent Blue)
                    </label>
                    <input
                      type="text"
                      value={content.about.subheadline}
                      onChange={(e) =>
                        updateField('about', { subheadline: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                      Studio Manifesto Paragraph 1
                    </label>
                    <textarea
                      rows={3}
                      value={content.about.p1}
                      onChange={(e) =>
                        updateField('about', { p1: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                      Studio Manifesto Paragraph 2
                    </label>
                    <textarea
                      rows={3}
                      value={content.about.p2}
                      onChange={(e) =>
                        updateField('about', { p2: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white resize-none"
                    />
                  </div>
                </div>
              )}

              {/* CONTACT INFO TAB */}
              {activeTab === 'contact' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                      Official Contact Email
                    </label>
                    <input
                      type="email"
                      value={content.contact.email}
                      onChange={(e) =>
                        updateField('contact', { email: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                      Phone Number / WhatsApp
                    </label>
                    <input
                      type="text"
                      value={content.contact.phone}
                      onChange={(e) =>
                        updateField('contact', { phone: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                      Studio Location
                    </label>
                    <input
                      type="text"
                      value={content.contact.location}
                      onChange={(e) =>
                        updateField('contact', { location: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                      Inquiry Pitch Intro
                    </label>
                    <textarea
                      rows={3}
                      value={content.contact.description}
                      onChange={(e) =>
                        updateField('contact', { description: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white resize-none"
                    />
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#7fb0ff]">
                      Social Media Links (Icons)
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                        LinkedIn URL
                      </label>
                      <input
                        type="url"
                        value={content.socials?.linkedin || ''}
                        onChange={(e) =>
                          updateField('socials', { ...content.socials, linkedin: e.target.value })
                        }
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2 text-xs text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                        Facebook URL
                      </label>
                      <input
                        type="url"
                        value={content.socials?.facebook || ''}
                        onChange={(e) =>
                          updateField('socials', { ...content.socials, facebook: e.target.value })
                        }
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2 text-xs text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                        Instagram URL
                      </label>
                      <input
                        type="url"
                        value={content.socials?.instagram || ''}
                        onChange={(e) =>
                          updateField('socials', { ...content.socials, instagram: e.target.value })
                        }
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PASSWORD & SECURITY TAB */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-[#0066ff]/10 border border-[#0066ff]/30 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#7fb0ff] uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4 text-[#0066ff]" />
                      <span>Admin Password Management</span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Update the master passcode required to unlock the Studio CMS Editor.
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setPasscodeError('');

                      const defaultPasscodes = ['motive2026', 'themotivestudio', 'zara&eman', 'zarakhan', 'emantariq'];
                      const savedCustom = localStorage.getItem('motive_custom_admin_passcode');
                      const cleanCurrent = currentPasscode.trim();

                      const isCurrentValid = savedCustom
                        ? cleanCurrent === savedCustom || cleanCurrent.toLowerCase() === savedCustom.toLowerCase()
                        : defaultPasscodes.includes(cleanCurrent.toLowerCase());

                      if (!isCurrentValid) {
                        setPasscodeError('Current password is incorrect.');
                        return;
                      }

                      if (newPasscode.trim().length < 4) {
                        setPasscodeError('New password must be at least 4 characters long.');
                        return;
                      }

                      if (newPasscode.trim() !== confirmPasscode.trim()) {
                        setPasscodeError('New password and confirmation do not match.');
                        return;
                      }

                      localStorage.setItem('motive_custom_admin_passcode', newPasscode.trim());
                      setCurrentPasscode('');
                      setNewPasscode('');
                      setConfirmPasscode('');
                      showToast('Admin password updated successfully!');
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-300 mb-1.5">
                        Current Password *
                      </label>
                      <input
                        type="password"
                        required
                        value={currentPasscode}
                        onChange={(e) => {
                          setCurrentPasscode(e.target.value);
                          if (passcodeError) setPasscodeError('');
                        }}
                        placeholder="Enter current password..."
                        className="w-full bg-white/5 border border-white/15 focus:border-[#0066ff] rounded-xl px-4 py-2.5 text-sm text-white outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-300 mb-1.5">
                        New Password *
                      </label>
                      <input
                        type="password"
                        required
                        value={newPasscode}
                        onChange={(e) => {
                          setNewPasscode(e.target.value);
                          if (passcodeError) setPasscodeError('');
                        }}
                        placeholder="Enter new password..."
                        className="w-full bg-white/5 border border-white/15 focus:border-[#0066ff] rounded-xl px-4 py-2.5 text-sm text-white outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-300 mb-1.5">
                        Confirm New Password *
                      </label>
                      <input
                        type="password"
                        required
                        value={confirmPasscode}
                        onChange={(e) => {
                          setConfirmPasscode(e.target.value);
                          if (passcodeError) setPasscodeError('');
                        }}
                        placeholder="Confirm new password..."
                        className="w-full bg-white/5 border border-white/15 focus:border-[#0066ff] rounded-xl px-4 py-2.5 text-sm text-white outline-none font-mono"
                      />
                    </div>

                    {passcodeError && (
                      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                        {passcodeError}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs font-bold transition-colors cursor-pointer shadow-lg shadow-[#0066ff]/20"
                    >
                      Save New Password
                    </button>
                  </form>

                  {localStorage.getItem('motive_custom_admin_passcode') && (
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs text-neutral-400">
                        Custom password is currently active.
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          localStorage.removeItem('motive_custom_admin_passcode');
                          showToast('Password reset to default founder passcodes.');
                        }}
                        className="text-xs font-semibold text-rose-400 hover:text-rose-300 underline cursor-pointer"
                      >
                        Reset to Default Password
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-4 sm:p-5 border-t border-white/10 bg-[#111111] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadContentJson}
                  className="px-3 py-2 rounded-lg bg-[#0066ff]/20 hover:bg-[#0066ff]/30 text-white border border-[#0066ff]/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  title="Download content.json to commit to public/ folder for Vercel/GitHub permanent live hosting"
                >
                  <FileText className="w-3.5 h-3.5 text-[#7fb0ff]" />
                  <span>Download content.json (For Vercel)</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportJSON}
                  className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-neutral-300 flex items-center gap-1.5 cursor-pointer"
                  title="Export configuration backup as JSON"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Backup JSON</span>
                </button>

                <label className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-neutral-300 flex items-center gap-1.5 cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Import</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJSON}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={saveToServer}
                  disabled={isSaving}
                  className="px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-md shadow-emerald-600/25"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSaving ? 'animate-spin' : ''}`} />
                  <span>{isSaving ? 'Publishing...' : 'Save & Publish Live'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
