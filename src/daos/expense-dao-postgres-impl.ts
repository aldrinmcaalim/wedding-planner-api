import { client } from "../connection";
import { Expense } from "../entities";
import { ExpensesError, MissingResourceError } from "../errors";
import { ExpenseDAO } from "./expense-dao";

export default class ExpenseDAOImpl implements ExpenseDAO {
  async expenseCreator(expense: Expense): Promise<Expense> {
    const sql: string =
      "insert into expense(expense_reason,expense_amount,w_id) values ($1,$2,$3) returning expense_id";
    const values = [
      expense.expenseReason,
      expense.expenseAmount,
      expense.weddingID,
    ];
    const result = await client.query(sql, values);
    expense.expenseID = result.rows[0].expense_id;
    return expense;
  }

  async allExpenses(): Promise<Expense[]> {
    const sql: string = "select * from expense";
    const result = await client.query(sql);
    const expenses: Expense[] = [];
    for (const row of result.rows) {
      const expense = new Expense(
        row.expense_id,
        row.expense_reason,
        row.expense_amount,
        row.w_id
      );
      expenses.push(expense);
    }
    return expenses;
  }
  async expenseByID(expenseID: number): Promise<Expense> {
    const sql: string = "select * from expense where expense_id=$1";
    const value = [expenseID];
    const result = await client.query(sql, value);
    if (result.rowCount === 0) {
      throw new MissingResourceError(
        `The expense with ID ${expenseID} does not exist in our systems`
      );
    }
    const row = result.rows[0];
    const expense = new Expense(
      row.expense_id,
      row.expense_reason,
      row.expense_amount,
      row.w_id
    );
    return expense;
  }

  async expensesByWedID(weddingID: number): Promise<Expense[]> {
    const sql: string = "select * from expense where w_id=$1";
    const value = [weddingID];
    const result = await client.query(sql, value);
    if (result.rowCount === 0) {
      throw new ExpensesError(
        `The wedding id ${weddingID} does not contain any expenses.`
      );
    }
    const expenses: Expense[] = [];
    for (const row of result.rows) {
      const expense = new Expense(
        row.expense_id,
        row.expense_reason,
        row.expense_amount,
        row.w_id
      );
      expenses.push(expense);
    }
    return expenses;
  }

  async updateExpense(expense: Expense): Promise<Expense> {
    const sql: string =
      "update expense set expense_reason=$1,expense_amount=$2, w_id=$3 where expense_id=$4";
    const values = [
      expense.expenseReason,
      expense.expenseAmount,
      expense.weddingID,
      expense.expenseID,
    ];
    const result = await client.query(sql, values);
    const row = result.rows[0];
    const expenseReturn = new Expense(
      row.expense_id,
      row.expense_reason,
      row.expense_amount,
      row.w_id
    );

    return expenseReturn;
  }
  async deleteExpense(expenseID: number): Promise<boolean> {
    const sql: string = "delete from expense where expense_id=$1";
    const value = [expenseID];
    await client.query(sql, value);

    return true;
  }
}
