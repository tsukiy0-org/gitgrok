import { Static, String } from "runtypes";

export const RepositoryId = String.withConstraint(
  (_) => _.length > 0,
).withBrand("RepositoryId");

export type RepositoryId = Static<typeof RepositoryId>;
