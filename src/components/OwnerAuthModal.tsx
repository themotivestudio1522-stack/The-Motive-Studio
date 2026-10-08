import React, { useState, useEffect } from 'react';
import { Lock, KeyRound, X, ShieldCheck, Check, AlertCircle } from 'lucide-react';
import { useStudioContent } from '../context/StudioContentContext';
import { MotiveLogo } from './MotiveLogo';

interface OwnerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const OwnerAuthModal: React.FC<OwnerAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const { showToast } = useStudioContent();

  useEffect(() => {
    if (isOpen) {
      setPasscode('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const defaultPasscodes = ['motive2026', 'themotivestudio', 'zara&eman', 'zarakhan', 'emantariq'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      const cleanInput = passcode.trim();
      const customPasscode = localStorage.getItem('motive_custom_admin_passcode');

      const isAuthenticated = customPasscode
        ? cleanInput === customPasscode || cleanInput.toLowerCase() === customPasscode.toLowerCase()
        : defaultPasscodes.includes(cleanInput.toLowerCase());

      if (isAuthenticated) {
        sessionStorage.setItem('motive_owner_authenticated', 'true');
        showToast('Access Granted · Studio CMS Unlocked for Leadership');
        onSuccess();
        onClose();
      } else {
        setError('Incorrect passcode. Access is restricted to Studio Founders (Eman Tariq & Zara Amin Khan).');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-[#161616] border border-white/20 rounded-3xl p-6 sm:p-8 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-6 pb-4 border-b border-white/10">
          <MotiveLogo variant="horizontal" theme="dark" className="h-9" />
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#0066ff]/20 text-[#0066ff] flex items-center justify-center font-bold">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#7fb0ff] font-bold">
              Restricted Area
            </div>
            <h3 className="font-display text-xl font-black text-white">
              Studio Leadership Access
            </h3>
          </div>
        </div>

        <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
          This content management console is exclusively reserved for Studio Founders (<strong>Eman Tariq</strong> &amp; <strong>Zara Amin Khan</strong>). Please enter your master passcode to edit website content.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              Founder Passcode
            </label>
            <div className="relative">
              <input
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter owner passcode..."
                autoFocus
                className="w-full bg-black/50 border border-white/20 focus:border-[#0066ff] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors font-mono"
              />
              <KeyRound className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isVerifying || !passcode.trim()}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold py-3 rounded-xl text-sm transition-all duration-150 disabled:opacity-50 cursor-pointer shadow-lg shadow-[#0066ff]/25"
            >
              {isVerifying ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Unlock Studio Editor</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-white/10 text-center text-[11px] text-neutral-500">
          Client preview mode active · Public visitors cannot modify live data.
        </div>
      </div>
    </div>
  );
};
