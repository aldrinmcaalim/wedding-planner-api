"use strict";
exports.__esModule = true;
exports.Expense = exports.Wedding = void 0;
var Wedding = /** @class */ (function () {
    function Wedding(weddingID, weddingDate, weddingLocation, weddingName, weddingBudget, ssn) {
        this.weddingID = weddingID;
        this.weddingDate = weddingDate;
        this.weddingLocation = weddingLocation;
        this.weddingName = weddingName;
        this.weddingBudget = weddingBudget;
        this.ssn = ssn;
    }
    return Wedding;
}());
exports.Wedding = Wedding;
var Expense = /** @class */ (function () {
    function Expense(expenseID, expenseReason, expenseAmount, weddingID) {
        this.expenseID = expenseID;
        this.expenseReason = expenseReason;
        this.expenseAmount = expenseAmount;
        this.weddingID = weddingID;
    }
    return Expense;
}());
exports.Expense = Expense;
