import { IRepositoryIndexService, Repository } from "@app/core";
import fetch from "node-fetch";
import { Url } from "@tsukiy0/extensions-core";
import path from "path";
import { Extract } from "unzipper";
import fs from "fs";
import shell from "shelljs";

export class GitHubCloneRepositoryIndexService
  implements IRepositoryIndexService
{
  constructor(
    private readonly org: string,
    private readonly rootPath: string,
    private readonly accessToken: string,
  ) {}

  index = async (repository: Repository): Promise<void> => {
    const unzipFolder = path.resolve(this.rootPath, this.org);
    fs.mkdirSync(unzipFolder, {
      recursive: true,
    });

    shell.cd(unzipFolder);
    shell.exec(
      `git clone https://${this.accessToken}@github.com/${this.org}/${repository.id}.git`,
    );
  };
}
