/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Command } from "commander";
import { BulkIndexService, GitHubConfig } from "@app/core";
import {
  GitHubRepositoryService,
  GitHubCloneRepositoryIndexService,
} from "@app/infrastructure";
import path from "path";

const program = new Command();

program.version("0.0.1");

program
  .requiredOption("--token <token>")
  .requiredOption("--owner <owner>")
  .requiredOption("--out <path>")
  .action(async (options) => {
    const config: GitHubConfig = {
      owner: options.owner,
      accessToken: options.token,
    };

    const repositoryService = new GitHubRepositoryService(config);
    const repositoryIndexService = new GitHubCloneRepositoryIndexService(
      config,
      options.path,
    );
    const bulkIndexService = new BulkIndexService(
      repositoryService,
      repositoryIndexService,
    );

    await bulkIndexService.bulkIndex();
  });

program.parse(process.argv);
