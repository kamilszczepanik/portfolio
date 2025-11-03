import { Company, Person, Stat } from "@/types";
import { LinkPreview } from "@/components/ui/link-preview";

// RESUME
import kamilProfileImg from "/public/resume/ProfilePictureKamilSzczepanik.jpg";

// PEOPLE
import karolinaSowaImg from "/public/images/people/karolina-sowa.jpg";
import hilalBassmarImg from "/public/images/people/hilal-bassmar.jpg";
import ahmadAlyaaqbaImg from "/public/images/people/ahmad-alyaaqba.jpg";
import mateuszMajImg from "/public/images/people/mateusz-maj.jpg";
import joshuaAlmeidaImg from "/public/images/people/joshua-almeida.jpg";
import dobroslawaGalachowskaImg from "/public/images/people/dobroslawa-galachowska.jpg";
import jakubMatrackiImg from "/public/images/people/jakub-matracki.jpg";
import barbaraBatkowskaImg from "/public/images/people/barbara-batkowska.jpg";
import anikaStrzelczakBatkowskaImg from "/public/images/people/anika-strzelczak-batkowska.jpg";
// import krzysztofKamienobrodzkiImg from "/public/images/people/krzysztof-kamienobrodzki.jpg";
import sudaisJavedImg from "/public/images/people/sudais-javed.jpg";

// PROJECTS
import appleCalculatorImg from "/public/images/projects/apple-calculator.jpg";
import czytamTarotaImg from "/public/images/projects/czytam-tarota.jpg";
import dashboardAddForecastImg from "/public/images/projects/dashboard-add-forecast.jpg";
import rankingsImg from "/public/images/projects/rankings.jpg";
import excelImg from "/public/images/projects/excel.jpg";
import reflexImg from "/public/images/projects/reflex.jpg";
import suaveConceptImg from "/public/images/projects/suave-concept.jpg";
import testsPassedImg from "/public/images/projects/tests-passed.jpg";
import thumbnailImg from "/public/images/projects/thumbnail.jpg";
import unoImg from "/public/images/projects/uno.jpg";
import usersImg from "/public/images/projects/users.jpg";
import dgCarsLandingPageImg from "/public/images/projects/dg-cars-landing-page.jpg";
import dgCarsCategoriesImg from "/public/images/projects/dg-cars-categories.jpg";
import dgCarsSearchImg from "/public/images/projects/dg-cars-search.jpg";

// COMPANIES PREVIEW
import cambAiPreviewImg from "/public/images/companies/camb-ai-preview.jpg";
import inraPreviewImg from "/public/images/companies/inra-preview.jpg";
import skyEngineAiPreviewImg from "/public/images/companies/sky-engine-ai-preview.jpg";
import unityTPreviewImg from "/public/images/companies/unity-t-preview.jpg";

// COMPANIES LOGOS
import cambAiLogo from "/public/images/companies/camb-ai.jpeg";
import inraLogo from "/public/images/companies/inra.jpg";
import skyEngineAiLogo from "/public/images/companies/sky-engine-ai.png";
import unityTLogo from "/public/images/companies/unity-t.jpeg";

export const CONTACT_INFO = {
  email: "kszczepanikcontact@gmail.com",
  phone: "+971 54 409 9548",
  phoneNumber: "971544099548",
  linkedin: "https://www.linkedin.com/in/kamilszczepanik",
  github: "https://github.com/kamilszczepanik",
  whatsapp: "https://wa.me/971544099548",
  x: "https://x.com/kamil_founder",
  location: "Dubai, UAE",
  googleCalendar: "https://calendar.app.google/75iDwNbevRdnmhSQ9",
};

