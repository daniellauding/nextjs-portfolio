import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    // No imageSizes — Cloudinary handles transformations via URL params
    // e.g. https://res.cloudinary.com/dihhcawgk/image/upload/w_400,h_300,c_fill/daniellauding/filename
    mimeTypes: ['image/*'],
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
            // Auto-fill alt from filename if empty
            if (!value && data?.filename) {
              return (data.filename as string)
                .replace(/\.[^/.]+$/, '')   // remove extension
                .replace(/[-_]/g, ' ')       // dashes/underscores → spaces
                .replace(/\b\w/g, (c) => c.toUpperCase()) // capitalize words
            }
            return value
          },
        ],
      },
    },
  ],
}
