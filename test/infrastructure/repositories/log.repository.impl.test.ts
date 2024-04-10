import {
  LogEntity,
  LogServerityLevel,
} from "../../../src/domain/entities/log-entity";
import { LogRepositoryImpl } from "../../../src/infrastructure/repositories/log.repository.impl";

describe("LogRespositoryImpl", () => {
  const mockLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const logRepository = new LogRepositoryImpl(mockLogDatasource);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("save should call the datasource with arguments ", async () => {
    const log = { level: LogServerityLevel.high, message: "hola" } as LogEntity;

    await logRepository.saveLog(log);

    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);
  });
  test("getLogs should call the datasource with arguments ", async () => {
    const lowSeverity = LogServerityLevel.low;

    await logRepository.getLogs(lowSeverity);
    expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(lowSeverity);
  });
});
