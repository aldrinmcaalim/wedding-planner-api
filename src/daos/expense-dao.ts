import { Expense } from "../entities";

export interface ExpenseDAO {
  // Create
  expenseCreator(expense: Expense): Promise<Expense>;

  // Read
  allExpenses(): Promise<Expense[]>;
  expenseByID(expenseID: number): Promise<Expense>;
  expensesByWedID(weddingID: number): Promise<Expense[]>;

  // Update
  updateExpense(expense: Expense): Promise<Expense>;

  // Delete
  deleteExpense(expenseID: number): Promise<boolean>;
}
