import type { CollectionConfig } from 'payload'

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dihhcawgk/image/upload'

function toCloudinaryUrl(filename: string): string {
  // If it already looks like a Cloudinary URL, return as-is
  if (filename.startsWith('http')) return filename
  // Strip extension, add daniellauding/ prefix if not present
  const noExt = filename.replace(/\.[^/.]+$/, '').replace(/\s+/g, '_')
  const publicId = noExt.includes('/') ? noExt : `daniellauding/${noExt}`
  return `${CLOUDINARY_BASE}/${publicId}`
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    // No imageSizes — Cloudinary handles on-the-fly transformations via URL params
    mimeTypes: ['image/*'],
    adminThumbnail: ({ doc }) => {
      if (doc?.filename) return toCloudinaryUrl(doc.filename as string)
      return ''
    },
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        // Override url field to always point to Cloudinary
        if (doc?.filename && typeof doc.filename === 'string') {
          const cloudUrl = toCloudinaryUrl(doc.filename)
          if (!doc.url || !doc.url.includes('cloudinary')) {
            doc.url = cloudUrl
          }
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
      admin: {
        description: 'Alt text for accessibility. Auto-filled from filename if empty.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.filename) {
              return (data.filename as string)
                .replace(/\.[^/.]+$/, '')
                .replace(/[-_]/g, ' ')
                .replace(/\b\w/g, (c) => c.toUpperCase())
            }
            return value
          },
        ],
      },
    },
  ],
}
