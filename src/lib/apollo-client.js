import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from 'apollo-link-context';

const httpLink = new HttpLink({
  uri: 'http://localhost:9001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;
