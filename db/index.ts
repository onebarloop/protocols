import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import fs from 'fs';
import * as schema1 from './schema/protocols';
import * as schema2 from './schema/auth-schema';

const localPath = '.env.local';
const prodPath = '.env';
const envPath =
  process.env.NODE_ENV === 'production'
    ? prodPath
    : fs.existsSync(localPath)
      ? localPath
      : prodPath;

config({ path: envPath });

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle({ client, schema: { ...schema1, ...schema2 } });
