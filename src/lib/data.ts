/**
 * Server-side data access layer.
 * Always tries Payload CMS first, falls back to portfolio.json.
 * Only call these from Server Components or API routes.
 */
import {
  getPersonalInfo,
  getProjects,
  getProject,
  getClients,
  getApps,
  getSkills,
  getExperience,
  getEducation,
} from './payload'
import {
  normalizeProject,
  normalizeApp,
  normalizeClient,
  normalizeExperience,
  normalizeEducation,
  normalizePersonalInfo,
} from './normalize'
import portfolioJson from '@/data/portfolio.json'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyDoc = any

// ─── Projects ───────────────────────────────────────────────────────────────

export async function getProjectsData() {
  try {
    const result = await getProjects()
    if (result.docs.length === 0) return portfolioJson.projects
    return result.docs.map((doc: AnyDoc) => normalizeProject(doc as Record<string, unknown>))
  } catch {
    return portfolioJson.projects
  }
}

export async function getFeaturedProjects() {
  try {
    const result = await getProjects()
    if (result.docs.length === 0) return portfolioJson.projects.filter((p) => p.featured)
    const normalized = result.docs.map((doc: AnyDoc) =>
      normalizeProject(doc as Record<string, unknown>)
    )
    return normalized.filter((p: Record<string, unknown>) => p.featured)
  } catch {
    return portfolioJson.projects.filter((p) => p.featured)
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const doc = await getProject(slug)
    if (!doc) {
      return (
        portfolioJson.projects.find((p) => p.slug === slug) ||
        portfolioJson.apps.find((a) => a.slug === slug) ||
        null
      )
    }
    return normalizeProject(doc as AnyDoc)
  } catch {
    return (
      portfolioJson.projects.find((p) => p.slug === slug) ||
      portfolioJson.apps.find((a) => a.slug === slug) ||
      null
    )
  }
}

// ─── Apps ────────────────────────────────────────────────────────────────────

export async function getAppsData() {
  try {
    const result = await getApps()
    if (result.docs.length === 0) return portfolioJson.apps
    return result.docs.map((doc: AnyDoc) => normalizeApp(doc as Record<string, unknown>))
  } catch {
    return portfolioJson.apps
  }
}

export async function getAppBySlug(slug: string) {
  try {
    const payloadModule = await import('./payload')
    const payload = await payloadModule.getPayloadClient()
    const result = await (payload as AnyDoc).find({
      collection: 'apps',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (!result.docs[0]) return portfolioJson.apps.find((a) => a.slug === slug) || null
    return normalizeApp(result.docs[0] as Record<string, unknown>)
  } catch {
    return portfolioJson.apps.find((a) => a.slug === slug) || null
  }
}

// ─── Clients ─────────────────────────────────────────────────────────────────

export async function getClientsData() {
  try {
    const result = await getClients()
    if (result.docs.length === 0) return portfolioJson.clients
    return result.docs.map((doc: AnyDoc) => normalizeClient(doc as Record<string, unknown>))
  } catch {
    return portfolioJson.clients
  }
}

// ─── Skills ──────────────────────────────────────────────────────────────────

export async function getSkillsData(): Promise<string[]> {
  try {
    const result = await getSkills()
    if (result.docs.length === 0) return portfolioJson.skills
    return result.docs
      .map((doc: AnyDoc) => (doc as Record<string, unknown>).name as string)
      .filter(Boolean)
  } catch {
    return portfolioJson.skills
  }
}

// ─── Experience ───────────────────────────────────────────────────────────────

export async function getExperienceData() {
  try {
    const result = await getExperience()
    if (result.docs.length === 0) return portfolioJson.cv.experience
    return result.docs.map((doc: AnyDoc) => normalizeExperience(doc as Record<string, unknown>))
  } catch {
    return portfolioJson.cv.experience
  }
}

// ─── Education ───────────────────────────────────────────────────────────────

export async function getEducationData() {
  try {
    const result = await getEducation()
    if (result.docs.length === 0) return portfolioJson.cv.education
    return result.docs.map((doc: AnyDoc) => normalizeEducation(doc as Record<string, unknown>))
  } catch {
    return portfolioJson.cv.education
  }
}

// ─── Personal Info ────────────────────────────────────────────────────────────

export async function getPersonalData() {
  try {
    const doc = await getPersonalInfo()
    // If name is not set (empty global), fall back to JSON
    if (!(doc as AnyDoc).name) return portfolioJson.personal
    return normalizePersonalInfo(doc as Record<string, unknown>)
  } catch {
    return portfolioJson.personal
  }
}

// ─── Full portfolio data (for homepage) ──────────────────────────────────────

export async function getPortfolioData() {
  const [personal, skills, projects, clients, apps, experience, education] = await Promise.all([
    getPersonalData(),
    getSkillsData(),
    getProjectsData(),
    getClientsData(),
    getAppsData(),
    getExperienceData(),
    getEducationData(),
  ])

  return {
    personal,
    skills,
    projects,
    clients,
    apps,
    cv: {
      experience,
      education,
      // mediumPosts always from JSON (no Payload collection)
      mediumPosts: portfolioJson.cv.mediumPosts,
      keyContributions: portfolioJson.cv.keyContributions,
    },
  }
}
