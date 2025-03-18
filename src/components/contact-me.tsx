import Link from "next/link";
import { Button } from "./ui/button";
import { Github, Linkedin, Phone, Send } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const ContactMe = () => {
  const gradientIconStyles = "stroke-[url(#icon-gradient)]";

  return (
    <div className="w-full">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4b5563" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#7dd3fc" />
          </linearGradient>
        </defs>
      </svg>

      <div className="pt-14 w-full flex gap-12">
        <form className="w-full flex flex-col gap-6">
          <div>
            <label htmlFor="name" className="hidden">
              Name
            </label>
            <Input type="text" id="name" placeholder="Name" />
          </div>

          <div>
            <label htmlFor="email" className="hidden">
              Email
            </label>
            <Input type="email" id="email" placeholder="Email" />
          </div>

          <div>
            <label htmlFor="message" className="hidden">
              Message
            </label>
            <Textarea id="message" rows={4} placeholder="Message" />
          </div>

          <Button type="submit" className="w-full" variant={"gradient"}>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </Button>
        </form>

        <div className="flex flex-col gap-9">
          <div className="flex flex-col gap-4 pt-10">
            <div>
              <h3 className="font-bold">Based in</h3>
              <span>Dubai, UAE</span>
            </div>
            <div>
              <h3 className="font-bold">Contact</h3>
              <Link href="mailto:kszczepanikcontact@gmail.com">
                kszczepanik@gmail.com
              </Link>
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              href="https://www.linkedin.com/in/kamilszczepanik"
              target="_blank"
            >
              <Linkedin className={gradientIconStyles} />
            </Link>

            <Link href="https://github.com/kamilszczepanik" target="_blank">
              <Github className={gradientIconStyles} />
            </Link>

            <Link href="tel:971544099571" target="_blank">
              <Phone className={gradientIconStyles} />
            </Link>

            <Link
              href="https://wa.me/971544099571"
              target="_blank"
              className="flex items-center justify-center"
            >
              <svg
                width="24"
                height="24"
                viewBox="4 4 16 16"
                className="fill-[url(#icon-gradient)] stroke-none"
              >
                <path d="M17.6 6.32A7.85 7.85 0 0 0 12 4.02a7.94 7.94 0 0 0-7.96 7.96c0 1.41.37 2.77 1.06 3.98l-1.12 4.09 4.2-1.1a8 8 0 0 0 3.82.97 7.94 7.94 0 0 0 7.96-7.94c0-2.12-.83-4.12-2.36-5.66zm-5.6 12.22a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.5.65.67-2.44-.16-.25a6.59 6.59 0 0 1-1.01-3.49 6.59 6.59 0 0 1 6.6-6.6c1.76 0 3.42.69 4.66 1.93a6.57 6.57 0 0 1 1.95 4.67 6.59 6.59 0 0 1-6.61 6.59zM15.93 13.8c-.19-.1-1.12-.55-1.29-.62-.17-.06-.3-.1-.42.1-.13.19-.48.62-.58.74-.11.13-.21.14-.4.05-.19-.1-.8-.3-1.53-.94-.56-.5-.94-1.12-1.05-1.3-.11-.2-.02-.3.08-.39.08-.09.19-.23.28-.34.1-.12.12-.2.19-.33.06-.13.03-.24-.02-.34-.05-.1-.42-1-.57-1.36-.15-.37-.31-.31-.42-.31-.11 0-.24-.03-.36-.03-.13 0-.32.05-.5.23-.16.19-.62.61-.62 1.48s.64 1.71.73 1.83c.08.12 1.19 1.83 2.9 2.57.4.17.71.28.96.36.4.12.77.11 1.05.09.32-.05 1-.41 1.14-.8.14-.4.14-.73.1-.8-.05-.08-.18-.13-.37-.23z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
