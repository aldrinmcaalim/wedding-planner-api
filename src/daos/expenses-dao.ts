import { Expenses } from "../entities";

export interface ExpensesDAO {

    // CREATE
    createExpenses(expenses:Expenses):Promise<Expenses>;

    // READ
    getExpensesById(expensesId: number):Promise<Expenses>;
    getAllExpenses():Promise<Expenses[]>;

    // UPDATE
    updateExpenses(expenses:Expenses):Promise<Expenses>;

    // DELETE
    deleteExpensesById(expensesId:number):Promise<boolean>;
    
}