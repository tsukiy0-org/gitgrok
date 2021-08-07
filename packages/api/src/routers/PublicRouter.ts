import cors from "cors";
import { json } from "body-parser";
import { Router } from "express";
import { IConfiguration } from "@tsukiy0/extensions-core";
import { promisifyHandler } from "@tsukiy0/extensions-express";

export class PublicRouter {
  constructor(private readonly config: IConfiguration) {}

  router = (): Router => {
    const router = Router();

    router.use(cors());
    router.use(json());

    router.post(
      "/config",
      promisifyHandler(async (req, res) => {
        res.status(200).json({
          config: this.config.get("TEST"),
        });
      }),
    );

    return router;
  };
}
