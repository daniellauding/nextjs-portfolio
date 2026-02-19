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
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'date',
      type: 'text',
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
      required: false,
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'Image URL (fallback)',
      admin: {
        position: 'sidebar',
        description: 'Used when no uploaded image is available (e.g. /projects/image.jpg)',
      },
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
      name: 'highlight',
      type: 'checkbox',
      label: 'Lyft upp på startsidan (I\'m working on)',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'highlightUrl',
      type: 'text',
      label: 'Override URL (lämna tom för internt /projects/slug)',
      admin: {
        position: 'sidebar',
        condition: (data) => data.highlight,
      },
    },
    {
      name: 'highlightLogo',
      type: 'text',
      label: 'Logo URL för highlight-sektion',
      admin: {
        position: 'sidebar',
      },
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
