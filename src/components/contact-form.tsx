"use client";
import { CheckCircle2, ExternalLink, Send, XCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/lib/send-email";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  async function onSubmit(data: FormData) {
    try {
      setIsSubmitting(true);
      await sendEmail(data);
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
      console.error("Failed to send email:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center py-2 space-y-2",
          className
        )}
      >
        <div className="text-green-700 dark:text-green-500">
          <CheckCircle2 size={48} />
        </div>
        <h3 className="text-xl font-semibold text-center">
          Thank you for your message!
        </h3>
        <p className="text-muted-foreground text-center">
          I&apos;ll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-2 space-y-2">
        <div className="text-red-700 dark:text-red-500">
          <XCircle size={48} />
        </div>
        <h3 className="text-xl font-semibold text-center">
          Failed to send message
        </h3>
        <p className="text-muted-foreground text-center">
          Please try again later or contact me via{" "}
          <Link
            href="mailto:kszczepanikcontact@gmail.com"
            className="underline"
          >
            kszczepanikcontact@gmail.com
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
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
            disabled={isSubmitting}
            className="placeholder:text-muted-foreground placeholder:text-sm"
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
            disabled={isSubmitting}
            className="placeholder:text-muted-foreground placeholder:text-sm"
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
            className="max-h-52 placeholder:text-muted-foreground placeholder:text-sm active:text-sm"
            disabled={isSubmitting}
            {...register("message", { required: true })}
          />
        </div>
        <div className="flex items-center justify-between mt-3">
          <Button
            type="submit"
            className="w-1/2"
            variant="gradient"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="animate-pulse">Sending...</span>
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
          <Button asChild variant="link" className="w-1/2">
            <Link
              href="https://calendar.app.google/75iDwNbevRdnmhSQ9"
              target="_blank"
            >
              Book a call
              <ExternalLink className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </form>
    </div>
  );
};
