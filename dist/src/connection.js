"use strict";
exports.__esModule = true;
exports.client = void 0;
var pg_1 = require("pg");
require("dotenv").config({ path: 'C:\\Users\\aldri\\Documents\\planner-service\\wedding-planner-api\\app.env' });
exports.client = new pg_1.Client({
    user: 'postgres',
    password: process.env.DBPASSWORD,
    database: process.env.DATABASENAME,
    port: 5432,
    host: "34.86.19.9"
});
exports.client.connect();
