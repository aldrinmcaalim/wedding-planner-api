import { Expenses } from "../entities";

export default interface ExpensesService {
    
    registerExpenses(expenses:Expenses):Promise<Expenses>;

    retrieveAllExpenses():Promise<Expenses[]>;

    retrieveExpensesById(expensesId:number):Promise<Expenses>;

    editExpenses(expenses:Expenses):Promise<Expenses>;

    removeExpensesById(expensesId:number):Promise<boolean>;
}