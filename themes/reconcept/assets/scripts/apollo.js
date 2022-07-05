import { ApolloClient, InMemoryCache } from '@apollo/client';

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
  mutation(mutation, variables) {
    return this.client.mutation({
      mutation: mutation,
      variables: variables
    })
  }

}

export default ReconceptApolloClient;