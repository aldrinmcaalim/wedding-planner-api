import { client } from "../src/connection";
import { WeddingDAO } from "../src/daos/wedding-dao";
import WeddingDaoImpl from "../src/daos/wedding-dao-postgres-impl";
import { Wedding } from "../src/entities";

const weddingDAO: WeddingDAO = new WeddingDaoImpl();

const createSSN = function () {
  const ssn: number = Math.floor(100000 + Math.random() * 900000);
  return ssn;
};

test("Create our first wedding account: ", async () => {
  const testWedding: Wedding = new Wedding(
    0,
    "2022/21/09",
    "The Bradbury",
    "Johnsons",
    50000,
    createSSN()
  );
  const result: Wedding = await weddingDAO.weddingCreator(testWedding);
  expect(result.weddingID).not.toBe(0);
});
test("Create our 3 additional weddings: ", async () => {
  const testWedding1: Wedding = new Wedding(
    0,
    "2022/21/09",
    "The Union",
    "Jeffersons",
    50000,
    createSSN()
  );
  const testWedding2: Wedding = new Wedding(
    0,
    "2022/22/09",
    "The Bradbury",
    "Ranieris",
    50000,
    createSSN()
  );
  const testWedding3: Wedding = new Wedding(
    0,
    "2022/21/09",
    "Castle",
    "Baltics",
    50000,
    createSSN()
  );
  await weddingDAO.weddingCreator(testWedding1);
  await weddingDAO.weddingCreator(testWedding2);
  await weddingDAO.weddingCreator(testWedding3);
  const result: Wedding[] = await weddingDAO.allWeddings();
  expect(result.length).toBeGreaterThanOrEqual(3);
});
test("Find our wedding by ID: ", async () => {
  const result: Wedding = await weddingDAO.weddingByID(3);
  expect(result.weddingID).toBe(3);
});
test("Update our wedding: ", async () => {
  const testWedding: Wedding = new Wedding(
    8,
    "2022/21/09",
    "Antioque",
    "Brotherbees",
    5000,
    123456
  );
  const result: Wedding = await weddingDAO.updateWedding(testWedding);
  expect(result.weddingLocation).toBe(testWedding.weddingLocation);
});
test("Delete the wedding by ID: ", async () => {
  const testWedding1: Wedding = new Wedding(
    0,
    "2024/01/12",
    "Applebees",
    "Smiths",
    50,
    createSSN()
  );
  const wedding = await weddingDAO.weddingCreator(testWedding1);
  const result: boolean = await weddingDAO.deleteWedding(wedding.weddingID);
  expect(result).toBeTruthy();
});

afterAll(async () => {
  await client.end();
});
