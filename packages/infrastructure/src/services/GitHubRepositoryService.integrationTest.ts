import { GitHubRepositoryService } from "./GitHubRepositoryService";
import { SystemConfiguration } from "@tsukiy0/extensions-core";
import { GitHubGraphQlClient } from "./GitHubGraphQlClient";

describe("GitHubRepositoryService", () => {
  let sut: GitHubRepositoryService;

  beforeEach(() => {
    const config = new SystemConfiguration();
    const accessToken = config.get("GH_ACCESS_TOKEN");
    const org = "atlassian";
    const client = new GitHubGraphQlClient(accessToken);
    sut = new GitHubRepositoryService(client, org);
  });

  describe("list", () => {
    it("gets all repositories", async () => {
      const actual = await sut.list();

      expect(actual.length).toBeGreaterThan(100);
    });
  });
});
