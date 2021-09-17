"use strict";
exports.__esModule = true;
exports.ExpensesServiceImpl = void 0;
var entities_1 = require("../entities");
var expenses_dao_postgres_1 = require("../daos/expenses-dao-postgres");
var testWedding = new entities_1.Wedding(0, "2021-09-08", "New York City, NY", "Samantha and Tim", 10000);
var ExpensesServiceImpl = /** @class */ (function () {
    function ExpensesServiceImpl() {
        this.expensesDao = new expenses_dao_postgres_1.ExpensesDaoPostgres();
    }
    ExpensesServiceImpl.prototype.registerExpenses = function (expenses) {
        return this.expensesDao.createExpenses(expenses);
    };
    ExpensesServiceImpl.prototype.retrieveAllExpenses = function () {
        return this.expensesDao.getAllExpenses();
    };
    ExpensesServiceImpl.prototype.retrieveExpensesById = function (expensesId) {
        return this.expensesDao.getExpensesById(expensesId);
    };
    ExpensesServiceImpl.prototype.editExpenses = function (expenses) {
        return this.expensesDao.updateExpenses(expenses);
    };
    ExpensesServiceImpl.prototype.removeExpensesById = function (expensesId) {
        return this.expensesDao.deleteExpensesById(expensesId);
    };
    return ExpensesServiceImpl;
}());
exports.ExpensesServiceImpl = ExpensesServiceImpl;
