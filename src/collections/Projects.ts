import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'date', 'featured'],
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
      name: 'type',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'date',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'url',
      type: 'text',
      label: 'External URL',
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
      name: 'color',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
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
      name: 'password',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Optional password protection for this project',
      },
    },
    {
      name: 'details',
      type: 'group',
      fields: [
        {
          name: 'client',
          type: 'text',
        },
        {
          name: 'duration',
          type: 'text',
        },
        {
          name: 'team',
          type: 'text',
        },
        {
          name: 'role',
          type: 'text',
        },
        {
          name: 'challenge',
          type: 'textarea',
        },
        {
          name: 'solution',
          type: 'textarea',
        },
        {
          name: 'impact',
          type: 'textarea',
        },
        {
          name: 'sections',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'content',
              type: 'richText',
            },
            {
              name: 'images',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
        {
          name: 'testimonial',
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
          ],
        },
        {
          name: 'nextProject',
          type: 'relationship',
          relationTo: 'projects',
        },
      ],
    },
  ],
}