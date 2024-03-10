export enum LogServerityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  public level: LogServerityLevel;
  public message: string;
  public createdAt: Date;

  constructor(message: string, level: LogServerityLevel) {
    this.message = message;
    this.level = level;
    this.createdAt = new Date();
  }
}
