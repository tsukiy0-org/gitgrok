import { IRepositoryService, Repository } from "@app/core";
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
  constructor(
    private readonly client: GitHubGraphQlClient,
    private readonly org: string,
  ) {}

  list = async (): Promise<Repository[]> => {
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
                url
              }
            }
          }
        }
      `,
      {
        first: 100,
        type: SearchType.Repository,
        query: `org:${this.org}`,
      },
    );

    const nodes = result.search.nodes;

    if (!nodes) {
      return [];
    }

    return nodes.map((node) =>
      RepositoryExtensions.fromGitHubRepository(node as GitHubRepository),
    );
  };
}
