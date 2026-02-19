import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import type { HandleUpload, HandleDelete, GenerateURL } from '@payloadcms/plugin-cloud-storage/types'
import { payloadAiPlugin } from '@ai-stack/payloadcms'
import { analyticsPlugin } from 'payload-posthog-analytics'
import { v2 as cloudinary } from 'cloudinary'
import type { UploadApiResponse } from 'cloudinary'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { Projects } from './src/collections/Projects'
import { Clients } from './src/collections/Clients'
import { Skills } from './src/collections/Skills'
import { Experience } from './src/collections/Experience'
import { Education } from './src/collections/Education'
import { PersonalInfo } from './src/globals/PersonalInfo'
import { SiteSettings } from './src/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Custom Cloudinary adapter for @payloadcms/plugin-cloud-storage
// Must be a factory: plugin calls adapter({ collection, prefix }) to get the adapter object
const cloudinaryAdapter = () => () => ({
  name: 'cloudinary-adapter',

  async handleUpload({ file, data }: Parameters<HandleUpload>[0]) {
    try {
      const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'auto',
            public_id: `daniellauding/${file.filename.replace(/\.[^/.]+$/, '')}`,
            overwrite: false,
            use_filename: true,
          },
          (error, result) => {
            if (error) return reject(error)
            if (!result) return reject(new Error('No result from Cloudinary'))
            resolve(result)
          },
        )
        uploadStream.end(file.buffer)
      })
      // Store Cloudinary URL and public_id back into the document data
      file.filename = uploadResult.public_id
      file.mimeType = uploadResult.format
      file.filesize = uploadResult.bytes
      // This is the key: set url on the data object so Payload persists it
      if (data) {
        data.url = uploadResult.secure_url
        data.filename = uploadResult.public_id
      }
    } catch (err) {
      console.error('Cloudinary upload error:', err)
      throw err
    }
  },

  async handleDelete({ filename }: Parameters<HandleDelete>[0]) {
    try {
      await cloudinary.uploader.destroy(filename as string)
    } catch (err) {
      console.error('Cloudinary delete error:', err)
    }
  },

  generateURL: (({ filename }) => {
    const f = filename as string
    // If already a Cloudinary public_id path (daniellauding/...) use directly
    // Otherwise construct URL for the filename without extension
    const publicId = f.includes('/')
      ? f
      : `daniellauding/${f.replace(/\.[^/.]+$/, '')}`
    return cloudinary.url(publicId, { secure: true })
  }) as GenerateURL,

  staticHandler: async () => new Response('Not found', { status: 404 }),
})

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Projects,
    Clients,
    Skills,
    Experience,
    Education,
  ],
  globals: [
    PersonalInfo,
    SiteSettings,
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'YOUR-SECRET-HERE',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
    // push: true keeps schema in sync on every startup (idempotent)
    push: true,
  }),
  sharp,
  plugins: [
    analyticsPlugin({
      adminView: {
        path: '/analytics',
        label: 'Analytics',
      },
    }),
    payloadAiPlugin({
      collections: {
        projects: true,
        media: true,
        experience: true,
        clients: true,
      },
      globals: {
        'personal-info': true,
      },
      uploadCollectionSlug: 'media',
      debugging: false,
    }),
    formBuilderPlugin({
      fields: {
        text: true,
        textarea: true,
        email: true,
        select: true,
        checkbox: true,
      },
      formOverrides: {
        admin: {
          group: 'Forms',
        },
      },
      formSubmissionOverrides: {
        admin: {
          group: 'Forms',
        },
      },
    }),
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: cloudinaryAdapter(),  // factory → called by plugin with { collection, prefix }
        },
      },
    }),
  ],
})
