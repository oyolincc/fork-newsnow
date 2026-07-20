import { defineConfig } from 'drizzle-kit'
// import { databaseUrl } from './src/config'

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/schema/tables.ts',
  out: './migrations',
  dbCredentials: {
    // url: databaseUrl,
  },
})
