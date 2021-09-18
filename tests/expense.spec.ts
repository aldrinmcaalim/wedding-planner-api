import { client } from "../src/connection";
import { ExpenseDAO } from "../src/daos/expense-dao";
import ExpenseDAOImpl from "../src/daos/expense-dao-postgres-impl";
import { Expense } from "../src/entities";

const expenseDAO: ExpenseDAO = new ExpenseDAOImpl();

test("Create wedding account: ", async () => {
  const testExpense: Expense = new Expense(0, "Catering", 2000, 1);
  const result: Expense = await expenseDAO.expenseCreator(testExpense);
  expect(result.expenseID).not.toBe(0);
});
test("Find all expenses: ", async () => {
  const testExpense1: Expense = new Expense(0, "Catering", 1500, 3);
  const testExpense2: Expense = new Expense(0, "Catering", 2100, 4);
  const testExpense3: Expense = new Expense(0, "DJ/Band", 20000, 8);
  await expenseDAO.expenseCreator(testExpense1);
  await expenseDAO.expenseCreator(testExpense2);
  await expenseDAO.expenseCreator(testExpense3);

  const result = await expenseDAO.allExpenses();
  expect(result.length).toBeGreaterThanOrEqual(3);
});

test("Get expense info by ID: ", async () => {
  const result: Expense = await expenseDAO.expenseByID(5);
  expect(result.expenseID).toBe(5);
});

test("Find all expenses by wedding ID: ", async () => {
  const testExpense1: Expense = new Expense(0, "Florist", 1500, 6);
  const testExpense2: Expense = new Expense(0, "Venu", 21000, 6);
  const testExpense3: Expense = new Expense(0, "DJ/Band", 2000, 6);
  await expenseDAO.expenseCreator(testExpense1);
  await expenseDAO.expenseCreator(testExpense2);
  await expenseDAO.expenseCreator(testExpense3);

  const result = await expenseDAO.expensesByWedID(6);
  expect(result.length).toBeGreaterThanOrEqual(3);
});

test("Update our expense by ID: ", async () => {
  const testExpense1: Expense = new Expense(0, "Florist", 800, 6);
  const expense = await expenseDAO.expenseCreator(testExpense1);
  const result: Expense = await expenseDAO.updateExpense(expense);
  expect(result.expenseAmount).toBe(testExpense1.expenseAmount);
});

test("Delete our expense by ID: ", async () => {
  const testExpense1: Expense = new Expense(0, "Florist", 2000, 6);
  const expense = await expenseDAO.expenseCreator(testExpense1);
  const result: boolean = await expenseDAO.deleteExpense(expense.expenseID);
  expect(result).toBeTruthy();
});

afterAll(async () => {
  await client.end();
});
