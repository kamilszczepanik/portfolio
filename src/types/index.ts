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

export type Stat = {
  label: string;
  value: number;
  suffix: string;
};
