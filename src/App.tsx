/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { GreetingData } from './types';
import { parseGreetingFromUrl, generateShareUrl, generateWhatsAppLink } from './utils/url';
import { GreetingCard } from './components/GreetingCard';
import { CustomizeModal } from './components/CustomizeModal';
import { soundEngine } from './utils/audio';
import { Share2, Volume2, VolumeX, MessageSquare, Edit3, Check, RotateCcw } from 'lucide-react';

export default function App() {
  const [greetingData, setGreetingData] = useState<GreetingData>(() => {
    const { data } = parseGreetingFromUrl();
    return data;
  });

  const [isOpen, setIsOpen] = useState<boolean>(() => {
    const { isDirectOpen } = parseGreetingFromUrl();
    return isDirectOpen;
  });

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsPlayingMusic(soundEngine.getIsPlaying());
  }, []);

  // Sync state if user changes URL via back/forward
  useEffect(() => {
    const handlePopState = () => {
      const { data, isDirectOpen } = parseGreetingFromUrl();
      setGreetingData(data);
      if (isDirectOpen) setIsOpen(true);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleMusic = () => {
    const nextState = soundEngine.toggleBgm((playing) => {
      setIsPlayingMusic(playing);
    });
    setIsPlayingMusic(nextState);
  };

  const handleCopyLink = async () => {
    // Generate URL that will open the card directly or show the cover
    const url = generateShareUrl(greetingData, false);
    try {
      await navigator.clipboard.writeText(url);
      soundEngine.playChime();
      triggerToast('Tautan kartu berhasil disalin! Siap dikirim ke guru.');
    } catch {
      setIsCustomizerOpen(true);
    }
  };

  const handleSaveGreeting = (newData: GreetingData) => {
    setGreetingData(newData);
    const newUrl = generateShareUrl(newData, isOpen);
    window.history.replaceState({}, '', newUrl);
    triggerToast('Kartu ucapan berhasil diperbarui!');
  };

  const shareUrl = generateShareUrl(greetingData, false);
  const whatsappUrl = generateWhatsAppLink(greetingData, shareUrl);

  return (
    <div className="min-h-screen bg-[#F6F2EB] text-stone-800 font-sans flex flex-col justify-between py-6 px-4 sm:px-6 relative overflow-x-hidden selection:bg-amber-100 selection:text-amber-900">
      {/* Gentle ambient background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/6 left-1/4 w-96 h-96 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="absolute bottom-1/6 right-1/4 w-96 h-96 rounded-full bg-stone-300/30 blur-3xl" />
      </div>

      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-stone-900 text-amber-50 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-medium animate-in fade-in slide-in-from-top-2 duration-200 no-print">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Minimal Top Control Bar */}
      <header className="max-w-xl w-full mx-auto flex items-center justify-between gap-4 mb-6 relative z-10 no-print">
        <div className="flex items-center gap-2">
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs font-sans text-stone-600 hover:text-stone-900 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-200/60 hover:bg-stone-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Tutup Kartu</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Subtle Ambient Music Toggle */}
          <button
            onClick={handleToggleMusic}
            title={isPlayingMusic ? 'Hentikan Musik Latar' : 'Putar Musik Suasana yang Menenangkan'}
            className={`p-2 rounded-lg border text-xs font-sans flex items-center gap-1.5 transition-colors ${
              isPlayingMusic
                ? 'bg-amber-100/90 border-amber-300 text-amber-900'
                : 'bg-white/80 hover:bg-white border-stone-200 text-stone-600'
            }`}
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-4 h-4 text-amber-700 animate-pulse" />
                <span className="hidden sm:inline text-[11px] font-medium">Musik Menyala</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-stone-400" />
                <span className="hidden sm:inline text-[11px]">Musik Latar</span>
              </>
            )}
          </button>

          {/* Edit / Customize Button */}
          <button
            onClick={() => setIsCustomizerOpen(true)}
            className="px-3 py-2 text-xs font-medium text-stone-700 bg-white/80 hover:bg-white border border-stone-200 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-stone-500" />
            <span>Sesuaikan</span>
          </button>

          {/* Primary Quick Copy Link */}
          <button
            onClick={handleCopyLink}
            className="px-3.5 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-300" />
            <span>Salin Link</span>
          </button>
        </div>
      </header>

      {/* Main Focus: The Simple Elegant Greeting Card */}
      <main className="flex-1 flex items-center justify-center my-auto py-2 relative z-10">
        <GreetingCard
          data={greetingData}
          isOpen={isOpen}
          onToggleOpen={() => setIsOpen(!isOpen)}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />
      </main>

      {/* Minimal Footer & Sharing Actions */}
      <footer className="max-w-xl w-full mx-auto mt-6 text-center space-y-3 relative z-10 no-print">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleCopyLink}
            className="px-4 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded-full shadow-sm hover:bg-stone-50 transition-colors flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-700" />
            <span>Salin Link untuk Dikumpulkan</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full shadow-sm hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>Kirim via WhatsApp</span>
          </a>
        </div>

        <p className="text-[11px] text-stone-400 font-sans">
          Hari Guru Nasional · Pahlawan Tanpa Tanda Jasa
        </p>
      </footer>

      {/* Customizer Modal */}
      <CustomizeModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        initialData={greetingData}
        onSave={handleSaveGreeting}
      />
    </div>
  );
}
