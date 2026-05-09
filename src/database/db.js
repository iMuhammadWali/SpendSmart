import  * as SQLite from 'expo-sqlite'

const db = await SQLite.openDatabaseAsync("spendSmart.db");

// The documentation said that exec function does not escape parameters and it prune to SQL injection
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


const expenses = [
        {
            id: "1",
            title: "Bike petrol",
            category: "travel",
            description: "Put fuel in Wali's bike to go to Hussain Chowk and stuff",
            amount: 230,
            date: Date.now()
        },
        {
            id: "2",
            title: "Pathooray",
            category: "food",
            description: "We were hungry so ate Pathooray and jalebi from Sadar",
            amount: 270,
            date: Date.now()
        },
        {
            id: "3",
            title: "Bought Fry Pan",
            category: "other",
            description: "Bought Wali's chappal from Bata",
            amount: 3200,
            date: Date.now()
        },
        {
            id: "4",
            title: "Bought Medicine",
            category: "health",
            description: "Wali took 1000 from me and bougth medicine worth 600 Rs",
            amount: 600,
            date: Date.now()
        }
]

for (const e of expenses) {
  await insertExpense(e);
}
export async function insertExpense(e){
    // I can also use a preparedStatement.
    const {title, category, description, amount} = e;
    const result = await db.runAsync('INSERT INTO expenses (title, amount, category, description, createdAt) VALUES (?, ?, ?, ?, ?)', [title, amount, category, description, new Date().toISOString()]);

    return result; // This will be an object.
}

export async function getAllExpenses() {
    const allRows = await db.getAllAsync('SELECT * FROM expenses');
    for (const row of allRows) {
        console.log(row.id, row.title, row.amount);
    }
}