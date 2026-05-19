import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function useExpenses() {
  return useContext(ExpenseContext);
}
