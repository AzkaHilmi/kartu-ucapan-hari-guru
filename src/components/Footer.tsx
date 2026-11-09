/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Heart, Share2 } from 'lucide-react';

interface FooterProps {
  onOpenCustomizer: () => void;
  studentName: string;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCustomizer, studentName }) => {
  return (
    <footer className="py-12 border-t border-stone-200/80 bg-[#F5EFEB] text-stone-600 no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <p className="text-base font-serif font-bold text-stone-900 tracking-tight">
              Apresiasi Hari Guru Nasional
            </p>
            <p className="text-xs font-sans text-stone-500">
              Dipersembahkan dengan rasa hormat dan takzim oleh <span className="text-stone-800 font-medium">{studentName}</span> untuk seluruh guru yang telah mendedikasikan hidupnya demi mencerdaskan kehidupan bangsa.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={onOpenCustomizer}
              className="text-xs font-sans font-medium text-amber-900 hover:text-amber-950 inline-flex items-center gap-1.5 underline underline-offset-4"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Buat Tautan Sendiri</span>
            </button>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <div className="flex items-center gap-1 text-xs font-sans text-stone-500">
              <span>Dibuat dengan rasa syukur</span>
              <Heart className="w-3 h-3 text-rose-600 fill-rose-600" />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-200/60 text-center text-[11px] font-sans text-stone-400">
          Hari Guru Nasional · Pahlawan Tanpa Tanda Jasa · Terima Kasih Guruku
        </div>
      </div>
    </footer>
  );
};
