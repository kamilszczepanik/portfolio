"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  MessageCircle,
  Mail,
  Github,
  Twitter,
  Video,
  Phone,
} from "lucide-react";
import { CONTACT_INFO } from "@/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1.5,
      }}
    >
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button className="fixed bottom-8 right-8 z-50 flex items-center gap-4 bg-primary hover:bg-primary/90 rounded-full px-6 py-4 shadow-lg transition-all hover:scale-105 hover:transition-all group cursor-pointer">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-7 w-7 text-white" />
              <span className="text-white font-medium text-lg">Contact Me</span>
            </div>
            <div className="h-6 w-px bg-white/30" />
            <ChevronDown
              className={`h-6 w-6 text-white transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          side="top"
          className="w-56 mb-2 bg-black/90 backdrop-blur-sm border border-white/20 rounded-xl shadow-xl duration-300 ease-out"
        >
          <DropdownMenuItem asChild>
            <Link
              href={CONTACT_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 cursor-pointer text-white text-lg hover:bg-primary/20 rounded-lg px-3 py-2 transition-all duration-200 hover:scale-105 hover:translate-x-1"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex items-center gap-3 cursor-pointer text-white text-lg hover:bg-primary/20 rounded-lg px-3 py-2 transition-all duration-200 hover:scale-105 hover:translate-x-1"
            >
              <Mail className="h-5 w-5" />
              Email
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={CONTACT_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 cursor-pointer text-white text-lg hover:bg-primary/20 rounded-lg px-3 py-2 transition-all duration-200 hover:scale-105 hover:translate-x-1"
            >
              <Phone className="h-5 w-5" />
              LinkedIn
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={CONTACT_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 cursor-pointer text-white text-lg hover:bg-primary/20 rounded-lg px-3 py-2 transition-all duration-200 hover:scale-105 hover:translate-x-1"
            >
              <Github className="h-5 w-5" />
              GitHub
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={CONTACT_INFO.x}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 cursor-pointer text-white text-lg hover:bg-primary/20 rounded-lg px-3 py-2 transition-all duration-200 hover:scale-105 hover:translate-x-1"
            >
              <Twitter className="h-5 w-5" />
              Twitter
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-white/20" />
          <DropdownMenuItem asChild>
            <Link
              href={CONTACT_INFO.googleCalendar}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 cursor-pointer text-white text-lg hover:bg-primary/20 rounded-lg px-3 py-2 transition-all duration-200 hover:scale-105 hover:translate-x-1"
            >
              <Video className="h-5 w-5" />
              Google Calendar
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
};
