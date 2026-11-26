import { StaticImageData } from "next/image";
import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";

export type Person = {
  id: number;
  name: string;
  designation: string;
  description: string | React.ReactNode;
  image: string | StaticImageData;
  link?: string;
  banner?: React.ReactNode;
  actions?: React.ReactNode;
};

type CompanyLogo = {
  image: string | StaticImageData;
};

type CompanyLink =
  | { link: string; previewImage: string | StaticImageData }
  | { link?: never; previewImage?: never };

export type Company = { name: string } & CompanyLogo & CompanyLink;

export type CaseStudySectionContent = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  isOrdered?: boolean;
  link?: CaseStudyLink;
};

export type CaseStudyScreenshot = {
  image: StaticImageData;
  alt: string;
};

type CaseStudyLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type CaseStudy = {
  slug: string;
  title: string;
  hook: string;
  status: string;
  phase: ProjectPhase;
  brand: ProjectBrand;
  period: string;
  role: string;
  stack: string[];
  screenshots: CaseStudyScreenshot[];
  sections: CaseStudySectionContent[];
  links?: CaseStudyLink[];
};

export type StatBreakdownRow = {
  value: string;
  label: string;
};

export type StatBreakdown = {
  title: string;
  intro: string;
  rows: StatBreakdownRow[];
  note: string;
};

export type Stat = {
  label: string;
  value: number;
  suffix: string;
  isGrouped?: boolean;
  breakdown?: StatBreakdown;
};

export type SiteSection = {
  id: string;
  label: string;
};

type ExperienceMetric = {
  value: number;
  suffix?: string;
  isGrouped?: boolean;
  caption: string;
};

export type ExperienceClient = {
  name: string;
  logo?: { src: string; width: number };
  product: string;
  date: string;
};

export type ExperienceClients = {
  lead: string;
  trail: string;
  items: ExperienceClient[];
};

type ExperienceLogo =
  | (CompanyLogo & { brand?: never })
  | { brand: ProjectBrand; image?: never };

export type ExperienceEntry = {
  company: string;
  period: string;
  role: string;
  icon: LucideIcon;
  metric: ExperienceMetric;
  highlights: string[];
  clients?: ExperienceClients;
} & ExperienceLogo;

type SkillItem = {
  name: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
};

export type SkillGroup = {
  label: string;
  icon: LucideIcon;
  top: SkillItem[];
  more: string[];
};

export type ProjectBrand = {
  logo: string | StaticImageData;
  fontClassName: string;
  accent: string;
  secondary: string;
  tint: string;
};

export type ProjectPhase = "live" | "beta" | "testing" | "done";

export type ProjectBadge =
  | { kind: "status"; label: string; phase: ProjectPhase }
  | {
      kind: "metric";
      value: string;
      label: string;
      shortLabel?: string;
      icon: LucideIcon;
    }
  | { kind: "fact"; label: string; icon: LucideIcon };

export type WorkProject = {
  name: string;
  summary: string;
  brand: ProjectBrand;
  badges: ProjectBadge[];
  image: StaticImageData;
  imageAlt: string;
  href: string;
  isExternal: boolean;
};

export type OpenSourceProject = {
  name: string;
  caseStudySlug: string;
  summary: string;
  brand: ProjectBrand;
  badges: ProjectBadge[];
  href: string;
  image: StaticImageData;
  imageAlt: string;
};

export type ReviewNavigation = {
  onPrev: () => void;
  onNext: () => void;
};

export type ReviewSheetProps = {
  person: Person | null;
  title: string;
  cardId: string;
  onClose: () => void;
  navigation?: ReviewNavigation;
};
