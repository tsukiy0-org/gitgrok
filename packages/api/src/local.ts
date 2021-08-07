import { App } from "./App";
import dotenv from "dotenv-flow";

dotenv.config({
  silent: true,
});

const app = App.build();

void app.listen(8000);
