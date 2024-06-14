import { Database } from './models/models.js'
import pg from 'pg'
const { Pool } = pg
import { Kysely, PostgresDialect } from 'kysely'

const dialect = new PostgresDialect({
    pool: new Pool({
      connectionString: process.env["MY_POSTGRES_DATABASE_URL"],
      ssl: true,
    }),
  });

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect,
})
