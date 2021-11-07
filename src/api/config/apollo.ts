import { app } from '@/main';
import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context';
import { createApolloProvider as createProvider } from '@vue/apollo-option'

export let apolloClient: ApolloClient<NormalizedCacheObject>;

export function setApolloProvider(newHeaders = {}) {
  const httpLink = createHttpLink({
    uri: process.env.VUE_APP_GRAPHQL_ENDPOINT,
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
    // uri: process.env.VUE_APP_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
  });

  const apolloProvider = createProvider({
    defaultClient: apolloClient,
  });

  app.use(apolloProvider)
}
