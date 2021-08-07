import { IRepositoryIndexService, Repository } from "@app/core";
import fetch from "node-fetch";
import { Url } from "@tsukiy0/extensions-core";
import path from "path";
import { Extract } from "unzipper";
import fs from "fs";

export class GitHubFileRepositoryIndexService
  implements IRepositoryIndexService
{
  constructor(
    private readonly org: string,
    private readonly rootPath: string,
    private readonly accessToken: string,
  ) {}

  index = async (repository: Repository): Promise<void> => {
    const url = Url.check(
      `https://github.com/${this.org}/${repository.id}/zipball/${repository.defaultBranch}`,
    );
    const res = await fetch(url, {
      headers: {
        Authorization: `token ${this.accessToken}`,
      },
    });

    const unzipFolder = path.resolve(this.rootPath, this.org);
    fs.mkdirSync(unzipFolder, {
      recursive: true,
    });

    await new Promise((resolve, reject) => {
      const unzipPath = path.resolve(this.rootPath, this.org, repository.id);

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
