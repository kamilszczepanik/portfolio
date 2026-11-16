import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SHIPPED_AT_WORK } from "@/constants";
import { NewTabHint } from "@/components/ui/new-tab-hint";
import { cn } from "@/lib/utils";
import { ShippedProject } from "@/types";
import { FreelanceLine } from "./freelance-line";
import { SECTION_CONTAINER } from "./section-styles";

const ShippedName = ({ project }: { project: ShippedProject }) =>
  project.logo ? (
    <>
      <Image
        src={project.logo}
        alt=""
        width={160}
        height={40}
        sizes="160px"
        unoptimized={typeof project.logo === "string"}
        className="h-6 w-auto max-w-40"
      />
      <span className="sr-only">{project.name}</span>
    </>
  ) : (
    <span className="text-lg leading-6 font-semibold text-white">
      {project.name}
    </span>
  );

const ShippedItem = ({ project }: { project: ShippedProject }) => (
  <li className="flex">
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full cursor-pointer flex-col rounded-2xl border border-white/10 bg-white/3 p-4 transition-colors hover:border-white/25 hover:bg-white/6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 motion-reduce:transition-none sm:p-5"
    >
      <span className="flex h-6 items-center justify-between gap-3">
        <ShippedName project={project} />
        <ArrowUpRight
          aria-hidden
          className="size-5 shrink-0 text-white/50 transition-colors group-hover:text-white motion-reduce:transition-none"
        />
      </span>
      <span className="mt-3 block text-sm leading-relaxed text-neutral-300 sm:text-base">
        {project.summary}
      </span>
      <NewTabHint />
    </a>
  </li>
);

type ShippedAtWorkProps = {
  className?: string;
};

export const ShippedAtWork = ({ className }: ShippedAtWorkProps) => (
  <div className={cn(SECTION_CONTAINER, "pb-8 sm:pb-12", className)}>
    <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
      Shipped at work
    </h3>
    <ul className="mt-5 grid gap-3 sm:gap-4 md:grid-cols-2">
      {SHIPPED_AT_WORK.map((project) => (
        <ShippedItem key={project.name} project={project} />
      ))}
    </ul>
    <FreelanceLine className="mt-8 border-t border-white/10 pt-6" />
  </div>
);
