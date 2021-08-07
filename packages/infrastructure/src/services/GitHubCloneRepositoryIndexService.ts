import { GitHubConfig, IRepositoryIndexService, Repository } from "@app/core";
import path from "path";
import fs from "fs";
import shell from "shelljs";

export class GitHubCloneRepositoryIndexService
  implements IRepositoryIndexService
{
  constructor(
    private readonly config: GitHubConfig,
    private readonly rootPath: string,
  ) {}

  index = async (repository: Repository): Promise<void> => {
    const unzipFolder = path.resolve(this.rootPath, this.config.owner);
    fs.mkdirSync(unzipFolder, {
      recursive: true,
    });

    shell.cd(unzipFolder);
    shell.exec(
      `git clone https://${this.config.accessToken}@github.com/${this.config.owner}/${repository.id}.git`,
    );
  };
}
