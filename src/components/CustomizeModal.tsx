/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GreetingData } from '../types';
import { LETTER_TEMPLATES } from '../data/templates';
import { generateShareUrl, generateWhatsAppLink } from '../utils/url';
import { soundEngine } from '../utils/audio';
import { X, Copy, Check, MessageSquare, ExternalLink, RefreshCw } from 'lucide-react';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: GreetingData;
  onSave: (data: GreetingData) => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSave,
}) => {
  const [formData, setFormData] = useState<GreetingData>({ ...initialData });
  const [copied, setCopied] = useState(false);
  const [startOpened, setStartOpened] = useState(false);

  if (!isOpen) return null;

  const currentShareUrl = generateShareUrl(formData, startOpened);
  const currentWhatsAppUrl = generateWhatsAppLink(formData, currentShareUrl);

  const handleApplyTemplate = (templateContent: string) => {
    setFormData((prev) => ({
      ...prev,
      message: templateContent,
    }));
    soundEngine.playSingleNote(587.33, 0.4);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentShareUrl);
      setCopied(true);
      soundEngine.playChime();
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] rounded-2xl border border-stone-200 max-w-2xl w-full shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-white">
          <div>
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Sesuaikan Kartu & Dapatkan Link untuk Guru
            </h3>
            <p className="text-xs text-stone-500 font-sans">
              Isi data guru dan murid Anda, lalu salin tautan untuk dikumpulkan.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Identity Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Nama Guru (Penerima)
              </label>
              <input
                type="text"
                required
                value={formData.teacherName}
                onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
                placeholder="Contoh: Ibu Siti Rahmawati, S.Pd."
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Mata Pelajaran / Peran
              </label>
              <input
                type="text"
                value={formData.teacherRole}
                onChange={(e) => setFormData({ ...formData, teacherRole: e.target.value })}
                placeholder="Contoh: Guru Produktif RPL / Wali Kelas"
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Nama Murid (Pengirim)
              </label>
              <input
                type="text"
                required
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                placeholder="Contoh: Azka Hilmi"
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Asal Sekolah
              </label>
              <input
                type="text"
                value={formData.schoolName}
                onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                placeholder="Contoh: SMK Negeri 1"
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
              />
            </div>
          </div>

          {/* Letter Templates Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                Pilih Template Isi Surat
              </label>
              <span className="text-[11px] text-stone-500 font-sans">
                Klik salah satu untuk mengisi otomatis
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {LETTER_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => handleApplyTemplate(tmpl.content)}
                  className="text-left p-3 rounded-lg border border-stone-200 bg-white hover:border-amber-400 hover:bg-amber-50/40 transition-colors"
                >
                  <p className="text-xs font-semibold text-stone-900">{tmpl.title}</p>
                  <p className="text-[11px] text-stone-500 truncate mt-0.5">{tmpl.preview}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Message Textarea */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Isi Surat / Ucapan (Bisa diedit bebas)
            </label>
            <textarea
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-3 rounded-lg border border-stone-300 bg-white text-stone-900 text-sm font-serif leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800"
            />
          </div>

          {/* Envelope Opening Behavior Option */}
          <div className="flex items-center gap-3 p-3 bg-stone-100 rounded-lg text-xs font-sans text-stone-700">
            <input
              type="checkbox"
              id="startOpenedCheckbox"
              checked={startOpened}
              onChange={(e) => setStartOpened(e.target.checked)}
              className="rounded border-stone-300 text-amber-900 focus:ring-amber-800 h-4 w-4"
            />
            <label htmlFor="startOpenedCheckbox" className="cursor-pointer">
              Langsung buka isi pesan saat tautan dibuka (tanpa cover depan)
            </label>
          </div>

          {/* Share Link Preview Box */}
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-3">
            <p className="text-xs font-semibold text-amber-950 uppercase tracking-wider">
              Tautan Khusus untuk Dikumpulkan ke Guru:
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentShareUrl}
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-700 truncate"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className={`px-4 py-2 text-xs font-medium rounded-lg shrink-0 flex items-center gap-1.5 transition-colors ${
                  copied
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-900 hover:bg-stone-800 text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Link</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={currentWhatsAppUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-800 hover:text-emerald-900 font-medium underline underline-offset-4"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Kirim langsung via WhatsApp</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-medium text-white bg-amber-900 hover:bg-amber-950 rounded-lg shadow-sm transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Terapkan Perubahan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
