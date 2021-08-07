import { ValidationError } from "runtypes";
import { RepositoryId } from "./RepositoryId";

describe("RepositoryId", () => {
  it("must have length > 0", () => {
    const action = () => RepositoryId.check("");

    expect(action).toThrowError(ValidationError);
  });
});
