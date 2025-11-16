import { TextPassage } from '@/types/typing';

export const textPassages: TextPassage[] = [
  {
    id: '1',
    text: 'The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet and is commonly used for testing keyboards and typewriters. Practice makes perfect, and consistent typing will improve your speed and accuracy over time.',
    category: 'General',
    language: 'English',
    difficulty: 'easy'
  },
  {
    id: '2',
    text: 'Technology is rapidly transforming our world. From artificial intelligence to quantum computing, innovations are reshaping how we live, work, and communicate. The digital revolution continues to accelerate, bringing both opportunities and challenges that require adaptation and continuous learning.',
    category: 'Technology',
    language: 'English',
    difficulty: 'medium'
  },
  {
    id: '3',
    text: 'Programming requires logical thinking and attention to detail. Variables store data, functions perform operations, and algorithms solve problems efficiently. Understanding these fundamental concepts enables developers to create software that powers everything from smartphones to spacecraft navigation systems.',
    category: 'Programming',
    language: 'English',
    difficulty: 'medium'
  },
  {
    id: '4',
    text: 'The implementation of polymorphic type systems in modern programming languages facilitates code reusability through inheritance hierarchies and interface segregation. Dependency injection patterns, coupled with inversion of control containers, enable loosely coupled architectures that enhance maintainability and testability.',
    category: 'Programming',
    language: 'English',
    difficulty: 'hard'
  },
  {
    id: '5',
    text: 'Reading opens doors to knowledge and imagination. Books transport us to different worlds, introduce diverse perspectives, and expand our understanding of the human experience. Whether fiction or non-fiction, every page offers an opportunity to learn something new and grow as individuals.',
    category: 'Literature',
    language: 'English',
    difficulty: 'easy'
  },
  {
    id: '6',
    text: 'Breaking news often shapes public opinion and influences decision-making. Journalists investigate stories, verify facts, and present information to keep citizens informed. In the digital age, news travels instantly across the globe, making media literacy more important than ever.',
    category: 'News',
    language: 'English',
    difficulty: 'medium'
  },
  {
    id: '7',
    text: 'Scientific research advances through hypothesis testing and empirical observation. Researchers design experiments, collect data, and analyze results to uncover patterns in nature. Peer review ensures quality and reproducibility, building a foundation of reliable knowledge for future discoveries.',
    category: 'Science',
    language: 'English',
    difficulty: 'medium'
  },
  {
    id: '8',
    text: 'Adventure awaits those who dare to explore beyond their comfort zone. Whether hiking mountain trails, diving coral reefs, or discovering new cultures, travel enriches the soul and broadens horizons. Every journey teaches valuable lessons about ourselves and the world we inhabit.',
    category: 'Adventure',
    language: 'English',
    difficulty: 'easy'
  }
];

export const categories = Array.from(new Set(textPassages.map(p => p.category)));
