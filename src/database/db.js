import  * as SQLite from 'expo-sqlite';
import { ToastAndroid } from 'react-native';

let db;
// The documentation said that exec function does not escape parameters and it prune to SQL injection
// but since they used it anyhow, I am also gonna use it.
export const initDatabase = async () =>{
    db = await SQLite.openDatabaseAsync("spendSmart.db");
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

export async function loadDummyExpenses() {
    const existing = await db.getAllAsync(
        'SELECT COUNT(*) as count FROM expenses'
    );
    // existing is an array [{"count": 4}]
    // console.log(existing);
    if (existing[0].count > 0) return;

    const expenses = [
        {
            title: "Bike petrol",
            category: "travel",
            description: "Put fuel in Wali's bike to go to Hussain Chowk and stuff",
            amount: 230,
        },
        {
            title: "Pathooray",
            category: "food",
            description: "We were hungry so ate Pathooray and jalebi from Sadar",
            amount: 270,
        },
        {
            title: "Bought Fry Pan",
            category: "other",
            description: "Bought Wali's chappal from Bata",
            amount: 3200,
        },
        {
            title: "Bought Medicine",
            category: "health",
            description: "Wali took 1000 from me and bougth medicine worth 600 Rs",
            amount: 600,
        }
    ];

    for (const e of expenses) {
        await insertExpense(e);
    }
}

export async function insertExpense(e){
    // I can also use a preparedStatement.
    console.log("we are here");
    const {title, category, description, amount} = e;
    const result = await db.runAsync('INSERT INTO expenses (title, amount, category, description, createdAt) VALUES (?, ?, ?, ?, ?)', [title, amount, category, description, new Date().toISOString()]);

    return result;
}

export async function getAllExpenses() {
    if (!db) {
        ToastAndroid.show("DB not initialized", ToastAndroid.SHORT);
        return [];
    }

    const allRows = await db.getAllAsync('SELECT * FROM expenses');

    // console.log(allRows);

    return allRows;
}