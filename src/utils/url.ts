/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GreetingData } from '../types';
import { DEFAULT_GREETING } from '../data/templates';

export function parseGreetingFromUrl(): { data: GreetingData; isDirectOpen: boolean } {
  if (typeof window === 'undefined') {
    return { data: DEFAULT_GREETING, isDirectOpen: false };
  }

  const params = new URLSearchParams(window.location.search);

  const teacherName = params.get('to') || DEFAULT_GREETING.teacherName;
  const teacherRole = params.get('role') || DEFAULT_GREETING.teacherRole;
  const studentName = params.get('from') || DEFAULT_GREETING.studentName;
  const schoolName = params.get('school') || DEFAULT_GREETING.schoolName;
  const rawMsg = params.get('msg');
  const theme = (params.get('theme') as GreetingData['theme']) || 'gold';
  const isDirectOpen = params.get('open') === 'true';

  let message = DEFAULT_GREETING.message;
  if (rawMsg) {
    try {
      // Decode URI component or base64
      message = decodeURIComponent(rawMsg);
    } catch {
      message = DEFAULT_GREETING.message;
    }
  }

  return {
    data: {
      teacherName,
      teacherRole,
      studentName,
      schoolName,
      message,
      theme,
      dateStr: DEFAULT_GREETING.dateStr,
    },
    isDirectOpen,
  };
}

export function generateShareUrl(data: GreetingData, startOpened = false): string {
  if (typeof window === 'undefined') return '';

  const url = new URL(window.location.origin + window.location.pathname);
  if (data.teacherName) url.searchParams.set('to', data.teacherName);
  if (data.teacherRole) url.searchParams.set('role', data.teacherRole);
  if (data.studentName) url.searchParams.set('from', data.studentName);
  if (data.schoolName) url.searchParams.set('school', data.schoolName);
  if (data.theme && data.theme !== 'gold') url.searchParams.set('theme', data.theme);
  if (startOpened) url.searchParams.set('open', 'true');

  // If message differs from default, include it encoded
  if (data.message && data.message.trim() !== DEFAULT_GREETING.message.trim()) {
    url.searchParams.set('msg', encodeURIComponent(data.message.trim()));
  }

  return url.toString();
}

export function generateWhatsAppLink(data: GreetingData, shareUrl: string): string {
  const text = `Assalamu'alaikum Warahmatullahi Wabarakatuh / Salam Sejahtera Bapak/Ibu ${data.teacherName},

Selamat Hari Guru Nasional! 
Izinkan saya, ${data.studentName}${data.schoolName ? ` (${data.schoolName})` : ''}, mempersembahkan kartu apresiasi dan untaian doa tulus untuk Bapak/Ibu guru tercinta melalui tautan berikut:

${shareUrl}

Terima kasih atas segala ilmu, kesabaran, dan bimbingan yang telah dicurahkan untuk kami. 🙏✨`;

  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}
