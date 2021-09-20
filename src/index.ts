import express from "express";
import cors from "cors";
import { Wedding, Expense } from "./entities";
import WeddingService from "./services/wedding-service";
import { WeddingServiceImpl } from "./services/wedding-service-impl";
import ExpenseService from "./services/expense-service";
import { ExpenseServiceImpl } from "./services/expense-service-impl";
import {
  ConflictingIdentifications,
  MissingResourceError,
  ExpensesError,
  WeddingExists,
} from "./errors";
import { isInterfaceExtends } from "@babel/types";
import { reduceEachLeadingCommentRange } from "typescript";

const app = express();
app.use(express.json());
app.use(cors());

const weddingService: WeddingService = new WeddingServiceImpl();
const expenseService: ExpenseService = new ExpenseServiceImpl();

app.get("/weddings", async (req, res) => {
  const result: Wedding[] = await weddingService.allWeddings();
  res.status(200);
  res.send(result);
});

app.get("/weddings/:id", async (req, res) => {
  try {
    const weddingID: number = Number(req.params.id);
    const result = await weddingService.weddingByID(weddingID);
    res.send(result);
  } catch (error) {
    if (error instanceof MissingResourceError) {
      res.status(404);
      res.send(error);
    }
  }
});

app.get("/weddings/:id/expenses", async (req, res) => {
  try {
    const weddingID: number = Number(req.params.id);
    await weddingService.weddingByID(weddingID);
    const result = await expenseService.expensesByWedID(weddingID);
    res.send(result);
  } catch (error) {
    if (error instanceof ExpensesError) {
      res.status(404);
      res.send(error);
    }
    if (error instanceof MissingResourceError) {
      res.status(404);
      res.send(error);
    }
  }
});

app.post("/weddings", async (req, res) => {
  try {
    const wedding: Wedding = req.body;
    const result: Wedding = await weddingService.createWedding(wedding);
    res.status(201);
    res.send(result);
  } catch (error) {
    if (error instanceof WeddingExists) {
      res.status(409);
      res.send(error);
    }
  }
});

app.delete("/weddings/:id", async (req, res) => {
  try {
    const weddingID: number = Number(req.params.id);
    const result = await weddingService.deleteWedding(weddingID);
    res.status(205);
    res.send(
      `The wedding id of ${weddingID} has been removed from our database.`
    );
  } catch (error) {
    if (error instanceof MissingResourceError) {
      res.status(404);
      res.send(error);
    }
  }
});

app.put("/weddings/:id", async (req, res) => {
  try {
    const wedding: Wedding = req.body;
    const weddingID: number = Number(req.params.id);
    const result = await weddingService.updateWedding(wedding, weddingID);
    res.send(result);
  } catch (error) {
    if (error instanceof MissingResourceError) {
      res.status(404);
      res.send(error);
    }
    if (error instanceof ConflictingIdentifications) {
      res.status(409);
      res.send(error);
    }
  }
});


app.get("/expenses", async (req, res) => {
  const result: Expense[] = await expenseService.allExpense();
  res.send(result);
});

app.get("/expenses/:id", async (req, res) => {
  try {
    const expenseID: number = Number(req.params.id);
    const result: Expense = await expenseService.expenseByID(expenseID);
    res.send(result);
  } catch (error) {
    if (error instanceof MissingResourceError) {
      res.status(404);
      res.send(error);
    }
  }
});

app.post("/expenses", async (req, res) => {
  const expense: Expense = req.body;
  const result: Expense = await expenseService.createExpense(expense);
  res.status(201);
  res.send(result);
});

app.put("/expenses/:id", async (req, res) => {
  try {
    const expenseID: number = Number(req.params.id);
    const expense: Expense = req.body;
    const result: Expense = await expenseService.updateExpense(
      expense,
      expenseID
    );
  
    res.send(result);
  } catch (error) {
    if (error instanceof MissingResourceError) {
      res.status(404);
      res.send(error);
    }
    if (error instanceof ConflictingIdentifications) {
      res.status(409);
      res.send(error);
    }
  }
});

app.delete("/expenses/:id", async (req, res) => {
  try {
    const expenseID: number = Number(req.params.id);
    const result = await expenseService.deleteExpense(expenseID);
    res.send(
      `The expense with ${expenseID} has been removed from our database. `
    );
  } catch (error) {
    if (error instanceof MissingResourceError) {
      res.status(404);
      res.send(error);
    }
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Application started on PORT ${PORT}`);
});
