import type { GlobalConfig } from 'payload'

export const PersonalInfo: GlobalConfig = {
  slug: 'personal-info',
  label: 'Personal Information',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'status',
      type: 'text',
      label: 'Current Status',
    },
    {
      name: 'studio',
      type: 'text',
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'website',
      type: 'text',
    },
    {
      name: 'bio',
      type: 'richText',
      required: true,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'tools',
      type: 'array',
      label: 'Tools & Technologies',
      fields: [
        {
          name: 'tool',
          type: 'text',
        },
      ],
    },
    {
      name: 'roles',
      type: 'array',
      label: 'Professional Roles',
      fields: [
        {
          name: 'role',
          type: 'text',
        },
      ],
    },
    {
      name: 'experience',
      type: 'text',
      label: 'Experience Summary',
    },
    {
      name: 'keyContributions',
      type: 'array',
      fields: [
        {
          name: 'contribution',
          type: 'text',
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        {
          name: 'linkedin',
          type: 'text',
        },
        {
          name: 'github',
          type: 'text',
        },
        {
          name: 'medium',
          type: 'text',
        },
        {
          name: 'twitter',
          type: 'text',
        },
      ],
    },
  ],
}