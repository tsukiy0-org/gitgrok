import { Repository, RepositoryId } from "@app/core";
import { Repository as GitHubRepository } from "@app/github-public-graphql-types";
import { Url } from "@tsukiy0/extensions-core";

export class RepositoryExtensions {
  static fromGitHubRepository = (input: GitHubRepository): Repository => {
    const mapped: Repository = {
      id: RepositoryId.check(input.name),
      url: Url.check(input.url),
      defaultBranch: input.defaultBranchRef!.name,
    };
    return Repository.check(mapped);
  };
}
