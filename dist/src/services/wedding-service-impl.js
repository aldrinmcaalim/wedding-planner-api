"use strict";
exports.__esModule = true;
exports.WeddingServiceImpl = void 0;
var wedding_dao_postgres_1 = require("../daos/wedding-dao-postgres");
var errors_1 = require("../errors");
var WeddingServiceImpl = /** @class */ (function () {
    function WeddingServiceImpl() {
        this.weddingDao = new wedding_dao_postgres_1.WeddingDaoPostgres();
    }
    WeddingServiceImpl.prototype.registerWedding = function (wedding) {
        return this.weddingDao.createWedding(wedding);
    };
    WeddingServiceImpl.prototype.retrieveAllWeddings = function () {
        return this.weddingDao.getAllWeddings();
    };
    WeddingServiceImpl.prototype.retrieveWeddingById = function (weddingId) {
        return this.weddingDao.getWeddingById(weddingId);
    };
    WeddingServiceImpl.prototype.updateWedding = function (wedding) {
        return this.weddingDao.updateWedding(wedding);
    };
    WeddingServiceImpl.prototype.removeWeddingById = function (weddingId) {
        if (this.weddingDao.getWeddingById(weddingId) === null) {
            throw new errors_1.MissingResourceError("Wedding not found.");
        }
        return this.weddingDao.deleteWeddingById(weddingId);
    };
    return WeddingServiceImpl;
}());
exports.WeddingServiceImpl = WeddingServiceImpl;
