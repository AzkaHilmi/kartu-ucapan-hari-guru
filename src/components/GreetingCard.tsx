/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GreetingData } from '../types';
import { soundEngine } from '../utils/audio';
import { Mail, BookOpen, Sparkles, Heart, RotateCcw } from 'lucide-react';

interface GreetingCardProps {
  data: GreetingData;
  isOpen: boolean;
  onToggleOpen: () => void;
  onOpenCustomizer: () => void;
}

export const GreetingCard: React.FC<GreetingCardProps> = ({
  data,
  isOpen,
  onToggleOpen,
  onOpenCustomizer,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    soundEngine.playChime();
    onToggleOpen();
  };

  const paragraphs = data.message.split('\n\n').filter((p) => p.trim().length > 0);
  const firstPara = paragraphs[0] || '';
  const firstLetter = firstPara.charAt(0);
  const restOfFirstPara = firstPara.slice(1);
  const otherParas = paragraphs.slice(1);

  return (
    <div className="w-full max-w-xl mx-auto perspective-1000">
      {/* The Physical Card Container */}
      <div
        className={`relative transition-all duration-700 ease-out transform ${
          isOpen ? 'scale-100' : 'hover:-translate-y-1'
        }`}
      >
        {!isOpen ? (
          /* ======================================================== */
          /* CARD FRONT COVER (Tampak Depan Kartu)                   */
          /* ======================================================== */
          <div
            onClick={handleCardClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardClick();
              }
            }}
            className="cursor-pointer bg-[#FDFBF7] rounded-3xl p-8 sm:p-12 shadow-2xl shadow-stone-900/10 border border-[#E7DDCF] relative overflow-hidden select-none text-center transition-all duration-300"
          >
            {/* Subtle double deckled border */}
            <div className="absolute inset-3 sm:inset-4 border border-amber-900/15 rounded-2xl pointer-events-none" />
            <div className="absolute inset-4 sm:inset-5 border border-dashed border-amber-900/10 rounded-xl pointer-events-none" />

            {/* Top Ornamental Header */}
            <div className="relative z-10 space-y-2 mb-8">
              <div className="flex items-center justify-center gap-2 text-stone-500 font-sans text-xs uppercase tracking-[0.25em]">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Kartu Ucapan Khusus</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
                Selamat Hari Guru
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 font-serif italic">
                25 November · Pahlawan Tanpa Tanda Jasa
              </p>
            </div>

            {/* Centerpiece: Gold Wax Seal */}
            <div className="relative z-10 flex justify-center my-6">
              <div className="relative group/seal">
                <img
                  src="/src/assets/images/gold_wax_seal_emblem_1794196161325.jpg"
                  alt="Segel Emas Hari Guru"
                  className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover shadow-xl border-2 border-amber-200/80 ring-4 ring-amber-100/70 transition-transform duration-500 ${
                    isHovered ? 'scale-105' : 'scale-100'
                  }`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-1 -right-1 bg-amber-900 text-amber-100 p-2 rounded-full shadow-md">
                  <Heart className="w-4 h-4 fill-amber-300 text-amber-300" />
                </div>
              </div>
            </div>

            {/* Recipient and Sender Details */}
            <div className="relative z-10 space-y-2 my-8 pt-2">
              <span className="text-[11px] font-sans uppercase tracking-widest text-amber-900/80 font-semibold block">
                Dipersembahkan Untuk Yang Terhormat:
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
                {data.teacherName}
              </h2>
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-stone-600 font-sans">
                <span>{data.teacherRole}</span>
                {data.schoolName && (
                  <>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span>{data.schoolName}</span>
                  </>
                )}
              </div>

              <div className="pt-3 text-xs font-sans text-stone-500">
                Dari muridmu yang berterima kasih: <strong className="text-stone-800 font-medium">{data.studentName}</strong>
              </div>
            </div>

            {/* Interactive CTA to Open */}
            <div className="relative z-10 pt-2">
              <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-stone-900 text-amber-50 font-sans text-sm font-medium shadow-md transition-all duration-300 group-hover:bg-amber-950">
                <Mail className="w-4 h-4 text-amber-300" />
                <span>Ketuk untuk Membuka Kartu</span>
              </div>
            </div>

            <p className="relative z-10 mt-4 text-[11px] text-stone-400 font-sans">
              Klik di mana saja pada kartu untuk membuka pesan di dalamnya
            </p>
          </div>
        ) : (
          /* ======================================================== */
          /* CARD INSIDE (Tampak Dalam / Isi Surat Ucapan)           */
          /* ======================================================== */
          <div className="bg-[#FAF6F0] rounded-3xl p-6 sm:p-12 shadow-2xl shadow-stone-900/10 border border-[#E4D9C8] relative overflow-hidden select-text animate-in fade-in zoom-in-95 duration-500">
            {/* Subtle deckled border inside */}
            <div className="absolute inset-3 sm:inset-4 border border-amber-900/10 rounded-2xl pointer-events-none" />

            {/* Card Header Inside */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between pb-6 mb-6 border-b border-stone-300/80 gap-3 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <img
                  src="/src/assets/images/gold_wax_seal_emblem_1794196161325.jpg"
                  alt="Segel Emas"
                  className="w-12 h-12 rounded-full object-cover border border-amber-300 ring-2 ring-amber-100"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-stone-500 font-sans font-semibold block">
                    Warkah Ucapan Terima Kasih
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
                    Kepada Yth. {data.teacherName}
                  </h3>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-sans text-amber-900 font-medium bg-amber-100/70 px-3 py-1 rounded-full border border-amber-200/60">
                  {data.dateStr}
                </span>
              </div>
            </div>

            {/* Card Message Body */}
            <div className="relative z-10 font-serif text-stone-800 text-base sm:text-lg leading-relaxed space-y-4 text-justify">
              <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:text-amber-900 first-letter:float-left first-letter:mr-2.5 first-letter:leading-none">
                {firstLetter}
                {restOfFirstPara}
              </p>

              {otherParas.map((para, idx) => (
                <p key={idx} className="leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Card Quote divider */}
            <div className="relative z-10 my-6 py-4 border-y border-amber-900/10 text-center">
              <p className="font-serif italic text-amber-950 text-sm sm:text-base max-w-md mx-auto">
                &ldquo;Terima kasih telah menjadi pelita yang tak pernah padam di setiap langkah belajar kami.&rdquo;
              </p>
            </div>

            {/* Valediction & Signature */}
            <div className="relative z-10 pt-4 border-t border-stone-300/70 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-xs font-sans text-stone-500 uppercase tracking-wider">
                  Dengan penuh hormat & takzim,
                </p>
                <p className="text-xs font-sans text-stone-600">
                  Murid yang selalu mendoakan Bapak/Ibu:
                </p>
              </div>

              <div className="text-center sm:text-right">
                {/* Elegant handwritten cursive signature */}
                <div className="font-script text-3xl sm:text-4xl text-stone-900">
                  {data.studentName}
                </div>
                <p className="text-xs font-sans font-semibold text-stone-800">
                  {data.studentName}
                </p>
                {data.schoolName && (
                  <p className="text-[11px] font-sans text-stone-500">
                    {data.schoolName}
                  </p>
                )}
              </div>
            </div>

            {/* Bottom Actions inside the card */}
            <div className="relative z-10 mt-8 pt-4 border-t border-dashed border-stone-200/80 flex flex-wrap items-center justify-between gap-3 text-xs font-sans no-print">
              <button
                onClick={handleCardClick}
                className="text-stone-600 hover:text-stone-900 inline-flex items-center gap-1.5 transition-colors font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Tutup Kartu</span>
              </button>

              <button
                onClick={onOpenCustomizer}
                className="text-amber-900 hover:text-amber-950 underline underline-offset-4 font-medium inline-flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Ubah Pesan / Nama</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
