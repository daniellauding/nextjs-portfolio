import { getProjectsData, getSocialLinks } from "@/lib/data";
import CasesClient from "./CasesClient";

// Always render dynamically (reads from DB at request time)
export const dynamic = "force-dynamic";

export default async function CasesPage() {
  const [projects, socialLinks] = await Promise.all([
    getProjectsData(),
    getSocialLinks(),
  ]);
  return (
    <CasesClient
      projects={projects as Parameters<typeof CasesClient>[0]["projects"]}
      socialLinks={socialLinks}
    />
  );
}
