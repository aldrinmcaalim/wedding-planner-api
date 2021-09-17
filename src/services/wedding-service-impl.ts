import { WeddingDAO } from "../daos/wedding-dao";
import { WeddingDaoPostgres } from "../daos/wedding-dao-postgres";
import { Wedding } from "../entities";
import { MissingResourceError } from "../errors";
import WeddingService from "./wedding-service";

export class WeddingServiceImpl implements WeddingService {

    weddingDao:WeddingDAO = new WeddingDaoPostgres();

    registerWedding(wedding:Wedding):Promise<Wedding> {
        return this.weddingDao.createWedding(wedding);
    }

    retrieveAllWeddings():Promise<Wedding[]> {
        return this.weddingDao.getAllWeddings();
    }

    retrieveWeddingById(weddingId:number):Promise<Wedding> {
        return this.weddingDao.getWeddingById(weddingId);
    }

    updateWedding(wedding:Wedding):Promise<Wedding> {
        return this.weddingDao.updateWedding(wedding);
    }

    removeWeddingById(weddingId:number):Promise<boolean> {
        if (this.weddingDao.getWeddingById(weddingId) === null) {
            throw new MissingResourceError("Wedding not found.");
        }

        return this.weddingDao.deleteWeddingById(weddingId);
    }
}