import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'

// Helper: convert plain text to Payload Lexical richText format
function textToLexical(text: string) {
  if (!text) return null
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'text',
              format: 0,
              style: '',
              mode: 'normal',
              detail: 0,
              text: text,
              version: 1,
            },
          ],
          direction: 'ltr',
        },
      ],
      direction: 'ltr',
    },
  }
}

// Helper: slugify a string
function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function seed() {
  console.log('🌱 Starting Payload CMS seed...')

  const payload = await getPayload({ config })

  // Read portfolio data
  const portfolioPath = path.join(process.cwd(), 'src', 'data', 'portfolio.json')
  const portfolioData = JSON.parse(fs.readFileSync(portfolioPath, 'utf8'))

  // ─────────────────────────────────────────────
  // 1. Create admin user
  // ─────────────────────────────────────────────
  try {
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (existingUsers.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@daniellauding.se',
          password: 'Portfolio2026!',
          name: 'Daniel Lauding',
        },
      })
      console.log('✅ Created admin user: admin@daniellauding.se / Portfolio2026!')
    } else {
      console.log('⏭  Admin user already exists, skipping')
    }
  } catch (err: any) {
    console.error('❌ Error creating admin user:', err.message)
  }

  // ─────────────────────────────────────────────
  // 2. Seed Personal Info global
  // ─────────────────────────────────────────────
  try {
    const p = portfolioData.personal
    const cv = portfolioData.cv
    await payload.updateGlobal({
      slug: 'personal-info',
      data: {
        name: p.name,
        firstName: p.firstName,
        lastName: p.lastName,
        title: p.title,
        subtitle: p.subtitle,
        status: p.status,
        studio: p.studio,
        location: p.location,
        email: p.email,
        phone: p.phone,
        website: p.website,
        bio: textToLexical(p.bio),
        tools: (p.tools || []).map((tool: string) => ({ tool })),
        roles: (p.roles || []).map((role: string) => ({ role })),
        experience: p.experience,
        keyContributions: (cv.keyContributions || []).map((c: string) => ({ contribution: c })),
      },
    })
    console.log('✅ Seeded PersonalInfo global')
  } catch (err: any) {
    console.error('❌ Error seeding PersonalInfo:', err.message)
  }

  // ─────────────────────────────────────────────
  // 3. Seed Skills
  // ─────────────────────────────────────────────
  try {
    const existingSkills = await payload.find({ collection: 'skills', limit: 1 })
    if (existingSkills.docs.length > 0) {
      console.log('⏭  Skills already seeded, skipping')
    } else {
      for (let i = 0; i < portfolioData.skills.length; i++) {
        const skill = portfolioData.skills[i]
        await payload.create({
          collection: 'skills',
          data: {
            name: skill,
            category: 'other',
            proficiency: 'intermediate',
            order: i,
          },
        })
      }
      console.log(`✅ Seeded ${portfolioData.skills.length} skills`)
    }
  } catch (err: any) {
    console.error('❌ Error seeding Skills:', err.message)
  }

  // ─────────────────────────────────────────────
  // 4. Seed Clients
  // ─────────────────────────────────────────────
  try {
    const existingClients = await payload.find({ collection: 'clients', limit: 1 })
    if (existingClients.docs.length > 0) {
      console.log('⏭  Clients already seeded, skipping')
    } else {
      for (let i = 0; i < portfolioData.clients.length; i++) {
        const client = portfolioData.clients[i]
        await payload.create({
          collection: 'clients',
          data: {
            name: client.name,
            url: client.url || null,
            order: i,
          },
        })
      }
      console.log(`✅ Seeded ${portfolioData.clients.length} clients`)
    }
  } catch (err: any) {
    console.error('❌ Error seeding Clients:', err.message)
  }

  // ─────────────────────────────────────────────
  // 5. Seed Experience (CV)
  // ─────────────────────────────────────────────
  try {
    const existingExp = await payload.find({ collection: 'experience', limit: 1 })
    if (existingExp.docs.length > 0) {
      console.log('⏭  Experience already seeded, skipping')
    } else {
      for (let i = 0; i < portfolioData.cv.experience.length; i++) {
        const exp = portfolioData.cv.experience[i]
        // Build recommendation group (use first recommendation if exists)
        const rec = exp.recommendations && exp.recommendations[0]
          ? {
              quote: exp.recommendations[0].quote || '',
              author: exp.recommendations[0].author || '',
              role: exp.recommendations[0].role || '',
              date: exp.recommendations[0].date || '',
            }
          : { quote: '', author: '', role: '', date: '' }

        await payload.create({
          collection: 'experience',
          data: {
            title: exp.title,
            company: exp.company,
            companyUrl: exp.companyUrl || null,
            period: exp.period,
            description: textToLexical(exp.description || ''),
            projects: (exp.projects || []).map((proj: string) => ({
              project: textToLexical(proj),
            })),
            recommendation: rec,
            order: i,
          },
        })
      }
      console.log(`✅ Seeded ${portfolioData.cv.experience.length} experience entries`)
    }
  } catch (err: any) {
    console.error('❌ Error seeding Experience:', err.message)
  }

  // ─────────────────────────────────────────────
  // 6. Seed Education
  // ─────────────────────────────────────────────
  try {
    const existingEdu = await payload.find({ collection: 'education', limit: 1 })
    if (existingEdu.docs.length > 0) {
      console.log('⏭  Education already seeded, skipping')
    } else {
      for (let i = 0; i < portfolioData.cv.education.length; i++) {
        const edu = portfolioData.cv.education[i]
        await payload.create({
          collection: 'education',
          data: {
            degree: edu.degree,
            school: edu.school,
            schoolUrl: edu.schoolUrl || null,
            year: edu.year,
            order: i,
          },
        })
      }
      console.log(`✅ Seeded ${portfolioData.cv.education.length} education entries`)
    }
  } catch (err: any) {
    console.error('❌ Error seeding Education:', err.message)
  }

  // ─────────────────────────────────────────────
  // 7. Seed Projects
  // ─────────────────────────────────────────────
  try {
    const existingProjects = await payload.find({ collection: 'projects', limit: 1 })
    if (existingProjects.docs.length > 0) {
      console.log('⏭  Projects already seeded, skipping')
    } else {
      for (const project of portfolioData.projects) {
        const details = project.details || {}

        // Build sections (convert string content to lexical)
        const sections = (details.sections || []).map((section: any) => ({
          title: section.title || '',
          content: textToLexical(section.content || ''),
          images: [],
        }))

        // Build testimonial
        const testimonial = details.testimonial
          ? {
              quote: details.testimonial.quote || '',
              author: details.testimonial.author || '',
              role: details.testimonial.role || '',
            }
          : { quote: '', author: '', role: '' }

        await payload.create({
          collection: 'projects',
          data: {
            name: project.name,
            slug: project.slug,
            type: project.type || '',
            description: project.description,
            date: project.date || '',
            location: project.location || '',
            url: project.url || null,
            featured: project.featured || false,
            color: project.color || '#000000',
            imageUrl: project.image || null, // store path as text fallback
            tags: (project.tags || []).map((tag: string) => ({ tag })),
            details: {
              client: details.client || '',
              duration: details.duration || '',
              team: details.team || '',
              role: details.role || '',
              challenge: details.challenge || '',
              solution: details.solution || '',
              impact: details.impact || '',
              sections,
              testimonial,
              nextProject: null, // will link in second pass
            },
          },
        })
      }
      console.log(`✅ Seeded ${portfolioData.projects.length} projects`)

      // Second pass: link nextProject relationships
      console.log('🔗 Linking nextProject relationships...')
      for (const project of portfolioData.projects) {
        const nextSlug = project.details?.nextProject
        if (!nextSlug) continue

        const current = await payload.find({
          collection: 'projects',
          where: { slug: { equals: project.slug } },
          limit: 1,
        })
        const next = await payload.find({
          collection: 'projects',
          where: { slug: { equals: nextSlug } },
          limit: 1,
        })

        if (current.docs[0] && next.docs[0]) {
          await payload.update({
            collection: 'projects',
            id: current.docs[0].id,
            data: {
              details: {
                ...current.docs[0].details,
                nextProject: next.docs[0].id,
              },
            },
          })
        }
      }
      console.log('✅ Linked nextProject relationships')
    }
  } catch (err: any) {
    console.error('❌ Error seeding Projects:', err.message)
  }

  // ─────────────────────────────────────────────
  // 8. Seed Apps
  // ─────────────────────────────────────────────
  try {
    const existingApps = await payload.find({ collection: 'apps', limit: 1 })
    if (existingApps.docs.length > 0) {
      console.log('⏭  Apps already seeded, skipping')
    } else {
      for (const app of portfolioData.apps) {
        await payload.create({
          collection: 'apps',
          data: {
            name: app.name,
            slug: app.slug,
            iconUrl: app.icon || null,
            description: app.description,
            appStoreUrl: app.appStoreUrl || null,
            playStoreUrl: app.playStoreUrl || null,
            tags: (app.tags || []).map((tag: string) => ({ tag })),
            color: app.color || '#000000',
            featured: app.featured || false,
          },
        })
      }
      console.log(`✅ Seeded ${portfolioData.apps.length} apps`)
    }
  } catch (err: any) {
    console.error('❌ Error seeding Apps:', err.message)
  }

  // ─────────────────────────────────────────────
  // Done
  // ─────────────────────────────────────────────
  console.log('\n🎉 Seed complete!')
  console.log('   Admin: http://localhost:3000/admin')
  console.log('   Email: admin@daniellauding.se')
  console.log('   Pass:  Portfolio2026!\n')

  process.exit(0)
}

seed().catch((err) => {
  console.error('Fatal seed error:', err)
  process.exit(1)
})
