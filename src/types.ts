/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GreetingData {
  teacherName: string;
  teacherRole: string;
  studentName: string;
  schoolName: string;
  message: string;
  theme: 'gold' | 'parchment' | 'emerald';
  dateStr: string;
}

export interface LetterTemplate {
  id: string;
  title: string;
  preview: string;
  content: string;
}

export interface AppreciationPillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: 'Sparkles' | 'Heart' | 'BookOpen' | 'Compass' | 'Award' | 'Sun';
}

export interface TeacherReaction {
  id: string;
  emoji: string;
  label: string;
  replyNote: string;
}
