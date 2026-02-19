// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cachedPayload: any = null

export const getPayloadClient = async () => {
  if (!cachedPayload) {
    // Lazy import to avoid loading Payload config at module level (causes OOM in Next.js build)
    const { getPayload } = await import('payload')
    const { default: config } = await import('../../payload.config')
    cachedPayload = await getPayload({ config })
  }
  return cachedPayload
}

// Helper functions to fetch data
export const getPersonalInfo = async () => {
  const payload = await getPayloadClient()
  return await payload.findGlobal({
    slug: 'personal-info',
  })
}

export const getProjects = async () => {
  const payload = await getPayloadClient()
  return await payload.find({
    collection: 'projects',
    sort: '-featured',
    limit: 100,
  })
}

export const getProject = async (slug: string) => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })
  return result.docs[0] || null
}

export const getClients = async () => {
  const payload = await getPayloadClient()
  return await payload.find({
    collection: 'clients',
    sort: 'order',
    limit: 100,
  })
}

export const getHighlightedProjects = async () => {
  const payload = await getPayloadClient()
  return await payload.find({
    collection: 'projects',
    where: {
      highlight: {
        equals: true,
      },
    },
    limit: 100,
  })
}

export const getApps = async () => {
  const payload = await getPayloadClient()
  return await payload.find({
    collection: 'apps',
    sort: '-featured',
    limit: 100,
  })
}

export const getSkills = async () => {
  const payload = await getPayloadClient()
  return await payload.find({
    collection: 'skills',
    sort: 'order',
    limit: 200,
  })
}

export const getExperience = async () => {
  const payload = await getPayloadClient()
  return await payload.find({
    collection: 'experience',
    sort: 'order',
    limit: 50,
  })
}

export const getEducation = async () => {
  const payload = await getPayloadClient()
  return await payload.find({
    collection: 'education',
    sort: 'order',
    limit: 20,
  })
}

export const getSiteSettings = async () => {
  const payload = await getPayloadClient()
  return await payload.findGlobal({
    slug: 'site-settings',
  })
}
