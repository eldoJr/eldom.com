import hero from "@/components/sections/hero";
import about from "@/components/sections/about";
import projects from "@/components/sections/projects";
import contact from "@/components/sections/contact";

const Hero = hero;
const About = about;
const Projects = projects;
const Contact = contact;

export default function page() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}
