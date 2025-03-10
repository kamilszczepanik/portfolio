import { Button } from "./ui/button";
import { Mail, MapPin, Send } from "lucide-react";

const ContactMe = () => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-2 text-center">Get in Touch</h2>
      <div className="w-full max-w-xl flex">
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="your.email@example.com"
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Your message"
              className="w-full resize-none"
            />
          </div>

          <Button type="submit" className="w-full">
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </Button>
        </form>
        <div>
          <div className="flex items-center gap-2">
            <Mail />
            <h3>Email</h3>
          </div>
          <a href="mailto:contact@example.com">contact@example.com</a>
          <div className="flex items-center gap-2">
            <h3>Based in</h3>
          </div>
          <MapPin />
          <span>Warsaw, Poland</span>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
