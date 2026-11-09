/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TEACHER_REACTIONS } from '../data/templates';
import { TeacherReaction } from '../types';
import { soundEngine } from '../utils/audio';
import { Flame, Sparkles, HeartHandshake, Check } from 'lucide-react';

interface LanternSectionProps {
  teacherName: string;
}

export const LanternSection: React.FC<LanternSectionProps> = ({ teacherName }) => {
  const [lanternCount, setLanternCount] = useState(1);
  const [isLit, setIsLit] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<TeacherReaction | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('teacher_lantern_count');
      if (saved) {
        setLanternCount(parseInt(saved, 10));
      }
      const savedReaction = localStorage.getItem('teacher_reaction_id');
      if (savedReaction) {
        const found = TEACHER_REACTIONS.find((r) => r.id === savedReaction);
        if (found) setSelectedReaction(found);
      }
    } catch {
      // LocalStorage fallback
    }
  }, []);

  const handleLightLantern = () => {
    soundEngine.playChime();
    setIsLit(true);
    const newCount = lanternCount + 1;
    setLanternCount(newCount);
    try {
      localStorage.setItem('teacher_lantern_count', newCount.toString());
    } catch {
      // Ignored
    }
  };

  const handleSelectReaction = (reaction: TeacherReaction) => {
    soundEngine.playChime();
    setSelectedReaction(reaction);
    try {
      localStorage.setItem('teacher_reaction_id', reaction.id);
    } catch {
      // Ignored
    }
  };

  return (
    <section id="lentera-doa" className="py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Main Lantern Box */}
        <div className="bg-[#FAF6F0] rounded-2xl border border-[#E3D8C8] p-6 sm:p-12 shadow-lg relative overflow-hidden text-center">
          {/* Subtle glow when lit */}
          <div
            className={`absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-amber-400/20 blur-3xl pointer-events-none transition-opacity duration-1000 ${
              isLit ? 'opacity-100 scale-125' : 'opacity-40'
            }`}
          />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/70 text-amber-900 text-xs font-sans font-medium border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Simbol Cahaya & Doa yang Tak Kunjung Padam</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Nyalakan Lentera Apresiasi untuk {teacherName}
            </h2>

            <p className="text-stone-600 font-sans text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Setiap kali lentera ini dinyalakan, sebuah doa tulus dipanjatkan agar Bapak/Ibu Guru 
              senantiasa diberikan kesehatan, ketenteraman hati, dan kemuliaan hidup.
            </p>

            {/* The Interactive Lantern Button */}
            <div className="pt-2">
              <button
                onClick={handleLightLantern}
                className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-sans text-sm font-semibold transition-all duration-300 shadow-md ${
                  isLit
                    ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-500/20 ring-4 ring-amber-200/50'
                    : 'bg-stone-900 hover:bg-stone-800 text-amber-100 shadow-stone-900/10'
                }`}
              >
                <Flame
                  className={`w-5 h-5 transition-transform duration-300 group-hover:scale-125 ${
                    isLit ? 'text-amber-200 animate-bounce' : 'text-amber-400'
                  }`}
                />
                <span>{isLit ? 'Lentera Menyala Terang' : 'Nyalakan Lentera Doa'}</span>
                <span className="text-xs font-normal opacity-80 border-l border-white/20 pl-2">
                  {lanternCount} Pelita Menyala
                </span>
              </button>
            </div>

            {/* Heartfelt Prayer Box */}
            <div className="mt-8 p-5 bg-white/80 rounded-xl border border-stone-200/80 max-w-xl mx-auto text-left space-y-2">
              <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-wider text-amber-900 font-semibold">
                <HeartHandshake className="w-4 h-4 text-amber-700" />
                <span>Untaian Doa Khusus untuk Bapak/Ibu Guru</span>
              </div>
              <p className="font-serif italic text-stone-800 text-sm sm:text-base leading-relaxed">
                &ldquo;Ya Tuhan Yang Maha Pengasih, berkahilah setiap langkah guru-guru kami. Lindungilah mereka dari segala marabahaya, lapangkanlah rezeki mereka, dan karuniakanlah kesehatan lahir batin hingga mereka dapat menyaksikan tunas-tunas yang mereka semai tumbuh menjadi pohon-pohon yang rindang.&rdquo;
              </p>
            </div>

            {/* Interactive Section for the Teacher to React / Leave Blessing */}
            <div className="pt-10 border-t border-stone-200/80 mt-10">
              <div className="space-y-2 mb-6">
                <p className="text-xs font-sans uppercase tracking-widest text-stone-500 font-medium">
                  Khusus untuk Bapak / Ibu Guru
                </p>
                <h3 className="text-xl font-serif font-bold text-stone-900">
                  Kirimkan Pesan Balasan & Restu untuk Murid
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-md mx-auto">
                  Ketuk salah satu pilihan di bawah untuk meninggalkan doa dan restu hangat Bapak/Ibu:
                </p>
              </div>

              {/* Reaction Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {TEACHER_REACTIONS.map((reaction) => {
                  const isChosen = selectedReaction?.id === reaction.id;
                  return (
                    <button
                      key={reaction.id}
                      onClick={() => handleSelectReaction(reaction)}
                      className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-sans font-medium transition-all duration-200 flex items-center gap-2 ${
                        isChosen
                          ? 'bg-amber-900 text-white border-amber-900 shadow-md ring-2 ring-amber-200'
                          : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <span className="text-base">{reaction.emoji}</span>
                      <span>{reaction.label}</span>
                      {isChosen && <Check className="w-3.5 h-3.5 text-amber-300" />}
                    </button>
                  );
                })}
              </div>

              {/* Reply message displayed after selecting */}
              {selectedReaction && (
                <div className="mt-6 max-w-lg mx-auto bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 text-center animate-in fade-in duration-300">
                  <p className="text-xs font-sans uppercase tracking-wider text-amber-900 font-semibold mb-1">
                    Balasan Hangat dari {teacherName}:
                  </p>
                  <p className="font-serif italic text-stone-800 text-sm sm:text-base">
                    &ldquo;{selectedReaction.replyNote}&rdquo;
                  </p>
                  <p className="text-[11px] font-sans text-stone-500 mt-2">
                    Pesan restu ini akan senantiasa tersimpan dalam ingatan murid Anda.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
