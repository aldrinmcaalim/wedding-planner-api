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
var wedding_dao_postgres_1 = require("../src/daos/wedding-dao-postgres");
var weddingDAO = new wedding_dao_postgres_1.WeddingDaoPostgres();
var testWedding = new entities_1.Wedding(0, "2021-10-11", "Los Angeles, CA", "June and Chris", 7000);
test("Create a wedding", function () { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, weddingDAO.createWedding(testWedding)];
            case 1:
                result = _a.sent();
                expect(result.weddingId).not.toBe(0);
                return [2 /*return*/];
        }
    });
}); });
test("Get client by id", function () { return __awaiter(void 0, void 0, void 0, function () {
    var theWedding, returnedWedding;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                theWedding = new entities_1.Wedding(0, "2021-11-11", "Chicago, IL", "Miranda and Sarah", 8000);
                return [4 /*yield*/, weddingDAO.createWedding(theWedding)];
            case 1:
                theWedding = _a.sent();
                return [4 /*yield*/, weddingDAO.getWeddingById(theWedding.weddingId)];
            case 2:
                returnedWedding = _a.sent();
                expect(returnedWedding.weddingName).toBe(theWedding.weddingName);
                return [2 /*return*/];
        }
    });
}); });
test("Get all weddings", function () { return __awaiter(void 0, void 0, void 0, function () {
    var wedding1, wedding2, wedding3, weddings;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                wedding1 = new entities_1.Wedding(0, "2022-02-14", "Miami, FL", "April and Ronald", 10000);
                wedding2 = new entities_1.Wedding(0, "2022-03-24", "Houston, TX", "Sarah and Harry", 7000);
                wedding3 = new entities_1.Wedding(0, "2021-12-20", "San Francisco, CA", "Elizabeth and Joshua", 9000);
                return [4 /*yield*/, weddingDAO.createWedding(wedding1)];
            case 1:
                _a.sent();
                return [4 /*yield*/, weddingDAO.createWedding(wedding2)];
            case 2:
                _a.sent();
                return [4 /*yield*/, weddingDAO.createWedding(wedding3)];
            case 3:
                _a.sent();
                return [4 /*yield*/, weddingDAO.getAllWeddings()];
            case 4:
                weddings = _a.sent();
                expect(weddings.length).toBeGreaterThanOrEqual(3);
                return [2 /*return*/];
        }
    });
}); });
test("Update wedding", function () { return __awaiter(void 0, void 0, void 0, function () {
    var targetedWedding;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                targetedWedding = new entities_1.Wedding(0, "2021-12-05", "Norfolk, VA", "Alice and Michael", 6000);
                return [4 /*yield*/, weddingDAO.createWedding(targetedWedding)];
            case 1:
                targetedWedding = _a.sent();
                targetedWedding.weddingDate = "2021-12-10";
                return [4 /*yield*/, weddingDAO.updateWedding(targetedWedding)];
            case 2:
                targetedWedding = _a.sent();
                expect(targetedWedding.weddingDate).toBe("2021-12-10");
                return [2 /*return*/];
        }
    });
}); });
test("Delete wedding by id", function () { return __awaiter(void 0, void 0, void 0, function () {
    var targetedWedding, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                targetedWedding = new entities_1.Wedding(0, "2022-01-19", "Nashville, TN", "Andrea and Neil", 5000);
                return [4 /*yield*/, weddingDAO.createWedding(targetedWedding)];
            case 1:
                targetedWedding = _a.sent();
                return [4 /*yield*/, weddingDAO.deleteWeddingById(targetedWedding.weddingId)];
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
