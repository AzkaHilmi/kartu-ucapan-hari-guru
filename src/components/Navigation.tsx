/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Share2, Printer } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface NavigationProps {
  onOpenCustomizer: () => void;
  onPrint: () => void;
  onResetToEnvelope: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenCustomizer,
  onPrint,
  onResetToEnvelope,
}) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    setIsPlayingMusic(soundEngine.getIsPlaying());
  }, []);

  const handleToggleMusic = () => {
    const nextState = soundEngine.toggleBgm((playing) => {
      setIsPlayingMusic(playing);
    });
    setIsPlayingMusic(nextState);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-all no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Wordmark */}
        <button
          onClick={onResetToEnvelope}
          title="Kembali ke tampilan amplop pembuka"
          className="text-left group cursor-pointer"
        >
          <span className="text-lg sm:text-xl font-serif font-bold text-stone-900 tracking-tight whitespace-nowrap shrink-0 group-hover:text-amber-900 transition-colors">
            Apresiasi Hari Guru
          </span>
          <span className="block text-[10px] text-stone-500 font-sans uppercase tracking-widest -mt-1">
            25 November · Pahlawan Pendidikan
          </span>
        </button>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-sans font-medium text-stone-600">
          <a href="#surat-apresiasi" className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">
            Surat Apresiasi
          </a>
          <a href="#pita-kehormatan" className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">
            Pita Kehormatan
          </a>
          <a href="#lentera-doa" className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">
            Lentera Doa
          </a>
          <a href="#kutipan-pendidikan" className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">
            Kutipan Agung
          </a>
        </nav>

        {/* Zone 3: Actions (Music toggle + Primary Action button) */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Subtle Ambient Music Toggle */}
          <button
            onClick={handleToggleMusic}
            title={isPlayingMusic ? 'Hentikan Musik Suasana' : 'Putar Musik Suasana yang Menenangkan'}
            className={`p-2 rounded-lg border transition-colors flex items-center gap-1.5 text-xs font-sans ${
              isPlayingMusic
                ? 'bg-amber-100/80 border-amber-300 text-amber-900'
                : 'bg-stone-100/80 hover:bg-stone-200 border-stone-200 text-stone-600'
            }`}
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-4 h-4 text-amber-700 animate-pulse" />
                <span className="hidden sm:inline text-[11px] font-medium">Musik Menyala</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-stone-500" />
                <span className="hidden sm:inline text-[11px]">Putar Musik</span>
              </>
            )}
          </button>

          {/* Print Button */}
          <button
            onClick={onPrint}
            title="Cetak Piagam / Simpan PDF"
            className="p-2 rounded-lg border border-stone-200 bg-stone-100/80 hover:bg-stone-200 text-stone-600 transition-colors hidden sm:flex items-center"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Primary Action: Share & Customize Link */}
          <button
            onClick={onOpenCustomizer}
            className="px-3.5 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg shadow-sm transition-all flex items-center gap-2 whitespace-nowrap shrink-0 hover:shadow"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-300" />
            <span>Bagikan / Buat Link</span>
          </button>
        </div>
      </div>
    </header>
  );
};
