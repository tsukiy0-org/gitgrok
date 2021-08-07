import { IRepositoryService, Repository } from "@app/core";

export class GitHubRepositoryService implements IRepositoryService {
  list = async (): Promise<Repository[]> => {
    throw new Error("Method not implemented.");
  };
}
