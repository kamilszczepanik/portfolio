"use client";

import * as HoverCard from "@radix-ui/react-hover-card";
import Image from "next/image";
import { useState } from "react";
import { ExperienceClient } from "@/types";

type ClientChipProps = {
  client: ExperienceClient;
};

const LOGO_HEIGHT = 20;

export const ClientChip = ({ client }: ClientChipProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="shrink-0">
      <HoverCard.Root
        open={isOpen}
        onOpenChange={setIsOpen}
        openDelay={100}
        closeDelay={150}
      >
        <HoverCard.Trigger asChild>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex h-9 cursor-pointer items-center gap-2 rounded-full border border-white/12 bg-white/4 px-3 text-sm whitespace-nowrap text-white/90 transition-colors hover:border-primary/50 hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 data-[state=open]:border-primary/60 data-[state=open]:bg-primary/10 motion-reduce:transition-none"
          >
            {client.logo ? (
              <Image
                src={client.logo.src}
                alt=""
                width={client.logo.width}
                height={LOGO_HEIGHT}
                unoptimized
                className="h-5 w-auto shrink-0"
              />
            ) : null}
            {client.name}
            <span className="sr-only">
              {`: ${client.product}, ${client.date}`}
            </span>
          </button>
        </HoverCard.Trigger>
        <HoverCard.Portal>
          <HoverCard.Content
            aria-hidden
            side="bottom"
            align="start"
            sideOffset={8}
            collisionPadding={16}
            className="z-60 w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-white/10 bg-neutral-950/95 p-4 shadow-2xl backdrop-blur-md"
          >
            <p className="text-sm leading-snug text-white">{client.product}</p>
            <p className="mt-1.5 text-xs text-white/60">{client.date}</p>
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>
    </li>
  );
};
