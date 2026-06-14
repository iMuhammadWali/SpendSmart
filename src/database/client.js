import  * as SQLite from 'expo-sqlite';

let db = null;
export async function getInstance() {
    if (!db){
        db = await SQLite.openDatabaseAsync("SpendSmart.db");
        db.execSync(`
            CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            amount INTEGER,
            category TEXT,
            description TEXT,
            createdAt TEXT
            );`
        );
    }
    return db;
}