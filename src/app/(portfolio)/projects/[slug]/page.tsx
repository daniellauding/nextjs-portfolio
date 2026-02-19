import { getProjectBySlug, getProjectsData } from "@/lib/data";
import ProjectContent from "./ProjectContent";

// Always render dynamically (reads from DB at request time)
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch from Payload (with JSON fallback built into helpers)
  const [projectDoc, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getProjectsData(),
  ]);

  // Apps are now merged into projects, so everything is a project
  let project = null;
  let app = null;

  if (projectDoc) {
    const pd = projectDoc as Record<string, unknown>;
    // Legacy check: if it came from JSON apps fallback (has appStoreUrl but no details.challenge)
    if (pd.appStoreUrl !== undefined && !((pd.details as Record<string, unknown>)?.challenge)) {
      app = pd;
    } else {
      project = pd;
    }
  }

  // Look up next project name
  let nextProjectName: string | null = null;
  if (project?.details) {
    const nextSlug = (project.details as Record<string, unknown>).nextProject as string | null;
    if (nextSlug) {
      const nextDoc = allProjects.find(
        (p: unknown) => (p as Record<string, unknown>).slug === nextSlug
      );
      if (nextDoc) {
        nextProjectName = (nextDoc as Record<string, unknown>).name as string;
      }
    }
  }

  return (
    <ProjectContent
      slug={slug}
      project={project as Parameters<typeof ProjectContent>[0]["project"]}
      app={app as Parameters<typeof ProjectContent>[0]["app"]}
      nextProjectName={nextProjectName}
    />
  );
}
