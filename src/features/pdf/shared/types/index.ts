export interface ContentItem {
  title: string;
  description: string;
}

export type HowItWorksStep = ContentItem;

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PdfPageInfo {
  pageNumber: number;
  thumbnailUrl: string;
  selected: boolean;
}