import { CaseStudySectionContent } from "@/types";
import { cn } from "@/lib/utils";
import { CASE_STUDY_HEADING } from "@/components/sections/section-styles";
import { CtaButton } from "@/components/ui/cta-button";

type CaseStudySectionProps = {
  section: CaseStudySectionContent;
};

export const CaseStudySection = ({ section }: CaseStudySectionProps) => {
  const List = section.isOrdered ? "ol" : "ul";
  const LinkIcon = section.link?.icon;

  return (
    <section id={section.id} className="flex scroll-mt-8 flex-col gap-4">
      <h2 className={CASE_STUDY_HEADING}>{section.heading}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph} className="text-lg leading-relaxed text-neutral-300">
          {paragraph}
        </p>
      ))}
      {section.bullets && section.bullets.length > 0 ? (
        <List
          className={cn(
            "flex flex-col gap-3 pl-5 text-lg leading-relaxed text-neutral-300 marker:text-blue-400",
            section.isOrdered
              ? "list-decimal marker:font-semibold"
              : "list-disc",
          )}
        >
          {section.bullets.map((bullet) => (
            <li key={bullet} className="pl-1">
              {bullet}
            </li>
          ))}
        </List>
      ) : null}
      {section.link && LinkIcon ? (
        <div className="flex">
          <CtaButton href={section.link.href} variant="secondary" isExternal>
            <LinkIcon aria-hidden="true" />
            {section.link.label}
          </CtaButton>
        </div>
      ) : null}
    </section>
  );
};
