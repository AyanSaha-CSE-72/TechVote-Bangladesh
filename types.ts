export enum ViewState {
  HOME = 'HOME',
  JOURNEY = 'JOURNEY',
  RUMOR_CHECKER = 'RUMOR_CHECKER',
  INFO_HUB = 'INFO_HUB',
  MEDIA_LITERACY = 'MEDIA_LITERACY',
  COMMUNITY = 'COMMUNITY',
  ABOUT = 'ABOUT'
}

export enum UserSegment {
  GENERAL = 'GENERAL',
  YOUNG_VOTER = 'YOUNG_VOTER',
  WOMAN = 'WOMAN',
  RURAL = 'RURAL',
  DISABILITY = 'DISABILITY'
}

export type Language = 'en' | 'bn';

export interface RumorAnalysisResult {
  status: 'Likely Misleading' | 'Unverifiable' | 'Likely Accurate' | 'Needs Expert Review';
  summary: string;
  keyQuestions: string[];
  safetyTip: string;
  isHarmful: boolean;
}

export interface JourneyStep {
  id: number;
  title: string;
  titleBangla: string; // Providing Bangla context
  description: string;
  icon: string;
}

export interface LiteracyTip {
  id: string;
  title: string;
  content: string;
  category: 'Safety' | 'Fact-Check' | 'Digital-Hygiene';
}