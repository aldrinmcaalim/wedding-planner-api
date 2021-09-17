/*
Routes I still need
    x GET /weddings/:id/expenses
    x GET /expenses
    x GET /expenses/:id
    x POST /expenses/:id
    x PUT /expenses/:id
    x DELETE /expenses/:id 
*/

const express = require('express');

import { Wedding, Expenses } from './entities';

import { MissingResourceError } from './errors';
import ExpensesService from './services/expenses-service';
import { ExpensesServiceImpl } from './services/expenses-service-impl';

import WeddingService from './services/wedding-service';
import { WeddingServiceImpl } from './services/wedding-service-impl';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

const weddingService:WeddingService = new WeddingServiceImpl();
const expensesService:ExpensesService = new ExpensesServiceImpl();

// POST /weddings
app.post("/weddings", async(req,res)=>{
    try {
        let wedding:Wedding = req.body;
        wedding = await weddingService.registerWedding(wedding);
        res.send(wedding);
    } catch(error){
        if (error instanceof MissingResourceError) {
            res.status(404);
            res.send(error);
        }
    }
})

// GET /weddings
app.get("/weddings", async(req,res)=>{
    try{
        const weddings:Wedding[] = await weddingService.retrieveAllWeddings();
        res.status(200);
        res.send(weddings);
        // let wedding:Wedding = req.body;
        // wedding = await weddingService.registerWedding(wedding);
        // res.send(wedding);
    }catch(error){
        if (error instanceof MissingResourceError) {
            res.status(404);
            res.send(error);
        }
    }
})

// GET /weddings/:id
app.get("/weddings/:id", async(req,res) => {
    try {
        const weddingId = Number(req.params.id);
        const newWedding:Wedding = await weddingService.retrieveWeddingById(weddingId);
        const wedding = await weddingService.updateWedding(newWedding);
        res.send(wedding);
    } catch(error) {
        if (error instanceof MissingResourceError) {
            res.status(404);
            res.send(error);
        }
    }
})

// DELETE /weddings/:id
app.delete("/weddings/:id", async(req,res) => {
    try {
        const weddingId = Number(req.params.id);
        await weddingService.removeWeddingById(weddingId);
        res.status(205);
        res.send(`${weddingId} has been deleted.`);
    } catch(error) {
        if (error instanceof MissingResourceError) {
            res.status(404);
            res.send(error);
        }
    }
})

// PUT /weddings/:id
app.put("/weddings/:id", async(req,res) => {
    try {
        const weddingId = Number(req.params.id);
        // const newWedding:Wedding = await weddingService.retrieveWeddingById(weddingId);
        const other = req.body;
        const wedding = await weddingService.updateWedding(other);
        res.send(wedding);
    } catch (error) {
        if (error instanceof MissingResourceError) {
            res.status(404);
            res.send(error);
        }
    }
})

// GET /weddings/:id/expenses
app.get("/weddings/:id/expenses", async(req, res) => {
    try {
        let targetWeddingExpense = [];
        const currentId = Number(req.params.id);
        let weddingExpenses:Expenses[] = await expensesService.retrieveAllExpenses();
        for (let i = 0; i < weddingExpenses.length; i++) {
            if (weddingExpenses[i].weddingId === currentId) {
                targetWeddingExpense.push(weddingExpenses[i]);
            }
        }
        res.send(targetWeddingExpense);
    } catch(error) {
        if (error instanceof MissingResourceError) {
            res.status(404);
            res.send(error);
        }
    }
})

// GET /expenses
app.get("/expenses", async(req, res) => {
    try {
        const expenses:Expenses[] = await expensesService.retrieveAllExpenses();
        res.status(200);
        res.send(expenses);
    } catch (error) {
        if (error instanceof MissingResourceError) {
            res.status(404);
            res.send(error);
        }
    }
})

// GET /expenses/:id
app.get("/expenses/:id", async(req,res) => {
    try {
        const expensesId = Number(req.params.id);
        const expenses = await expensesService.retrieveExpensesById(expensesId);
        res.send(expenses);
    } catch(error) {
        if (error instanceof MissingResourceError) {
            res.status(404);
            res.send(error);
        }
    }
})

// POST /expenses
app.post("/expenses", async(req,res) => {
    try {
        let expenses:Expenses = req.body;
        expenses = await expensesService.registerExpenses(expenses);
        res.status(201);
        res.send(expenses);
    } catch(error) {
        if (error instanceof MissingResourceError) {
            res.status(404);
            res.send(error);
        }
    }
})
/*
app.put("/weddings/:id", async(req,res) => {
    try {
        const weddingId = Number(req.params.id);
        // const newWedding:Wedding = await weddingService.retrieveWeddingById(weddingId);
        const other = req.body;
        const wedding = await weddingService.updateWedding(other);
        res.send(wedding);
    } catch (error) {
        if (error instanceof MissingResourceError) {
            res.status(404);
            res.send(error);
        }
    }
})
*/

// PUT /expenses/:id
app.put("/expenses/:id", async(req,res) => {
    try {
        const expensesId = Number(req.params.id);
        // const expenses:Expenses = await expensesService.retrieveExpensesById(expensesId);
        const other = req.body;
        // const newExpensesReason:string = req.body.type;
        const expenses = await expensesService.editExpenses(other);
        res.send(expenses);
    } catch (error) {
        if (MissingResourceError) {
            res.status(404);
            res.send(error);
        }
    }
})

// DELETE /expenses/:id
app.delete("/expenses/:id", async(req,res) => {
    try {

    } catch(error) {
        if (error instanceof MissingResourceError) {
            res.status(404);
            res.send(MissingResourceError);
        }
    }
})

app.listen(PORT, () => {
    console.log(`Wedding Application running on port ${PORT}!`);
})