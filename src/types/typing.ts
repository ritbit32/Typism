export interface TestResult {
  id: string;
  wpm: number;
  accuracy: number;
  duration: number;
  date: Date;
  category: string;
  errors: number;
  correctChars: number;
  totalChars: number;
}

export interface TestSettings {
  duration: 60 | 180 | 300; // 1, 3, or 5 minutes in seconds
  category: string;
  language: string;
}

export interface TextPassage {
  id: string;
  text: string;
  category: string;
  language: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export type TestStatus = 'idle' | 'active' | 'paused' | 'completed';
