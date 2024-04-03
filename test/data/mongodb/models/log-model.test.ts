import { MongoDatabase } from "../../../../src/data/mongodb/init";
import { enviroment } from "../../../../src/config/enviroment";
import { LogModel } from "../../../../src/data/mongodb/models/log-model";
import mongoose from "mongoose";
import exp from "constants";

describe("log-model.test.ts", () => {
  beforeAll(async () => {
    await MongoDatabase.connect({
      mongoUrl: enviroment.MONGO_URL,
      dbName: enviroment.MONGO_DB_NAME,
    });
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  test("should return LogModel", async () => {
    const logData = {
      origin: "log.model.test.ts",
      message: "test-message",
      level: "low",
    };

    const log = await LogModel.create(logData);
    expect(log).toEqual(
      expect.objectContaining({
        ...logData,
        createdAt: expect.any(Date),
        id: expect.any(String),
      })
    );

    await LogModel.findByIdAndDelete(log.id);
  });

  test("should return the schema object ", () => {
    const schema = LogModel.schema.obj;
    expect(schema).toEqual(
      expect.objectContaining({
        message: { type: expect.any(Function), required: true },
        origin: { type: expect.any(Function) },
        level: {
          type: expect.any(Function),
          enum: ["low", "medium", "high"],
          default: "low",
        },
        createdAt: expect.any(Object),
      })
    );
  });
});
