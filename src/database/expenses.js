import { getInstance } from "./client";

// The documentation said that exec function does not escape parameters and it prune to SQL injection
// but since they used it anyhow, I am also gonna use it.
// It is prune to SQL injection because it is being used to create a schema.

export async function loadDummyExpenses() {
    const db = await getInstance();
    
    // Check if there is no expenses in the db.
    const existing = await db.getAllAsync(
        'SELECT COUNT(*) as count FROM expenses'
    );
    
    // if there are expenses, no need to add new expenses to return.
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
    const db = await getInstance();

    // Can also use a preparedStatement.
    const {title, category, description, amount} = e;
    const result = await db.runAsync('INSERT INTO expenses (title, amount, category, description, createdAt) VALUES (?, ?, ?, ?, ?)', [title, amount, category, description, new Date().toISOString()]);
    return result;
}

export async function getAllExpenses() {
    const db = await getInstance();
    const allRows = await db.getAllAsync('SELECT * FROM expenses');
    return allRows;
}