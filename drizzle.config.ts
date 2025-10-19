import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';
import fs from 'fs';

const localPath = '.env.local';
const prodPath = '.env';
const envPath =
  process.env.NODE_ENV === 'production'
    ? prodPath
    : fs.existsSync(localPath)
      ? localPath
      : prodPath;

config({ path: envPath });

export default defineConfig({
  schema: './db/schema.ts',
  out: './supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
