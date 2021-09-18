import { client } from "../connection";
import { Expense } from "../entities";
import { ExpensesError, MissingResourceError } from "../errors";
import { ExpenseDAO } from "./expense-dao";

export default class ExpenseDAOImpl implements ExpenseDAO {
  // Here we begin the account creation
  async expenseCreator(expense: Expense): Promise<Expense> {
    const sql: string =
      "insert into expense(exp_reason,exp_amount,wed_id) values ($1,$2,$3) returning exp_id";
    const values = [
      expense.expenseReason,
      expense.expenseAmount,
      expense.weddingID,
    ];
    const result = await client.query(sql, values);
    expense.expenseID = result.rows[0].exp_id;
    return expense;
  }

  // Here we create
  async allExpenses(): Promise<Expense[]> {
    const sql: string = "select * from expense order by exp_id asc";
    const result = await client.query(sql);
    const expenses: Expense[] = [];
    for (const row of result.rows) {
      const expense = new Expense(
        row.exp_id,
        row.exp_reason,
        row.exp_amount,
        row.wed_id
      );
      expenses.push(expense);
    }
    return expenses;
  }
  async expenseByID(expenseID: number): Promise<Expense> {
    const sql: string = "select * from expense where exp_id=$1";
    const value = [expenseID];
    const result = await client.query(sql, value);
    if (result.rowCount === 0) {
      throw new MissingResourceError(
        `The expense with ID ${expenseID} does not exist in our systems`
      );
    }
    const row = result.rows[0];
    const expense = new Expense(
      row.exp_id,
      row.exp_reason,
      row.exp_amount,
      row.wed_id
    );
    return expense;
  }

  async expensesByWedID(weddingID: number): Promise<Expense[]> {
    const sql: string = "select * from expense where wed_id=$1";
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
        row.exp_id,
        row.exp_reason,
        row.exp_amount,
        row.wed_id
      );
      expenses.push(expense);
    }
    return expenses;
  }
  async updateExpense(expense: Expense): Promise<Expense> {
    const sql: string =
      "update expense set exp_reason=$1,exp_amount=$2 where exp_id=$3 and wed_id=$4 returning *";
    const values = [
      expense.expenseReason,
      expense.expenseAmount,
      expense.expenseID,
      expense.weddingID,
    ];
    const result = await client.query(sql, values);
    const row = result.rows[0];
    const expenseReturn = new Expense(
      row.exp_id,
      row.exp_reason,
      row.exp_amount,
      row.wed_id
    );

    return expenseReturn;
  }
  async deleteExpense(expenseID: number): Promise<boolean> {
    const sql: string = "delete from expense where exp_id=$1";
    const value = [expenseID];
    await client.query(sql, value);

    return true;
  }
}
