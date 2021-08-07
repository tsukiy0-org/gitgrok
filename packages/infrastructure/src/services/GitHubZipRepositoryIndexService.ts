import { IRepositoryIndexService, Repository } from "@app/core";
import fetch from "node-fetch";
import { Url } from "@tsukiy0/extensions-core";
import path from "path";
import fs from "fs";
import unzip from "unzipper";

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
      `https://github.com/${repository.id}/zipball/${repository.defaultBranch}`,
    );
    const res = await fetch(url, {
      headers: {
        Authorization: `token ${this.accessToken}`,
      },
    });

    await new Promise((resolve, reject) => {
      const unzipPath = path.resolve(this.rootPath, this.org, repository.id);

      res.body
        .pipe(
          unzip.Extract({
            path: unzipPath,
          }),
        )
        .on("finish", resolve)
        .on("error", reject);
    });
  };
}
