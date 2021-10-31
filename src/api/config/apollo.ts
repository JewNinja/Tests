import { app } from '@/main';
import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context';
import { createApolloProvider as createProvider } from '@vue/apollo-option'
import gql from 'graphql-tag'

export let apolloClient: ApolloClient<NormalizedCacheObject>;

export function setApolloProvider(newHeaders = {}) {
  const httpLink = createHttpLink({
    uri: 'http://localhost:3003/graphql', // TODO: вынести
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');

    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
        ...newHeaders
      }
    }
  });

  apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    // uri: 'http://localhost:3003/graphql',
    cache: new InMemoryCache(),
  });

  const apolloProvider = createProvider({
    defaultClient: apolloClient,
  });

  app.use(apolloProvider)
}
