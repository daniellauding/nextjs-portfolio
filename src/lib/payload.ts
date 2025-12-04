import { getPayload } from 'payload'
import config from '../../payload.config'

// Cache the payload instance
let cachedPayload: any = null

export const getPayloadClient = async () => {
  if (!cachedPayload) {
    cachedPayload = await getPayload({
      config,
    })
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
  })
}

export const getApps = async () => {
  const payload = await getPayloadClient()
  return await payload.find({
    collection: 'apps',
    sort: '-featured',
  })
}

export const getSkills = async () => {
  const payload = await getPayloadClient()
  return await payload.find({
    collection: 'skills',
    sort: 'order',
  })
}

export const getExperience = async () => {
  const payload = await getPayloadClient()
  return await payload.find({
    collection: 'experience',
    sort: 'order',
  })
}

export const getEducation = async () => {
  const payload = await getPayloadClient()
  return await payload.find({
    collection: 'education',
    sort: 'order',
  })
}

export const getSiteSettings = async () => {
  const payload = await getPayloadClient()
  return await payload.findGlobal({
    slug: 'site-settings',
  })
}