import { Url } from "@tsukiy0/extensions-core";
import { Record, Static } from "runtypes";

export const Repository = Record({
  url: Url,
});

export type Repository = Static<typeof Repository>;
