import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { slateEditor } from '@payloadcms/richtext-slate'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { Projects } from './src/collections/Projects'
import { Clients } from './src/collections/Clients'
import { Apps } from './src/collections/Apps'
import { Skills } from './src/collections/Skills'
import { Experience } from './src/collections/Experience'
import { Education } from './src/collections/Education'
import { PersonalInfo } from './src/globals/PersonalInfo'
import { SiteSettings } from './src/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

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
    Apps,
    Skills,
    Experience,
    Education,
  ],
  globals: [
    PersonalInfo,
    SiteSettings,
  ],
  editor: slateEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'YOUR-SECRET-HERE',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./database.db',
    },
  }),
  sharp,
  plugins: [],
})