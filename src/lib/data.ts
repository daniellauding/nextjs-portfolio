/**
 * Server-side data access layer.
 * Always tries Payload CMS first, falls back to portfolio.json.
 * Only call these from Server Components or API routes.
 */
import {
  getPersonalInfo,
  getProjects,
  getProject,
  getHighlightedProjects as getHighlightedProjectsPayload,
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

// ─── Highlighted Projects (replaces Apps) ────────────────────────────────────

export async function getHighlightedProjects() {
  try {
    const result = await getHighlightedProjectsPayload()
    if (result.docs.length === 0) {
      // Fallback: return apps from JSON as highlight-like objects
      return portfolioJson.apps.map((app) => ({
        id: app.id,
        slug: app.slug,
        name: app.name,
        description: app.description,
        highlightLogo: app.icon,
        highlightUrl: app.appStoreUrl || null,
        tags: app.tags || [],
      }))
    }
    return result.docs.map((doc: AnyDoc) => {
      const p = normalizeProject(doc as Record<string, unknown>) as Record<string, unknown>
      return {
        id: p.id,
        slug: p.slug,
        name: p.name,
        description: p.description,
        highlightLogo: (doc as Record<string, unknown>).highlightLogo || p.image || '',
        highlightUrl: (doc as Record<string, unknown>).highlightUrl || null,
        tags: p.tags,
      }
    })
  } catch {
    return portfolioJson.apps.map((app) => ({
      id: app.id,
      slug: app.slug,
      name: app.name,
      description: app.description,
      highlightLogo: app.icon,
      highlightUrl: app.appStoreUrl || null,
      tags: app.tags || [],
    }))
  }
}

// ─── Apps (deprecated — use getHighlightedProjects) ─────────────────────────

export async function getAppsData() {
  try {
    const result = await getApps()
    if (result.docs.length === 0) return portfolioJson.apps
    return result.docs.map((doc: AnyDoc) => normalizeApp(doc as Record<string, unknown>))
  } catch {
    return portfolioJson.apps
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

// ─── Social Links ─────────────────────────────────────────────────────────────

export async function getSocialLinks(): Promise<Array<{ name: string; url: string }>> {
  try {
    const doc = await getPersonalInfo()
    const sl = (doc as AnyDoc)?.socialLinks
    if (!sl) return []
    const mapping: Array<{ key: string; name: string }> = [
      { key: 'linkedin', name: 'LinkedIn' },
      { key: 'twitter', name: 'Twitter' },
      { key: 'dribbble', name: 'Dribbble' },
      { key: 'github', name: 'GitHub' },
      { key: 'instagram', name: 'Instagram' },
      { key: 'medium', name: 'Medium' },
      { key: 'spotify', name: 'Spotify' },
      { key: 'airbnb', name: 'Airbnb' },
    ]
    return mapping
      .filter(({ key }) => sl[key])
      .map(({ key, name }) => ({ name, url: sl[key] as string }))
  } catch {
    return []
  }
}

// ─── Full portfolio data (for homepage) ──────────────────────────────────────

export async function getPortfolioData() {
  const [personal, skills, projects, clients, highlightedProjects, experience, education, socialLinks] = await Promise.all([
    getPersonalData(),
    getSkillsData(),
    getProjectsData(),
    getClientsData(),
    getHighlightedProjects(),
    getExperienceData(),
    getEducationData(),
    getSocialLinks(),
  ])

  return {
    personal,
    skills,
    projects,
    clients,
    apps: highlightedProjects,
    socialLinks,
    cv: {
      experience,
      education,
      // mediumPosts always from JSON (no Payload collection)
      mediumPosts: portfolioJson.cv.mediumPosts,
      keyContributions: portfolioJson.cv.keyContributions,
    },
  }
}
