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
    "2022/11/12",
    "Austin, TX",
    "Jane and Smith",
    30000,
    createSSN()
  );
  const result: Wedding = await weddingDAO.weddingCreator(testWedding);
  expect(result.weddingID).not.toBe(0);
});
test("Create our 3 additional weddings: ", async () => {
  const testWedding1: Wedding = new Wedding(
    0,
    "2021/13/12",
    "New York City, NY",
    "Samantha and Spencer",
    25000,
    createSSN()
  );
  const testWedding2: Wedding = new Wedding(
    0,
    "2022/10/01",
    "Los Angeles, CA",
    "Elizabeth and Robert",
    15000,
    createSSN()
  );
  const testWedding3: Wedding = new Wedding(
    0,
    "2022/01/10",
    "Chicago, IL",
    "Daphne and Fred",
    12000,
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
    "2025/14/04",
    "Houston, TX",
    "Angela and Dwight",
    14000,
    998866
  );
  const result: Wedding = await weddingDAO.updateWedding(testWedding);
  expect(result.weddingLocation).toBe(testWedding.weddingLocation);
});
test("Delete the wedding by ID: ", async () => {
  const testWedding1: Wedding = new Wedding(
    0,
    "2022/08/21",
    "Sacramento, CA",
    "Jan and Michael",
    33000,
    createSSN()
  );
  const wedding = await weddingDAO.weddingCreator(testWedding1);
  const result: boolean = await weddingDAO.deleteWedding(wedding.weddingID);
  expect(result).toBeTruthy();
});

afterAll(async () => {
  await client.end();
});
