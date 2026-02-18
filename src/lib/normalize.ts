/**
 * Normalization utilities for converting Payload CMS docs
 * to the JSON format expected by portfolio components.
 */

/**
 * Extract plain text from Payload Lexical richText content
 */
export function lexicalToText(content: unknown): string {
  if (!content) return ''
  if (typeof content === 'string') return content
  if (typeof content !== 'object') return String(content)

  const node = content as Record<string, unknown>

  const extractText = (n: unknown): string => {
    if (!n || typeof n !== 'object') return ''
    const obj = n as Record<string, unknown>
    if (obj.type === 'text') return (obj.text as string) || ''
    if (Array.isArray(obj.children)) {
      return obj.children.map(extractText).filter(Boolean).join(' ')
    }
    return ''
  }

  return extractText(node.root || node).trim()
}

/**
 * Normalize a Payload project doc to match JSON portfolio format
 */
export function normalizeProject(doc: Record<string, unknown>): Record<string, unknown> {
  const details = (doc.details as Record<string, unknown>) || {}
  const sections = (details.sections as Array<Record<string, unknown>>) || []
  const testimonial = details.testimonial as Record<string, unknown> | undefined
  const nextProjectRel = details.nextProject

  // nextProject could be a relationship object {id, slug, name} or just a slug string
  let nextProjectSlug: string | null = null
  if (nextProjectRel && typeof nextProjectRel === 'object') {
    nextProjectSlug = (nextProjectRel as Record<string, unknown>).slug as string || null
  } else if (typeof nextProjectRel === 'string') {
    nextProjectSlug = nextProjectRel
  }

  // image: prefer uploaded media URL, then imageUrl text field, then empty string
  const imageMedia = doc.image as Record<string, unknown> | null | undefined
  const imageUrl =
    (imageMedia && typeof imageMedia === 'object' ? imageMedia.url as string : null) ||
    (doc.imageUrl as string | null) ||
    ''

  return {
    id: String(doc.id),
    slug: doc.slug as string,
    name: doc.name as string,
    type: (doc.type as string) || '',
    date: (doc.date as string) || '',
    location: (doc.location as string) || '',
    url: (doc.url as string) || '',
    description: doc.description as string,
    tags: ((doc.tags as Array<Record<string, unknown>>) || [])
      .map((t) => t.tag as string)
      .filter(Boolean),
    image: imageUrl,
    color: (doc.color as string) || '#000000',
    featured: (doc.featured as boolean) || false,
    password: (doc.password as string) || null,
    details: {
      client: (details.client as string) || '',
      duration: (details.duration as string) || '',
      team: (details.team as string) || '',
      role: (details.role as string) || '',
      challenge: (details.challenge as string) || '',
      solution: (details.solution as string) || '',
      impact: (details.impact as string) || '',
      sections: sections.map((s) => ({
        title: (s.title as string) || '',
        content: lexicalToText(s.content) || '',
        images: [],
      })),
      testimonial: testimonial
        ? {
            quote: (testimonial.quote as string) || '',
            author: (testimonial.author as string) || '',
            role: (testimonial.role as string) || '',
          }
        : undefined,
      nextProject: nextProjectSlug,
    },
  }
}

/**
 * Normalize a Payload app doc to match JSON portfolio format
 */
export function normalizeApp(doc: Record<string, unknown>): Record<string, unknown> {
  const iconMedia = doc.icon as Record<string, unknown> | null | undefined
  const iconUrl =
    (iconMedia && typeof iconMedia === 'object' ? iconMedia.url as string : null) ||
    (doc.iconUrl as string | null) ||
    ''

  const details = (doc.details as Record<string, unknown>) || {}

  return {
    id: String(doc.id),
    slug: doc.slug as string,
    name: doc.name as string,
    icon: iconUrl,
    description: doc.description as string,
    appStoreUrl: (doc.appStoreUrl as string | null) || null,
    playStoreUrl: (doc.playStoreUrl as string | null) || null,
    tags: ((doc.tags as Array<Record<string, unknown>>) || [])
      .map((t) => t.tag as string)
      .filter(Boolean),
    color: (doc.color as string) || '#000000',
    featured: (doc.featured as boolean) || false,
    details: details.overview
      ? {
          overview: lexicalToText(details.overview) || '',
          features: ((details.features as Array<Record<string, unknown>>) || []).map(
            (f) => f.feature as string
          ),
          screenshots: [],
          testimonials: ((details.testimonials as Array<Record<string, unknown>>) || []).map((t) => ({
            quote: t.quote as string,
            author: t.author as string,
            rating: t.rating as number,
          })),
        }
      : undefined,
  }
}

/**
 * Normalize a Payload experience doc to match JSON portfolio CV format
 */
export function normalizeExperience(doc: Record<string, unknown>): Record<string, unknown> {
  const recommendation = doc.recommendation as Record<string, unknown> | undefined

  return {
    title: doc.title as string,
    company: doc.company as string,
    companyUrl: (doc.companyUrl as string | null) || undefined,
    period: doc.period as string,
    description: lexicalToText(doc.description) || '',
    projects: ((doc.projects as Array<Record<string, unknown>>) || []).map(
      (p) => lexicalToText(p.project) || ''
    ),
    recommendations:
      recommendation?.quote
        ? [
            {
              quote: recommendation.quote as string,
              author: (recommendation.author as string) || '',
              role: (recommendation.role as string) || '',
              date: (recommendation.date as string) || '',
            },
          ]
        : [],
  }
}

/**
 * Normalize a Payload client doc
 */
export function normalizeClient(doc: Record<string, unknown>): Record<string, unknown> {
  return {
    name: doc.name as string,
    url: (doc.url as string | null) || null,
  }
}

/**
 * Normalize a Payload education doc to match JSON portfolio format
 */
export function normalizeEducation(doc: Record<string, unknown>): Record<string, unknown> {
  return {
    degree: doc.degree as string,
    school: doc.school as string,
    schoolUrl: (doc.schoolUrl as string | null) || undefined,
    year: doc.year as string,
  }
}

/**
 * Normalize PersonalInfo global to match JSON portfolio format
 */
export function normalizePersonalInfo(doc: Record<string, unknown>): Record<string, unknown> {
  return {
    name: (doc.name as string) || '',
    firstName: (doc.firstName as string) || '',
    lastName: (doc.lastName as string) || '',
    title: (doc.title as string) || '',
    subtitle: (doc.subtitle as string) || '',
    status: (doc.status as string) || '',
    studio: (doc.studio as string) || '',
    location: (doc.location as string) || '',
    email: (doc.email as string) || '',
    phone: (doc.phone as string) || '',
    website: (doc.website as string) || '',
    bio: lexicalToText(doc.bio) || '',
    tools: ((doc.tools as Array<Record<string, unknown>>) || [])
      .map((t) => t.tool as string)
      .filter(Boolean),
    roles: ((doc.roles as Array<Record<string, unknown>>) || [])
      .map((r) => r.role as string)
      .filter(Boolean),
    experience: (doc.experience as string) || '',
  }
}
