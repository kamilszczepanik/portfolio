import { CaseStudySectionContent } from "@/types";

type CaseStudySectionProps = {
  section: CaseStudySectionContent;
};

export const CaseStudySection = ({ section }: CaseStudySectionProps) => (
  <section id={section.id} className="flex scroll-mt-8 flex-col gap-4">
    <h2 className="text-xl font-semibold text-white sm:text-2xl">
      {section.heading}
    </h2>
    {section.paragraphs.map((paragraph) => (
      <p key={paragraph} className="leading-relaxed text-neutral-200">
        {paragraph}
      </p>
    ))}
    {section.bullets && section.bullets.length > 0 ? (
      <ul className="flex list-disc flex-col gap-2 pl-5 leading-relaxed text-neutral-200 marker:text-primary">
        {section.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    ) : null}
  </section>
);
