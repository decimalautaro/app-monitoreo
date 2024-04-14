import { SeverityLevel } from "@prisma/client";
import { LogRepository } from "../../../src/domain/repository/log.repository";
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

  class MockLogRepository implements LogRepository {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }
    async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
      return [newLog];
    }
  }

  test("should test the abstract class", async () => {
    const mockLogRepository = new MockLogRepository();

    expect(mockLogRepository).toBeInstanceOf(MockLogRepository);
    expect(mockLogRepository).toHaveProperty("saveLog");
    expect(typeof mockLogRepository.saveLog).toBe("function");
    expect(typeof mockLogRepository.getLogs).toBe("function");

    await mockLogRepository.saveLog(newLog);
    const logs = await mockLogRepository.getLogs(LogServerityLevel.high);

    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});
