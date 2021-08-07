import { BillingAlarm, EmailAlarmAction } from "@tsukiy0/extensions-aws-cdk";
import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

export class ExternalStack extends Stack {
  public constructor(
    scope: Construct,
    id: string,
    props: StackProps & {
      alertEmail: string;
    },
  ) {
    super(scope, id, props);

    const billingAlarm = new BillingAlarm(this, "BillingAlarm", {
      amountUSD: 10,
    });

    billingAlarm.addAction(
      new EmailAlarmAction(this, "EmailAlartAction", {
        emails: [props.alertEmail],
      }).action,
    );
  }
}
