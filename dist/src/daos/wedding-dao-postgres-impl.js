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
var connection_1 = require("../connection");
var entities_1 = require("../entities");
var errors_1 = require("../errors");
var WeddingDaoImpl = /** @class */ (function () {
    function WeddingDaoImpl() {
    }
    WeddingDaoImpl.prototype.weddingCreator = function (wedding) {
        return __awaiter(this, void 0, void 0, function () {
            var ssnTest, valTest, resTest, sql, values, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ssnTest = "select * from wedding where ssn = $1";
                        valTest = [wedding.ssn];
                        return [4 /*yield*/, connection_1.client.query(ssnTest, valTest)];
                    case 1:
                        resTest = _a.sent();
                        if (!(resTest.rowCount === 0)) return [3 /*break*/, 3];
                        sql = "insert into wedding(wedding_date,wedding_location, wedding_name, wedding_budget, ssn) values ($1,$2,$3,$4,$5) returning wedding_id";
                        values = [
                            wedding.weddingDate,
                            wedding.weddingLocation,
                            wedding.weddingName,
                            wedding.weddingBudget,
                            wedding.ssn,
                        ];
                        return [4 /*yield*/, connection_1.client.query(sql, values)];
                    case 2:
                        result = _a.sent();
                        wedding.weddingID = result.rows[0].wedding_id;
                        return [2 /*return*/, wedding];
                    case 3: throw new errors_1.WeddingExists("The wedding already exist within the data base under the wedding ID " + wedding.weddingID + " with an SSN being " + wedding.ssn);
                }
            });
        });
    };
    WeddingDaoImpl.prototype.allWeddings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, result, weddings, _i, _a, row, wedding;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sql = "select * from wedding";
                        return [4 /*yield*/, connection_1.client.query(sql)];
                    case 1:
                        result = _b.sent();
                        weddings = [];
                        for (_i = 0, _a = result.rows; _i < _a.length; _i++) {
                            row = _a[_i];
                            wedding = new entities_1.Wedding(row.wedding_id, row.wedding_date, row.wedding_location, row.wedding_name, row.wedding_budget, row.ssn);
                            weddings.push(wedding);
                        }
                        return [2 /*return*/, weddings];
                }
            });
        });
    };
    WeddingDaoImpl.prototype.weddingByID = function (weddingID) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, values, result, row, wedding;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "select * from wedding where wedding_id=$1";
                        values = [weddingID];
                        return [4 /*yield*/, connection_1.client.query(sql, values)];
                    case 1:
                        result = _a.sent();
                        if (result.rowCount === 0) {
                            throw new errors_1.MissingResourceError("The wedding with ID " + weddingID + " does not exist in our systems");
                        }
                        row = result.rows[0];
                        wedding = new entities_1.Wedding(row.wedding_id, row.wedding_date, row.wedding_location, row.wedding_name, row.wedding_budget, row.ssn);
                        return [2 /*return*/, wedding];
                }
            });
        });
    };
    WeddingDaoImpl.prototype.updateWedding = function (wedding) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, values, result, row, weddingReturn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "update wedding set wedding_date=$1,wedding_location=$2,wedding_name=$3,wedding_budget=$4,ssn=$5 where wedding_id=$6";
                        values = [
                            wedding.weddingDate,
                            wedding.weddingLocation,
                            wedding.weddingName,
                            wedding.weddingBudget,
                            wedding.ssn,
                            wedding.weddingID,
                        ];
                        return [4 /*yield*/, connection_1.client.query(sql, values)];
                    case 1:
                        result = _a.sent();
                        row = result.rows[0];
                        weddingReturn = new entities_1.Wedding(row.wedding_id, row.wedding_date, row.wedding_location, row.wedding_name, row.wedding_budget, row.ssn);
                        return [2 /*return*/, weddingReturn];
                }
            });
        });
    };
    WeddingDaoImpl.prototype.deleteWedding = function (weddingID) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, value, sql2, value2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "delete from expense where wedding_id=$1";
                        value = [weddingID];
                        return [4 /*yield*/, connection_1.client.query(sql, value)];
                    case 1:
                        _a.sent();
                        sql2 = "delete from wedding where wedding_id=$1";
                        value2 = [weddingID];
                        return [4 /*yield*/, connection_1.client.query(sql2, value2)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return WeddingDaoImpl;
}());
exports["default"] = WeddingDaoImpl;
