import { Button } from "./ui/button";
import { Mail, MapPin, Send } from "lucide-react";

const ContactMe = () => {
  return (
    <div className="w-full max-w-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Get in Touch</h2>
        <p className="text-muted-foreground">
          Feel free to reach out for collaborations or just a friendly chat
        </p>
      </div>

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

      <div className="mt-8 space-y-3">
        <div className="flex items-center">
          <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
          <a
            href="mailto:contact@example.com"
            className="text-primary hover:underline"
          >
            contact@example.com
          </a>
        </div>
        <div className="flex items-center">
          <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
          <span>Warsaw, Poland</span>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
