import { enviroment } from "../../src/config/enviroment";

describe("enviroment.ts", () => {
  test("should return env options", () => {
    expect(enviroment).toEqual({
      PORT: 3000,
      MAILER_EMAIL: "prueba@gmail.com",
      MAILER_SECRET_KEY: "prueba",
      MAILER_SERVICE: "gmail",
      PROD: true,
      MONGO_URL: "mongodb://user:root@localhost:27017/",
      MONGO_DB_NAME: "NOC-TEST",
      MONGO_USER: "user",
      MONGO_PASS: "root",
    });
  });

  test("should return error if not found env", async () => {
    jest.resetModules();
    process.env.PORT = "abc";
    try {
      await import("../../src/config/enviroment");
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain(' "PORT" should be a valid integer');
    }
  });
});
