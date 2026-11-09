/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GreetingData, LetterTemplate, AppreciationPillar, TeacherReaction } from '../types';

export const DEFAULT_GREETING: GreetingData = {
  teacherName: 'Bapak / Ibu Guru Tercinta',
  teacherRole: 'Pendidik & Pembimbing Insan',
  studentName: 'Azka Hilmi',
  schoolName: 'SMK',
  message: `Di setiap lembar catatan yang kami tulis dan setiap rumus kehidupan yang kami pahami, ada jejak ketulusan dan keringat Bapak/Ibu Guru yang tak pernah meminta imbalan.

Terima kasih telah menjadi pelita di kala kami tersesat dalam ketidaktahuan, menjadi kompas di saat langkah kami ragu, dan menjadi benteng kesabaran ketika kami berulang kali berbuat salah.

Guru bukan hanya mengajarkan kami tentang angka, huruf, dan teori, tetapi mengajarkan bagaimana menjadi manusia yang berakal budi, beradab, dan berani bermimpi menembus batas.

Semoga setiap ilmu yang Bapak/Ibu curahkan mengalir menjadi amal jariyah yang tak pernah terputus, dan semoga kebahagiaan serta kesehatan senantiasa menyertai setiap denyut langkah Bapak/Ibu sekeluarga.`,
  theme: 'gold',
  dateStr: '25 November · Hari Guru Nasional',
};

export const LETTER_TEMPLATES: LetterTemplate[] = [
  {
    id: 'deep-gratitude',
    title: 'Penuh Haru & Takzim (Rekomendasi)',
    preview: 'Di setiap lembar catatan yang kami tulis...',
    content: `Di setiap lembar catatan yang kami tulis dan setiap rumus kehidupan yang kami pahami, ada jejak ketulusan dan keringat Bapak/Ibu Guru yang tak pernah meminta imbalan.

Terima kasih telah menjadi pelita di kala kami tersesat dalam ketidaktahuan, menjadi kompas di saat langkah kami ragu, dan menjadi benteng kesabaran ketika kami berulang kali berbuat salah.

Guru bukan hanya mengajarkan kami tentang angka, huruf, dan teori, tetapi mengajarkan bagaimana menjadi manusia yang berakal budi, beradab, dan berani bermimpi menembus batas.

Semoga setiap ilmu yang Bapak/Ibu curahkan mengalir menjadi amal jariyah yang tak pernah terputus, dan semoga kebahagiaan serta kesehatan senantiasa menyertai setiap denyut langkah Bapak/Ibu sekeluarga.`,
  },
  {
    id: 'smk-vocational',
    title: 'Khas Kejuruan / Keterampilan Hidup',
    preview: 'Bapak/Ibu tidak hanya mengajari kami keterampilan teknis...',
    content: `Bukan sekadar ilmu dari lembar buku teks yang Bapak/Ibu wariskan, melainkan keterampilan nyata, ketelitian kerja, dan kedisiplinan hidup yang menempa kami menjadi pribadi yang tangguh dan siap berkarya.

Terima kasih telah membimbing tangan kami yang mulanya kaku hingga mampu menciptakan sesuatu yang bermanfaat. Kesabaran Bapak/Ibu mengulang penjelasan tanpa kenal lelah adalah teladan terbesar bagi kami.

Dari ruang kelas dan bengkel praktik ini, kami belajar bahwa karya terbaik lahir dari ketulusan dan kegigihan. Terima kasih telah percaya pada potensi kami bahkan saat kami sendiri meragukannya.`,
  },
  {
    id: 'inspirational-light',
    title: 'Puitis & Cahaya Masa Depan',
    preview: 'Bila ilmu adalah lentera, maka gurulah sang penyulut apinya...',
    content: `Bila ilmu adalah lentera, maka gurulah sang penyulut apinya yang tak pernah membiarkan kami berjalan dalam pekatnya kegelapan.

Di balik setiap keberhasilan generasi muda hari ini, berdiri sosok guru yang ikhlas mengabdikan waktu, pikiran, dan doanya dalam senyap. Bapak/Ibu adalah pahlawan sejati yang menorehkan tinta emas di masa depan bangsa.

Selamat Hari Guru. Terima kasih atas dedikasi tanpa batas yang tak ternilai harganya. Kami bangga dan bersyukur pernah menjadi murid Bapak/Ibu.`,
  },
  {
    id: 'concise-respect',
    title: 'Ringkas, Elegan & Khidmat',
    preview: 'Selamat Hari Guru Nasional untuk pendidik terhebat...',
    content: `Selamat Hari Guru Nasional untuk pendidik terhebat yang senantiasa menuntun kami dengan ketulusan hati.

Jasa Bapak/Ibu tak terukur oleh kata-kata, dan kesabaran Bapak/Ibu adalah anugerah terbesar bagi perjalanan kami. Terima kasih atas setiap nasehat, bimbingan, dan inspirasi yang telah ditanamkan ke dalam diri kami.

Doa kami senantiasa terpanjat, semoga Bapak/Ibu selalu dilimpahi rahmat, kesehatan prima, dan keberkahan yang berlipat ganda.`,
  },
];

