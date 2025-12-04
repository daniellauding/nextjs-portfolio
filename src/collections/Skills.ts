import type { CollectionConfig } from 'payload'

export const Skills: CollectionConfig = {
  slug: 'skills',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'proficiency'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Design', value: 'design' },
        { label: 'Development', value: 'development' },
        { label: 'Tools', value: 'tools' },
        { label: 'Soft Skills', value: 'soft-skills' },
        { label: 'Other', value: 'other' },
      ],
      defaultValue: 'other',
    },
    {
      name: 'proficiency',
      type: 'select',
      options: [
        { label: 'Expert', value: 'expert' },
        { label: 'Advanced', value: 'advanced' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Beginner', value: 'beginner' },
      ],
      defaultValue: 'intermediate',
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