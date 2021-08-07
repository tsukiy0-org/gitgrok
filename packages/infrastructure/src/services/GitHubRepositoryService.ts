import { GitHubConfig, IRepositoryService, Repository } from "@app/core";
import { GitHubGraphQlClient } from "./GitHubGraphQlClient";
import {
  QuerySearchArgs,
  SearchResultItemConnection,
  SearchType,
} from "@app/github-public-graphql-types";
import { gql } from "graphql-request";
import { RepositoryExtensions } from "../extensions/RepositoryExtensions";
import { Repository as GitHubRepository } from "@app/github-public-graphql-types";

export class GitHubRepositoryService implements IRepositoryService {
  private readonly client: GitHubGraphQlClient;

  constructor(private readonly config: GitHubConfig) {
    this.client = new GitHubGraphQlClient(config.accessToken);
  }

  list = async (): Promise<Repository[]> => {
    const nodes = await this.listRecursively([], undefined);
    return nodes
      .filter((_) => !_.isEmpty)
      .map((node) => RepositoryExtensions.fromGitHubRepository(node));
  };

  private listRecursively = async (
    items: GitHubRepository[],
    after?: string,
  ): Promise<GitHubRepository[]> => {
    const result = await this.listRaw(after);
    const nodes = result.nodes ?? [];
    const newItems = [...items, ...(nodes as GitHubRepository[])];

    if (result.pageInfo.hasNextPage) {
      return await this.listRecursively(
        newItems,
        result.pageInfo.startCursor ?? undefined,
      );
    }

    return newItems;
  };

  private listRaw = async (
    after?: string,
  ): Promise<SearchResultItemConnection> => {
    const result = await this.client.request<
      {
        search: SearchResultItemConnection;
      },
      QuerySearchArgs
    >(
      gql`
        query Task(
          $after: String
          $before: String
          $first: Int
          $last: Int
          $query: String!
          $type: SearchType!
        ) {
          search(
            after: $after
            before: $before
            first: $first
            last: $last
            query: $query
            type: $type
          ) {
            repositoryCount
            nodes {
              ... on Repository {
                name
                url
                defaultBranchRef {
                  name
                }
                isEmpty
              }
            }
            pageInfo {
              hasNextPage
              startCursor
            }
          }
        }
      `,
      {
        first: 100,
        after,
        type: SearchType.Repository,
        query: `org:${this.config.owner}`,
      },
    );

    return result.search;
  };
}
