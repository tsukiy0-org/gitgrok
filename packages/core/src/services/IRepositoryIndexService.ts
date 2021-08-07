import { Repository } from "../models/Repository";

export interface IRepositoryIndexService {
  index(repository: Repository): Promise<void>;
}
