import { StaticImageData } from "next/image";

export type Person = {
  id: number;
  name: string;
  designation: string;
  description: string | React.ReactNode;
  image: string | StaticImageData;
  link: string;
};

type CompanyLogo = { image: string | StaticImageData } | { initials: string };

type CompanyLink =
  | { link: string; previewImage: string | StaticImageData }
  | { link?: never; previewImage?: never };

export type Company = { name: string } & CompanyLogo & CompanyLink;

export type CaseStudyMetric = {
  label: string;
  before?: string;
  after: string;
};

export type CaseStudySection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  hook: string;
  status: string;
  period: string;
  role: string;
  stack: string[];
  metrics: CaseStudyMetric[];
  sections: CaseStudySection[];
};

export type Stat = {
  label: string;
  value: number;
  suffix: string;
};
