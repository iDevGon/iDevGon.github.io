export type ProjectStatus =
  | '운영 중'
  | '공개 데모'
  | '개발 프로젝트'
  | '현장용';

export interface ProjectImage {
  src: string;
  alt: string;
  previewLabel?: string;
  dimensions?: [width: number, height: number];
}

export interface PortfolioProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  period: {
    start: string;
    end: string | null;
  };
  status: ProjectStatus;
  images: [ProjectImage, ...ProjectImage[]];
  links: {
    label: string;
    url: string;
  }[];
  techStack: string[];
  highlights: string[];
  role: string;
}

export interface PortfolioData {
  projects: PortfolioProject[];
}
