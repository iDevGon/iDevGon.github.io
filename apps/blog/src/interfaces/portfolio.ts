export type ProjectStatus = '서비스중' | '개발중' | '중단';

export interface PortfolioProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  period: {
    start: string;
    end: string | null;
  };
  status?: ProjectStatus;
  thumbnail: string;
  images: string[];
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
