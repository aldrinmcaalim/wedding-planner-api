import { ExpensesDAO } from "../src/daos/expenses-dao";
import { Wedding, Expenses } from "../src/entities";
import { client } from "../src/connection";
import { ExpensesDaoPostgres } from "../src/daos/expenses-dao-postgres";

const expensesDAO:ExpensesDAO = new ExpensesDaoPostgres();
const testWedding:Wedding = new Wedding(0, "2022-01-30", "Dallas, TX", "Jane and John", 7_000);
const testExpenses:Expenses = new Expenses("Need for wedding", 400, 0, testWedding.weddingId + 1);

test("Create an expense", async() => {
    const result = await expensesDAO.createExpenses(testExpenses);
    expect(result.expensesId).not.toBe(0);
});

test("Get an expense by id", async() => {
    let expenses:Expenses = new Expenses("Need for wedding", 50, 0, testWedding.weddingId + 1);
    expenses = await expensesDAO.createExpenses(expenses);

    let retrievedExpenses:Expenses = await expensesDAO.getExpensesById(expenses.expensesId);

    expect(retrievedExpenses.expensesId).toBe(expenses.expensesId);
})

test("Get all expenses", async() => {
    let expenses1:Expenses = new Expenses("Need for wedding", 45, 0, testWedding.weddingId + 1);
    let expenses2:Expenses = new Expenses("Need for wedding", 500, 0, testWedding.weddingId + 1);
    let expenses3:Expenses = new Expenses("Need for wedding", 10, 0, testWedding.weddingId + 1);
    await expensesDAO.createExpenses(expenses1);
    await expensesDAO.createExpenses(expenses2);
    await expensesDAO.createExpenses(expenses3);

    const allExpenses:Expenses[] = await expensesDAO.getAllExpenses();

    expect(allExpenses.length).toBeGreaterThanOrEqual(3);
})

test("Update expenses", async() => {
    let targetedExpenses:Expenses = new Expenses("Need for the wedding", 1000, 0, testWedding.weddingId + 1);
    targetedExpenses = await expensesDAO.createExpenses(targetedExpenses);
    targetedExpenses.expensesAmount = 500;

    targetedExpenses = await expensesDAO.updateExpenses(targetedExpenses);

    expect(targetedExpenses.expensesAmount).toBe(500);
})

test("Delete an expense", async() => {
    let targetedExpenses:Expenses = new Expenses("Need for the wedding", 700, 0, testWedding.weddingId + 1);
    targetedExpenses = await expensesDAO.createExpenses(targetedExpenses);

    const result:boolean = await expensesDAO.deleteExpensesById(targetedExpenses.expensesId);

    expect(result).toBeTruthy();
})

afterAll(async() => {
    client.end();
})