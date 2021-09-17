import {Client} from "pg";
require("dotenv").config({path:'C:\\Users\\aldri\\Documents\\planner-service\\wedding-planner-api\\app.env'});

export const client = new Client ({
    user: 'postgres',
    password: process.env.DBPASSWORD,
    database: process.env.DATABASENAME,
    port: 5432,
    host: "34.86.19.9" 
});

client.connect();