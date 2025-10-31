"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ABOUT_ME } from "@/constants";
import { Person } from "@/types";

interface AboutMeProps {
  onClick: (person: Person) => void;
}

export const AboutMe = ({ onClick }: AboutMeProps) => {
  return (
    <motion.div
      className="relative z-30 cursor-pointer group flex justify-end my-1 sm:my-2 px-2 sm:px-4 lg:px-4 shrink-0"
      onClick={() => onClick(ABOUT_ME)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      style={{ transformOrigin: "bottom right" }}
    >
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 lg:px-4 lg:py-2.5 border border-white/30 hover:bg-black/70 transition-colors">
        <Image
          width={80}
          height={80}
          src={ABOUT_ME.image}
          alt={ABOUT_ME.name}
          className="relative m-0 h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 rounded-full border-2 border-white object-cover object-top p-0 transition duration-300"
          sizes="(max-width: 640px) 56px, (max-width: 1024px) 64px, 80px"
          placeholder={typeof ABOUT_ME.image !== "string" ? "blur" : undefined}
        />
        <div className="flex flex-col">
          <h3 className="font-bold text-white text-base sm:text-lg lg:text-2xl leading-tight">
            {ABOUT_ME.name}
          </h3>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-foreground leading-tight">
            {ABOUT_ME.designation}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
