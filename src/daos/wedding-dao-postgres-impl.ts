import { client } from "../connection";
import { Wedding } from "../entities";
import { MissingResourceError, WeddingExists } from "../errors";
import { WeddingDAO } from "./wedding-dao";

export default class WeddingDaoImpl implements WeddingDAO {
  async weddingCreator(wedding: Wedding): Promise<Wedding> {
    const ssnTest: string = "select * from wedding where ssn = $1";
    const valTest = [wedding.ssn];
    const resTest = await client.query(ssnTest, valTest);
    if (resTest.rowCount === 0) {
      const sql: string =
        "insert into wedding(wedding_date,wedding_location, wedding_name, wedding_budget, ssn) values ($1,$2,$3,$4,$5) returning wedding_id";
      const values = [
        wedding.weddingDate,
        wedding.weddingLocation,
        wedding.weddingName,
        wedding.weddingBudget,
        wedding.ssn,
      ];
      const result = await client.query(sql, values);
      wedding.weddingID = result.rows[0].wedding_id;
      return wedding;
    } else {
      throw new WeddingExists(
        `The wedding already exist within the data base under the wedding ID ${wedding.weddingID} with an SSN being ${wedding.ssn}`
      );
    }
  }
  async allWeddings() {
    const sql: string = "select * from wedding";
    const result = await client.query(sql);
    const weddings: Wedding[] = [];
    for (const row of result.rows) {
      const wedding: Wedding = new Wedding(
        row.wedding_id,
        row.wedding_date,
        row.wedding_location,
        row.wedding_name,
        row.wedding_budget,
        row.ssn
      );
      weddings.push(wedding);
    }
    return weddings;
  }
  async weddingByID(weddingID: number): Promise<Wedding> {
    const sql: string = "select * from wedding where wedding_id=$1";
    const values = [weddingID];
    const result = await client.query(sql, values);
    if (result.rowCount === 0) {
      throw new MissingResourceError(
        `The wedding with ID ${weddingID} does not exist in our systems`
      );
    }
    const row = result.rows[0];
    const wedding: Wedding = new Wedding(
      row.wedding_id,
      row.wedding_date,
      row.wedding_location,
      row.wedding_name,
      row.wedding_budget,
      row.ssn
    );
    return wedding;
  }
  async updateWedding(wedding: Wedding): Promise<Wedding> {
    const sql: string =
      "update wedding set wedding_date=$1,wedding_location=$2,wedding_name=$3,wedding_budget=$4,ssn=$5 where wedding_id=$6";
    const values = [
      wedding.weddingDate,
      wedding.weddingLocation,
      wedding.weddingName,
      wedding.weddingBudget,
      wedding.ssn,
      wedding.weddingID,
    ];
    const result = await client.query(sql, values);
    const row = result.rows[0];
    const weddingReturn: Wedding = new Wedding(
      row.wedding_id,
      row.wedding_date,
      row.wedding_location,
      row.wedding_name,
      row.wedding_budget,
      row.ssn
    );
    return weddingReturn;
  }
  
  async deleteWedding(weddingID: number): Promise<boolean> {
    const sql: string = "delete from expense where wedding_id=$1";
    const value = [weddingID];
    await client.query(sql, value);
    const sql2: string = "delete from wedding where wedding_id=$1";
    const value2 = [weddingID];
    await client.query(sql2, value2);

    return true;
  }
}
