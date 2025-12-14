export interface GithubLink {
  name: string;
  url: string;
}

export interface Profile {
  name: string;
  email: string;
  phone: string;
  github: GithubLink[];
}

export interface IntroductionHighlight {
  title: string;
  description: string;
}

export interface Introduction {
  title: string;
  summary: string;
  highlights: IntroductionHighlight[];
}

export interface Project {
  title: string;
  period: {
    start: string;
    end: string | null;
  };
  description: string;
  achievements?: string[];
}

export interface Experience {
  company: string;
  companyUrl?: string;
  position: string;
  period: {
    start: string;
    end: string | null;
  };
  description: string;
  projects: Project[];
}

export interface ResumeData {
  profile: Profile;
  introduction: Introduction;
  experiences: Experience[];
  skills: string[];
}
