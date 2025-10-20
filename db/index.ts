import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema1 from './schema/protocols';
import * as schema2 from './schema/auth-schema';

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle({ client, schema: { ...schema1, ...schema2 } });
