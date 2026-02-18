import { getProjectBySlug, getProjectsData, getAppBySlug } from "@/lib/data";
import ProjectContent from "./ProjectContent";

// Always render dynamically (reads from DB at request time)
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch from Payload (with JSON fallback built into helpers)
  const [projectDoc, appDoc, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getAppBySlug(slug),
    getProjectsData(),
  ]);

  // Determine if it's a project or app
  // A doc is a "project" if it came from the projects collection (has details.challenge etc)
  // or if it's in portfolio.json's projects array
  let project = null;
  let app = null;

  if (projectDoc && (projectDoc as Record<string, unknown>).details &&
      ((projectDoc as Record<string, unknown>).details as Record<string, unknown>)?.challenge !== undefined) {
    project = projectDoc as Record<string, unknown>;
  } else if (appDoc && (appDoc as Record<string, unknown>).appStoreUrl !== undefined) {
    app = appDoc as Record<string, unknown>;
  } else if (projectDoc) {
    // Could be from JSON apps (which have appStoreUrl)
    const pd = projectDoc as Record<string, unknown>;
    if (pd.appStoreUrl !== undefined) {
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
