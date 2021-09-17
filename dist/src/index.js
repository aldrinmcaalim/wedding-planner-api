"use strict";
/*
Routes I still need
    x GET /weddings/:id/expenses
    x GET /expenses
    x GET /expenses/:id
    x POST /expenses/:id
    x PUT /expenses/:id
    x DELETE /expenses/:id
*/
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
var express = require('express');
var errors_1 = require("./errors");
var expenses_service_impl_1 = require("./services/expenses-service-impl");
var wedding_service_impl_1 = require("./services/wedding-service-impl");
var cors_1 = __importDefault(require("cors"));
var app = express();
app.use(express.json());
app.use((0, cors_1["default"])());
var PORT = process.env.PORT || 3000;
var weddingService = new wedding_service_impl_1.WeddingServiceImpl();
var expensesService = new expenses_service_impl_1.ExpensesServiceImpl();
// POST /weddings
app.post("/weddings", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var wedding, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                wedding = req.body;
                return [4 /*yield*/, weddingService.registerWedding(wedding)];
            case 1:
                wedding = _a.sent();
                res.send(wedding);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                if (error_1 instanceof errors_1.MissingResourceError) {
                    res.status(404);
                    res.send(error_1);
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// GET /weddings
app.get("/weddings", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var weddings, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, weddingService.retrieveAllWeddings()];
            case 1:
                weddings = _a.sent();
                res.status(200);
                res.send(weddings);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                if (error_2 instanceof errors_1.MissingResourceError) {
                    res.status(404);
                    res.send(error_2);
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// GET /weddings/:id
app.get("/weddings/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var weddingId, newWedding, wedding, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                weddingId = Number(req.params.id);
                return [4 /*yield*/, weddingService.retrieveWeddingById(weddingId)];
            case 1:
                newWedding = _a.sent();
                return [4 /*yield*/, weddingService.updateWedding(newWedding)];
            case 2:
                wedding = _a.sent();
                res.send(wedding);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                if (error_3 instanceof errors_1.MissingResourceError) {
                    res.status(404);
                    res.send(error_3);
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// DELETE /weddings/:id
app["delete"]("/weddings/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var weddingId, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                weddingId = Number(req.params.id);
                return [4 /*yield*/, weddingService.removeWeddingById(weddingId)];
            case 1:
                _a.sent();
                res.status(205);
                res.send(weddingId + " has been deleted.");
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                if (error_4 instanceof errors_1.MissingResourceError) {
                    res.status(404);
                    res.send(error_4);
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// PUT /weddings/:id
app.put("/weddings/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var weddingId, other, wedding, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                weddingId = Number(req.params.id);
                other = req.body;
                return [4 /*yield*/, weddingService.updateWedding(other)];
            case 1:
                wedding = _a.sent();
                res.send(wedding);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                if (error_5 instanceof errors_1.MissingResourceError) {
                    res.status(404);
                    res.send(error_5);
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// GET /weddings/:id/expenses
app.get("/weddings/:id/expenses", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var targetWeddingExpense, currentId, weddingExpenses, i, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                targetWeddingExpense = [];
                currentId = Number(req.params.id);
                return [4 /*yield*/, expensesService.retrieveAllExpenses()];
            case 1:
                weddingExpenses = _a.sent();
                for (i = 0; i < weddingExpenses.length; i++) {
                    if (weddingExpenses[i].weddingId === currentId) {
                        targetWeddingExpense.push(weddingExpenses[i]);
                    }
                }
                res.send(targetWeddingExpense);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                if (error_6 instanceof errors_1.MissingResourceError) {
                    res.status(404);
                    res.send(error_6);
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// GET /expenses
app.get("/expenses", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var expenses, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, expensesService.retrieveAllExpenses()];
            case 1:
                expenses = _a.sent();
                res.status(200);
                res.send(expenses);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                if (error_7 instanceof errors_1.MissingResourceError) {
                    res.status(404);
                    res.send(error_7);
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// GET /expenses/:id
app.get("/expenses/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var expensesId, expenses, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                expensesId = Number(req.params.id);
                return [4 /*yield*/, expensesService.retrieveExpensesById(expensesId)];
            case 1:
                expenses = _a.sent();
                res.send(expenses);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                if (error_8 instanceof errors_1.MissingResourceError) {
                    res.status(404);
                    res.send(error_8);
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// POST /expenses
app.post("/expenses", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var expenses, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                expenses = req.body;
                return [4 /*yield*/, expensesService.registerExpenses(expenses)];
            case 1:
                expenses = _a.sent();
                res.status(201);
                res.send(expenses);
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                if (error_9 instanceof errors_1.MissingResourceError) {
                    res.status(404);
                    res.send(error_9);
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
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
app.put("/expenses/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var expensesId, other, expenses, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                expensesId = Number(req.params.id);
                other = req.body;
                return [4 /*yield*/, expensesService.editExpenses(other)];
            case 1:
                expenses = _a.sent();
                res.send(expenses);
                return [3 /*break*/, 3];
            case 2:
                error_10 = _a.sent();
                if (errors_1.MissingResourceError) {
                    res.status(404);
                    res.send(error_10);
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// DELETE /expenses/:id
app["delete"]("/expenses/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
        }
        catch (error) {
            if (error instanceof errors_1.MissingResourceError) {
                res.status(404);
                res.send(errors_1.MissingResourceError);
            }
        }
        return [2 /*return*/];
    });
}); });
app.listen(PORT, function () {
    console.log("Wedding Application running on port " + PORT + "!");
});
