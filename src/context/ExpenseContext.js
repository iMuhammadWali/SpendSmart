// Contexts are shared runtime states.
import { createContext, useContext, useEffect, useState } from "react";
import { getAllExpenses, insertExpense } from "../database/db";

// Create Context takes default value as parameter.
export const ExpenseContext = createContext(null);

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // For now I am not using useCallback here
  const refreshExpenses = async () => {
    try {
      setIsLoading(true);
      const data = await getAllExpenses();
      setExpenses(data);
    } catch (err) {
      console.log("Error fetching expenses", err);
      //   throw new Error("Failed to fetch expenses");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshExpenses();
  }, []);

  const addExpense = async (expense) => {
    try {
      setIsLoading(true);
      await insertExpense(expense);
      await refreshExpenses();
    } catch (err) {
      console.log("Error adding expense", err);
      //   throw new Error("Failed to add new expense");
    } finally {
      setIsLoading(false);
    }
  };

  // Everything in the value attribute will be accessible to all children components.
  // So, if I want to use it in some other component, I can use it like this:
  // const { expenses, isLoading, refreshExpenses, addExpense } = useContext(ExpenseContext);

  return (
    <ExpenseContext.Provider value={{ expenses, isLoading, addExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
}
