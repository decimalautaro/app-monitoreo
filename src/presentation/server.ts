import { CronJob } from "cron";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-services";
export class Server {
  public static start() {
    console.log("Server started...");

    CronService.createJob("*/5 * * * * *", () => {
      // new CheckService().execute("https://google.com");
      new CheckService().execute("http://localhost:3000");
    });
  }
}

Server.start();
