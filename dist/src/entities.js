"use strict";
exports.__esModule = true;
exports.Expenses = exports.Wedding = void 0;
var Wedding = /** @class */ (function () {
    function Wedding(weddingId, weddingDate, weddingLocation, weddingName, weddingBudget) {
        this.weddingId = weddingId;
        this.weddingDate = weddingDate;
        this.weddingLocation = weddingLocation;
        this.weddingName = weddingName;
        this.weddingBudget = weddingBudget;
    }
    return Wedding;
}());
exports.Wedding = Wedding;
var Expenses = /** @class */ (function () {
    function Expenses(expensesReason, expensesAmount, expensesId, weddingId) {
        this.expensesReason = expensesReason;
        this.expensesAmount = expensesAmount;
        this.expensesId = expensesId;
        this.weddingId = weddingId;
    }
    return Expenses;
}());
exports.Expenses = Expenses;
