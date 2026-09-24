import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import { Achievements, Certifications } from "@/components/sections/Credentials";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Pipeline from "@/components/sections/Pipeline";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import { isResumeAvailable, resolvePortrait } from "@/lib/assets";

export default function HomePage() {
  const resumeAvailable = isResumeAvailable();

  return (
    <main
      id="main"
      className="mx-auto w-full max-w-[1500px] px-4 pb-28 sm:px-6 lg:pb-10"
    >
      <Hero portraitSrc={resolvePortrait()} />
      <Pipeline />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Certifications />
      <Achievements />
      <Contact resumeAvailable={resumeAvailable} />
    </main>
  );
}
