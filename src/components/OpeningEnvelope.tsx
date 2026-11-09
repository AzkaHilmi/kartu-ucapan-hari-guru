/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GreetingData } from '../types';
import { soundEngine } from '../utils/audio';
import { Mail, Sparkles, Heart } from 'lucide-react';

interface OpeningEnvelopeProps {
  data: GreetingData;
  onOpen: () => void;
}

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({ data, onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    soundEngine.playChime();
    // After animation delay, trigger onOpen
    setTimeout(() => {
      onOpen();
    }, 700);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-[#F5EFEB] via-[#FAF8F5] to-[#EFE7DE] relative overflow-hidden select-none">
      {/* Gentle floating ambient dust particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 rounded-full bg-amber-200/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 rounded-full bg-rose-200/20 blur-3xl" />
      </div>

      <div className="max-w-xl w-full mx-auto relative z-10 text-center">
        {/* Editorial pre-header */}
        <div className="mb-6 space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-stone-500 font-sans font-medium">
            Surat Penghormatan & Apresiasi
          </p>
          <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-900 tracking-tight">
            Selamat Hari Guru Nasional
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-sm mx-auto">
            Sebuah wujud terima kasih tak terhingga dari lubuk hati terdalam seorang murid.
          </p>
        </div>

        {/* The Sealed Envelope Card */}
        <div 
          onClick={handleOpen}
          className={`group cursor-pointer transition-all duration-700 transform ${
            isOpening ? 'scale-105 opacity-0 -translate-y-8' : 'scale-100 hover:-translate-y-1'
          } bg-[#FAF6F0] rounded-2xl p-6 sm:p-10 shadow-2xl shadow-stone-900/10 border border-[#E3D8C8] relative`}
        >
          {/* Subtle parchment border lines */}
          <div className="absolute inset-3 border border-amber-900/10 rounded-xl pointer-events-none" />

          {/* Envelope Header Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src="/src/assets/images/gold_wax_seal_emblem_1794196161325.jpg"
                alt="Segel Emas Apresiasi Guru"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover shadow-lg border-2 border-amber-200/60 ring-4 ring-amber-100/50 transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-2 -right-2 bg-amber-800 text-amber-50 p-1.5 rounded-full shadow">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Personal Addressing */}
          <div className="space-y-3 mb-8">
            <span className="text-xs font-sans uppercase tracking-widest text-amber-900/70 font-semibold">
              Ditujukan Kepada Yang Terhormat:
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              {data.teacherName}
            </h2>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-stone-600 font-sans">
              <span>{data.teacherRole}</span>
              {data.schoolName && (
                <>
                  <span aria-hidden="true" className="text-amber-800/40">·</span>
                  <span>{data.schoolName}</span>
                </>
              )}
            </div>

            <div className="pt-2 text-xs font-sans text-stone-500">
              Dipersembahkan dengan penuh takzim oleh: <strong className="text-stone-800 font-medium">{data.studentName}</strong>
            </div>
          </div>

          {/* Interactive Action Prompt */}
          <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-stone-900 text-amber-50 font-sans text-sm font-medium shadow-md transition-all duration-300 group-hover:bg-amber-950 group-hover:shadow-lg group-hover:scale-[1.02]">
            <Mail className="w-4 h-4 text-amber-300" />
            <span>Ketuk untuk Membuka Surat</span>
            <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300" />
          </div>

          <p className="mt-4 text-[11px] text-stone-400 font-sans">
            Klik amplop untuk memecahkan segel & membaca ucapan
          </p>
        </div>

        {/* Direct bypass for accessibility */}
        <div className="mt-6">
          <button
            onClick={onOpen}
            className="text-xs text-stone-500 hover:text-stone-800 font-sans underline underline-offset-4 transition-colors"
          >
            Lewati pembukaan amplop & langsung ke surat ucapan
          </button>
        </div>
      </div>
    </div>
  );
};
