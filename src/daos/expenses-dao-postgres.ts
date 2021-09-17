import { Expenses } from "../entities";
import { ExpensesDAO } from "./expenses-dao";
import { client } from "../connection";
import { MissingResourceError } from "../errors";

export class ExpensesDaoPostgres implements ExpensesDAO {

    async createExpenses(expenses: Expenses): Promise<Expenses> {
        const sql:string = "insert into expenses(expenses_reason, expenses_amount, w_id) values ($1, $2, $3) returning expenses_id";
        const values = [expenses.expensesReason, expenses.expensesAmount, expenses.weddingId];
        const result = await client.query(sql, values);
        expenses.expensesId = result.rows[0].expenses_id;
        return expenses;
        }

    async getExpensesById(expensesId: number): Promise<Expenses> {
        const sql:string = "select * from expenses where expenses_id=$1";
        const value = [expensesId];
        const result = await client.query(sql, value);
        console.log("Result:", result);
        
        if (result.rowCount === 0) {
            throw new MissingResourceError(`The expenses with the id of ${expensesId} does not exist.`);
        }
        const row = result.rows[0];
        console.log("Row:", row);
        const expenses:Expenses = new Expenses(
            row.expenses_reason,
            row.expenses_amount,
            row.expenses_id,
            row.w_id);
        return expenses;
        }

    async getAllExpenses(): Promise<Expenses[]> {
        const sql:string = "select * from expenses";
        const result = await client.query(sql);
        const allExpenses:Expenses[] = [];
        for (const row of result.rows) {
            const expenses:Expenses = new Expenses(
                row.expenses_reason,
                row.expenses_amount,
                row.expenses_id,
                row.w_id);
            allExpenses.push(expenses);
        }
        return allExpenses;
        }

    async updateExpenses(expenses: Expenses): Promise<Expenses> {
        const sql:string = "update expenses set expenses_reason=$1, expenses_amount=$2, w_id=$3 where expenses_id=$4";
        const values = [expenses.expensesReason, expenses.expensesAmount, expenses.weddingId, expenses.expensesId];
        const result = await client.query(sql, values);
        if (result.rowCount === 0) {
            throw new MissingResourceError(`The expenses with the id of ${expenses.expensesId} does not exist.`);
        }
        return expenses;
        }

    async deleteExpensesById(expensesId: number): Promise<boolean> {
        const sql:string = 'delete from expenses where expenses_id=$1';
        const values = [expensesId];
        const result = await client.query(sql, values);
        if (result.rowCount === 0) {
            throw new MissingResourceError(`The expenses with the id of ${expensesId} does not exist.`)
        }
        return true;
        }
    
}