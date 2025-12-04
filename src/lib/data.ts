import { getPersonalInfo, getProjects, getClients, getApps } from './payload'
import portfolioJson from '@/data/portfolio.json'

// Feature flag to switch between JSON and CMS
const USE_CMS = process.env.USE_CMS === 'true'

// Fallback functions that work with both JSON and CMS
export const getPortfolioData = async () => {
  if (USE_CMS) {
    try {
      const [personalInfo, projects, clients, apps] = await Promise.all([
        getPersonalInfo(),
        getProjects(),
        getClients(),
        getApps(),
      ])

      return {
        personal: personalInfo,
        projects: projects.docs,
        clients: clients.docs,
        apps: apps.docs,
      }
    } catch (error) {
      console.error('Failed to fetch from CMS, falling back to JSON:', error)
      return portfolioJson
    }
  }
  
  return portfolioJson
}

export const getPersonalData = async () => {
  if (USE_CMS) {
    try {
      return await getPersonalInfo()
    } catch (error) {
      console.error('Failed to fetch personal info from CMS:', error)
      return portfolioJson.personal
    }
  }
  
  return portfolioJson.personal
}

export const getProjectsData = async () => {
  if (USE_CMS) {
    try {
      const result = await getProjects()
      return result.docs
    } catch (error) {
      console.error('Failed to fetch projects from CMS:', error)
      return portfolioJson.projects
    }
  }
  
  return portfolioJson.projects
}