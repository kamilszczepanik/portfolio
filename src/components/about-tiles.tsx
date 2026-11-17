import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { LinkPreview } from "@/components/ui/link-preview";
import { NewTabHint } from "@/components/ui/new-tab-hint";
import { COMPANY_PREVIEW_SIZE } from "@/constants/companies";
import { ProjectBrand } from "@/types";

export const ABOUT_LINK_CLASS =
  "text-primary-light hover:text-primary font-semibold transition-colors";

export const ABOUT_TILE_CLASS =
  "w-full rounded-2xl border border-white/10 bg-white/3 p-4 text-sm leading-relaxed";

export const ABOUT_TILE_TITLE = "text-base font-semibold text-white";

type CompanyHeadingProps = {
  name: string;
  url: string;
  preview: string | StaticImageData;
  logo: string | StaticImageData;
};

export const CompanyHeading = ({
  name,
  url,
  preview,
  logo,
}: CompanyHeadingProps) => (
  <h3 className="flex">
    <LinkPreview
      url={url}
      imageSrc={preview}
      {...COMPANY_PREVIEW_SIZE}
      isStatic
      target="_blank"
      className="relative inline-flex cursor-pointer items-center gap-1.5 rounded-md text-white/70 transition-colors before:absolute before:inset-x-0 before:-inset-y-3 hover:text-white"
    >
      <Image
        src={logo}
        alt={name}
        width={96}
        height={24}
        sizes="96px"
        unoptimized={typeof logo === "string"}
        className="h-5 w-auto"
      />
      <ArrowUpRight aria-hidden className="size-3.5" />
    </LinkPreview>
  </h3>
);

type AboutProductProps = {
  name: string;
  href: string;
  brand: ProjectBrand;
  children: ReactNode;
};

export const AboutProduct = ({
  name,
  href,
  brand,
  children,
}: AboutProductProps) => (
  <li className="flex items-start gap-3">
    <BrandLogo brand={brand} className="size-9 rounded-lg" />
    <p>
      <Link href={href} className={ABOUT_LINK_CLASS}>
        {name}
      </Link>{" "}
      {children}
    </p>
  </li>
);

type AboutExternalLinkProps = {
  href: string;
  children: ReactNode;
};

export const AboutExternalLink = ({
  href,
  children,
}: AboutExternalLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={ABOUT_LINK_CLASS}
  >
    {children}
    <NewTabHint />
  </a>
);
