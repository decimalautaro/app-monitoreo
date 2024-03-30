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

  Server.start();
}
