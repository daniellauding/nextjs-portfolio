import type { CollectionConfig } from 'payload'

export const Apps: CollectionConfig = {
  slug: 'apps',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'featured', 'category'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'appStoreUrl',
      type: 'text',
      label: 'App Store URL',
    },
    {
      name: 'playStoreUrl',
      type: 'text',
      label: 'Play Store URL',
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'color',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'details',
      type: 'group',
      fields: [
        {
          name: 'category',
          type: 'text',
        },
        {
          name: 'platform',
          type: 'text',
        },
        {
          name: 'downloads',
          type: 'text',
        },
        {
          name: 'rating',
          type: 'text',
        },
        {
          name: 'releaseDate',
          type: 'text',
        },
        {
          name: 'version',
          type: 'text',
        },
        {
          name: 'overview',
          type: 'richText',
        },
        {
          name: 'features',
          type: 'array',
          fields: [
            {
              name: 'feature',
              type: 'text',
            },
          ],
        },
        {
          name: 'screenshots',
          type: 'array',
          fields: [
            {
              name: 'screenshot',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          name: 'testimonials',
          type: 'array',
          fields: [
            {
              name: 'quote',
              type: 'textarea',
            },
            {
              name: 'author',
              type: 'text',
            },
            {
              name: 'rating',
              type: 'number',
              min: 1,
              max: 5,
            },
          ],
        },
      ],
    },
  ],
}