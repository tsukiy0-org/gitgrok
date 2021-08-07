import { SystemConfiguration, Url } from "@tsukiy0/extensions-core";
import { GitHubFileRepositoryIndexService } from "./GitHubZipRepositoryIndexService";
import path from "path";
import { Repository, RepositoryId } from "@app/core";
import fs from "fs";

describe("GitHubZipRepositoryIndexService", () => {
  let org: string;
  let rootPath: string;
  let sut: GitHubFileRepositoryIndexService;

  beforeEach(() => {
    const config = new SystemConfiguration();
    const accessToken = config.get("GH_ACCESS_TOKEN");
    org = "atlassian";
    rootPath = path.resolve(__dirname, "../../tmp");
    sut = new GitHubFileRepositoryIndexService(org, rootPath, accessToken);
  });

  describe("index", () => {
    it("downloads and unzip", async () => {
      const repository: Repository = {
        id: RepositoryId.check("react-beautiful-dnd"),
        url: Url.check("https://github.com/atlassian/react-beautiful-dnd"),
        defaultBranch: "master",
      };

      await sut.index(repository);
      const actual = fs.existsSync(path.resolve(rootPath, org, repository.id));

      expect(actual).toBeTruthy();
    });
  });
});
