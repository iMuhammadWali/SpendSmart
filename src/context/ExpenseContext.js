// Contexts are shared runtime states.
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getAllExpenses, insertExpense } from "../database/expenses";

// Create Context takes default value as parameter as null.
export const ExpenseContext = createContext(null);

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // useCallback saves the reference of the function so it does not get created again and again on every rerender.
  const refreshExpenses = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    refreshExpenses();
  }, []);

  const addExpense = useCallback(async (expense) => {
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
  }, []);

  // Everything in the value attribute will be accessible to all children components.
  // So, if I want to use it in some other component, I can use it like this:
  // const { expenses, isLoading, addExpense } = useContext(ExpenseContext);
  return (
    <ExpenseContext.Provider value={{ expenses, isLoading, addExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
}
