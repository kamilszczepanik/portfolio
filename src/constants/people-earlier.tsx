import { Person } from "@/types";
import ahmadAlyaaqbaImg from "/public/images/people/ahmad-alyaaqba.jpg";
import mateuszMajImg from "/public/images/people/mateusz-maj.jpg";
import joshuaAlmeidaImg from "/public/images/people/joshua-almeida.jpg";
import dobroslawaGalachowskaImg from "/public/images/people/dobroslawa-galachowska.jpg";
import jakubMatrackiImg from "/public/images/people/jakub-matracki.jpg";

export const EARLIER_PEOPLE: Person[] = [
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
    description: (
      <div>
        Collaborating with Kamil on my website was a truly great experience.
        Kamil is very professional, communicative, and patient — at every stage,
        he clearly explained what he was doing and what options we had.
        <br />
        <br />
        The website was created quickly, with great attention to detail, and
        exactly how I imagined it.
        <br />
        <br />I am very happy with the final result; everything works
        flawlessly, and the collaboration itself was smooth and pleasant. I
        highly recommend working with Kamil — he is someone you can truly rely
        on.
      </div>
    ),
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
