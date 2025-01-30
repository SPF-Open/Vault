import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import * as schema from './schema';
import { sql } from 'drizzle-orm';
import migrate from './migrate';

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

export const clearDb = async () => {
  console.log('Clearing database');

  const query = sql<string>`SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE';
  `;

  const tables = await db.execute(query); // retrieve tables

  const rows = tables.rows.filter((table) => table.table_name !== 'drizzle_migrations'); // Filter out the migrations table

  for (let table of rows) {
    const query = sql.raw(`TRUNCATE TABLE ${table.table_name} CASCADE;`);
    await db.execute(query); // Truncate (clear all the data) the table
  }
}