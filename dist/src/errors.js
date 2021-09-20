"use strict";
exports.__esModule = true;
exports.WeddingExists = exports.ConflictingIdentifications = exports.ExpensesError = exports.MissingResourceError = void 0;
var MissingResourceError = /** @class */ (function () {
    function MissingResourceError(message) {
        this.description = "This error means a resource could not be located.";
        this.message = message;
    }
    return MissingResourceError;
}());
exports.MissingResourceError = MissingResourceError;
var ExpensesError = /** @class */ (function () {
    function ExpensesError(message) {
        this.description = "This error means there are no expenses for this particular wedding at the moment.";
        this.message = message;
    }
    return ExpensesError;
}());
exports.ExpensesError = ExpensesError;
var ConflictingIdentifications = /** @class */ (function () {
    function ConflictingIdentifications(message) {
        this.description = "This error means there is a confliction with the ID entered";
        this.message = message;
    }
    return ConflictingIdentifications;
}());
exports.ConflictingIdentifications = ConflictingIdentifications;
var WeddingExists = /** @class */ (function () {
    function WeddingExists(message) {
        this.description = "This error means a client with this SSN already exists";
        this.message = message;
    }
    return WeddingExists;
}());
exports.WeddingExists = WeddingExists;
