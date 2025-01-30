import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import * as schema from './schema';

export { schema };

// In-memory Postgres
const client = new PGlite('idb://main');
const db = drizzle(client, { schema });

export default db;

export const exportData = () => {
  return client.query("COPY assessment TO '/dev/blob';");
}

export const importData = (blob: Blob) => {
  return client.query("COPY assessment FROM '/dev/blob';", [], {
    blob,
  })
}
