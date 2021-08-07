import express, { Application } from "express";
import { SystemConfiguration } from "@tsukiy0/extensions-core";
import {
  CorrelationMiddleware,
  ErrorMiddleware,
  LoggerMiddleware,
  promisifyHandler,
} from "@tsukiy0/extensions-express";
import { PublicRouter } from "./routers/PublicRouter";

export class App {
  static build = (): Application => {
    const app = express();

    const configuration = new SystemConfiguration();

    const correlationMiddleware = new CorrelationMiddleware();
    const loggerMiddleware = new LoggerMiddleware(
      "@app/api",
      correlationMiddleware,
    );
    const errorMiddleware = new ErrorMiddleware(loggerMiddleware);
    const publicRouter = new PublicRouter(configuration);

    app.use(loggerMiddleware.handler);

    app.use(publicRouter.router);

    app.get(
      "/health",
      promisifyHandler(async (req, res) => {
        res.status(200).end();
      }),
    );

    app.use(errorMiddleware.handler);

    return app;
  };
}
