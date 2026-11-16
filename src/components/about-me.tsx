"use client";

import { memo } from "react";
import { NameBadge } from "@/components/name-badge";
import { SECTION_CONTAINER } from "@/components/sections/section-styles";
import { cn } from "@/lib/utils";

type AboutMeProps = {
  onOpen: () => void;
  isDocked: boolean;
};

export const AboutMe = memo(({ onOpen, isDocked }: AboutMeProps) => (
  <div
    className={cn(
      SECTION_CONTAINER,
      "relative z-30 my-1 flex shrink-0 justify-end sm:my-2",
    )}
  >
    <div className="grid *:col-start-1 *:row-start-1">
      <NameBadge variant="hero" isPlaceholder />
      {isDocked ? null : <NameBadge variant="hero" onOpen={onOpen} />}
    </div>
  </div>
));

AboutMe.displayName = "AboutMe";
