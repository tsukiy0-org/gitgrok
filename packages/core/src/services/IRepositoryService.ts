import { Repository } from "../models/Repository";

export interface IRepositoryService {
  list(): Promise<Repository[]>;
}
