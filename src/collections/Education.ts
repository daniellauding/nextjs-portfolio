import type { CollectionConfig } from 'payload'

export const Education: CollectionConfig = {
  slug: 'education',
  admin: {
    useAsTitle: 'degree',
    defaultColumns: ['degree', 'school', 'year'],
  },
  fields: [
    {
      name: 'degree',
      type: 'text',
      required: true,
    },
    {
      name: 'school',
      type: 'text',
      required: true,
    },
    {
      name: 'schoolUrl',
      type: 'text',
      label: 'School URL',
    },
    {
      name: 'year',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}