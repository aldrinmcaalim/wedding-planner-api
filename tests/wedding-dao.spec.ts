import { Wedding } from "../src/entities";
import { WeddingDAO } from "../src/daos/wedding-dao";
import { client } from "../src/connection";
import { WeddingDaoPostgres } from "../src/daos/wedding-dao-postgres";

const weddingDAO:WeddingDAO = new WeddingDaoPostgres();
const testWedding:Wedding = new Wedding(0, "2021-10-11", "Los Angeles, CA", "June and Chris", 7_000);

test("Create a wedding", async() => {
    const result:Wedding = await weddingDAO.createWedding(testWedding);
    expect(result.weddingId).not.toBe(0);
});

test("Get client by id", async() => {
    let theWedding:Wedding = new Wedding(0, "2021-11-11", "Chicago, IL", "Miranda and Sarah", 8_000);
    theWedding = await weddingDAO.createWedding(theWedding);
    let returnedWedding:Wedding = await weddingDAO.getWeddingById(theWedding.weddingId);

    expect(returnedWedding.weddingName).toBe(theWedding.weddingName);
});

test("Get all weddings", async() => {
    let wedding1:Wedding = new Wedding(0, "2022-02-14", "Miami, FL", "April and Ronald", 10_000);
    let wedding2:Wedding = new Wedding(0, "2022-03-24", "Houston, TX", "Sarah and Harry", 7_000);
    let wedding3:Wedding = new Wedding(0, "2021-12-20", "San Francisco, CA", "Elizabeth and Joshua", 9_000);
    await weddingDAO.createWedding(wedding1);
    await weddingDAO.createWedding(wedding2);
    await weddingDAO.createWedding(wedding3);

    const weddings:Wedding[] = await weddingDAO.getAllWeddings();

    expect(weddings.length).toBeGreaterThanOrEqual(3);
});

test("Update wedding", async() => {
    let targetedWedding:Wedding = new Wedding(0, "2021-12-05", "Norfolk, VA", "Alice and Michael", 6_000);
    targetedWedding = await weddingDAO.createWedding(targetedWedding);
    targetedWedding.weddingDate = "2021-12-10";
    targetedWedding = await weddingDAO.updateWedding(targetedWedding);

    expect(targetedWedding.weddingDate).toBe("2021-12-10");
});

test("Delete wedding by id", async() => {
    let targetedWedding:Wedding = new Wedding(0, "2022-01-19", "Nashville, TN", "Andrea and Neil", 5_000);
    targetedWedding = await weddingDAO.createWedding(targetedWedding);

    const result:boolean = await weddingDAO.deleteWeddingById(targetedWedding.weddingId);

    expect(result).toBeTruthy();
});

afterAll(async() => {
    client.end();
});