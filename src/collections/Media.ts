import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
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