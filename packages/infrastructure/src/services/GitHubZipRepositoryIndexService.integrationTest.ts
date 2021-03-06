import { SystemConfiguration, Url } from "@tsukiy0/extensions-core";
import { GitHubZipRepositoryIndexService } from "./GitHubZipRepositoryIndexService";
import path from "path";
import { Repository, RepositoryId } from "@app/core";
import fs from "fs";

describe("GitHubZipRepositoryIndexService", () => {
  let owner: string;
  let rootPath: string;
  let sut: GitHubZipRepositoryIndexService;

  beforeEach(() => {
    const config = new SystemConfiguration();
    const accessToken = config.get("GH_ACCESS_TOKEN");
    owner = "atlassian";
    rootPath = path.resolve(__dirname, "../../tmp/zip");
    sut = new GitHubZipRepositoryIndexService(
      {
        owner,
        accessToken,
      },
      rootPath,
    );
  });

  describe("index", () => {
    it("downloads and unzip", async () => {
      const repository: Repository = {
        id: RepositoryId.check("react-beautiful-dnd"),
        url: Url.check("https://github.com/atlassian/react-beautiful-dnd"),
        defaultBranch: "master",
      };

      await sut.index(repository);
      const actual = fs.existsSync(
        path.resolve(rootPath, owner, repository.id),
      );

      expect(actual).toBeTruthy();
    });
  });
});
