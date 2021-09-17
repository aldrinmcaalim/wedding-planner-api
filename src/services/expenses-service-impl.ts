import { ExpensesDAO } from "../daos/expenses-dao";
import { Wedding, Expenses } from "../entities";
import ExpensesService from "./expenses-service";
import { MissingResourceError } from "../errors";
import { ExpensesDaoPostgres } from "../daos/expenses-dao-postgres";

const testWedding:Wedding = new Wedding(0, "2021-09-08", "New York City, NY", "Samantha and Tim", 10_000);

export class ExpensesServiceImpl implements ExpensesService {

    expensesDao:ExpensesDAO = new ExpensesDaoPostgres();

    registerExpenses(expenses: Expenses): Promise<Expenses> {
        return this.expensesDao.createExpenses(expenses);
    }

    retrieveAllExpenses(): Promise<Expenses[]> {
        return this.expensesDao.getAllExpenses();
        }

    retrieveExpensesById(expensesId: number): Promise<Expenses> {
        return this.expensesDao.getExpensesById(expensesId);
        }

    editExpenses(expenses: Expenses): Promise<Expenses> {
        return this.expensesDao.updateExpenses(expenses);
        }

    removeExpensesById(expensesId: number): Promise<boolean> {
        return this.expensesDao.deleteExpensesById(expensesId);
        }

}