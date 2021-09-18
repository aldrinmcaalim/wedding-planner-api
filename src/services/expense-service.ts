import { Expense } from "../entities";

export default interface ExpenseService {
  createExpense(expense: Expense): Promise<Expense>;

  allExpense(): Promise<Expense[]>;
  expenseByID(expenseID: number): Promise<Expense>;
  expensesByWedID(weddingID: number): Promise<Expense[]>;

  updateExpense(expense: Expense, expenseID: number): Promise<Expense>;

  deleteExpense(expenseID: number): Promise<boolean>;
}
