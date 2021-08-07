import { GraphQLClient } from "graphql-request";

export class GitHubGraphQlClient extends GraphQLClient {
  constructor(accessToken: string) {
    // https://docs.github.com/en/graphql/guides/forming-calls-with-graphql
    super(`https://api.github.com/graphql`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    });
  }
}
