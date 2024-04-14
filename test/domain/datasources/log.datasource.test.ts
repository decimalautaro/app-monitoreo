import { SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../../src/domain/datasources/log.datasource";
import {
  LogEntity,
  LogServerityLevel,
} from "../../../src/domain/entities/log-entity";

describe("log.datasource.ts LogDatasource", () => {
  const newLog = new LogEntity({
    origin: "log.datasource.test.ts",
    message: "test-message",
    level: LogServerityLevel.low,
  });

  class MockLogDatasoruce implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }
    async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
      return [newLog];
    }
  }

  test("should test the abstract class", async () => {
    const mockLogDatasource = new MockLogDatasoruce();

    expect(mockLogDatasource).toBeInstanceOf(MockLogDatasoruce);
    expect(mockLogDatasource).toHaveProperty("saveLog");
    expect(typeof mockLogDatasource.saveLog).toBe("function");
    expect(typeof mockLogDatasource.getLogs).toBe("function");

    await mockLogDatasource.saveLog(newLog);
    const logs = await mockLogDatasource.getLogs(LogServerityLevel.high);

    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});
