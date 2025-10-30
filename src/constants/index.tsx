import { Company, Person, Stat } from "@/types";
import cambAiLogo from "/public/images/companies/camb-ai.jpeg";
import inraLogo from "/public/images/companies/inra.jpg";
import skyEngineAiLogo from "/public/images/companies/sky-engine-ai.png";
import unityTLogo from "/public/images/companies/unity-t.jpeg";
import karolinaSowaImg from "/public/images/people/karolina-sowa.jpeg";
import hilalBassmarImg from "/public/images/people/hilal-bassmar.jpg";
import ahmadAlyaaqbaImg from "/public/images/people/ahmad-alyaaqba.jpeg";
import mateuszMajImg from "/public/images/people/mateusz-maj.jpeg";
import joshuaAlmeidaImg from "/public/images/people/joshua-almeida.jpeg";
import dobroslawaGalachowskaImg from "/public/images/people/dobroslawa-galachowska.jpg";
import jakubMatrackiImg from "/public/images/people/jakub-matracki.jpeg";
import kamilProfileImg from "/public/resume/ProfilePictureKamilSzczepanik.jpeg";
import appleCalculatorImg from "/public/images/projects/apple-calculator.jpg";
import czytamTarotaImg from "/public/images/projects/czytam-tarota.jpg";
import dashboardAddForecastImg from "/public/images/projects/dashboard-add-forecast.png";
import rankingsImg from "/public/images/projects/rankings.jpg";
import excelImg from "/public/images/projects/excel.jpg";
import reflexImg from "/public/images/projects/reflex.jpeg";
import suaveConceptImg from "/public/images/projects/suave-concept.jpg";
import testsPassedImg from "/public/images/projects/tests-passed.jpg";
import thumbnailImg from "/public/images/projects/thumbnail.jpg";
import unoImg from "/public/images/projects/uno.jpg";
import usersImg from "/public/images/projects/users.jpg";
import dgCarsLandingPageImg from "/public/images/projects/dg-cars-landing-page.jpg";
import dgCarsCategoriesImg from "/public/images/projects/dg-cars-categories.jpg";
import dgCarsSearchImg from "/public/images/projects/dg-cars-search.jpg";
import cambAiPreviewImg from "/public/images/companies/camb-ai-preview.jpg";
import inraPreviewImg from "/public/images/companies/inra-preview.jpg";
import skyEngineAiPreviewImg from "/public/images/companies/sky-engine-ai-preview.jpg";
import unityTPreviewImg from "/public/images/companies/unity-t-preview.jpg";

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
    name: "INRA",
    image: inraLogo,
    link: "https://independentranking.com/",
    previewImage: inraPreviewImg,
  },
  {
    name: "SKY ENGINE AI",
    image: skyEngineAiLogo,
    link: "https://www.skyengine.ai/",
    previewImage: skyEngineAiPreviewImg,
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
  id: 1,
  name: "Kamil Szczepanik",
  designation: "Senior Software Engineer",
  description: (
    <div>
      Hi, I&apos;m Kamil! I&apos;m a senior software engineer with 5+ years of
      experience building MVPs and scaling products from idea to production.
      <br />
      <br />
      I specialize in full-stack development with a focus on React, Next.js,
      Node.js, and cloud technologies. I love turning complex ideas into simple,
      elegant solutions that users actually want to use.
      <br />
      <br />
      When I&apos;m not coding, you&apos;ll find me exploring new technologies,
      contributing to open-source projects, or planning my next travel
      adventure. I&apos;m passionate about building products that make a real
      impact and helping teams deliver exceptional user experiences.
    </div>
  ),
  image: kamilProfileImg,
  link: "https://www.linkedin.com/in/kamil-szczepanik/",
};

export const PEOPLE: Person[] = [
  {
    id: 7,
    name: "Karolina Sowa",
    designation: "Behind Suave Concept",
    description:
      "Opinion about me from Karolina, Opinion about me from Karolina, Opinion about me from Karolina",
    image: karolinaSowaImg,
    link: "https://www.suaveconcept.com/",
  },
  {
    id: 6,
    name: "Hilal Bassmar",
    designation: "CEO",
    description:
      "Opinion about me from Hilal, Opinion about me from Hilal, Opinion about me from Hilal",
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
    description:
      "Opinion about me from Dobrosława, Opinion about me from Dobrosława, Opinion about me from Dobrosława",
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
