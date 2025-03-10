import Link from "next/link";
import { Button } from "./ui/button";
import {
  Github,
  Linkedin,
  MessageSquareMoreIcon,
  Phone,
  Send,
} from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const ContactMe = () => {
  return (
    <div className="w-full">
      <h2 className="text-gray-500 text-center text-lg">GET IN TOUCH</h2>
      <div className="w-full flex gap-8">
        <form className="w-full flex flex-col gap-4">
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
            <Textarea
              id="message"
              rows={4}
              placeholder="Message"
            />
          </div>

          <Button type="submit" className="w-full">
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </Button>
        </form>
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="font-bold">Contact</h3>
            <Link href="mailto:kszczepanikcontact@gmail.com">
              kszczepanikcontact@gmail.com
            </Link>
          </div>
          <div>
            <h3 className="font-bold">Based in</h3>
            <span>Dubai, UAE</span>
          </div>
          <div className="flex gap-4">
            <Link href="https://www.linkedin.com/in/kamilszczepanik">
              <Linkedin />
            </Link>

            <Link href="https://github.com/kamilszczepanik">
              <Github />
            </Link>

            <Link href="tel:971544099571">
              <Phone />
            </Link>

            <Link href="https://wa.me/971544099571">
              <MessageSquareMoreIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
