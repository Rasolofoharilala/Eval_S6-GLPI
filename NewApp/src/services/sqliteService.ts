import initSqlJs from 'sql.js'

export async function testDatabase() {
    const SQL = await initSqlJs({
        locateFile: file => `/node_modules/sql.js/dist/${file}`
    })

    const response = await fetch(import.meta.env.VITE_DATABASE)

    const buffer = await response.arrayBuffer()

    const db = new SQL.Database(
        new Uint8Array(buffer)
    )

    console.log("Base chargée")

    return db
}

export async function getTableName() {
    console.log("Appel de la fonction: getTableName()");
    
    const db = await testDatabase()
    let tables: string[] = []
    const result = db.exec(
        "SELECT name FROM sqlite_master WHERE type='table'"
    )
    if (result[0]) {
        tables = result[0].values.map(row => String(row[0]))
    }
    return tables
}

export async function deleteDatabase() {
  const db = await testDatabase()

  console.log("=== INITIALISATION DE LA REINITIALISATION ===")

  const tableNames = await getTableName()

  const tablesToDelete = tableNames.filter(
    table => table !== "sqlite_sequence"
  )

  for (const table of tablesToDelete) {
    try {
      console.log("Début de la suppression")
      console.log(`==> Vidange de la table ${table}`)

      db.exec(`DELETE FROM ${table}`)

      console.log(`==> Réinitialisation de l'auto-incrémentation de ${table}`)

      db.exec(`DELETE FROM sqlite_sequence WHERE name = '${table}'`)

      console.log(`=> Table ${table} vidée avec succès`)
    } catch (error) {
      console.error(`Erreur pendant la suppression de ${table}`, error)
      throw error
    }
  }

  console.log("Suppression réalisée avec succès !!!")
}