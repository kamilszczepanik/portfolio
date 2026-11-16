import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Person } from "@/types";
import { PersonNameLink } from "./person-name-link";

type ReviewHeaderProps = {
  person: Person;
  imageSize: number;
  imageClassName: string;
  imageLayoutId?: string;
};

export const ReviewHeader = ({
  person,
  imageSize,
  imageClassName,
  imageLayoutId,
}: ReviewHeaderProps) => (
  <div className="flex items-center gap-3 sm:gap-4">
    <motion.span layoutId={imageLayoutId} className="block shrink-0">
      <Image
        width={imageSize}
        height={imageSize}
        src={person.image}
        alt=""
        sizes={`${imageSize}px`}
        placeholder={typeof person.image !== "string" ? "blur" : undefined}
        className={cn(
          "rounded-full border-2 border-white object-cover object-top",
          imageClassName,
        )}
      />
    </motion.span>
    <div className="min-w-0 flex-1 text-left">
      <PersonNameLink
        name={person.name}
        link={person.link}
        className="flex items-center gap-1 font-semibold text-white sm:gap-2"
        iconClassName="size-4 shrink-0"
      />
      <Dialog.Description className="text-sm text-foreground-muted sm:text-base">
        {person.designation}
      </Dialog.Description>
    </div>
  </div>
);
