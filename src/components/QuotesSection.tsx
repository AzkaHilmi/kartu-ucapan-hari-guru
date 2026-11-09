/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EDUCATION_QUOTES } from '../data/templates';
import { Quote } from 'lucide-react';

export const QuotesSection: React.FC = () => {
  return (
    <section id="kutipan-pendidikan" className="py-12 sm:py-20 border-t border-stone-200/80 bg-[#F7F4EE]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-stone-500 font-sans font-semibold">
            Mutiara Kebijaksanaan
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Untaian Kata Tokoh Pendidikan
          </h2>
          <p className="text-stone-600 font-sans text-sm">
            Menegaskan kembali betapa mulia dan luhurnya tugas seorang guru dalam membangun peradaban.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {EDUCATION_QUOTES.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <Quote className="w-6 h-6 text-amber-800/40" />
                <p className="font-serif text-lg sm:text-xl text-stone-900 italic leading-snug">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="text-xs font-sans text-stone-600 leading-relaxed border-t border-stone-200/60 pt-3">
                  {item.meaning}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200/70">
                <p className="text-sm font-sans font-semibold text-stone-900">
                  {item.author}
                </p>
                <p className="text-xs font-sans text-stone-500">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
