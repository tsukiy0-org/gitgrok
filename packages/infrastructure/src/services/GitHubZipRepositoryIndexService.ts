import { GitHubConfig, IRepositoryIndexService, Repository } from "@app/core";
import fetch from "node-fetch";
import { Url } from "@tsukiy0/extensions-core";
import path from "path";
import { Extract } from "unzipper";
import fs from "fs";

export class GitHubZipRepositoryIndexService
  implements IRepositoryIndexService
{
  constructor(
    private readonly config: GitHubConfig,
    private readonly rootPath: string,
  ) {}

  index = async (repository: Repository): Promise<void> => {
    const url = Url.check(
      `https://github.com/${this.org}/${repository.id}/zipball/${repository.defaultBranch}`,
    );
    const res = await fetch(url, {
      headers: {
        Authorization: `token ${this.config.accessToken}`,
      },
    });

    const unzipFolder = path.resolve(this.rootPath, this.config.org);
    fs.mkdirSync(unzipFolder, {
      recursive: true,
    });

    await new Promise((resolve, reject) => {
      const unzipPath = path.resolve(
        this.rootPath,
        this.config.org,
        repository.id,
      );

      res.body
        .pipe(
          Extract({
            path: unzipPath,
          }),
        )
        .on("finish", resolve)
        .on("error", reject);
    });
  };
}
