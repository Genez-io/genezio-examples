import * as path from 'path'
import { config } from 'dotenv';
import pg from 'pg'
const { Pool } = pg
import { promises as fs } from 'fs'
import { Database } from '../models/models'
import {
  Kysely,
  Migrator,
  PostgresDialect,
  FileMigrationProvider,
} from 'kysely'

config({ path: '../.env' });

async function migrateToLatest() {
    const db = new Kysely<Database>({
        dialect: new PostgresDialect({
            pool: new Pool({
                connectionString: process.env["MY_POSTGRES_DATABASE_URL"],
                ssl: true,
            }),
        })
    })

    const migrator = new Migrator({
        db,
        provider: new FileMigrationProvider({
        fs,
        path,
        // This needs to be an absolute path.
        migrationFolder: path.join(process.cwd(), './my-migrations'),
        }),
    })

    const { error, results } = await migrator.migrateToLatest()

    results?.forEach((it) => {
        if (it.status === 'Success') {
        console.log(`migration "${it.migrationName}" was executed successfully`)
        } else if (it.status === 'Error') {
        console.error(`failed to execute migration "${it.migrationName}"`)
        }
    })

    if (error) {
        console.error('failed to migrate')
        console.error(error)
        process.exit(1)
    }

    await db.destroy()
}

migrateToLatest()
