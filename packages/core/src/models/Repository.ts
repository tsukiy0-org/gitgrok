import { Record, Static, String } from "runtypes";

export const Repository = Record({
  uri: String,
});

export type Repository = Static<typeof Repository>;
