// @ts-nocheck
/* eslint-disable */
import { getPayload } from 'payload'
import config from '../payload.config'

async function seedForms() {
  const payload = await getPayload({ config })

  // Check if contact form already exists
  const existing = await payload.find({
    collection: 'forms',
    where: { title: { equals: 'Contact' } },
  })

  if (existing.docs.length > 0) {
    console.log('Contact form already exists, skipping.')
    process.exit(0)
  }

  await payload.create({
    collection: 'forms',
    data: {
      title: 'Contact',
      fields: [
        { blockType: 'text', name: 'name', label: 'Name', required: true, width: 100 },
        { blockType: 'email', name: 'email', label: 'Email', required: true, width: 100 },
        {
          blockType: 'select',
          name: 'type',
          label: "I'm looking for",
          required: false,
          width: 100,
          options: [
            { label: 'Freelance Project', value: 'freelance' },
            { label: 'Consultant', value: 'consultant' },
            { label: 'Full-time', value: 'fulltime' },
            { label: 'Workshop / Mentorship', value: 'workshop' },
            { label: 'Just saying hi', value: 'other' },
          ],
        },
        { blockType: 'textarea', name: 'message', label: 'Message', required: true, width: 100 },
      ],
      submitButtonLabel: 'Send Message',
      confirmationType: 'message',
      confirmationMessage: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: "Thanks! I'll get back to you shortly.",
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
  })

  console.log('Contact form created successfully!')
  process.exit(0)
}

seedForms().catch((err) => {
  console.error(err)
  process.exit(1)
})
