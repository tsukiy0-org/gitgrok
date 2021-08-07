import { Record, Static, String } from "runtypes";

export const GitHubConfig = Record({
  owner: String,
  accessToken: String,
});

export type GitHubConfig = Static<typeof GitHubConfig>;
