import AssistantLauncher from "@/components/hero/AssistantLauncher";
import AppShell from "@/components/layout/AppShell";
import BackgroundFX from "@/components/layout/BackgroundFX";
import CursorFX from "@/components/layout/CursorFX";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import ScrollProgress from "@/components/layout/ScrollProgress";
import { isResumeAvailable, resolvePortrait } from "@/lib/assets";
import { visibleSections } from "@/lib/nav";

/**
 * Shared chrome for every content page. Because this layout persists across
 * client-side navigations, the sidebar, background and assistant stay mounted
 * (no flicker, chat history survives) and only the page content transitions.
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const items = visibleSections();

  return (
    <>
      <BackgroundFX />
      <ScrollProgress />
      <AppShell
        items={items}
        resumeAvailable={isResumeAvailable()}
        portraitSrc={resolvePortrait()}
      />

      {/* overflow-x: clip (not hidden) crops horizontal overflow — e.g. the
          bounding boxes of the rotating HUD rings — without creating a scroll
          container, so vertical scrolling and positioning are unaffected. */}
      <div className="overflow-x-clip lg:pl-[248px]">
        <PageTransition>
          {children}
          <Footer items={items} />
        </PageTransition>
      </div>

      <AssistantLauncher />
      <CursorFX />
    </>
  );
}
