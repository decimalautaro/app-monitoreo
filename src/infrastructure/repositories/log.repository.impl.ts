import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log-entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository {
  constructor(private readonly logDatasource: LogDatasource) {}

  async saveLog(log: LogEntity): Promise<void> {
    return this.logDatasource.saveLog(log);
  }
  async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLogs(severityLevel);
  }
}
