import  * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabaseAsync("spendSmart.db");

// The documentation said that execSQL does not escape parameters and it prune to SQL injection
// but since they used it anyhow, I am also gonna use it.
db.execSync(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title,
    amount INTEGER,
    category TEXT,
    description TEXT,
    createdAt TEXT
  );
`);

export async function insertExpense(e){
    // I can also use a preparedStatement.
    const {title, category, description, amount} = e;
    const result = await db.runAsync('INSERT INTO expenses (title, amount, category, description, createdAt) VALUES (?, ?, ?, ?, ?)', [title, amount, category, description, new Date().toISOString()]);

}