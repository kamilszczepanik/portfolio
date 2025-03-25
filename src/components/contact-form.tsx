"use client";
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/lib/send-email";
import { cn } from "@/lib/utils";

export type FormData = {
  name: string;
  email: string;
  message: string;
};

interface Props {
  className: string;
}

export const ContactForm = ({ className }: Props) => {
  const { register, handleSubmit } = useForm<FormData>();

  function onSubmit(data: FormData) {
    sendEmail(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("", className)}>
      <h4 className="text-center font-bold text-3xl mb-2 md:hidden">
        Contact me
      </h4>
      <div className="input-gradient-focus">
        <label htmlFor="name" className="hidden">
          Name
        </label>
        <Input
          type="text"
          id="name"
          placeholder="Name"
          autoComplete="given-name"
          {...register("name", { required: true })}
        />
      </div>
      <div className="input-gradient-focus">
        <label htmlFor="email" className="hidden">
          Email
        </label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          autoComplete="email"
          {...register("email", { required: true })}
        />
      </div>

      <div className="input-gradient-focus">
        <label htmlFor="message" className="hidden">
          Message
        </label>
        <Textarea
          id="message"
          rows={4}
          placeholder="Message"
          autoComplete="off"
          {...register("message", { required: true })}
        />
      </div>

      <Button type="submit" className="w-full mt-4" variant={"gradient"}>
        <Send className="mr-2 h-4 w-4" />
        Send Message
      </Button>
    </form>
  );
};
