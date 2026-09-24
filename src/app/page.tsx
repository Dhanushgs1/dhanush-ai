import AppShell from "@/components/layout/AppShell";
import BackgroundFX from "@/components/layout/BackgroundFX";
import PageTransition from "@/components/layout/PageTransition";
import AssistantLauncher from "@/components/hero/AssistantLauncher";
import Footer from "@/components/layout/Footer";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import { Achievements, Certifications } from "@/components/sections/Credentials";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Pipeline from "@/components/sections/Pipeline";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import { isResumeAvailable, resolvePortrait } from "@/lib/assets";
import { visibleSections } from "@/lib/nav";

export default function HomePage() {
  const resumeAvailable = isResumeAvailable();
  const portraitSrc = resolvePortrait();
  const items = visibleSections();

  return (
    <>
      <BackgroundFX />
      <AppShell
        items={items}
        resumeAvailable={resumeAvailable}
        portraitSrc={portraitSrc}
      />

      <div className="lg:pl-[248px]">
        <PageTransition>
          <main
            id="main"
            className="mx-auto w-full max-w-[1500px] px-4 pb-28 sm:px-6 lg:pb-10"
          >
            <Hero portraitSrc={portraitSrc} />
            <Pipeline />
            <About />
            <Projects />
            <Experience />
            <Skills />
            <Certifications />
            <Achievements />
            <Contact resumeAvailable={resumeAvailable} />
          </main>

          <Footer items={items} />
        </PageTransition>
      </div>

      <AssistantLauncher />
    </>
  );
}
