
export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  subtext: string;
}

export interface StatItem {
  label: string;
  value: number;
  color: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
