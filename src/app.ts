import { PrismaClient } from "@prisma/client";
import { enviroment } from "./config/enviroment";
import { LogModel, MongoDatabase } from "./data/mongodb";
import { Server } from "./presentation/server";

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: enviroment.MONGO_URL,
    dbName: enviroment.MONGO_DB_NAME,
  });

  // const prisma = new PrismaClient();
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level: "HIGH",
  //     message: "Test message",
  //     origin: "App.ts",
  //   },
  // });

  // const logs = await prisma.logModel.findMany({
  //   where: {
  //     level: "MEDIUM",
  //   },
  // });
  // console.log(logs);

  Server.start();
}
