// lib/apolloClient.ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const HASURA_HTTP_URL = process.env.HASURA_URL as string;
const HASURA_SECRET = process.env.HASURA_ADMIN_SECRET as string;

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: HASURA_HTTP_URL,
    headers: {
      "x-hasura-admin-secret": HASURA_SECRET,
    },
  }),
  cache: new InMemoryCache(),
});
