import { client } from "../src/connection";

test("Should have a connection ", async () => {
  const result = await client.query("select * from wedding");
});

afterAll(async () => {
  await client.end();
});
