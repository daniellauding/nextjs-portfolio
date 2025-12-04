import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Portfolio',
    },
    {
      name: 'siteDescription',
      type: 'textarea',
    },
    {
      name: 'siteKeywords',
      type: 'text',
      label: 'SEO Keywords',
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Open Graph Image',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'analytics',
      type: 'group',
      fields: [
        {
          name: 'googleAnalytics',
          type: 'text',
          label: 'Google Analytics ID',
        },
        {
          name: 'posthogKey',
          type: 'text',
          label: 'PostHog API Key',
        },
        {
          name: 'posthogHost',
          type: 'text',
          label: 'PostHog Host',
        },
      ],
    },
    {
      name: 'maintenance',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'message',
          type: 'textarea',
        },
      ],
    },
  ],
}