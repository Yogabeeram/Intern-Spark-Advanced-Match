
export type EducationLevel = '12th Pass' | 'Diploma' | 'Under Graduate' | 'Graduate' | '';
export type WorkMode = 'Online' | 'Offline' | 'Any';

export interface Internship {
  id: number;
  title: string;
  company: string;
  skills: string;
  loc: string;
  mode: 'Online' | 'Offline';
  edu: EducationLevel;
  goal: string;
  description: string;
  finalScore?: number;
}

export interface UserProfile {
  name: string;
  edu: EducationLevel;
  loc: string;
  mode: WorkMode;
  skills: string;
  goals: string;
  languages: string;
}
