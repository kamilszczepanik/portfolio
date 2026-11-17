import Link from "next/link";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  href: string;
  className?: string;
};

const MARK_PATH =
  "M20.47 52.00L11.44 52.00L11.44 12L20.47 12L20.47 33.20Q22.41 32.17 23.81 30.86Q25.21 29.54 26.19 28.03Q27.16 26.51 27.76 24.94Q28.36 23.37 28.76 21.83L28.76 21.83L39.39 21.83Q38.76 24.11 37.59 26.26Q36.41 28.40 34.70 30.26Q32.99 32.11 30.73 33.60Q28.47 35.09 25.73 36.06L25.73 36.06L25.73 36.51Q29.27 35.94 31.53 36.37Q33.79 36.80 35.10 37.97Q36.41 39.14 37.13 40.91Q37.84 42.69 38.24 44.86L38.24 44.86L39.56 52.00L29.56 52.00L28.93 46.97Q28.70 45.14 28.30 43.54Q27.90 41.94 26.76 40.94Q25.61 39.94 23.16 39.94L23.16 39.94L20.47 39.94L20.47 52.00Z";

export const SiteLogo = ({ href, className }: SiteLogoProps) => (
  <Link
    href={href}
    aria-label="Kamil Szczepanik, home"
    className={cn(
      "relative -ml-1 flex min-h-11 shrink-0 cursor-pointer items-center rounded-sm px-1 opacity-90 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 before:absolute before:inset-y-0 before:-inset-x-1.5",
      className,
    )}
  >
    <svg aria-hidden viewBox="11 12 42 40" className="h-6 w-auto lg:h-7">
      <path fill="#fff" d={MARK_PATH} />
      <circle cx="47.16" cy="46.6" r="5.4" fill="#3f7ee8" />
    </svg>
  </Link>
);
