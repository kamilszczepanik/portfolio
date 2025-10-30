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
      className="absolute top-4 right-4 z-30 cursor-pointer group"
      onClick={() => onClick(ABOUT_ME)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center gap-3 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30 hover:bg-black/70 transition-colors">
        <Image
          width={80}
          height={80}
          src={ABOUT_ME.image}
          alt={ABOUT_ME.name}
          className="relative m-0 h-18 w-18 rounded-full border-2 border-white object-cover object-top p-0 transition duration-300 group-hover:scale-105"
          sizes="80px"
          placeholder={typeof ABOUT_ME.image !== "string" ? "blur" : undefined}
        />
        <div className="flex flex-col">
          <h3 className="font-bold text-white text-lg leading-tight">
            {ABOUT_ME.name}
          </h3>
          <p className="text-sm text-foreground leading-tight">
            {ABOUT_ME.designation}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
