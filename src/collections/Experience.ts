import type { CollectionConfig } from 'payload'

export const Experience: CollectionConfig = {
  slug: 'experience',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'company', 'period'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'companyUrl',
      type: 'text',
      label: 'Company URL',
    },
    {
      name: 'period',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'projects',
      type: 'array',
      fields: [
        {
          name: 'project',
          type: 'richText',
        },
      ],
    },
    {
      name: 'recommendation',
      type: 'group',
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
          name: 'role',
          type: 'text',
        },
        {
          name: 'date',
          type: 'text',
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Order in which to display (lower numbers appear first)',
      },
    },
  ],
}