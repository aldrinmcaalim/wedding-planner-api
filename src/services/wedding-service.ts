import { Wedding, Expense } from "../entities";

export default interface WeddingService {
  createWedding(wedding: Wedding): Promise<Wedding>;

  allWeddings(): Promise<Wedding[]>;
  weddingByID(weddingID: number): Promise<Wedding>;

  updateWedding(wedding: Wedding, weddingID: number): Promise<Wedding>;

  deleteWedding(weddingID: number): Promise<boolean>;
}
