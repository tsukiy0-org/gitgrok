import { Url } from "@tsukiy0/extensions-core";
import { Record, Static, String } from "runtypes";

export const Repository = Record({
  url: Url,
  defaultBranch: String,
});

export type Repository = Static<typeof Repository>;
