import { enviroment } from "./config/enviroment";
import { Server } from "./presentation/server";

async () => {
  main();
};

function main() {
  Server.start();
}
