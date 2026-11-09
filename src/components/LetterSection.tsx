/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GreetingData } from '../types';
import { Sparkles, Calendar, BookOpen, Quote } from 'lucide-react';

interface LetterSectionProps {
  data: GreetingData;
  onEditRequested: () => void;
}

export const LetterSection: React.FC<LetterSectionProps> = ({ data, onEditRequested }) => {
  // Format paragraphs nicely and handle drop-cap
  const paragraphs = data.message.split('\n\n').filter((p) => p.trim().length > 0);
  const firstParagraph = paragraphs[0] || '';
  const firstLetter = firstParagraph.charAt(0);
  const remainingFirstParagraph = firstParagraph.slice(1);
  const subsequentParagraphs = paragraphs.slice(1);

  return (
    <section id="surat-apresiasi" className="py-8 sm:py-16">
      {/* Editorial Hero Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10 sm:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Dedication Headline */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-amber-900/70 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Dedikasi Tulus Murid untuk Pahlawan Tanpa Tanda Jasa</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-[1.15] text-balance">
              Terima Kasih, Pelita yang Senantiasa Menerangi Langkah Kami
            </h1>

            <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed max-w-xl">
              Sebuah surat penghormatan dan penghargaan abadi yang dipersembahkan untuk 
              mengenang setiap kesabaran, tetes keringat, serta keikhlasan mendidik yang tak terbalaskan.
            </p>

            {/* Recipient summary strip */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-stone-600 font-sans border-t border-stone-200/60 mt-4">
              <span className="font-semibold text-stone-900">Kepada: {data.teacherName}</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>{data.teacherRole}</span>
              {data.schoolName && (
                <>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <span>{data.schoolName}</span>
                </>
              )}
            </div>
          </div>

          {/* Right Column: High Fidelity Editorial Photo */}
          <div className="lg:col-span-5">
            <div className="relative group">
              <div className="overflow-hidden rounded-2xl shadow-xl border border-stone-200 bg-stone-100">
                <img
                  src="/src/assets/images/teachers_desk_parchment_1794196161256.jpg"
                  alt="Meja Guru dengan Pena Klasik, Jurnal, dan Buku"
                  className="w-full h-72 sm:h-80 object-cover transform group-hover:scale-[1.02] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-[11px] font-serif text-stone-500 italic mt-2.5 text-center">
                Fig. 1 — Ruang ilmu, pena ketulusan, dan pengabdian guru yang abadi sepanjang masa.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The Archival Cotton Paper Letter Sheet */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="print-page bg-[#FAF6F0] rounded-2xl shadow-xl shadow-stone-900/5 border border-[#E4D9C9] p-6 sm:p-12 lg:p-16 relative overflow-hidden">
          {/* Subtle deckled inner border line */}
          <div className="absolute inset-4 sm:inset-6 border border-amber-900/10 rounded-xl pointer-events-none" />

          {/* Letterhead */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between border-b border-stone-300/80 pb-6 mb-8 gap-4">
            <div className="flex items-center gap-4">
              <img
                src="/src/assets/images/gold_wax_seal_emblem_1794196161325.jpg"
                alt="Emblem Segel Emas"
                className="w-14 h-14 rounded-full object-cover shadow-sm border border-amber-200 ring-2 ring-amber-100"
                referrerPolicy="no-referrer"
              />
              <div className="text-center sm:text-left">
                <p className="text-[11px] font-sans uppercase tracking-[0.2em] text-stone-500 font-semibold">
                  Warkah Apresiasi & Doa
                </p>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                  Kepada Yth. {data.teacherName}
                </h2>
                <p className="text-xs font-sans text-stone-600">
                  {data.teacherRole} {data.schoolName ? `· ${data.schoolName}` : ''}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-sans text-stone-500 bg-amber-50/60 px-3 py-1.5 rounded-full border border-amber-200/50">
              <Calendar className="w-3.5 h-3.5 text-amber-700" />
              <span>{data.dateStr}</span>
            </div>
          </div>

          {/* Letter Body Content */}
          <div className="relative z-10 font-serif text-stone-800 text-lg sm:text-xl leading-relaxed space-y-6">
            {/* Opening with classical editorial Drop-Cap */}
            <p className="text-justify first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-amber-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
              {firstLetter}
              {remainingFirstParagraph}
            </p>

            {/* Subsequent paragraphs */}
            {subsequentParagraphs.map((para, idx) => (
              <p key={idx} className="text-justify leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Ornamental Pull Quote in the Middle */}
          <div className="relative z-10 my-10 py-6 border-y border-amber-900/15 text-center">
            <Quote className="w-6 h-6 mx-auto text-amber-700/40 mb-2" />
            <blockquote className="text-xl sm:text-2xl font-serif italic text-amber-950 font-medium max-w-xl mx-auto leading-snug">
              &ldquo;Orang hebat bisa melahirkan beberapa karya bermutu, tapi guru yang bermutu dapat melahirkan ribuan orang-orang hebat.&rdquo;
            </blockquote>
          </div>

          {/* Signature and Valediction */}
          <div className="relative z-10 pt-6 mt-8 border-t border-stone-300/80 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left space-y-1">
              <p className="text-xs uppercase tracking-wider font-sans text-stone-500">
                Penuh Takzim & Rasa Hormat,
              </p>
              <p className="text-xs font-sans text-stone-600">
                Murid yang senantiasa berhutang budi ilmu:
              </p>
            </div>

            <div className="text-center sm:text-right">
              {/* Elegant script handwriting signature */}
              <div className="font-script text-3xl sm:text-4xl text-stone-900 font-normal">
                {data.studentName}
              </div>
              <p className="text-xs font-sans font-medium text-stone-700 mt-1">
                {data.studentName}
              </p>
              {data.schoolName && (
                <p className="text-[11px] font-sans text-stone-500">
                  {data.schoolName}
                </p>
              )}
            </div>
          </div>

          {/* Edit shortcut button for student */}
          <div className="relative z-10 mt-8 pt-4 text-center border-t border-dashed border-stone-200 no-print">
            <button
              onClick={onEditRequested}
              className="text-xs text-amber-900 hover:text-amber-950 underline underline-offset-4 font-sans font-medium inline-flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Ingin mengubah nama guru, nama Anda, atau isi surat ini? Klik untuk menyesuaikan</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
