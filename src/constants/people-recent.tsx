import { Person } from "@/types";
import krzysztofKamienobrodzkiImg from "/public/images/people/krzysztof-kamienobrodzki.jpg";
import sudaisJavedImg from "/public/images/people/sudais-javed.jpg";
import anikaStrzelczakBatkowskaImg from "/public/images/people/anika-strzelczak-batkowska.jpg";
import karolinaSowaImg from "/public/images/people/karolina-sowa.jpg";
import hilalBassmarImg from "/public/images/people/hilal-bassmar.jpg";

export const RECENT_PEOPLE: Person[] = [
  {
    id: 10,
    name: "Krzysztof Kamienobrodzki",
    designation: "Co-founder & Architect at Kosmos",
    description: (
      <div>
        We contacted Kamil because we needed to launch a new website.
        <br /> <br /> Communication throughout the entire project was smooth and
        efficient. Kamil is not only a skilled developer, but he also has strong
        soft skills that turned out to be extremely valuable in our case. <br />{" "}
        <br /> Looking back, we realize that we didn’t fully know what we wanted
        at the start.
        <br /> <br />
        Nevertheless, Kamil guided us through the whole process and delivered a
        website that fully meets our expectations, reflects who we are, and
        makes a great impression on our clients. <br /> <br /> Thank you, Kamil!
      </div>
    ),
    image: krzysztofKamienobrodzkiImg,
  },
  {
    id: 9,
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
  {
    id: 8,
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
    id: 7,
    name: "Karolina Sowa",
    designation: "Behind Suave Concept",
    description: (
      <div>
        I had the pleasure of working with Kamil on my website. His creativity,
        clear vision, and innovative ideas elevated my brand.
        <br /> <br />
        It was truly impressive how fast, proactive, and effective he was
        throughout the process, anticipating needs and suggesting improvements.{" "}
        <br /> <br />I cannot forget about excellent communication - every step
        was clear, collaborative, and professional. <br /> <br />I couldn’t be
        happier with the result - a website that perfectly reflects my brand —
        it’s not only visually stunning but also functional, user-friendly, and
        aligned with my vision.
      </div>
    ),
    image: karolinaSowaImg,
    link: "https://www.suaveconcept.com/",
  },
  {
    id: 6,
    name: "Hilal Bassmar",
    designation: "Founder of Czytam Tarota",
    description: (
      <div>
        I entrusted Kamil with the overall design refactor of my platform, and I
        was positively shocked by the results. He didn&apos;t just meet the
        brief; he delivered far more than I expected.
        <br />
        <br />
        His speed and responsiveness were outstanding. Kamil was open to daily
        communication, which allowed us to keep the momentum going and ensure
        every detail was perfect without any delays.
        <br />
        <br />
        It was a seamless collaboration with someone who genuinely cares about
        the quality of the final product.
      </div>
    ),
    image: hilalBassmarImg,
  },
];
