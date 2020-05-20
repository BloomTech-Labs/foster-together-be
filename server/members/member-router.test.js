const server = require("../server"),
  request = require("supertest"),
  db = require("../../data/db-config");

describe("/members", () => {
  let token;

  beforeAll(async done => {
    await db.seed.run();
    request(server)
      .post("/login")
      .send({
        email: "hope@email.com",
        password: "hope"
      })
      .end((err, response) => {
        token = response.body.token; // save the token!
        done();
      });
  });

  describe(`POST '/'`, () => {
    test("should respond with a status 201 and a json message for success", async () => {
      const res = await request(server)
        .post("/members/neighbors")
        .set("authorization", token)
        .send({
          first_name: "John",
          last_name: "Smith",
          email: "john.smith@email.com",
          phone: "503-555-8654",
          address: "1234 Main Street, APT 5",
          city: "New Haven",
          state: "Connecticut",
          zip: "06512",
          password: "",
          confirmPassword: "",
          longitude: 10.61944,
          latitude: -91.47337
        });

      expect(JSON.parse(res.text).error).toBe(undefined);

      expect(res.status).toBe(201);

      expect(JSON.parse(res.text).message).toBe("Member successfully added.");

      expect(JSON.parse(res.text).user).toMatchObject({
        first_name: "John",
        last_name: "Smith",
        email: "john.smith@email.com",
        phone: "503-555-8654",
        address: "1234 Main Street, APT 5",
        city: "New Haven",
        state: "Connecticut",
        zip: "06512",
        latitude: "-91.47337",
        longitude: "10.61944"
      });
    });
  });

  describe(`GET '/'`, () => {
    test("should respond with status 200, and an array of neighbors", async () => {
      const res = await request(server)
        .get("/members/?type=neighbors")
        .set("authorization", token);

      expect(JSON.parse(res.text).error).toBe(undefined);

      expect(res.status).toBe(200);

      expect(JSON.parse(res.text).length).toBe(4);

      expect(JSON.parse(res.text)[0]).toMatchObject({
        id: 4,
        first_name: "Eric",
        last_name: "Grece",
        email: "GreceMana@yahoo.com",
        phone: "202-808-6542",
        address: "629 W Cienga Boul",
        city: "Boulder",
        state: "Colorado",
        zip: "80301",
        longitude: "-104.74184555996333",
        latitude: "39.99855629395559"
      });
    });
  });

  describe(`GET '/:id'`, () => {
    test("should respond with status 200, and the requested member", async () => {
      const res = await request(server)
        .get("/members/4")
        .set("authorization", token);

      expect(JSON.parse(res.text).error).toBe(undefined);

      expect(res.status).toBe(200);

      expect(JSON.parse(res.text)).toMatchObject({
        id: 4,
        first_name: "Eric",
        last_name: "Grece",
        email: "GreceMana@yahoo.com",
        phone: "202-808-6542",
        address: "629 W Cienga Boul",
        city: "Boulder",
        state: "Colorado",
        zip: "80301",
        type: "neighbors",
        longitude: "-104.74184555996333",
        latitude: "39.99855629395559"
      });
    });
  });

  describe(`PUT '/:id'`, () => {
    test("should respond with status 200, and the updated neighbor", async () => {
      const res = await request(server)
        .put("/members/7")
        .set("authorization", token)
        .send({
          first_name: "Jane",
          last_name: "Smith",
          phone: "503-555-8655",
          address: "1234 Main Street, APT 7",
          city: "Portland",
          state: "OR",
          zip: "97232",
          longitude: "-106.74184555996333",
          latitude: "41.99855629395559"
        });

      expect(JSON.parse(res.text).error).toBe(undefined);

      expect(res.status).toBe(200);

      expect(JSON.parse(res.text)[0]).toMatchObject({
        id: 7,
        first_name: "Jane",
        last_name: "Smith",
        phone: "503-555-8655",
        address: "1234 Main Street, APT 7",
        email: "john.smith@email.com",
        type: "neighbors",
        city: "Portland",
        state: "OR",
        zip: "97232",
        longitude: "-106.74184555996333",
        latitude: "41.99855629395559"
      });
    });
  });

  describe(`DELETE '/:id'`, () => {
    test("should respond with status 200, and the requested neighbor", async () => {
      const res = await request(server)
        .delete("/members/7")
        .set("authorization", token);

      expect(JSON.parse(res.text).error).toBe(undefined);

      expect(res.status).toBe(200);

      expect(JSON.parse(res.text).message).toBe("Member successfully deleted.");
    });
  });

  describe(`custom error handling`, () => {
    test("should respond with status 500, a message, and the original thrown error", async () => {
      const res = await request(server)
        .get("/members/a")
        .set("authorization", token);

      expect(res.status).toBe(500);

      expect(JSON.parse(res.text).message).toBe("Uh Oh! 500 Error!");

      expect(JSON.parse(res.text).error).toMatch(/invalid input syntax/);
    });
  });
});
