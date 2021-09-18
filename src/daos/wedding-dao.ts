import { Wedding } from "../entities";

export interface WeddingDAO {
  // Create
  weddingCreator(wedding: Wedding): Promise<Wedding>;

  // Read
  allWeddings(): Promise<Wedding[]>;
  weddingByID(weddingID: number): Promise<Wedding>;

  // Update
  updateWedding(wedding: Wedding): Promise<Wedding>;

  // Delete
  deleteWedding(weddingID: number): Promise<boolean>;
}
