"use client";
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/lib/send-email";

export type FormData = {
  name: string;
  email: string;
  message: string;
};

export const ContactForm = () => {
  const { register, handleSubmit } = useForm<FormData>();

  function onSubmit(data: FormData) {
    sendEmail(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-6 sm:px-0 px-6"
    >
      <h4 className="text-center font-bold text-3xl -mb-2 sm:hidden">
        Contact me
      </h4>
      <div>
        <label htmlFor="name" className="hidden">
          Name
        </label>
        <Input
          type="text"
          id="name"
          placeholder="Name"
          {...(register("name"), { required: true })}
        />
      </div>
      <div>
        <label htmlFor="email" className="hidden">
          Email
        </label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
      </div>

      <div>
        <label htmlFor="message" className="hidden">
          Message
        </label>
        <Textarea
          id="message"
          rows={4}
          placeholder="Message"
          {...register("message", { required: true })}
        />
      </div>

      <Button type="submit" className="w-full" variant={"gradient"}>
        <Send className="mr-2 h-4 w-4" />
        Send Message
      </Button>
    </form>
  );
};
