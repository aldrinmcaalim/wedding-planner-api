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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ExpenseServiceImpl = void 0;
var expense_dao_postgres_impl_1 = __importDefault(require("../daos/expense-dao-postgres-impl"));
var errors_1 = require("../errors");
var ExpenseServiceImpl = /** @class */ (function () {
    function ExpenseServiceImpl() {
        this.expenseDAO = new expense_dao_postgres_impl_1["default"]();
    }
    ExpenseServiceImpl.prototype.createExpense = function (expense) {
        return this.expenseDAO.expenseCreator(expense);
    };
    ExpenseServiceImpl.prototype.allExpense = function () {
        return this.expenseDAO.allExpenses();
    };
    ExpenseServiceImpl.prototype.expenseByID = function (expenseID) {
        return __awaiter(this, void 0, void 0, function () {
            var expense;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.expenseDAO.expenseByID(expenseID)];
                    case 1:
                        expense = _a.sent();
                        if (expense.expenseID != expenseID) {
                            throw new errors_1.MissingResourceError("The expense id " + expenseID + " does not exist in the database.");
                        }
                        return [2 /*return*/, expense];
                }
            });
        });
    };
    ExpenseServiceImpl.prototype.expensesByWedID = function (weddingID) {
        return __awaiter(this, void 0, void 0, function () {
            var expenses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.expenseDAO.expensesByWedID(weddingID)];
                    case 1:
                        expenses = _a.sent();
                        if (expenses[0].weddingID != weddingID) {
                            throw new errors_1.ExpensesError("There are no expenses for wedding id " + weddingID);
                        }
                        return [2 /*return*/, expenses];
                }
            });
        });
    };
    ExpenseServiceImpl.prototype.updateExpense = function (expense, expenseID) {
        return __awaiter(this, void 0, void 0, function () {
            var expTest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(expense.expenseID != expenseID)) return [3 /*break*/, 1];
                        throw new errors_1.ConflictingIdentifications("You entered in information for expense ID: " + expense.expenseID + " but have expense ID: " + expenseID + " selected. Please correct accordingly");
                    case 1: return [4 /*yield*/, this.expenseDAO.expenseByID(expenseID)];
                    case 2:
                        expTest = _a.sent();
                        if (expTest.expenseID != expenseID) {
                            throw new errors_1.MissingResourceError("The expense id " + expenseID + " does not exist in the database.");
                        }
                        else {
                            return [2 /*return*/, this.expenseDAO.updateExpense(expense)];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ExpenseServiceImpl.prototype.deleteExpense = function (expenseID) {
        return __awaiter(this, void 0, void 0, function () {
            var expense;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.expenseDAO.expenseByID(expenseID)];
                    case 1:
                        expense = _a.sent();
                        if (expense.expenseID != expenseID) {
                            throw new errors_1.MissingResourceError("The expense id " + expenseID + " does not exist in the database.");
                        }
                        return [2 /*return*/, this.expenseDAO.deleteExpense(expenseID)];
                }
            });
        });
    };
    return ExpenseServiceImpl;
}());
exports.ExpenseServiceImpl = ExpenseServiceImpl;
