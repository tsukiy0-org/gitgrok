import "source-map-support/register";
import serverlessExpresss from "@vendia/serverless-express";
import { App } from "./App";
import { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = serverlessExpresss({
  app: App.build(),
});
