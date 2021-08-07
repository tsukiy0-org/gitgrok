import { Url } from "@tsukiy0/extensions-core";
import { Record, Static, String } from "runtypes";
import { RepositoryId } from "./RepositoryId";

export const Repository = Record({
  id: RepositoryId,
  url: Url,
  defaultBranch: String,
});

export type Repository = Static<typeof Repository>;
