import mongoose from "mongoose";
import { enviroment } from "../../../src/config/enviroment";
import { LogModel, MongoDatabase } from "../../../src/data/mongodb";
import { MongoLogDatasource } from "../../../src/infrastructure/datasources/mongo-log.datasource";
import {
  LogEntity,
  LogServerityLevel,
} from "../../../src/domain/entities/log-entity";

describe("MongoLogDatasource", () => {
  const logDataSource = new MongoLogDatasource();

  const log = new LogEntity({
    level: LogServerityLevel.medium,
    message: "test message",
    origin: "mongo-log.datasource.test.ts",
  });

  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: enviroment.MONGO_DB_NAME,
      mongoUrl: enviroment.MONGO_URL,
    });
  });

  afterEach(async () => {
    await LogModel.deleteMany();
  });
  afterAll(() => {
    mongoose.connection.close();
  });

  test("should create a log", async () => {
    const logSpy = jest.spyOn(console, "log");

    await logDataSource.saveLog(log);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith("Mongo Log created");
  });

  test("should get logs", async () => {
    await logDataSource.saveLog(log);
    const logs = await logDataSource.getLogs(LogServerityLevel.medium);

    expect(logs.length).toBe(1);
    expect(logs[0].level).toBe(LogServerityLevel.medium);
  });
});
