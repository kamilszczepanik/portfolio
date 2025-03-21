import Link from "next/link";
import { ContactForm } from "./contact-form";
import { ContactIcons } from "./contact-icons";
import { cn } from "@/lib/utils";
import { ResumeDownload } from "./resume-download";

interface Props {
  className?: string;
}

const ContactMe = ({ className }: Props) => {
  return (
    <div className={cn("", className)}>
      <ContactForm />

      <div className="flex items-center gap-4 sm:px-0 px-6 pt-4 sm:pt-0">
        <div className="sm:hidden pt-10">
          <ResumeDownload />
        </div>
        <div className="flex flex-col gap-9">
          <div className="flex flex-col gap-4 pt-10">
            <div>
              <h3 className="font-bold">Based in</h3>
              <span>Dubai, UAE</span>
            </div>
            <div>
              <h3 className="font-bold">Contact</h3>
              <Link href="mailto:kszczepanikcontact@gmail.com">
                kszczepanikcontact@gmail.com
              </Link>
            </div>
          </div>
          <ContactIcons className="hidden sm:flex" />
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
