import { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { NewTabHint } from "@/components/ui/new-tab-hint";
import { cn } from "@/lib/utils";

export const ctaVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full whitespace-nowrap text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500 motion-reduce:transition-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "",
        secondary:
          "border-2 border-primary px-5 font-medium hover:bg-primary/15",
      },
      size: {
        default: "h-11 text-sm sm:text-base [&_svg]:size-4",
        hero: "h-12 text-sm md:text-base lg:h-14 lg:text-lg [&_svg]:size-3 sm:[&_svg]:size-4 lg:[&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type CtaVariantProps = VariantProps<typeof ctaVariants>;

type CtaFaceProps = {
  variant: CtaVariantProps["variant"];
  children: ReactNode;
  className?: string;
};

export const CtaFace = ({ variant, children, className }: CtaFaceProps) =>
  variant === "secondary" ? (
    children
  ) : (
    <HoverBorderGradient
      as="span"
      containerClassName="h-full w-full"
      className={cn(
        "flex h-full w-full cursor-pointer items-center justify-center gap-2 px-6",
        className,
      )}
    >
      {children}
    </HoverBorderGradient>
  );

type CtaButtonProps = CtaVariantProps & {
  href: string;
  children: ReactNode;
  className?: string;
  faceClassName?: string;
  isExternal?: boolean;
} & Pick<ComponentProps<"a">, "aria-label">;

export const CtaButton = ({
  href,
  children,
  variant = "primary",
  size,
  className,
  faceClassName,
  isExternal = false,
  ...props
}: CtaButtonProps) => {
  const classes = cn(ctaVariants({ variant, size }), className);
  const face = (
    <CtaFace variant={variant} className={faceClassName}>
      {children}
      {isExternal ? <NewTabHint /> : null}
    </CtaFace>
  );

  if (href.startsWith("/") && !isExternal) {
    return (
      <Link href={href} className={classes} {...props}>
        {face}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...props}
    >
      {face}
    </a>
  );
};
