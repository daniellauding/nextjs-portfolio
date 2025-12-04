import { getPayload } from 'payload'
import config from '../payload.config.ts'
import fs from 'fs'
import path from 'path'

async function seed() {
  const payload = await getPayload({ config })

  console.log('Starting seeding process...')

  // Read portfolio data
  const portfolioPath = path.join(process.cwd(), 'src', 'data', 'portfolio.json')
  const portfolioData = JSON.parse(fs.readFileSync(portfolioPath, 'utf8'))

  try {
    // Create admin user
    const existingUser = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (existingUser.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@example.com',
          password: 'password123',
          name: 'Admin',
        },
      })
      console.log('Created admin user: admin@example.com / password123')
    }

    // Seed Personal Info
    await payload.updateGlobal({
      slug: 'personal-info',
      data: {
        name: portfolioData.personal.name,
        firstName: portfolioData.personal.firstName,
        lastName: portfolioData.personal.lastName,
        title: portfolioData.personal.title,
        subtitle: portfolioData.personal.subtitle,
        status: portfolioData.personal.status,
        studio: portfolioData.personal.studio,
        location: portfolioData.personal.location,
        email: portfolioData.personal.email,
        phone: portfolioData.personal.phone,
        website: portfolioData.personal.website,
        bio: portfolioData.personal.bio,
        tools: portfolioData.personal.tools.map(tool => ({ tool })),
        roles: portfolioData.personal.roles.map(role => ({ role })),
        experience: portfolioData.personal.experience,
        keyContributions: portfolioData.cv.keyContributions.map(contribution => ({ contribution })),
      },
    })
    console.log('Seeded personal info')

    // Seed Skills
    for (const skill of portfolioData.skills) {
      await payload.create({
        collection: 'skills',
        data: {
          name: skill,
          category: 'other',
          proficiency: 'intermediate',
        },
      })
    }
    console.log(`Seeded ${portfolioData.skills.length} skills`)

    // Seed Experience
    for (const [index, exp] of portfolioData.cv.experience.entries()) {
      await payload.create({
        collection: 'experience',
        data: {
          title: exp.title,
          company: exp.company,
          companyUrl: exp.companyUrl,
          period: exp.period,
          description: exp.description,
          projects: exp.projects ? exp.projects.map(project => ({ project })) : [],
          recommendation: exp.recommendation || {},
          order: index,
        },
      })
    }
    console.log(`Seeded ${portfolioData.cv.experience.length} experience entries`)

    // Seed Education
    for (const [index, edu] of portfolioData.cv.education.entries()) {
      await payload.create({
        collection: 'education',
        data: {
          degree: edu.degree,
          school: edu.school,
          schoolUrl: edu.schoolUrl,
          year: edu.year,
          order: index,
        },
      })
    }
    console.log(`Seeded ${portfolioData.cv.education.length} education entries`)

    // Seed Clients
    for (const [index, client] of portfolioData.clients.entries()) {
      await payload.create({
        collection: 'clients',
        data: {
          name: client.name,
          url: client.url,
          order: index,
        },
      })
    }
    console.log(`Seeded ${portfolioData.clients.length} clients`)

    console.log('Seeding completed!')

  } catch (error) {
    console.error('Error during seeding:', error)
  }

  process.exit(0)
}

seed().catch(console.error)