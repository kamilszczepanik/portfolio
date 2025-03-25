import { ContactIcons } from "./contact-icons";
import { cn } from "@/lib/utils";
import { ResumeDownload } from "./resume-download";

interface Props {
  className?: string;
}

const ContactMe = ({ className }: Props) => {
  return (
    <div className={cn("", className)}>
      <div className="flex flex-col gap-8 items-center">
        <div className="flex gap-6">
          <ResumeDownload />
          <div className="flex flex-col gap-3">
            <div>
              <h3 className="font-bold">Based in</h3>
              <span>Dubai, UAE</span>
            </div>
            <div>
              <h3 className="font-bold">Contact</h3>
              <span>kszczepanikcontact@gmail.com</span>
            </div>
          </div>
        </div>
        <ContactIcons className="w-full hidden md:flex gap-8 px-6 justify-center" />
      </div>
    </div>
  );
};

export default ContactMe;
