import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Headphones,
  Minimize2,
  RefreshCw,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import { useStudioContent } from '../context/StudioContentContext';
import { generateStudioConciergeResponse, ConciergeAction } from '../utils/studioConcierge';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actions?: ConciergeAction[];
}

interface StudioChatbotProps {
  onStartProject: () => void;
  onOpenEbookModal?: () => void;
}

export const StudioChatbot: React.FC<StudioChatbotProps> = ({ onStartProject, onOpenEbookModal }) => {
  const { content } = useStudioContent();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: ChatMessage[] = [
    {
      id: 'msg-1',
      sender: 'bot',
      text: `Hello! Welcome to The Motive Studio Client Desk. Directed by Eman Tariq (CEO) and Zara Amin Khan (Co-Founder).

We engineer 2D & 3D Animation, Video Editing, Viral Reels, Executive E-Books ("The Motive Playbook"), Brand Identity, and Full-Stack Web Builds. How can our creative directors assist you today?`,
      timestamp: 'Just now',
      actions: [
        { label: '🎬 2D & 3D Animation', action: 'animation' },
        { label: '⚡ Viral Reels & Editing', action: 'video' },
        { label: '💰 Pricing & Budgets', action: 'pricing' },
        { label: '📖 The Motive Playbook', action: 'ebook' },
        { label: '💬 Start a Project', action: 'contact' },
      ],
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setInput('');
    setIsTyping(true);

    try {
      // Call server /api/chat with conversation history
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: updatedHistory.map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: `bot-${Date.now()}`,
              sender: 'bot',
              text: data.reply,
              timestamp: 'Just now',
              actions: data.actions || generateStudioConciergeResponse(query, updatedHistory).actions,
            },
          ]);
          return;
        }
      }
    } catch (e) {
      // Network failure, fallback to local studio engine
    }

    // Direct multi-turn local fallback engine
    setTimeout(() => {
      const result = generateStudioConciergeResponse(query, updatedHistory);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: result.reply,
          timestamp: 'Just now',
          actions: result.actions,
        },
      ]);
    }, 450);
  };

  const handleActionClick = (act: ConciergeAction) => {
    const action = act.action;

    if (action === 'contact') {
      setIsOpen(false);
      onStartProject();
    } else if (action === 'whatsapp') {
      window.open(
        'https://wa.me/923141025918?text=Hello%20The%20Motive%20Studio%20Team!%20I%20would%20like%20to%20discuss%20a%20project.',
        '_blank',
        'noopener,noreferrer'
      );
    } else if (action === 'copy_email') {
      navigator.clipboard?.writeText('themotivestudio1522@gmail.com');
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 3000);
    } else if (action === 'linkedin') {
      window.open(
        content.socials?.linkedin ||
          'https://www.linkedin.com/public-profile/settings/?trk=d_flagship3_profile_self_view_public_profile&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B6nDsZNWyQherCT0HW%2B%2FclA%3D%3D',
        '_blank',
        'noopener,noreferrer'
      );
    } else if (action === 'drive_master') {
      window.open(
        'https://drive.google.com/drive/folders/1lQRNikZqauoSauelA4HnizeuOJos5RET?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto',
        '_blank',
        'noopener,noreferrer'
      );
    } else if (action === 'drive_3d') {
      window.open(
        'https://drive.google.com/drive/folders/17MhPKC28xcSzgSNxKmtlUx-7G4sSxwLC?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto',
        '_blank',
        'noopener,noreferrer'
      );
    } else if (action === 'drive_uiux') {
      window.open(
        'https://drive.google.com/drive/folders/1oNbT1oDarigVI8ct_0-N_CgYilWREhtU?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto',
        '_blank',
        'noopener,noreferrer'
      );
    } else if (action === 'drive_brand') {
      window.open(
        'https://drive.google.com/drive/folders/1QW5eBu9DmLPwA94n4a71E9x4OWTTGqgX?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto',
        '_blank',
        'noopener,noreferrer'
      );
    } else if (action === 'ebook_modal') {
      if (onOpenEbookModal) {
        setIsOpen(false);
        onOpenEbookModal();
      } else {
        setIsOpen(false);
        document.getElementById('ebook')?.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (action === 'ebook_section') {
      setIsOpen(false);
      document.getElementById('ebook')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'services') {
      setIsOpen(false);
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'work') {
      setIsOpen(false);
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'reviews') {
      setIsOpen(false);
      document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'about') {
      setIsOpen(false);
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'process') {
      setIsOpen(false);
      document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'animation') {
      handleSendMessage('Tell me about your 2D and 3D animation services');
    } else if (action === 'video') {
      handleSendMessage('What are your video editing and viral reels packages?');
    } else if (action === 'pricing') {
      handleSendMessage('What is your pricing and project budget ranges?');
    } else if (action === 'ebook') {
      handleSendMessage('Tell me about The Motive Playbook e-book and custom book publishing');
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Bubble (Bottom-Left) */}
      <div className="fixed bottom-6 left-6 z-40">
        {!isOpen ? (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 bg-[#181c24] hover:bg-[#11141a] text-white px-5 py-3.5 rounded-full border border-white/20 shadow-2xl hover:border-[#0066ff] hover:shadow-[#0066ff]/35 transition-all duration-200 cursor-pointer group"
            aria-label="Open Studio Client Desk"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-[#0066ff] flex items-center justify-center text-white">
                <MessageSquare className="w-4 h-4" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#181c24]" />
            </div>

            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold leading-tight">Studio Client Desk</div>
              <div className="text-[10px] text-neutral-400 leading-tight">Direct Project Concierge</div>
            </div>
          </button>
        ) : null}
      </div>

      {/* Floating Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-[#181c24] border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          {/* Header */}
          <div className="p-4 bg-[#12161f] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-[#0066ff] text-white flex items-center justify-center font-bold">
                  <Headphones className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-[#12161f]" />
              </div>

              <div>
                <h4 className="font-display font-extrabold text-sm text-white flex items-center gap-1.5">
                  <span>The Motive Client Desk</span>
                  <span className="text-[9px] bg-[#0066ff]/30 text-[#7fb0ff] px-1.5 py-0.5 rounded font-mono font-bold">
                    Official
                  </span>
                </h4>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span>Online · Direct leadership response</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMessages(initialMessages)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
                title="Reset conversation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
                aria-label="Close chat"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Copied Email Toast inside chat */}
          {copiedNotification && (
            <div className="bg-emerald-500/20 border-b border-emerald-500/30 px-3 py-1.5 text-[11px] text-emerald-300 flex items-center justify-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>themotivestudio1522@gmail.com copied to clipboard!</span>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-[#0066ff]/20 text-[#0066ff] flex items-center justify-center shrink-0 mt-0.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-2`}>
                  <div
                    className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-[#0066ff] text-white rounded-tr-sm shadow-md'
                        : 'bg-white/5 border border-white/10 text-neutral-200 rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Contextual Action Chips */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.actions.map((act) => (
                        <button
                          key={act.label}
                          type="button"
                          onClick={() => handleActionClick(act)}
                          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#0066ff] text-white text-[11px] font-semibold transition-all cursor-pointer border border-white/15 hover:border-[#0066ff] flex items-center gap-1"
                        >
                          <span>{act.label}</span>
                          {act.action.startsWith('drive_') || act.action === 'whatsapp' || act.action === 'linkedin' ? (
                            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                          ) : null}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-neutral-400 text-xs pl-9">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0066ff] animate-bounce" />
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0066ff] animate-bounce [animation-delay:0.2s]" />
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0066ff] animate-bounce [animation-delay:0.4s]" />
                <span>Concierge is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-[#12161f] border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
            {[
              '3D Animation & CGI',
              'Reels & Video Pricing',
              'The Motive Playbook',
              'Turnaround Times',
              'Contact Founders',
            ].map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleSendMessage(chip)}
                className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#0066ff]/20 text-neutral-300 hover:text-white text-[10px] whitespace-nowrap cursor-pointer transition-colors border border-white/10 hover:border-[#0066ff]/40"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#12161f] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about 2D/3D animation, reels, pricing, ebooks..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-white/5 border border-white/15 focus:border-[#0066ff] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-9 h-9 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-white flex items-center justify-center transition-colors disabled:opacity-40 cursor-pointer shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
