"use strict";
exports.__esModule = true;
exports.MissingResourceError = void 0;
var MissingResourceError = /** @class */ (function () {
    function MissingResourceError(message) {
        this.description = "Resource could not be found.";
        this.message = message;
    }
    return MissingResourceError;
}());
exports.MissingResourceError = MissingResourceError;
