import { GitHubRepositoryService } from "./GitHubRepositoryService";
import { SystemConfiguration } from "@tsukiy0/extensions-core";

describe("GitHubRepositoryService", () => {
  let sut: GitHubRepositoryService;

  beforeEach(() => {
    const config = new SystemConfiguration();
    const accessToken = config.get("GH_ACCESS_TOKEN");
    const owner = "atlassian";
    sut = new GitHubRepositoryService({
      owner,
      accessToken,
    });
  });

  describe("list", () => {
    it("gets all repositories", async () => {
      const actual = await sut.list();

      expect(actual.length).toBeGreaterThan(100);
    });
  });
});
