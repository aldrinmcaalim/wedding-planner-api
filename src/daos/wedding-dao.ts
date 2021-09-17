import {Wedding} from "../entities";

export interface WeddingDAO {

    // CREATE
    createWedding(wedding:Wedding):Promise<Wedding>;

    // READ
    getAllWeddings():Promise<Wedding[]>;
    getWeddingById(weddingId:number):Promise<Wedding>;

    // UPDATE 
    updateWedding(updateWedding:Wedding):Promise<Wedding>;

    // DELETE
    deleteWeddingById(weddingId:number):Promise<boolean>;
}