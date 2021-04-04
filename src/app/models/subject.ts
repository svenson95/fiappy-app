import { Quiz } from './quiz';
import { IndexCards } from './index-cards';
import { Matching } from './matching-piece';

export interface Subject {
  subject: string;
  description: string;
  topics: string[] | Topic[];
  quizzes?: string[] | Quiz[];
  indexcards?: string[] | IndexCards[];
  matchings?: string[] | Matching[];
  tests?: string[];
}

export interface Topic {
  title: string;
  subject: string;
  links: string[];
}
