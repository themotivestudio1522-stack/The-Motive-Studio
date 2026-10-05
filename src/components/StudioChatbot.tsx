import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Headphones,
  User,
  ArrowRight,
  PhoneCall,
  Clock,
  CheckCircle2,
  Minimize2,
  RefreshCw,
} from 'lucide-react';
import { useStudioContent } from '../context/StudioContentContext';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actions?: { label: string; action: string }[];
}

interface StudioChatbotProps {
  onStartProject: () => void;
}

export const StudioChatbot: React.FC<StudioChatbotProps> = ({ onStartProject }) => {
  const { content } = useStudioContent();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: ChatMessage[] = [
    {
      id: 'msg-1',
      sender: 'bot',
      text: `Hello! Welcome to The Motive Studio Client Desk. Directed by Eman Tariq (CEO) and Zara Amin Khan (Co-Founder). We specialize in 2D & 3D Animation, Video Editing, Viral Reels, Executive Ebooks, Brand Identity, and High-Performance Web Engineering. How can our creative team assist you today?`,
      timestamp: 'Just now',
      actions: [
        { label: '🎬 2D & 3D Animation', action: 'animation' },
        { label: '⚡ Video Editing & Reels', action: 'video' },
        { label: '📖 Ebook Design', action: 'ebook' },
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

  // Intelligent studio response engine grounded in The Motive Studio offerings
  const generateBotReply = (userQuery: string): { reply: string; actions?: { label: string; action: string }[] } => {
    const q = userQuery.toLowerCase();

    if (q.includes('3d') || q.includes('3d animation') || q.includes('cgi') || q.includes('render')) {
      return {
        reply: `Our 3D Animation & CGI service specializes in photorealistic product renders, spatial camera loops, luxury lighting simulations, and 4K broadcast assets using Blender, Octane, and Cinema 4D. Typical turnaround is 3 to 5 weeks. Would you like to see our 3D case studies or discuss a project brief?`,
        actions: [
          { label: 'View 3D Case Study', action: 'case_study' },
          { label: 'Request 3D Scope', action: 'contact' },
        ],
      };
    }

    if (q.includes('2d') || q.includes('2d animation') || q.includes('motion') || q.includes('lottie')) {
      return {
        reply: `Our 2D Animation & Motion Graphics team creates bespoke character animation, kinetic typography, product explainers, and ultra-smooth 60 FPS Lottie/JSON web micro-interactions. Turnaround is typically 2 to 3 weeks.`,
        actions: [
          { label: 'Inquire for 2D Animation', action: 'contact' },
          { label: 'Explore All Services', action: 'services' },
        ],
      };
    }

    if (q.includes('reel') || q.includes('short') || q.includes('tiktok') || q.includes('instagram')) {
      return {
        reply: `We produce high-retention vertical Reels and Shorts engineered for viral organic reach! We handle hook scripting, dynamic subtitle kinetic typography, sound effects, visual pacing, and batch production. Turnaround is 3–5 days per batch with typical 3.8x organic reach uplifts.`,
        actions: [
          { label: 'Book Reels Batch', action: 'contact' },
          { label: 'See Client Reviews', action: 'reviews' },
        ],
      };
    }

    if (q.includes('video') || q.includes('editing') || q.includes('post production') || q.includes('cut')) {
      return {
        reply: `Our Video Editing & Post-Production covers commercial ads, YouTube brand cuts, documentary storytelling, professional color grading, and custom sound design. We focus on viewer retention curves and high-impact visual rhythm.`,
        actions: [
          { label: 'Get Video Editing Scope', action: 'contact' },
        ],
      };
    }

    if (q.includes('ebook') || q.includes('book') || q.includes('pdf') || q.includes('publishing') || q.includes('guide')) {
      return {
        reply: `Yes, we design complete executive E-Books and publishing systems! This includes custom 3D hardcover mockups, editorial grid typesetting, clickable interactive PDF architecture, and lead-magnet funnels. You can also download our free 48-page publication "The Motive Playbook" directly on this page!`,
        actions: [
          { label: 'Read The Motive Playbook', action: 'ebook_section' },
          { label: 'Order Custom E-Book Design', action: 'contact' },
        ],
      };
    }

    if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('budget')) {
      return {
        reply: `Our project engagements typically range from $2,500 for focused modules (e.g. Reels batch or E-Book design) to $15k–$30k for comprehensive full-stack web builds, 3D CGI packages, or brand identity systems. All code and visual IP is 100% client-owned. Would you like to request a bespoke quote?`,
        actions: [
          { label: 'Request Proposal Quote', action: 'contact' },
        ],
      };
    }

    if (q.includes('contact') || q.includes('hire') || q.includes('call') || q.includes('start') || q.includes('project') || q.includes('email') || q.includes('phone') || q.includes('number')) {
      return {
        reply: `You can reach our leadership directly at themotivestudio1522@gmail.com or via direct phone/WhatsApp at 03141025918 / 0317 3150998. Operating remotely worldwide. Submit your project brief below and we will reply promptly!`,
        actions: [
          { label: 'Open Project Inquiry Form', action: 'contact' },
        ],
      };
    }

    if (q.includes('who') || q.includes('about') || q.includes('motive') || q.includes('founder') || q.includes('ceo') || q.includes('zara') || q.includes('eman')) {
      return {
        reply: `The Motive Studio is an independent creative digital studio founded by Eman Tariq (CEO) and Zara Amin Khan (Co-Founder). Operating remotely worldwide, we combine strategic brand identity, 2D/3D kinetic motion, video editing, and full-stack web engineering under the creed: "Ideas are easy. Execution wins."`,
        actions: [
          { label: 'About Studio Pillars', action: 'about' },
        ],
      };
    }

    // Default response
    return {
      reply: `Thanks for asking! At The Motive Studio, we handle 2D & 3D Animation, Video Editing, Viral Reels, E-Book Design, Brand Identity, and Full-Stack Web Development. Would you like to discuss a specific project scope or schedule an initial discovery call?`,
      actions: [
        { label: 'Start a Project Brief', action: 'contact' },
        { label: 'Explore 12 Services', action: 'services' },
      ],
    };
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Try calling server-side /api/chat if available, otherwise fast smart concierge
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
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
              actions: [
                { label: 'Start Project Brief', action: 'contact' },
                { label: 'Explore Services', action: 'services' },
              ],
            },
          ]);
          return;
        }
      }
    } catch (e) {
      // Fallback to local intelligent studio engine
    }

    // Local studio response engine simulation
    setTimeout(() => {
      const result = generateBotReply(query);
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
    }, 600);
  };

  const handleActionClick = (action: string) => {
    if (action === 'contact') {
      setIsOpen(false);
      onStartProject();
    } else if (action === 'services') {
      setIsOpen(false);
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'reviews') {
      setIsOpen(false);
      document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'ebook_section') {
      setIsOpen(false);
      document.getElementById('ebook')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'case_study') {
      setIsOpen(false);
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'animation') {
      handleSendMessage('Tell me about your 2D and 3D animation services');
    } else if (action === 'video') {
      handleSendMessage('What are your video editing and reels packages?');
    } else if (action === 'ebook') {
      handleSendMessage('Do you design custom e-books and lead magnets?');
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
            className="flex items-center gap-3 bg-[#111111] hover:bg-black text-white px-5 py-3.5 rounded-full border border-white/20 shadow-2xl hover:border-[#0066ff] hover:shadow-[#0066ff]/30 transition-all duration-200 cursor-pointer group"
            aria-label="Open Studio Client Desk"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-[#0066ff] flex items-center justify-center text-white">
                <MessageSquare className="w-4 h-4" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#111111]" />
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
        <div className="fixed bottom-6 left-6 z-50 w-[92vw] sm:w-[400px] h-[550px] max-h-[85vh] bg-[#181818] border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          {/* Header */}
          <div className="p-4 bg-[#111111] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-[#0066ff] text-white flex items-center justify-center font-bold">
                  <Headphones className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-[#111111]" />
              </div>

              <div>
                <h4 className="font-display font-extrabold text-sm text-white flex items-center gap-1.5">
                  <span>The Motive Client Desk</span>
                  <span className="text-[9px] bg-[#0066ff]/30 text-[#7fb0ff] px-1.5 py-0.2 rounded font-mono font-bold">
                    Official
                  </span>
                </h4>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span>Online · Direct studio response</span>
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

                <div className={`max-w-[82%] space-y-2`}>
                  <div
                    className={`p-3.5 rounded-2xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#0066ff] text-white rounded-tr-sm shadow-md'
                        : 'bg-white/5 border border-white/10 text-neutral-200 rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Optional Action Chips */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.actions.map((act) => (
                        <button
                          key={act.label}
                          type="button"
                          onClick={() => handleActionClick(act.action)}
                          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#0066ff] text-white text-[11px] font-semibold transition-colors cursor-pointer border border-white/10"
                        >
                          {act.label}
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
                <span>Studio concierge is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-[#141414] border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
            {[
              '2D vs 3D Animation?',
              'Reels & Video Pricing',
              'Design an E-Book',
              'Start a Project',
            ].map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleSendMessage(chip)}
                className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white text-[10px] whitespace-nowrap cursor-pointer transition-colors border border-white/10"
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
            className="p-3 bg-[#111111] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about animation, reels, e-books, pricing..."
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
