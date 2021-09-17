import { Wedding } from "../entities";
import { WeddingDAO } from "./wedding-dao";
import {client} from "../connection";
import { MissingResourceError } from "../errors";

export class WeddingDaoPostgres implements WeddingDAO {
    
    async createWedding(wedding: Wedding): Promise<Wedding> {
        const sql:string = "insert into wedding(wedding_date, wedding_location, wedding_name, wedding_budget) values ($1, $2, $3, $4) returning wedding_id";
        const values = [wedding.weddingDate, wedding.weddingLocation, wedding.weddingName, wedding.weddingBudget];
        const result = await client.query(sql, values);
        wedding.weddingId = result.rows[0].wedding_id;
        return wedding;
        }

    async getAllWeddings(): Promise<Wedding[]> {
        const sql:string = "select * from wedding";
        const result = await client.query(sql);
        const weddings:Wedding[] = [];
        for (const row of result.rows) {
            const wedding:Wedding = new Wedding (
                row.wedding_id,
                row.wedding_date,
                row.wedding_location,
                row.wedding_name,
                row.wedding_budget);
            weddings.push(wedding);
        }
        return weddings;
    }

    async getWeddingById(weddingId: number): Promise<Wedding> {
        const sql:string = "select * from wedding where wedding_id = $1";
        const values = [weddingId];
        const result = await client.query(sql, values);
        if (result.rowCount === 0) {
            throw new MissingResourceError(`The wedding with id ${weddingId} does not exist.`);
        }
        const row = result.rows[0];
        // console.log(row);
        const theWedding:Wedding = new Wedding (
            row.wedding_id,
            row.wedding_date,
            row.wedding_location,
            row.wedding_name,
            row.wedding_budget);
        // console.log("theWedding:", theWedding);
        return theWedding;
    }
/*
    async createWedding(wedding: Wedding): Promise<Wedding> {
        const sql:string = "insert into wedding(wedding_date, wedding_location, wedding_name, wedding_budget) values ($1, $2, $3, $4) returning wedding_id";
        const values = [wedding.weddingDate, wedding.weddingLocation, wedding.weddingName, wedding.weddingBudget];
        const result = await client.query(sql, values);
        wedding.weddingId = result.rows[0].wedding_id;
        return wedding;
        }
*/
    async updateWedding(updateWedding: Wedding): Promise<Wedding> {
        const sql:string = "update wedding set wedding_date=$1, wedding_location=$2, wedding_name=$3, wedding_budget=$4 where wedding_id=$5";
        const values = [updateWedding.weddingDate, updateWedding.weddingLocation, updateWedding.weddingName, updateWedding.weddingBudget, updateWedding.weddingId];
        const result = await client.query(sql, values);
        if (result.rowCount === 0) {
            throw new MissingResourceError(`The client with id ${updateWedding.weddingId} does not exist.`);
        }
        return updateWedding;
        }

    async deleteWeddingById(weddingId: number): Promise<boolean> {
        const sql:string = "delete from wedding where wedding_id=$1";
        const values = [weddingId];
        const result = await client.query(sql, values);
        if (result.rowCount === 0) {
            throw new MissingResourceError(`The wedding with the id ${weddingId} does not exist.`);
        }
        return true;
        }
    
}