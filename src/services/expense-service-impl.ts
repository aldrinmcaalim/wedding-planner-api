import { Expense } from "../entities";
import ExpenseDAOImpl from "../daos/expense-dao-postgres-impl";
import ExpenseService from "./expense-service";
import { ExpenseDAO } from "../daos/expense-dao";
import {
  MissingResourceError,
  ExpensesError,
  ConflictingIdentifications,
} from "../errors";

export class ExpenseServiceImpl implements ExpenseService {
  expenseDAO: ExpenseDAO = new ExpenseDAOImpl();

  createExpense(expense: Expense): Promise<Expense> {
    return this.expenseDAO.expenseCreator(expense);
  }
  allExpense(): Promise<Expense[]> {
    return this.expenseDAO.allExpenses();
  }
  async expenseByID(expenseID: number): Promise<Expense> {
    const expense: Expense = await this.expenseDAO.expenseByID(expenseID);
    if (expense.expenseID != expenseID) {
      throw new MissingResourceError(
        `The expense id ${expenseID} does not exist in the database.`
      );
    }
    return expense;
  }
  async expensesByWedID(weddingID: number): Promise<Expense[]> {
    const expenses: Expense[] = await this.expenseDAO.expensesByWedID(
      weddingID
    );
    if (expenses[0].weddingID != weddingID) {
      throw new ExpensesError(
        `There are no expenses for wedding id ${weddingID}`
      );
    }
    return expenses;
  }
  async updateExpense(expense: Expense, expenseID: number): Promise<Expense> {
    if (expense.expenseID != expenseID) {
      throw new ConflictingIdentifications(
        `You entered in information for expense ID: ${expense.expenseID} but have expense ID: ${expenseID} selected. Please correct accordingly`
      );
    } else {
      const expTest: Expense = await this.expenseDAO.expenseByID(expenseID);

      if (expTest.expenseID != expenseID) {
        throw new MissingResourceError(
          `The expense id ${expenseID} does not exist in the database.`
        );
      } else {
        return this.expenseDAO.updateExpense(expense);
      }
    }
  }
  async deleteExpense(expenseID: number): Promise<boolean> {
    const expense: Expense = await this.expenseDAO.expenseByID(expenseID);
    if (expense.expenseID != expenseID) {
      throw new MissingResourceError(
        `The expense id ${expenseID} does not exist in the database.`
      );
    }
    return this.expenseDAO.deleteExpense(expenseID);
  }
}
