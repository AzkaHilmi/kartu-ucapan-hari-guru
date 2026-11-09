/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { APPRECIATION_PILLARS } from '../data/templates';
import { AppreciationPillar } from '../types';
import { soundEngine } from '../utils/audio';
import { Sun, Heart, Compass, Award, CheckCircle2, ChevronRight } from 'lucide-react';

export const PiagamSection: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<AppreciationPillar | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun':
        return <Sun className="w-6 h-6 text-amber-700" />;
      case 'Heart':
        return <Heart className="w-6 h-6 text-rose-700" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-emerald-700" />;
      case 'Award':
      default:
        return <Award className="w-6 h-6 text-amber-800" />;
    }
  };

  const handlePillarClick = (pillar: AppreciationPillar) => {
    soundEngine.playChime();
    setSelectedPillar(pillar);
  };

  return (
    <section id="pita-kehormatan" className="py-12 sm:py-20 bg-stone-100/70 border-y border-stone-200/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-stone-500 font-sans font-semibold">
            Pita Kehormatan Pendidik
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight text-balance">
            Empat Pilar Pengabdian Guru
          </h2>
          <p className="text-stone-600 font-sans text-sm leading-relaxed">
            Setiap nilai luhur yang senantiasa dihidupkan oleh seorang guru sejati. Ketuk setiap pilar untuk meresapi makna pengorbanan beliau.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {APPRECIATION_PILLARS.map((pillar) => {
            const isSelected = selectedPillar?.id === pillar.id;
            return (
              <div
                key={pillar.id}
                onClick={() => handlePillarClick(pillar)}
                className={`group cursor-pointer rounded-2xl p-6 transition-all duration-300 relative border ${
                  isSelected
                    ? 'bg-[#FAF6F0] border-amber-300 shadow-lg ring-2 ring-amber-200/60 -translate-y-1'
                    : 'bg-white hover:bg-[#FAF8F5] border-stone-200 shadow-sm hover:shadow-md hover:-translate-y-1'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50/80 border border-amber-200/60 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  {getIcon(pillar.iconName)}
                </div>

                <h3 className="text-lg font-serif font-bold text-stone-900 mb-1">
                  {pillar.title}
                </h3>
                <p className="text-xs font-sans font-medium text-amber-900/80 mb-3">
                  {pillar.subtitle}
                </p>
                <p className="text-xs sm:text-sm font-sans text-stone-600 leading-relaxed line-clamp-3">
                  {pillar.description}
                </p>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-sans text-stone-500 group-hover:text-amber-900">
                  <span>Selengkapnya</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Pillar Highlight Card */}
        {selectedPillar && (
          <div className="mt-8 max-w-2xl mx-auto bg-[#FAF6F0] border border-amber-300/80 rounded-2xl p-6 sm:p-8 shadow-md animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-100/70 rounded-xl text-amber-900 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-sans uppercase tracking-widest text-amber-900/70 font-semibold">
                  Penghormatan Khusus
                </span>
                <h4 className="text-xl font-serif font-bold text-stone-900">
                  {selectedPillar.title} — {selectedPillar.subtitle}
                </h4>
                <p className="text-sm font-sans text-stone-700 leading-relaxed">
                  {selectedPillar.description}
                </p>
                <p className="text-xs font-serif italic text-stone-600 pt-2">
                  &ldquo;Terima kasih telah membimbing kami dengan pilar ketulusan ini sepanjang proses belajar.&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
