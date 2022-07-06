import { InMemoryCache } from '@apollo/client/cache';
import { ApolloClient } from '@apollo/client/core';

class ReconceptApolloClient {
  constructor() {
    this.client = new ApolloClient({
      uri: 'https://api.portfoliodemo.reconcept.nl/graphql',
      cache: new InMemoryCache(),
    });
  }

  // returns a promise
  query(query) {
    return this.client.query({
      query: query
    })
  }

  // returns a promise
  mutate(mutation, variables) {
    return this.client.mutate({
      mutation: mutation,
      variables: {
        input: variables
      }
    })
  }

}

export default ReconceptApolloClient;