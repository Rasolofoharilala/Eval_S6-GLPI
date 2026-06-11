import initSqlJs from 'sql.js'
import type { Database } from 'sql.js'

let dbInstance: Database | null = null

export async function testDatabase() {
  if (dbInstance) {
    return dbInstance
  }

  const SQL = await initSqlJs({
    locateFile: (file) => `/node_modules/sql.js/dist/${file}`,
  })

  const response = await fetch(import.meta.env.VITE_DATABASE)
  const buffer = await response.arrayBuffer()

  dbInstance = new SQL.Database(new Uint8Array(buffer))

  console.log('Base chargée')

  return dbInstance
}

export async function getTableName(): Promise<string[]> {
  const db = await testDatabase()

  const result = db.exec("SELECT name FROM sqlite_master WHERE type='table'")

  if (!result[0]) {
    return []
  }

  return result[0].values.map((row: unknown[]) => String(row[0]))
}

export async function deleteDatabase() {
  const db = await testDatabase()

  console.log('=== INITIALISATION DE LA REINITIALISATION ===')

  const tableNames = await getTableName()

  const tablesToDelete = tableNames.filter((table) => table !== 'sqlite_sequence')

  for (const table of tablesToDelete) {
    console.log(`==> Vidange de la table ${table}`)

    db.exec(`DELETE FROM "${table}"`)

    db.exec(`DELETE FROM sqlite_sequence WHERE name = '${table}'`)

    console.log(`=> Table ${table} vidée avec succès`)
  }

  console.log('Suppression réalisée EN MÉMOIRE avec succès !!!')

  return db
}
