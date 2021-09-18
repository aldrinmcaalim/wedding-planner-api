import { Wedding } from "../entities";
import WeddingService from "./wedding-service";
import { WeddingDAO } from "../daos/wedding-dao";
import WeddingDaoImpl from "../daos/wedding-dao-postgres-impl";
import { ConflictingIdentifications, MissingResourceError } from "../errors";

export class WeddingServiceImpl implements WeddingService {
  weddingDAO: WeddingDAO = new WeddingDaoImpl();

  createWedding(wedding: Wedding): Promise<Wedding> {
    return this.weddingDAO.weddingCreator(wedding);
  }
  allWeddings(): Promise<Wedding[]> {
    return this.weddingDAO.allWeddings();
  }
  async weddingByID(weddingID: number): Promise<Wedding> {
    const wedding: Wedding = await this.weddingDAO.weddingByID(weddingID);
    return wedding;
  }
  async updateWedding(wedding: Wedding, weddingID: number): Promise<Wedding> {
    if (weddingID != wedding.weddingID) {
      throw new ConflictingIdentifications(
        `You entered in information for wedding ID: ${wedding.weddingID} but have wedding ID: ${weddingID} selected. Please correct accordingly`
      );
    } else {
      const wedTest: Wedding = await this.weddingDAO.weddingByID(weddingID);

      if (wedTest.weddingID != weddingID) {
        throw new MissingResourceError(
          `There is no wedding under the id ${weddingID}`
        );
      } else {
        return this.weddingDAO.updateWedding(wedding);
      }
    }
  }
  async deleteWedding(weddingID: number): Promise<boolean> {
    const wedding: Wedding = await this.weddingDAO.weddingByID(weddingID);
    if (wedding.weddingID != weddingID) {
      throw new MissingResourceError(
        `There is no wedding under the id ${weddingID}`
      );
    }
    return this.weddingDAO.deleteWedding(weddingID);
  }
}
