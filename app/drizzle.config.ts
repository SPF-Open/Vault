import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle/migrations/',
  schema: './src/lib/db/schema.ts',
  dialect: 'postgresql',
});