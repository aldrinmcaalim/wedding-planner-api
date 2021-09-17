"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var entities_1 = require("../src/entities");
var connection_1 = require("../src/connection");
var expenses_dao_postgres_1 = require("../src/daos/expenses-dao-postgres");
var expensesDAO = new expenses_dao_postgres_1.ExpensesDaoPostgres();
var testWedding = new entities_1.Wedding(0, "2022-01-30", "Dallas, TX", "Jane and John", 7000);
var testExpenses = new entities_1.Expenses("Need for wedding", 400, 0, testWedding.weddingId + 1);
test("Create an expense", function () { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, expensesDAO.createExpenses(testExpenses)];
            case 1:
                result = _a.sent();
                expect(result.expensesId).not.toBe(0);
                return [2 /*return*/];
        }
    });
}); });
test("Get an expense by id", function () { return __awaiter(void 0, void 0, void 0, function () {
    var expenses, retrievedExpenses;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expenses = new entities_1.Expenses("Need for wedding", 50, 0, testWedding.weddingId + 1);
                return [4 /*yield*/, expensesDAO.createExpenses(expenses)];
            case 1:
                expenses = _a.sent();
                return [4 /*yield*/, expensesDAO.getExpensesById(expenses.expensesId)];
            case 2:
                retrievedExpenses = _a.sent();
                expect(retrievedExpenses.expensesId).toBe(expenses.expensesId);
                return [2 /*return*/];
        }
    });
}); });
test("Get all expenses", function () { return __awaiter(void 0, void 0, void 0, function () {
    var expenses1, expenses2, expenses3, allExpenses;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expenses1 = new entities_1.Expenses("Need for wedding", 45, 0, testWedding.weddingId + 1);
                expenses2 = new entities_1.Expenses("Need for wedding", 500, 0, testWedding.weddingId + 1);
                expenses3 = new entities_1.Expenses("Need for wedding", 10, 0, testWedding.weddingId + 1);
                return [4 /*yield*/, expensesDAO.createExpenses(expenses1)];
            case 1:
                _a.sent();
                return [4 /*yield*/, expensesDAO.createExpenses(expenses2)];
            case 2:
                _a.sent();
                return [4 /*yield*/, expensesDAO.createExpenses(expenses3)];
            case 3:
                _a.sent();
                return [4 /*yield*/, expensesDAO.getAllExpenses()];
            case 4:
                allExpenses = _a.sent();
                expect(allExpenses.length).toBeGreaterThanOrEqual(3);
                return [2 /*return*/];
        }
    });
}); });
test("Update expenses", function () { return __awaiter(void 0, void 0, void 0, function () {
    var targetedExpenses;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                targetedExpenses = new entities_1.Expenses("Need for the wedding", 1000, 0, testWedding.weddingId + 1);
                return [4 /*yield*/, expensesDAO.createExpenses(targetedExpenses)];
            case 1:
                targetedExpenses = _a.sent();
                targetedExpenses.expensesAmount = 500;
                return [4 /*yield*/, expensesDAO.updateExpenses(targetedExpenses)];
            case 2:
                targetedExpenses = _a.sent();
                expect(targetedExpenses.expensesAmount).toBe(500);
                return [2 /*return*/];
        }
    });
}); });
test("Delete an expense", function () { return __awaiter(void 0, void 0, void 0, function () {
    var targetedExpenses, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                targetedExpenses = new entities_1.Expenses("Need for the wedding", 700, 0, testWedding.weddingId + 1);
                return [4 /*yield*/, expensesDAO.createExpenses(targetedExpenses)];
            case 1:
                targetedExpenses = _a.sent();
                return [4 /*yield*/, expensesDAO.deleteExpensesById(targetedExpenses.expensesId)];
            case 2:
                result = _a.sent();
                expect(result).toBeTruthy();
                return [2 /*return*/];
        }
    });
}); });
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        connection_1.client.end();
        return [2 /*return*/];
    });
}); });
