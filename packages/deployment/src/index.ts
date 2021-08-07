import { SystemConfiguration } from "@tsukiy0/extensions-core";
import { App } from "aws-cdk-lib";
import { AppStack } from "./stacks/AppStack";
import { ExternalStack } from "./stacks/ExternalStack";

const app = new App();
const config = new SystemConfiguration();

const account = config.get("CDK_DEFAULT_ACCOUNT");
const alertEmail = config.get("ALERT_EMAIL");

new ExternalStack(app, "External", {
  env: {
    account,
    region: "us-east-1",
  },
  alertEmail,
});

new AppStack(app, "AppUsEast1", {
  env: {
    account,
    region: "us-east-1",
  },
});
