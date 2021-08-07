import { StaticSite } from "@tsukiy0/extensions-aws-cdk";
import { CachePolicy } from "aws-cdk-lib/lib/aws-cloudfront";
import { Source } from "aws-cdk-lib/lib/aws-s3-deployment";
import { Construct } from "constructs";
import path from "path";

export class Web extends Construct {
  public constructor(scope: Construct, id: string) {
    super(scope, id);

    new StaticSite(this, "StaticSite", {
      source: Source.asset(path.resolve(__dirname, "../../../web/out")),
      behaviors: [
        {
          path: "*.html",
          cachePolicy: CachePolicy.CACHING_DISABLED,
        },
        {
          path: "favicon.ico",
          cachePolicy: CachePolicy.CACHING_DISABLED,
        },
      ],
    });
  }
}