export const APPRECIATION_PILLARS: AppreciationPillar[] = [
  {
    id: 'p1',
    title: 'Pelita Ilmu',
    subtitle: 'Menerangi Ketidaktahuan',
    description: 'Menyalakan rasa ingin tahu dan mengubah ketidakmengertian menjadi pemahaman mendalam yang membuka jalan masa depan.',
    iconName: 'Sun',
  },
  {
    id: 'p2',
    title: 'Kesabaran Tak Terhingga',
    subtitle: 'Mendidik Dengan Sepenuh Jiwa',
    description: 'Menghadapi setiap keunikan dan kekeliruan kami dengan senyuman tulus, pengampunan, serta dorongan untuk terus mencoba lagi.',
    iconName: 'Heart',
  },
  {
    id: 'p3',
    title: 'Penempa Karakter',
    subtitle: 'Membentuk Jiwa & Akhlak',
    description: 'Tidak hanya mengasah kecerdasan akal, namun menanamkan adab, integritas, sopan santun, dan empati kemanusiaan.',
    iconName: 'Compass',
  },
  {
    id: 'p4',
    title: 'Pahlawan Tanpa Tanda Jasa',
    subtitle: 'Pengabdian Tulus Abadi',
    description: 'Memberikan karya terbesar bagi peradaban tanpa menuntut pengakuan megah, karyanya nyata terukir pada setiap murid yang sukses.',
    iconName: 'Award',
  },
];

export const TEACHER_REACTIONS: TeacherReaction[] = [
  {
    id: 'r1',
    emoji: '🌸',
    label: 'Doa Balasan',
    replyNote: 'Aamiin ya Rabbal alamin. Terima kasih banyak anakku, semoga sukses dunia dan akhirat.',
  },
  {
    id: 'r2',
    emoji: '⭐',
    label: 'Bangga & Haru',
    replyNote: 'Melihat kalian tumbuh menjadi pribadi yang santun dan berilmu adalah kebahagiaan terbesar seorang guru.',
  },
  {
    id: 'r3',
    emoji: '🌿',
    label: 'Pesan Semangat',
    replyNote: 'Teruslah berproses dan jangan pernah takut gagal. Bapak/Ibu selalu mendoakan yang terbaik untuk masa depanmu.',
  },
  {
    id: 'r4',
    emoji: '✨',
    label: 'Restu Guru',
    replyNote: 'Ibu/Bapak ridho atas setiap ilmu yang telah diajarkan. Semoga berkah dan bermanfaat bagi banyak orang.',
  },
];

export const EDUCATION_QUOTES = [
  {
    quote: 'Ing ngarsa sung tulada, ing madya mangun karsa, tut wuri handayani.',
    meaning: 'Di depan memberi teladan, di tengah membangun semangat, di belakang memberi dorongan.',
    author: 'Ki Hajar Dewantara',
    title: 'Bapak Pendidikan Nasional Indonesia',
  },
  {
    quote: 'Pendidikan bukan sekadar mengisi ember, melainkan menyalakan kobaran api.',
    meaning: 'Membangkitkan daya pikir mandiri dan kepekaan nurani sepanjang hayat.',
    author: 'William Butler Yeats',
    title: 'Sastrawan & Pendidik',
  },
  {
    quote: 'Masa depan Indonesia ada di tangan mereka yang dididik dengan integritas dan cinta kasih oleh para gurunya.',
    meaning: 'Peradaban bangsa tumbuh dari ruang-ruang kelas yang penuh rasa hormat.',
    author: 'B.J. Habibie',
    title: 'Presiden ke-3 Republik Indonesia',
  },
];