export const COMPANIES: Company[] = [
  {
    name: "Camb.ai",
    image: cambAiLogo,
    link: "https://www.camb.ai/",
    previewImage: cambAiPreviewImg,
  },
  {
    name: "SKY ENGINE AI",
    image: skyEngineAiLogo,
    link: "https://www.skyengine.ai/",
    previewImage: skyEngineAiPreviewImg,
  },
  {
    name: "INRA",
    image: inraLogo,
    link: "https://independentranking.com/",
    previewImage: inraPreviewImg,
  },
  {
    name: "Unity-t",
    image: unityTLogo,
    link: "https://www.unity-t.pl/",
    previewImage: unityTPreviewImg,
  },
];

export const STATS: Stat[] = [
  {
    label: "Years",
    value: 5,
    suffix: "+",
  },
  {
    label: "Projects",
    value: 30,
    suffix: "+",
  },
  {
    label: "Clients",
    value: 50,
    suffix: "+",
  },
];

export const ABOUT_ME: Person = {
  id: 0,
  name: "Kamil Szczepanik",
  designation: "Senior Software Engineer",
  description: (
    <div className="space-y-4 text-foreground leading-relaxed">
      <p className="text-xl font-semibold text-white border-b border-foreground-muted pb-2">
        Building & Scaling Products from Idea to Impact
      </p>

      <div className="space-y-2">
        <p className="text-base">
          Hi, I&apos;m Kamil. I&apos;m a senior software engineer with 5+ years
          of experience specializing in building MVPs from 0-to-1 and scaling
          them into production-ready applications.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white border-b border-foreground-muted pb-2">
          Recent Highlights
        </h3>

        <ul className="space-y-2">
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold text-lg mt-0.5">→</span>
            <span className="text-sm leading-relaxed">
              At{" "}
              <LinkPreview
                url="https://camb.ai"
                imageSrc={cambAiPreviewImg as unknown as string}
                isStatic
                target="_blank"
              >
                <span className="text-primary hover:text-primary/80 font-semibold transition-colors cursor-pointer">
                  CAMB.AI
                </span>
              </LinkPreview>
              , I built a complex website translation tool and cut real-time
              voice app latency by <strong className="font-bold">50%</strong>.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold text-lg mt-0.5">→</span>
            <span className="text-sm leading-relaxed">
              Led 7 web projects at{" "}
              <LinkPreview
                url="https://skyengine.ai"
                imageSrc={skyEngineAiPreviewImg as unknown as string}
                isStatic
                target="_blank"
              >
                <span className="text-primary hover:text-primary/80 font-semibold transition-colors cursor-pointer">
                  Sky Engine AI
                </span>
              </LinkPreview>{" "}
              and redesigned the core platform, directly contributing to signing
              the <strong className="font-bold">first 5 B2B clients</strong>.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold text-lg mt-0.5">→</span>
            <span className="text-sm leading-relaxed">
              As a consultant, I&apos;ve advised{" "}
              <strong className="font-bold">50+ clients</strong> (including
              C-level execs) on IT strategy, architecture, and scaling.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold text-lg mt-0.5">→</span>
            <span className="text-sm leading-relaxed">
              At{" "}
              <LinkPreview
                url="https://www.unity-t.pl/"
                imageSrc={unityTPreviewImg as unknown as string}
                isStatic
                target="_blank"
              >
                <span className="text-primary hover:text-primary/80 font-semibold transition-colors cursor-pointer">
                  Unity-t
                </span>
              </LinkPreview>{" "}
              Architected an automated testing system that cut a 32-hour manual
              process to just 30 minutes - a{" "}
              <strong className="font-bold">98% reduction</strong> in testing
              time.
            </span>
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white border-b border-foreground-muted pb-2">
          My Core Toolkit
        </h3>
        <div className="flex flex-wrap gap-1">
          {[
            "TypeScript",
            "React",
            "Vue",
            "Next.js",
            "Node.js",
            "Python",
            "GCP",
          ].map((tech) => (
            <span
              key={tech}
              className="inline-block bg-primary/10 text-primary border border-primary/20 text-xs font-medium px-2 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <p className="text-foreground text-sm">
        Off-hours, I&apos;m mastering padel and other sports.
      </p>
    </div>
  ),
  image: kamilProfileImg,
  link: "https://www.linkedin.com/in/kamil-szczepanik/",
};

const TEMPLATE_TESTIMONIAL = (
  <div className="space-y-2">
    <h1 className="font-semibold">
      Here are a few guiding questions; feel free to use them if they make
      writing the testimonial easier:
    </h1>{" "}
    <ol className="list-decimal list-inside">
      <li>How did you find me?</li>{" "}
      <li>What did you want to achieve when starting our collaboration?</li>{" "}
      <li>
        What problem or challenge were you facing before we started working
        together?
      </li>{" "}
      <li>How did I help you solve this problem?</li>{" "}
      <li>What results did you notice after our collaboration?</li>{" "}
    </ol>{" "}
    <p className="text-sm">Thanks a lot for your time!</p>
  </div>
);

export const PEOPLE: Person[] = [
  {
    id: 10,
    name: "Sudais Javed",
    designation: "QA Engineer | Software Engineer",
    description: (
      <div>
        I had the chance to work closely with Kamil as a QA, and testing his
        work was always a smooth experience. His code was clean, easy to follow,
        and whenever I raised issues or suggested improvements, he took the
        feedback seriously and refined things until they were spot on.
        <br />
        <br />
        What really stood out was his ability to manage multiple projects at the
        same time without ever dropping the ball. His time management is
        top-tier — he delivers on schedule without sacrificing quality.
        <br />
        <br />
        One thing I genuinely admired was how he handled feedback. He didn’t
        just fix what was asked — he improved the feature beyond expectations
        and made it more consistent and reliable overall. That growth mindset
        and attention to detail make him a rare teammate.
        <br />
        <br />
        Kamil is dependable, easy to collaborate with, and always focused on
        delivering work that’s solid from both a development and quality
        perspective. I’d happily work with him again.
      </div>
    ),
    image: sudaisJavedImg,
    link: "https://www.linkedin.com/in/sudais-javed-6498751b3/",
  },
  // {
  //   id: 10,
  //   name: "Krzysztof Kamienobrodzki",
  //   designation: "Co-founder & Architect at Kosmos",
  //   description: TEMPLATE_TESTIMONIAL,
  //   image: krzysztofKamienobrodzkiImg,
  //   link: "",
  // },
  {
    id: 9,
    name: "Anika Strzelczak-Batkowska",
    designation: "Marketing Manager, Coach, Journalist, Social Activist",
    description: (
      <div>
        I highly recommend Kamil. A great, creative, hardworking, responsible,
        and honest expert.
        <br />
        <br />A real rarity these days.
      </div>
    ),
    image: anikaStrzelczakBatkowskaImg,
    link: "https://www.facebook.com/anika.strzelczakbatkowska/",
  },
  {
    id: 8,
    name: "Barbara Batkowska",
    designation: "Interior Designer at New Evolution Design & Build",
    description: TEMPLATE_TESTIMONIAL,
    image: barbaraBatkowskaImg,
    link: "https://www.linkedin.com/in/barbara-batkowska-3b935a300/",
  },
  {
    id: 7,
    name: "Karolina Sowa",
    designation: "Behind Suave Concept",
    description: TEMPLATE_TESTIMONIAL,
    image: karolinaSowaImg,
    link: "https://www.suaveconcept.com/",
  },
  {
    id: 6,
    name: "Hilal Bassmar",
    designation: "Founder of Czytam Tarota",
    description: TEMPLATE_TESTIMONIAL,
    image: hilalBassmarImg,
    link: "https://www.czytamtarota.com/",
  },
  {
    id: 5,
    name: "Ahmad Alyaaqba",
    designation: "Senior Software Engineer",
    description: (
      <div>
        I had the pleasure of working with Kamil, and he always impressed me
        with his passion and dedication.
        <br />
        <br />
        He worked hard to deliver on time and was a true team player, always
        willing to support others and share his knowledge.
        <br />
        <br />
        Kamil collaborated effectively not only within our team but also across
        different teams, making a real impact on the success of our projects.{" "}
        <br />
        <br />A reliable and committed colleague I’d gladly work with again.
      </div>
    ),
    image: ahmadAlyaaqbaImg,
    link: "https://www.linkedin.com/in/ahmad-alyaaqba/",
  },
  {
    id: 4,
    name: "Mateusz Maj",
    designation: "Software Engineer",
    description: (
      <div>
        Working with Kamil was a great experience.
        <br />
        <br />
        He contributed to both frontend and backend development with a strong
        understanding of the system architecture and a high level of
        independence. <br />
        <br />
        In addition to his development work, Kamil managed our Jira workflows
        and facilitated Scrum meetings, ensuring smooth coordination within the
        team.
        <br />
        <br />
        He&apos;s a reliable, proactive, and versatile professional who I would
        highly recommend.
      </div>
    ),
    image: mateuszMajImg,
    link: "https://www.linkedin.com/in/mateusz-maj-dev/",
  },
  {
    id: 3,
    name: "Joshua Almeida",
    designation: "Web Developer | QA Engineer",
    description: (
      <div>
        I had the privilege of working with Kamil on various projects, and I can
        confidently say he is a talented and dependable software engineer.{" "}
        <br />
        <br />
        Kamil has an exceptional ability to break down complex problems and
        deliver clean, scalable, and efficient solutions. Beyond technical
        expertise, what truly sets Kamil apart is his collaborative mindset.{" "}
        <br />
        <br />
        He consistently fosters a positive team environment, proactively shares
        knowledge, and is always willing to mentor junior engineers. <br />
        <br />
        His mix of deep technical skill, clear communication, and genuine
        curiosity makes him a tremendous asset.
      </div>
    ),
    image: joshuaAlmeidaImg,
    link: "https://www.linkedin.com/in/joshua-almeida-a203112a0/",
  },
  {
    id: 2,
    name: "Dobrosława Gałachowska",
    designation: "Owner of DG-CARS",
    description: TEMPLATE_TESTIMONIAL,
    image: dobroslawaGalachowskaImg,
    link: "https://dg-cars.com/",
  },
  {
    id: 1,
    name: "Jakub Matracki",
    designation: "Frontend Developer",
    description: (
      <div>
        I had the pleasure of working with Kamil on a project, and I was
        thoroughly impressed by his skills and professionalism. He is an
        outstanding front-end developer who approaches his work with precision,
        creativity, and dedication.
        <br />
        <br />
        Throughout the project, Kamil consistently delivered top-notch
        solutions, ensuring everything was done efficiently and on time. His
        ability to quickly understand requirements and translate them into
        intuitive, user-friendly interfaces made a significant difference in the
        project&apos;s success. Collaborating with Kamil was seamless and
        enjoyable.
        <br />
        <br />I would highly recommend him to anyone looking for a reliable and
        talented front-end developer.
      </div>
    ),
    image: jakubMatrackiImg,
    link: "https://www.linkedin.com/in/jakub-matracki-3809a4233/",
  },
];

export const PROJECT_IMAGES = [
  appleCalculatorImg,
  czytamTarotaImg,
  dashboardAddForecastImg,
  rankingsImg,
  excelImg,
  reflexImg,
  suaveConceptImg,
  testsPassedImg,
  thumbnailImg,
  unoImg,
  usersImg,
  appleCalculatorImg,
  czytamTarotaImg,
  dashboardAddForecastImg,
  rankingsImg,
  suaveConceptImg,
  testsPassedImg,
  thumbnailImg,
  unoImg,
  usersImg,
  dgCarsLandingPageImg,
  czytamTarotaImg,
  dashboardAddForecastImg,
  excelImg,
  rankingsImg,
  reflexImg,
  suaveConceptImg,
  testsPassedImg,
  thumbnailImg,
  unoImg,
  reflexImg,
  dgCarsCategoriesImg,
  dgCarsSearchImg,
  thumbnailImg,
  unoImg,
];
