import { PromiseExtensions } from "@tsukiy0/extensions-core";
import { IRepositoryIndexService } from "./IRepositoryIndexService";
import { IRepositoryService } from "./IRepositoryService";

export class BulkIndexService {
  constructor(
    private readonly repositoryService: IRepositoryService,
    private readonly repositoryIndexService: IRepositoryIndexService,
  ) {}

  bulkIndex = async (): Promise<void> => {
    const repositories = await this.repositoryService.list();
    await PromiseExtensions.allBatched(
      repositories.map(async (r) => this.repositoryIndexService.index(r)),
      5,
    );
  };
}
